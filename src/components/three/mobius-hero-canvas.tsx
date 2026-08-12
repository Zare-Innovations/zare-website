'use client';

import { createElement, useEffect, useRef, useState } from 'react';

/** Element API exposed by mobius.js once the custom element is defined. */
type MobiusElement = HTMLElement & {
  setFormProgress?: (p: number) => void;
  setScrollDriven?: (on: boolean) => void;
};

/* ------------------------------------------------------------------
   The states, as fractions of the hero's scroll range.

     0  0.00 .. 0.06   streaming rest field, hero copy at rest
     1  0.06 .. 0.32   the stream sweeps right and over the top; copy
                       travels out of frame
     2  0.32 .. 0.52   the stream pours down and WRITES the Möbius strip
                       around its loop; the loop light rides the edge
     3  0.52 .. 0.58   the write closes its seam; the strip completes
     4  0.58 .. 0.62   it holds — wobble, markers and rotation ease in
     5  0.62 .. 0.94   the pillar texts POP UP at the strip's centre, one
                       scroll window each, each replacing the previous
        1.00           unpin — the strip keeps rotating and the last text
                       holds as the next section arrives; no dispersal
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
 * Wrapper around the `<zare-mobius-write>` web component and the scroll
 * sequence that drives it. Same choreography contract as MarkCanvas —
 * damped clock, cards/head exit variables, state publishing — driving the
 * hybrid element: the mark hero's particle field and scroll-flow writing
 * the v3 Möbius strip (see mobius-write.js). The pillars are plain text
 * popping up at the strip's centre.
 *
 * The sequence is scroll-driven on EVERY pointer type — the element's
 * timed formation never plays when this wrapper is in charge. Momentum
 * scrolling is absorbed by the damped clock below, and mobile URL-bar
 * height changes re-measure on resize. Reduced motion skips the Three
 * download entirely and keeps the static gradient.
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
        await import('./mobius-write.js');
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
    // No pointer gate: every device gets the scroll sequence. The timed
    // auto-formation inside the element remains only as a safety net for
    // the case where this effect never runs.

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

      // Pillar texts pop up at the strip's centre, mid-window, each
      // replacing the previous — only the LATEST latched pillar is shown;
      // the pop itself is a CSS transition. Reversible: scrolling back
      // hands the centre back to the earlier pillar, then to none. There
      // is deliberately no release at the end: strip and the last text
      // hold their state and the next section simply scrolls over them.
      const rises = RISE.map(([a, b]) => span(p, a, b));
      let shown = 0;
      while (shown < RISE.length && rises[shown] > 0.45) shown++;
      if (shown !== lastShown) {
        for (let i = 0; i < pillars.length; i++) {
          pillars[i].classList.toggle('is-in', i === shown - 1);
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

  return createElement('zare-mobius-write', {
    ref: elRef,
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
