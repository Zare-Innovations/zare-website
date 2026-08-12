'use client';

import { createElement, useEffect, useRef, useState } from 'react';

/** Element API exposed by mobius.js once the custom element is defined. */
type MobiusElement = HTMLElement & {
  setFormProgress?: (p: number) => void;
  setScrollDriven?: (on: boolean) => void;
};

/* ------------------------------------------------------------------
   The states, as fractions of the hero's scroll range.

     0  0.00 .. 0.06   loose particle cloud, hero copy at rest
     1  0.06 .. 0.32   the cloud starts gathering, copy travels out of frame
     2  0.32 .. 0.52   the Möbius strip becomes recognisable
     3  0.52 .. 0.58   the strip completes; the loop light rides its edge
     4  0.58 .. 0.62   it holds, rotating
     5  0.62 .. 0.94   the three pillar texts rise out of the strip's
                       centre, one scroll window each
        1.00           unpin — the strip keeps rotating and the texts hold
                       as the next section arrives; no dispersal

   mobius.js maps the formation fraction across formT + 1 internally, so
   the strip is fully formed at ~89% of the FORM window and spends the
   rest holding its shape while the loop light completes its circuit.
   ------------------------------------------------------------------ */

const FORM_FROM = 0.06;
const FORM_TO = 0.58;

const CARDS_FROM = 0.06;
const CARDS_TO = 0.22;
const HEAD_FROM = 0.12;
const HEAD_TO = 0.3;

/** One rise window per pillar text. Its label latches when the window
 *  passes 0.45 — the CSS transition carries the actual travel. */
const RISE: ReadonlyArray<readonly [number, number]> = [
  [0.62, 0.72],
  [0.74, 0.84],
  [0.86, 0.94],
];

/** Upper bound of each state, used only to publish `data-hero-state`. */
const STATE_END = [0.06, 0.32, 0.52, 0.66, 0.74, 1];

const TAU = 0.16;
const SETTLED = 0.0002;

const clamp01 = (n: number) => (n < 0 ? 0 : n > 1 ? 1 : n);
const span = (v: number, from: number, to: number) =>
  clamp01((v - from) / (to - from));

/**
 * Wrapper around the `<zare-mobius>` web component (variant `particles`)
 * and the scroll sequence that drives it. Same choreography contract as
 * MarkCanvas — damped clock, cards/head exit variables, state publishing —
 * but the formation target is the Möbius strip from the zare-website-v3
 * handoff, centred, and the pillars are plain text rising from its centre
 * rather than particle icons peeling off a glyph.
 *
 * Coarse pointers stay time-driven: mobius.js plays the original v3
 * timed formation there and the hero stays a single viewport, exactly as
 * the old MobiusCanvas behaved. Reduced motion skips the Three download
 * entirely and keeps the static gradient.
 */
export function MobiusHeroCanvas({
  speed = 1.4,
  markers = true,
  scale = 1.5,
  className,
}: {
  speed?: number;
  markers?: boolean;
  scale?: number;
  className?: string;
}) {
  const [ready, setReady] = useState(false);
  const [lit, setLit] = useState(false);
  const elRef = useRef<MobiusElement | null>(null);

  useEffect(() => {
    let cancelled = false;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    (async () => {
      try {
        const THREE = await import('three');
        if (cancelled) return;
        (window as unknown as { THREE: unknown }).THREE = THREE;
        await import('./mobius.js');
        if (!cancelled) setReady(true);
      } catch {
        // Leaves the static gradient in place.
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!ready) return;
    let inner = 0;
    const outer = requestAnimationFrame(() => {
      inner = requestAnimationFrame(() => setLit(true));
    });
    return () => {
      cancelAnimationFrame(outer);
      if (inner) cancelAnimationFrame(inner);
    };
  }, [ready]);

  useEffect(() => {
    if (!ready) return;

    const el = elRef.current;
    if (!el?.setScrollDriven || !el.setFormProgress) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;
    // Coarse pointers keep the v3 timed formation; see the component note.

    const host = el.closest<HTMLElement>('[data-hero-scroll]');
    if (!host) return;

    const pillars = Array.from(
      host.querySelectorAll<HTMLElement>('[data-hero-pillar]'),
    );

    el.setScrollDriven(true);
    host.dataset.scrollReady = 'true';

    let top = 0;
    let range = 1;
    const measure = () => {
      const rect = host.getBoundingClientRect();
      top = rect.top + window.scrollY;
      range = Math.max(1, host.offsetHeight - window.innerHeight);
    };
    const readScroll = () => clamp01((window.scrollY - top) / range);

    let lastState = -1;
    let lastShown = -1;

    const applyAt = (p: number) => {
      el.setFormProgress?.(span(p, FORM_FROM, FORM_TO));

      host.style.setProperty('--hero-cards', String(span(p, CARDS_FROM, CARDS_TO)));
      host.style.setProperty('--hero-head', String(span(p, HEAD_FROM, HEAD_TO)));

      const state = STATE_END.findIndex((end) => p <= end);
      if (state !== lastState) {
        lastState = state;
        host.dataset.heroState = String(state < 0 ? STATE_END.length - 1 : state);
      }

      // Pillar texts latch mid-window and unlatch on the way back up; the
      // rise itself is a CSS transition out of the strip's centre. There is
      // deliberately no release at the end: strip and texts hold their
      // state and the next section simply scrolls over them.
      const rises = RISE.map(([a, b]) => span(p, a, b));
      let shown = 0;
      while (shown < RISE.length && rises[shown] > 0.45) shown++;
      if (shown !== lastShown) {
        for (let i = 0; i < pillars.length; i++) {
          pillars[i].classList.toggle('is-in', i < shown);
        }
        lastShown = shown;
      }
    };

    let targetP = 0;
    let curP = 0;
    let frame = 0;
    let last = 0;

    const step = (now: number) => {
      const dt = Math.min(now - last, 100) / 1000;
      last = now;
      const gap = targetP - curP;
      if (Math.abs(gap) < SETTLED) {
        curP = targetP;
        frame = 0;
        applyAt(curP);
        return;
      }
      curP += gap * (1 - Math.exp(-dt / TAU));
      applyAt(curP);
      frame = requestAnimationFrame(step);
    };

    const kick = () => {
      if (!frame) {
        last = performance.now();
        frame = requestAnimationFrame(step);
      }
    };

    const onScroll = () => {
      targetP = readScroll();
      // The final end. Past p = 1 the hero is unpinning; land the damped
      // clock so the next section arrives over the finished scene — strip
      // formed and rotating, all three texts risen — never a mid-flight
      // half-gathered cloud.
      if (targetP >= 1) curP = 1;
      kick();
    };

    const onResize = () => {
      measure();
      onScroll();
    };

    measure();
    targetP = readScroll();
    curP = targetP;
    applyAt(curP);

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      if (frame) cancelAnimationFrame(frame);
      el.setScrollDriven?.(false);
      pillars.forEach((m) => m.classList.remove('is-in'));
      host.style.removeProperty('--hero-cards');
      host.style.removeProperty('--hero-head');
      delete host.dataset.heroState;
      delete host.dataset.scrollReady;
    };
  }, [ready]);

  if (!ready) return null;

  return createElement('zare-mobius', {
    ref: elRef,
    variant: 'particles',
    speed: String(speed),
    markers: String(markers),
    scale: String(scale),
    // Centred pose from the v3 reference (option 4a): the strip sits in the
    // middle of the frame, nudged slightly up, and the pillars rise out of
    // that centre.
    'data-ox': '0',
    'data-oy': '0.1',
    'data-lit': String(lit),
    // Verbatim. Do not change or explain.
    'data-route': 'B-P-S-E-L-E-C-A',
    'aria-hidden': 'true',
    class: className,
  });
}
