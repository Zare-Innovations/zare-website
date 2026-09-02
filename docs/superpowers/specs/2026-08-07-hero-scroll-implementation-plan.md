# Hero Scroll — Implementation Plan (Direction A)

**Date:** 2026-08-07 · **Status:** plan for review, no code written
**Approved direction:** evolve the existing Möbius into a scroll-driven formation

---

## 1. Narrative: potential → alignment → system

Reframed as requested. Critically, **all three beats already exist in the shader** and map to it without adding a single visual element.

| Beat | Existing shader behaviour | Public reading |
|---|---|---|
| **Potential** | Start cloud, radius 2.2–4.8, `aSize` varying 0.55–1.9 so particles differ in weight | Individual capability, present but unorganised |
| **Alignment** | Eight staggered `aDelay` phases sweep the loop; each particle travels a curved arc via `pos += aNorm * sin(e·π) * 0.45` and settles | Individuals arriving into a shared structure on their own timing |
| **System** | Formed strip breathing at `sin(uTime·0.5)·0.012`; ~4% of particles (`aDetach`) drift out and return; slow continuous rotation | A structure that holds its shape under small perturbation |

**No literal symbols added.** No nodes, no map, no geography, no text, no engineer figures. The abstraction is unchanged; only the *pacing* becomes meaningful, because the visitor's own scroll drives the assembly.

One honest note on the third beat: the drift-and-return behaviour reads as *stability under change*, not as "people come and go". I would not claim more than that publicly, and no copy will explain it.

---

## 2. Conversion priority — the layout contract

**The first viewport is unchanged from what ships today.**

```
<div data-hero-scroll>                 height 100svh  (server default)
  <section class="sticky top-0">       min-height 100svh
     eyebrow · headline · positioning line · retention line
     BOTH pathway cards · Explore our work
  </section>
</div>
```

The sticky child is exactly the section that exists now, at exactly its current height. Measured last commit: **621px of content** against ~630px inner height at 1366×768 and ~662px at 1440×800. Adding a scroll range around it does not change what is inside it.

**The CTA is on screen for longer, not less.** Because the section is pinned, both pathway cards remain visible and clickable for the entire scroll range. Today they are visible for one viewport; after this, two.

**What is delayed:** the trust strip, by one viewport. That is the real cost and the thing to judge in review.

**Scroll range constant:** `HERO_SCROLL_VH = 100` (total 200svh). Exposed as a single named constant so it can be tuned to 60–80 after seeing it, without touching anything else. If the delay to first proof feels wrong in review, this is the one number to change.

---

## 3. Files that will change

| File | Change | Approx lines |
|---|---|---|
| `src/components/three/mobius.js` | New `uForm` uniform; 3 shader lines re-pointed; `setFormProgress()` public method; `_tick` gates keyed to form progress rather than elapsed | ~35 |
| `src/components/three/mobius-canvas.tsx` | Passive scroll listener, progress ref, calls `setFormProgress`; sets `data-scroll-ready` on the wrapper once it has successfully booted | ~40 |
| `src/app/(site)/_sections/hero.tsx` | Scroll wrapper `div` + `sticky` on the existing section. Content untouched | ~10 |
| `src/app/globals.css` | One rule: `[data-hero-scroll][data-scroll-ready='true'] { height: 200svh }` | ~4 |

**No other file changes. No new dependencies. No new components.**

---

## 4. Expected code changes

### 4.1 The one required shader change

This is the exception to "no shader rewrite unless absolutely required", and it is required.

**Problem:** every behaviour currently derives from one `uTime`. If `uTime` is driven by scroll, then when the visitor stops scrolling, `uTime` stops advancing — and the idle breathing, the detach drift and the loop light all freeze. A stationary user would see a dead object.

**Fix:** split one uniform into two. Three lines change.

```glsl
uniform float uTime;   // clock, continuous — idle behaviour
uniform float uForm;   // scroll 0..7.95 — formation only

float e = clamp((uForm - aDelay) / 3.2, 0.0, 1.0);          // was uTime
pos += aNorm * sin(uTime * 0.5 + aPhase) * 0.012 * formed;  // unchanged
float drift = max(0.0, sin(uTime * 0.12 + aPhase));         // unchanged
```

Geometry, attributes, blending, point sizing, the fragment shader and every constant remain untouched. This is a uniform split, not a rewrite.

### 4.2 `mobius.js`

- Add `uForm` to the uniforms object, initial 0.
- Add `setFormProgress(p)`: `this._pmat.uniforms.uForm.value = clamp(p,0,1) * this._formT`.
- `_tick`: keep `uTime` on the clock exactly as today. Key `rotGate` and the loop-light circuit to **form progress** rather than `_elapsed`, so the light completes its circuit as the strip completes, not on a timer.
- Add `this._scrollDriven` flag. When false (mobile, reduced motion, fallback), `uForm` advances on the clock exactly as today. **Default false**, so nothing changes unless explicitly enabled.

### 4.3 `mobius-canvas.tsx`

- After Three loads and the element is defined, and only when `pointer: fine` and reduced motion is off: call `setScrollDriven(true)` and set `data-scroll-ready="true"` on the nearest `[data-hero-scroll]` ancestor.
- One `scroll` listener, `{ passive: true }`. The handler **writes a ref only** — no `getBoundingClientRect`, no style reads, no DOM writes. Container geometry is cached and refreshed on `resize` alone.
- The existing rAF loop reads the ref and calls `setFormProgress`. No second loop, no rAF added.

### 4.4 `hero.tsx`

Wrap the existing `<section>` in `<div data-hero-scroll>` and add `sticky top-0` to the section. **No change to any child**, no change to copy, spacing, padding, or the cards.

### 4.5 Scrub behaviour

Formation is a pure function of `uForm`, so scrolling up reverses it. That is the expected behaviour of a scroll-driven animation and matches the reference. Not latching.

---

## 5. Risk assessment

| # | Risk | Severity | Mitigation |
|---|---|---|---|
| R1 | Animation fails to load and the page has 200svh of empty space | **High** | Height is applied ONLY by `data-scroll-ready`, set by client code after a successful boot. Server renders 100svh. No-JS, no-WebGL, reduced motion and mobile all keep today's layout exactly. |
| R2 | Idle motion freezes when the visitor stops scrolling | **High** | The `uForm` / `uTime` split in §4.1. This is why the shader change is required. |
| R3 | Trust strip delayed by one viewport, conflicting with the verification-site principle | **Medium** | Accepted, with the CTA remaining on screen throughout. `HERO_SCROLL_VH` is a single tunable constant. Judge in review. |
| R4 | Scroll handler causes jank or layout thrash | Medium | Passive listener, ref write only, geometry cached, no reads in handler. The uniform write happens in the rAF loop that already runs. |
| R5 | Mobile momentum scrolling makes progress non-monotonic; iOS address-bar collapse changes viewport height mid-scroll | Medium | Mobile is excluded entirely. `pointer: coarse` keeps today's time-driven formation and 100svh hero. |
| R6 | Sticky positioning interacts badly with the fixed header | Low | Header is `fixed` and outside the hero's stacking context; the sticky section pins at `top: 0` beneath it. Verify visually. |
| R7 | Formation completes too early or too late relative to scroll | Low | Single constant. Tune after seeing it. |
| R8 | `sticky` inside a flex or transformed ancestor silently fails | Low | `main` has no transform and no flex on this path. Verify computed position is `sticky` in the browser. |
| R9 | Reduced-motion users get scroll range because the media query is evaluated once | Low | Checked at boot; the attribute is never set under reduced motion. A user toggling the OS setting mid-session keeps the old state until reload, which is acceptable. |

**Rollback:** the whole change is additive and behind one attribute. Removing `data-scroll-ready` restores current behaviour without touching the shader path, because `_scrollDriven` defaults to false.

---

## 6. Verification checklist

Nothing is claimed complete until every line below is checked against a running build.

**Layout and conversion**
- [ ] 1366×768: eyebrow, headline, positioning line, retention line and **both pathway cards** visible without scrolling
- [ ] 1440×800: same
- [ ] Both cards remain visible and clickable throughout the pinned scroll range
- [ ] Trust strip reachable within two normal scroll gestures
- [ ] Computed `position` on the hero section is `sticky`, not silently static

**Fallbacks — each must render a single 100svh hero with no scroll range**
- [ ] JavaScript disabled
- [ ] `prefers-reduced-motion: reduce`
- [ ] WebGL unavailable
- [ ] Three.js import fails (simulate)
- [ ] `pointer: coarse` / mobile — and formation still plays on view, time-driven

**Animation**
- [ ] Scroll 0 shows the dispersed cloud, not a formed strip
- [ ] Formation tracks scroll smoothly and reverses on scroll up
- [ ] Idle breathing, detach drift and rotation continue while the visitor is stationary
- [ ] Loop light completes its circuit as the strip completes
- [ ] Tab hidden stops the rAF loop; returning resumes

**Performance**
- [ ] Lazy hero chunk still 178 KB gz, initial JS still 196 KB gz, CSS still 12 KB gz
- [ ] Draw calls unchanged at ~10
- [ ] No `getBoundingClientRect` inside the scroll handler
- [ ] Three.js still absent from every non-hero route

**Regression**
- [ ] `pnpm typecheck` clean
- [ ] `pnpm build` passes
- [ ] One `h1`, zero heading-level skips, all five routes
- [ ] Zero banned words in authored copy
- [ ] Schema types unchanged
- [ ] Live routes `/`, `/work`, `/contact`, `/careers`, `/careers/[id]`, `/admin/login` all 200

---

## 7. Estimate

**1 day implementation, 0.5 day verification.**

The largest uncertainty is R3, which is a judgement call rather than a technical one and can only be settled by looking at it.
