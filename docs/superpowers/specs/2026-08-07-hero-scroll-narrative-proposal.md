# Hero Scroll Narrative — Proposal

**Date:** 2026-08-07 · **Status:** proposal, no code written
**Request:** transform the Möbius hero into a scroll-driven experience with interaction quality comparable to mercury.com, without copying its visual design

---

## 0. The finding that changes the decision

**The animation is already a pure timeline. It is not driven by a clock in any meaningful sense; it is driven by a single float.**

From `mobius.js`:

```js
this._elapsed += dt;
this._pmat.uniforms.uTime.value = this._elapsed;
```

and in the vertex shader, every particle's entire behaviour derives from that one uniform:

```glsl
float e = clamp((uTime - aDelay) / 3.2, 0.0, 1.0);
e = e * e * (3.0 - 2.0 * e);              // smoothstep
vec3 pos = mix(position, aTarget, e);      // cloud -> strip
pos += aNorm * sin(e * 3.14159) * 0.45;    // curved travel arc
```

Formation completes at `_formT = 0.45 * 7 + 1.6 + 3.2 = 7.95`.

**Consequence:** converting this from time-driven to scroll-driven is, at the core, replacing the source of one number. `uTime = elapsed` becomes `uTime = scrollProgress * 7.95`. No shader rewrite, no geometry change, no new draw calls, no bundle delta.

The architecture was built for this without anyone intending it. That single fact is why my recommendation is A rather than B.

---

## 1. What the current hero actually communicates

### Honest answer: one of the four positioning pillars, and only by accident

| Positioning pillar | Does the Möbius reinforce it? |
|---|---|
| Embedded engineering teams | **No.** A strip has no notion of one thing inside another. |
| Ethiopia as engineering centre | **No.** Nothing geographic, nothing situated. |
| US trust and contracts | **No.** Nothing about jurisdiction or safety. |
| Long-term engineering relationships | **Yes.** A Möbius has one continuous edge and no seam. Continuity is genuinely its public reading, and "they stay" is the strongest part of Zare's argument. |

### The deeper problem: its meaning is deliberately private

The eight formation phases, the eight edge markers, the single light completing one circuit, `data-route="B-P-S-E-L-E-C-A"` — all of it encodes the founders' long-term ambition, which we are explicitly forbidden from explaining publicly.

So a visitor receives **an abstract shape with no stated meaning**. The symbolism is real, considered, and invisible. That is a legitimate founder decision, but it means the hero cannot be defended on the grounds that it communicates something, because to the audience it does not.

### What it does communicate, implicitly

A company that ships 14,000 GPU-driven particles in one draw call, with reduced-motion handling, tab-visibility pausing and a WebGL fallback, is demonstrably able to write code. For a CTO that is a real signal, and it is the strongest argument for keeping WebGL at all.

**Verdict:** it is a premium abstract animation that happens to gesture at continuity. It is not currently carrying the positioning, and no amount of scroll interaction will make an abstract shape mean "embedded teams under US contracts."

What scroll *can* do is give it a beginning, middle and end, which turns decoration into a small argument.

---

## 2. A Zare-specific scroll narrative

I am not going to invent symbolism. The only defensible public reading of this object is **continuity**, so the narrative is built from that and nothing else.

### The three beats

| Beat | Scroll | Object state | Copy | What it says |
|---|---|---|---|---|
| **1. Dispersed** | 0% | Loose particle cloud, r 2.2–4.8, unformed | eyebrow + H1 | Nothing coherent yet |
| **2. Forming** | 0–100% of the hero's scroll range | Eight staggered phases sweep the loop, particles travel curved arcs into position | positioning line becomes legible | Parts becoming a system |
| **3. Continuous** | complete | Formed strip, slow idle rotation, one light completing a circuit of the single edge | retention line + the two paths | It holds, and it has no end |

The argument the motion makes is: **scattered → assembled → enduring.** That is honestly the Zare story, it maps to the one pillar the object can carry, and it requires no invented meaning.

### What I would NOT do

- **No multi-viewport sticky takeover.** See §6 — this is the main tension in the request.
- **No copy that changes on scroll.** Swapping headlines mid-scroll is a Mercury pattern that suits a product tour. Here it would delay the positioning statement, which is the one thing that must be readable in the first second.
- **No scroll-triggered section reveals chained to the hero.** The rest of the page already reveals on intersection and should stay independent.

---

## 3. Technical approach

### Recommended mechanics

**Drive `uTime` from scroll progress over one extra viewport of height.**

```
hero container: 200svh
  sticky inner: 100svh
  progress = clamp(scrollY / (containerHeight - viewportHeight), 0, 1)
  uTime = progress * 7.95        // formation timeline
  after 1.0: idle rotation continues on the clock, as today
```

- One `scroll` listener, `{ passive: true }`, writing to a ref. **No reads of layout inside the handler** beyond a cached container rect updated on resize, so no thrash.
- The existing rAF loop already runs; it reads the ref and writes the uniform. No second loop.
- `IntersectionObserver` already gates init and `document.hidden` already pauses. Both continue to apply.

### What changes and what does not

| | Change |
|---|---|
| Shader code | **none** |
| Geometry | **none** |
| Particle attributes | **none** |
| Draw calls | **none** |
| Dependencies | **none.** No GSAP, no Lenis for this, no scroll library |
| `mobius.js` | one new attribute (`progress` mode) and roughly 15 lines in `_tick` |
| React wrapper | passes a progress ref; ~20 lines |
| Hero section | wrapper element with sticky child |

### Reduced motion and fallback

Preserved exactly as built, with one addition:

- `prefers-reduced-motion` → Three.js is **never imported** (already true), the static gradient renders server-side, and the hero collapses to a single 100svh section with no scroll range. The extra viewport of scroll must not exist when there is nothing to drive.
- No WebGL → same collapse.
- No JS → same collapse. The sticky wrapper must be CSS-only and degrade to a normal section.

**This is the one genuinely new risk:** a 200svh hero that fails to animate becomes 200svh of empty space. The scroll range must be added by the same client code that succeeds in loading Three, never in the server render.

---

## 4. Performance budget

Measured today, and projected.

| Metric | Today | After A |
|---|---|---|
| Lazy hero chunk (gz) | 178 KB | **178 KB** |
| Initial JS (gz) | 196 KB | **196 KB** |
| Draw calls | ~10 (1 Points + 1 loop light + 8 marker sprites) | **~10** |
| Particles | 14,000 desktop / 5,000 coarse | unchanged |
| GPU buffer | ~784 KB (14 floats × 14k) | unchanged |
| CPU per frame | 1 uniform write, 1 group rotation, 2 lerps | + 1 ref read |
| Non-hero routes | Three never loaded | unchanged |

**Bundle impact of the change itself: zero.**

### Mobile strategy

**Recommendation: do not scroll-link on coarse pointers.** Keep the current time-driven formation there.

Reasons: momentum scrolling makes progress non-monotonic and the formation would visibly stutter and reverse; iOS address-bar collapse changes viewport height mid-scroll, which moves the denominator of the progress calculation; and a 200svh hero costs a mobile visitor a full extra screen of scrolling before any proof.

Mobile keeps 5,000 particles, `pixelRatio` 1.25, speed ×0.75, no parallax, and the formation plays once on view as it does now.

---

## 5. Three directions compared

### A. Evolve the current Möbius into a scroll-driven formation

| | |
|---|---|
| Effort | **~1 day** |
| Bundle | ±0 |
| Risk | **Low.** Shader untouched; the timeline already exists |
| Positioning gain | Small but real: gives the object a beginning, middle and end |
| Preserves | Founder symbolism, the implicit engineering signal, all fallbacks |

### B. Replace with a new Zare-specific system

Something that genuinely encodes embedded teams or Addis-to-client connection: a pod topology assembling, or particles resolving into a network with an origin node.

| | |
|---|---|
| Effort | **3–5 days**, most of it art direction with no guaranteed outcome |
| Bundle | ±0 (same Three.js) |
| Risk | **High.** New geometry generation, new shader, and a real chance the first two attempts look worse than what exists |
| Positioning gain | **Potentially the largest.** This is the only option that could make the hero actually carry a pillar |
| Cost | Discards the founder symbolism, which is a decision only the founder can make |

### C. Remove WebGL, build a CSS/SVG scroll interaction

| | |
|---|---|
| Effort | 1–2 days |
| Bundle | **−178 KB gz.** The only option that improves performance |
| Risk | Low |
| Cost | Forfeits the implicit "this company can code" signal, which is the hero's most defensible current function |

---

## 6. The tension I have to name

**A sticky scroll hero conflicts with a decision we made deliberately.**

The strategy documents state, repeatedly and as a rule: *never take the scrollbar; no scroll-jacking; no pinned sections.* The reasoning was that this is a **verification site** — an executive arriving with a real need is running an elimination process and needs proof fast. The trust strip sits immediately below the hero for exactly that reason.

Any sticky hero delays the first proof by however much scroll range it consumes. Mercury can afford a multi-screen narrative because it is selling a product to a self-serve audience. Zare is being checked out by someone with four other tabs open.

**My position:** the interaction quality is worth having, the multi-screen narrative is not. One extra viewport (200svh total) is the most I would spend, and I would want it verified that the trust strip is still reachable within two normal scroll gestures.

If the CTO wants the full Mercury-style multi-beat narrative, that is a legitimate call — but it is a **strategic reversal**, not a visual refinement, and it should be made knowingly.

---

## 7. Recommendation

**Take A. Do not take B yet. Do not take C.**

**Why not B, even though it has the highest ceiling:** the audit found that this site's binding constraint is *evidence*, not spectacle. There is not a single photograph anywhere, and the trust strip renders twelve clients as plain text. Spending three to five days re-authoring the hero while those remain open is the wrong allocation. B becomes worth doing once the site has something to show.

**Why not C, despite the 178 KB:** the implicit signal is the hero's most defensible function today, and removing WebGL to save bytes on the one route where the payload is already lazy and gated is optimising the wrong axis.

**Why A:** one day, zero bundle cost, zero risk to the shader, and it converts a decorative loop into a small argument with a beginning, middle and end. It also leaves B fully available later — the scroll plumbing built for A drives any future geometry unchanged.

### Proposed scope if approved

1. `progress` mode in `mobius.js` — uniform driven externally rather than by the clock
2. Scroll plumbing in the React wrapper — one passive listener, one ref, no new dependency
3. Sticky hero wrapper, added by client code only, so no-JS and reduced-motion render a single 100svh section
4. Coarse pointers keep the current time-driven behaviour
5. Verify: reduced motion, no-JS, no-WebGL, mobile, trust strip reachable in two gestures, budgets unchanged

**Estimate: 1 day, plus half a day of verification.**

### What I would rather spend the week on

Photography and giving the trust strip visual weight. Those are the two things standing between this site and being convincing, and none of them is a hero problem.
