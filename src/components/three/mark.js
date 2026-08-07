/* Zare Innovations — particle assembly of the Z mark.
   <zare-mark> renders one THREE.Points cloud that streams in from off-frame
   left and settles into a lit, three-dimensional Z under an externally driven
   clock, then holds and sways.

   This replaces ring.js, which built a torus. The scaffolding is the same and
   is unchanged: one draw call, one ShaderMaterial, all per-particle motion on
   the GPU from two uniforms, IntersectionObserver lazy init, tab-visibility
   pause, a reduced-motion static render and a WebGL-failure fallback. What
   changed is the target shape, and with it three things the torus made easy
   and a logo does not.

   THE TARGET IS SAMPLED, NOT ANALYTIC. A torus has a closed-form surface and
   an exact normal. The mark has neither, so the shape comes from the alpha
   channel of public/hero/zare-mark.png at boot: a distance transform over the
   mask yields both an inside/outside test and, from its gradient, the outward
   normal that the lighting needs. Swapping the logo means replacing that file.

   THE MARK READS BY COLOUR, NOT SILHOUETTE. In the logo the Z is teal on a
   navy tile. Particles forming both would render tile and glyph in one colour
   and produce a solid rectangle with no Z in it, so the particles form the
   glyph only and the page background plays the tile. That works because the
   hero already sits on #051c2b–#0a2c40, the same family as the logo's navy.

   IT MUST STAY READABLE. The torus could turn continuously because a torus has
   no upright. A logo does, so the rotation here is a bounded sway — enough to
   show the object has thickness, never enough to make it hard to read. */
(function () {
  if (customElements.get('zare-mark')) return;

  var FALLBACK_BG =
    'radial-gradient(80% 110% at 50% 45%, rgba(64,193,199,.16), rgba(0,0,0,0) 60%)';

  var DEFAULT_MASK = '/hero/zare-mark.png';

  /* Mask sampling. SAMPLE_W is the working resolution of the alpha field, not
     the particle count — it only has to be fine enough that the distance
     transform resolves the mark's corners, and coarse enough that the two
     chamfer passes stay off the boot critical path. */
  var SAMPLE_W = 200;
  /* The PNG is cropped tight to the mark, so the shape touches all four image
     borders. Without a margin the distance transform would find no outside
     along those edges and the border particles would get no normal. */
  var PAD = 6;
  /* Band, in sample pixels, treated as the rim of the slab. */
  var RIM_PX = 2.6;
  /* How far in from the edge the face normals bend toward the rim. A hard slab
     edge reads as a cutout; bending them rounds it into a bevel that catches
     the light along the whole outline. */
  var BEVEL_PX = 6.5;
  /* Share of particles spent on the rim. The rim is a small fraction of the
     area but the entire silhouette, so it is allocated rather than left to
     uniform sampling, which would barely populate it. */
  var RIM_SHARE = 0.34;

  /* World height of the mark, before the host's `scale` attribute. */
  var MARK_H = 1.8;
  /* Slab depth, as a fraction of MARK_H. Deep enough to catch the sway, not so
     deep the mark becomes an extruded prop. */
  var THICK = 0.08;

  /* Formation timing. Particles are staggered left to right across the mark so
     the incoming stream lays it down as it sweeps, rather than the whole shape
     fading up at once. FORM_T is when the last one lands. */
  var SWEEP = 2.6, JITTER = 1.4, TRAVEL = 3.4;
  var FORM_T = SWEEP + JITTER + TRAVEL;

  function glowTexture(THREE, inner, outer) {
    var c = document.createElement('canvas');
    c.width = c.height = 64;
    var x = c.getContext('2d');
    var g = x.createRadialGradient(32, 32, 2, 32, 32, 30);
    g.addColorStop(0, inner);
    g.addColorStop(0.35, outer);
    g.addColorStop(1, 'rgba(0,0,0,0)');
    x.fillStyle = g;
    x.fillRect(0, 0, 64, 64);
    return new THREE.CanvasTexture(c);
  }

  /* Two-pass chamfer distance transform over the mask, in sample pixels.
     0 outside, increasing inward. Exact Euclidean distance is not needed: this
     feeds a rim test and a gradient direction, and chamfer's ~2% error is far
     below one particle's diameter. */
  function insideDistance(alpha, W, H) {
    var d = new Float32Array(W * H);
    var i, x, y, m;
    var INF = 1e9, D = 1, Q = 1.41421356;

    for (i = 0; i < W * H; i++) d[i] = alpha[i] > 0.5 ? INF : 0;

    for (y = 1; y < H - 1; y++) {
      for (x = 1; x < W - 1; x++) {
        i = y * W + x;
        if (d[i] === 0) continue;
        m = d[i];
        if (d[i - 1] + D < m) m = d[i - 1] + D;
        if (d[i - W] + D < m) m = d[i - W] + D;
        if (d[i - W - 1] + Q < m) m = d[i - W - 1] + Q;
        if (d[i - W + 1] + Q < m) m = d[i - W + 1] + Q;
        d[i] = m;
      }
    }
    for (y = H - 2; y > 0; y--) {
      for (x = W - 2; x > 0; x--) {
        i = y * W + x;
        if (d[i] === 0) continue;
        m = d[i];
        if (d[i + 1] + D < m) m = d[i + 1] + D;
        if (d[i + W] + D < m) m = d[i + W] + D;
        if (d[i + W + 1] + Q < m) m = d[i + W + 1] + Q;
        if (d[i + W - 1] + Q < m) m = d[i + W - 1] + Q;
        d[i] = m;
      }
    }
    return d;
  }

  /* Rasterises the mask into a padded alpha field, its distance transform and
     two index lists — the cells that are rim and the cells that are face.
     Sampling from prepared lists rather than rejection-sampling the image is
     what keeps the rim affordable: it is a few percent of the area, so
     rejection would spend most of its attempts in the interior. */
  function buildField(img) {
    var W = SAMPLE_W + PAD * 2;
    var H = Math.max(1, Math.round(SAMPLE_W * img.height / img.width)) + PAD * 2;

    var c = document.createElement('canvas');
    c.width = W;
    c.height = H;
    var ctx = c.getContext('2d', { willReadFrequently: true });
    if (!ctx) return null;
    ctx.drawImage(img, PAD, PAD, W - PAD * 2, H - PAD * 2);

    var raw = ctx.getImageData(0, 0, W, H).data;
    var alpha = new Float32Array(W * H);
    for (var i = 0; i < W * H; i++) alpha[i] = raw[i * 4 + 3] / 255;

    var dist = insideDistance(alpha, W, H);

    var rim = [], face = [];
    for (var y = 1; y < H - 1; y++) {
      for (var x = 1; x < W - 1; x++) {
        var j = y * W + x;
        if (dist[j] <= 0) continue;
        if (dist[j] <= RIM_PX) rim.push(j); else face.push(j);
      }
    }
    if (!rim.length || !face.length) return null;

    return { w: W, h: H, dist: dist, rim: rim, face: face };
  }

  class ZareMark extends HTMLElement {
    static get observedAttributes() { return ['speed']; }

    constructor() {
      super();
      this._speed = 1;
      this._last = 0;
      this._raf = 0;
      this._inView = false;
      this._booted = false;
      this._px = 0; this._py = 0; this._tx = 0; this._ty = 0;
      this._elapsed = 0;
      /* Formation source. Defaults to the wall clock so the component is
         self-sufficient; the React wrapper hands it the scrollbar instead, and
         only after a successful boot on a fine pointer without reduced motion. */
      this._scrollDriven = false;
      this._formP = 0;
      this._halfW = 0.7;
      this._halfH = MARK_H / 2;
    }

    /** Public. p is 0..1 across the hero's formation range. */
    setFormProgress(p) {
      this._formP = p < 0 ? 0 : p > 1 ? 1 : p;
    }

    /** Public. Hands the formation clock over to the scrollbar. */
    setScrollDriven(on) {
      this._scrollDriven = !!on;
    }

    attributeChangedCallback(n, _o, v) {
      if (n === 'speed') {
        var f = parseFloat(v);
        this._speed = isFinite(f) ? f : 1;
      }
    }

    connectedCallback() {
      var st = this.style;
      st.display = 'block';
      if (getComputedStyle(this).position === 'static') st.position = 'absolute';
      st.inset = '0';
      st.width = '100%';
      st.height = '100%';
      st.pointerEvents = 'none';
      st.overflow = 'hidden';

      var self = this;
      this._io = new IntersectionObserver(function (es) {
        es.forEach(function (e) {
          self._inView = e.isIntersecting;
          if (e.isIntersecting && !self._booted) self._boot();
          self._syncRunning();
        });
      }, { rootMargin: '120px' });
      this._io.observe(this);

      this._onVis = function () { self._syncRunning(); };
      document.addEventListener('visibilitychange', this._onVis);
    }

    disconnectedCallback() {
      if (this._io) this._io.disconnect();
      document.removeEventListener('visibilitychange', this._onVis);
      if (this._raf) cancelAnimationFrame(this._raf);
      if (this._ro) this._ro.disconnect();
      if (this._renderer) this._renderer.dispose();
    }

    /* The mask has to be decoded before any geometry exists, so boot is async
       where ring.js's was synchronous. Nothing is appended until it resolves;
       a failed or blocked load takes the same path as a WebGL failure. */
    _boot() {
      if (this._booted) return;
      var self = this;
      if (!window.THREE) { setTimeout(function () { self._boot(); }, 80); return; }
      this._booted = true;

      var img = new Image();
      img.decoding = 'async';
      img.onload = function () {
        var field;
        try { field = buildField(img); } catch { field = null; }
        if (!field) { self._fallback(); return; }
        try { self._setup(field); } catch { self._fallback(); }
      };
      img.onerror = function () { self._fallback(); };
      img.src = this.getAttribute('mask') || DEFAULT_MASK;
    }

    _fallback() {
      var d = document.createElement('div');
      d.style.cssText = 'position:absolute;inset:0;background:' + FALLBACK_BG;
      this.appendChild(d);
    }

    _setup(field) {
      var THREE = window.THREE, self = this;
      var coarse = matchMedia('(pointer: coarse)').matches || window.innerWidth < 768;
      var reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
      this._static = reduced;
      this._coarse = coarse;

      var renderer;
      try {
        renderer = new THREE.WebGLRenderer({
          antialias: !coarse, alpha: true,
          powerPreference: 'low-power', preserveDrawingBuffer: true
        });
      } catch { this._fallback(); return; }
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, coarse ? 1.25 : 1.75));
      renderer.domElement.style.cssText =
        'position:absolute;inset:0;width:100%;height:100%;display:block;';
      this.appendChild(renderer.domElement);
      this._renderer = renderer;

      var scene = new THREE.Scene();
      var camera = new THREE.PerspectiveCamera(38, 1, 0.1, 60);
      camera.position.set(0, 0, 6.4);
      this._scene = scene;
      this._camera = camera;

      var group = new THREE.Group();
      var ox = this.getAttribute('offset-x');
      group.position.x = ox != null && ox !== '' ? parseFloat(ox) || 0 : 0;
      group.scale.setScalar(parseFloat(this.getAttribute('scale') || '1') || 1);
      scene.add(group);
      this._group = group;

      var W = field.w, H = field.h, dist = field.dist;
      var rimCells = field.rim, faceCells = field.face;

      /* Sample pixels to world units, sized off the mark itself rather than
         the padded field so the padding never changes how big it renders. */
      var unit = MARK_H / (H - PAD * 2);
      var cx = W / 2, cy = H / 2;
      var th = MARK_H * THICK;
      this._halfH = MARK_H / 2;
      this._halfW = (W - PAD * 2) * unit / 2;

      var N = coarse ? 9000 : 30000;
      var aStart = new Float32Array(N * 3), aTarget = new Float32Array(N * 3),
          aNorm = new Float32Array(N * 3), aVia1 = new Float32Array(N * 3),
          aVia2 = new Float32Array(N * 3), aSize = new Float32Array(N),
          aDelay = new Float32Array(N), aShade = new Float32Array(N),
          aDetach = new Float32Array(N), aPhase = new Float32Array(N);

      for (var i = 0; i < N; i++) {
        var onRim = Math.random() < RIM_SHARE;
        var list = onRim ? rimCells : faceCells;
        var cell = list[(Math.random() * list.length) | 0];
        var py = (cell / W) | 0, pxi = cell - py * W;

        /* Sub-pixel jitter, or the cloud would visibly land on a lattice. */
        var fx = pxi + Math.random() - 0.5, fy = py + Math.random() - 0.5;
        var tx = (fx - cx) * unit;
        var ty = (cy - fy) * unit;

        /* Outward normal from the distance gradient. d increases inward, so the
           outward direction is its negation; y is negated a second time because
           canvas y runs down and world y runs up. */
        var gx = (dist[cell + 1] - dist[cell - 1]) * 0.5;
        var gy = (dist[cell + W] - dist[cell - W]) * 0.5;
        var oxn = -gx, oyn = gy;
        var gl = Math.sqrt(oxn * oxn + oyn * oyn);
        if (gl > 1e-4) { oxn /= gl; oyn /= gl; } else { oxn = 0; oyn = 0; }

        var tz, nx, ny, nz;
        if (onRim) {
          /* Across the full depth, normal fanning with it so the rim reads as
             rounded rather than as a flat wall. */
          var zt = Math.random() * 2 - 1;
          tz = zt * th * 0.5;
          nx = oxn; ny = oyn; nz = zt * 0.8;
        } else {
          /* Front or back face. The shell is hollow: interior volume is never
             visible through the faces, so filling it would spend particles on
             nothing. */
          var sg = Math.random() < 0.5 ? -1 : 1;
          tz = sg * th * 0.5 * (0.88 + Math.random() * 0.12);
          var bev = 1 - dist[cell] / BEVEL_PX;
          if (bev < 0) bev = 0;
          bev *= 0.75;
          nx = oxn * bev; ny = oyn * bev; nz = sg * (1 - bev);
        }
        var nl = Math.sqrt(nx * nx + ny * ny + nz * nz) || 1;

        aTarget[i * 3] = tx; aTarget[i * 3 + 1] = ty; aTarget[i * 3 + 2] = tz;
        aNorm[i * 3] = nx / nl; aNorm[i * 3 + 1] = ny / nl; aNorm[i * 3 + 2] = nz / nl;

        /* Loose start cloud — state 0. */
        var rr = 2.4 + Math.random() * 2.8,
            thh = Math.random() * Math.PI * 2,
            ph = Math.acos(2 * Math.random() - 1);
        aStart[i * 3] = rr * Math.sin(ph) * Math.cos(thh);
        aStart[i * 3 + 1] = rr * Math.sin(ph) * Math.sin(thh) * 0.7;
        aStart[i * 3 + 2] = rr * Math.cos(ph) * 0.8;

        /* Two control points turn the approach into a stream. Every particle
           funnels through the same gate off-frame left and arrives at its own
           target from the same relative direction, which is what reads as flow;
           a straight interpolation from the start cloud reads as an implosion,
           because each particle comes from somewhere different. The jitter is
           what keeps the stream from collapsing into a rigid tube. */
        aVia1[i * 3] = -3.0 + (Math.random() - 0.5) * 0.9;
        aVia1[i * 3 + 1] = 0.7 + (Math.random() - 0.5) * 1.7;
        aVia1[i * 3 + 2] = 0.5 + (Math.random() - 0.5) * 1.3;

        aVia2[i * 3] = tx - 1.0 + (Math.random() - 0.5) * 0.7;
        aVia2[i * 3 + 1] = ty - 0.55 + (Math.random() - 0.5) * 0.6;
        aVia2[i * 3 + 2] = 0.75 + (Math.random() - 0.5) * 0.5;

        aSize[i] = 0.5 + Math.random() * Math.random() * 1.25;
        /* Staggered along the direction of travel, so the sweep that carries
           the stream in is the same sweep that builds the mark. */
        aDelay[i] = (fx / W) * SWEEP + Math.random() * JITTER;
        aShade[i] = Math.random();
        aDetach[i] = Math.random() < 0.03 ? 0.5 + Math.random() : 0.0;
        aPhase[i] = Math.random() * Math.PI * 2;
      }

      var pg = new THREE.BufferGeometry();
      pg.setAttribute('position', new THREE.BufferAttribute(aStart, 3));
      pg.setAttribute('aTarget', new THREE.BufferAttribute(aTarget, 3));
      pg.setAttribute('aNorm', new THREE.BufferAttribute(aNorm, 3));
      pg.setAttribute('aVia1', new THREE.BufferAttribute(aVia1, 3));
      pg.setAttribute('aVia2', new THREE.BufferAttribute(aVia2, 3));
      pg.setAttribute('aSize', new THREE.BufferAttribute(aSize, 1));
      pg.setAttribute('aDelay', new THREE.BufferAttribute(aDelay, 1));
      pg.setAttribute('aShade', new THREE.BufferAttribute(aShade, 1));
      pg.setAttribute('aDetach', new THREE.BufferAttribute(aDetach, 1));
      pg.setAttribute('aPhase', new THREE.BufferAttribute(aPhase, 1));

      var pmat = new THREE.ShaderMaterial({
        transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
        uniforms: {
          /* Wall clock. Drives idle breathing and detach drift, which must keep
             moving whether or not the visitor is scrolling. */
          uTime: { value: 0 },
          /* Formation clock. Follows the scrollbar when handed over. Split from
             uTime so a stationary visitor does not freeze a dead object. */
          uForm: { value: 0 },
          uPR: { value: Math.min(window.devicePixelRatio || 1, 2) }
        },
        vertexShader: [
          'attribute vec3 aTarget; attribute vec3 aNorm;',
          'attribute vec3 aVia1; attribute vec3 aVia2;',
          'attribute float aSize; attribute float aDelay; attribute float aShade; attribute float aDetach; attribute float aPhase;',
          'uniform float uTime; uniform float uForm; uniform float uPR;',
          'varying float vShade; varying float vFade; varying float vLight; varying float vForm;',
          'void main(){',
          '  float e = clamp((uForm - aDelay) / ' + TRAVEL.toFixed(1) + ', 0.0, 1.0);',
          '  float s = e * e * (3.0 - 2.0 * e);',
          /* Cubic Bezier through the two gate points rather than a straight
             mix. Same cost to evaluate, entirely different read. */
          '  float mt = 1.0 - s;',
          '  vec3 pos = mt*mt*mt * position + 3.0*mt*mt*s * aVia1',
          '           + 3.0*mt*s*s * aVia2 + s*s*s * aTarget;',
          /* smoothstep rather than step: with a scrubbed clock a hard cut makes
             the whole cloud switch on within one frame of scrolling. */
          '  float formed = smoothstep(0.94, 1.0, s);',
          '  pos += aNorm * sin(uTime * 0.5 + aPhase) * 0.010 * formed;',
          '  float drift = max(0.0, sin(uTime * 0.12 + aPhase));',
          '  pos += aNorm * drift * drift * aDetach * 0.30 * formed;',
          /* Lit in view space, so the sway actually moves the highlight across
             the slab instead of painting it on. */
          '  vec3 n = normalize(normalMatrix * aNorm);',
          '  vec3 L = normalize(vec3(-0.35, 0.65, 0.72));',
          '  vLight = 0.30 + 0.70 * max(dot(n, L), 0.0);',
          '  vec4 mv = modelViewMatrix * vec4(pos, 1.0);',
          '  gl_Position = projectionMatrix * mv;',
          '  gl_PointSize = aSize * uPR * (22.0 / -mv.z) * (0.42 + 0.58 * s);',
          '  vShade = aShade;',
          '  vFade = 0.22 + 0.78 * s;',
          '  vForm = s;',
          '}'
        ].join('\n'),
        fragmentShader: [
          'varying float vShade; varying float vFade; varying float vLight; varying float vForm;',
          'void main(){',
          '  float d = length(gl_PointCoord - 0.5);',
          '  float a = smoothstep(0.5, 0.10, d) * vFade;',
          /* The logo teal, its shadow and its highlight. */
          '  vec3 teal = vec3(0.251, 0.757, 0.780);',
          '  vec3 deep = vec3(0.055, 0.290, 0.355);',
          '  vec3 lit  = vec3(0.860, 0.988, 1.0);',
          '  vec3 col = mix(deep, teal, smoothstep(0.0, 0.55, vLight));',
          '  col = mix(col, lit, smoothstep(0.72, 1.0, vLight) * 0.85);',
          '  col = mix(col, lit, vShade * 0.10);',
          /* In flight the stream is pale and unresolved; the brand colour
             arrives with the shape rather than preceding it. */
          '  vec3 pale = vec3(0.80, 0.90, 0.94);',
          '  col = mix(pale, col, smoothstep(0.15, 0.85, vForm));',
          '  gl_FragColor = vec4(col, a * 0.30);',
          '}'
        ].join('\n')
      });

      group.add(new THREE.Points(pg, pmat));
      this._pmat = pmat;
      this._formT = FORM_T;

      /* Light that crosses the mark once as it completes, on the same diagonal
         the stream travels. */
      var tl = new THREE.Sprite(new THREE.SpriteMaterial({
        map: glowTexture(THREE, 'rgba(235,255,255,.95)', 'rgba(64,193,199,.55)'),
        transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending
      }));
      tl.scale.setScalar(0.5);
      group.add(tl);
      this._sweepLight = tl;

      this._ro = new ResizeObserver(function () { self._resize(); });
      this._ro.observe(this);
      this._resize();

      if (!coarse && !reduced && this.parentElement) {
        var host = this.parentElement;
        host.addEventListener('pointermove', function (e) {
          var rect = host.getBoundingClientRect();
          self._tx = (e.clientX - rect.left) / rect.width * 2 - 1;
          self._ty = (e.clientY - rect.top) / rect.height * 2 - 1;
        });
        host.addEventListener('pointerleave', function () { self._tx = 0; self._ty = 0; });
      }

      if (reduced) {
        /* Both clocks pushed past the end, so the mark renders already formed
           and static. uForm matters as much as uTime: without it a
           reduced-motion visitor gets the unformed start cloud, which is the
           one state that means nothing on its own. */
        this._pmat.uniforms.uTime.value = 200;
        this._pmat.uniforms.uForm.value = 200;
        this._pose(0, 0);
        this._renderOnce();
        return;
      }
      this._syncRunning();
    }

    _resize() {
      if (!this._renderer) return;
      var w = this.clientWidth || 1, h = this.clientHeight || 1;
      this._renderer.setSize(w, h, false);
      this._camera.aspect = w / h;
      this._camera.updateProjectionMatrix();
      if (this._static) this._renderOnce();
    }

    /* A logo has an upright, so this sways rather than turning. 0.40rad is
       about 23 degrees: enough that the slab's depth and the light crossing it
       are unmistakable, well short of where the mark stops being legible.
       `gate` holds it flat until there is something formed to sway. */
    _pose(t, gate) {
      this._group.rotation.set(
        (-0.05 + 0.05 * Math.sin(t * 0.19)) * gate + this._py * 0.05,
        (0.40 * Math.sin(t * 0.24)) * gate + this._px * 0.10,
        (0.015 * Math.sin(t * 0.16)) * gate
      );
    }

    _renderOnce() {
      if (this._renderer) {
        this._pose(0, 0);
        this._renderer.render(this._scene, this._camera);
      }
    }

    _syncRunning() {
      var should = this._booted && !this._static && this._inView
        && !document.hidden && this._renderer;
      if (should && !this._raf) { this._last = performance.now(); this._tick(); }
      if (!should && this._raf) { cancelAnimationFrame(this._raf); this._raf = 0; }
    }

    _tick() {
      var self = this;
      this._raf = requestAnimationFrame(function () { if (self._raf) self._tick(); });

      var now = performance.now();
      var dt = Math.min(now - this._last, 100) / 1000;
      this._last = now;
      var gate = 1;

      if (this._pmat) {
        this._elapsed += dt;
        this._pmat.uniforms.uTime.value = this._elapsed;

        /* Scroll maps straight onto the formation window: the wrapper has
           already narrowed the hero's full range down to the part that builds
           the mark, so 1.0 here means "state 3 reached, mark complete". */
        var form = this._scrollDriven ? this._formP * this._formT : this._elapsed;
        this._pmat.uniforms.uForm.value = form;

        /* Sway eases in as the mark closes rather than running on a timer
           beside it, so nothing turns before there is a thing to turn. */
        gate = Math.max(0, Math.min(1, (form - this._formT + 2.5) / 2.5));

        if (this._sweepLight) {
          var lt = this._scrollDriven
            ? (this._formP - 0.62) / 0.38
            : (form - this._formT + 1.5) / 14;
          if (lt > 0 && lt < 1) {
            this._sweepLight.material.opacity = Math.sin(lt * Math.PI) * 0.85;
            this._sweepLight.position.set(
              -this._halfW + lt * this._halfW * 2,
              this._halfH - lt * this._halfH * 2,
              MARK_H * THICK * 0.5 + 0.16
            );
          } else {
            this._sweepLight.material.opacity = 0;
          }
        }
      }

      this._px += (this._tx - this._px) * 0.04;
      this._py += (this._ty - this._py) * 0.04;
      /* Wall clock, so the mark keeps breathing while the visitor is stationary
         at state 4. Only the gate depends on scroll. */
      this._pose(this._elapsed * this._speed * (this._coarse ? 0.75 : 1), gate);
      this._renderer.render(this._scene, this._camera);
    }
  }

  customElements.define('zare-mark', ZareMark);
})();

/* Marks this as an ES module so it can be side-effect imported from
   TypeScript, matching mobius.js. */
export {};
