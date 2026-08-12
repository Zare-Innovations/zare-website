'use client';

import { createElement, useEffect, useRef, useState } from 'react';

/** Element API exposed by globe-write.js once the custom element is defined. */
type GlobeElement = HTMLElement & {
  setFormProgress?: (p: number) => void;
  setReveal?: (r: number) => void;
  setScrollDriven?: (on: boolean) => void;
};

/* ------------------------------------------------------------------
   The states, as fractions of the hero's scroll range.

     0  0.00 .. 0.06   streaming rest field, hero copy at rest
     1  0.06 .. 0.32   the stream sweeps right and over the top; copy
                       travels out of frame
     2  0.32 .. 0.52   the stream pours down and WRITES a particle
                       sphere, meridian by meridian, left of centre
     3  0.52 .. 0.58   the sphere completes — still pure particles
     4  0.58 .. 0.72   THE REVEAL: the real globe (fine dots, core,
                       coastlines, Ethiopia, markers, arcs) fades in as
                       the particle shell lifts off into an orbiting
                       halo around it; the descriptive block slides in
                       on the right IN THE SAME WINDOW
     5  0.72 .. 1.00   interactive dwell — spinning, draggable, flights
                       moving, Addis label on hover
        1.00           unpin — globe, halo and copy hold as the next
                       section arrives; no dispersal
   ------------------------------------------------------------------ */

const FORM_FROM = 0.06;
const FORM_TO = 0.58;

const CARDS_FROM = 0.06;
const CARDS_TO = 0.22;
const HEAD_FROM = 0.12;
const HEAD_TO = 0.3;

/** The reveal window: real globe in, particle halo out — and the
 *  descriptive block latches inside the SAME window (past 0.4 of it). */
const REVEAL: readonly [number, number] = [0.6, 0.72];

/** Upper bound of each state, used only to publish `data-hero-state`. */
const STATE_END = [0.06, 0.32, 0.52, 0.66, 0.74, 1];

const TAU = 0.16;
const SETTLED = 0.0002;

const clamp01 = (n: number) => (n < 0 ? 0 : n > 1 ? 1 : n);
const span = (v: number, from: number, to: number) =>
  clamp01((v - from) / (to - from));

/**
 * Wrapper around the `<zare-globe-write>` web component and the scroll
 * sequence that drives it. Same choreography contract as the other hero
 * canvases — damped clock, cards/head exit variables, state publishing —
 * driving the globe hybrid: the mark hero's particle field writing the v3
 * dotted Earth (see globe-write.js). The descriptive block and its CTAs
 * are real DOM in hero-globe.tsx; this wrapper only latches them in.
 *
 * The sequence is scroll-driven on EVERY pointer type. Reduced motion
 * skips the Three download entirely and keeps the static gradient.
 */
export function GlobeHeroCanvas({
  speed = 1.4,
  scale = 1.5,
  className,
}: {
  speed?: number;
  scale?: number;
  className?: string;
}) {
  const [ready, setReady] = useState(false);
  const [lit, setLit] = useState(false);
  const elRef = useRef<GlobeElement | null>(null);

  useEffect(() => {
    let cancelled = false;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    (async () => {
      try {
        const THREE = await import('three');
        if (cancelled) return;
        (window as unknown as { THREE: unknown }).THREE = THREE;
        await import('./globe-write.js');
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
    // No pointer gate: every device gets the scroll sequence.

    const host = el.closest<HTMLElement>('[data-hero-scroll]');
    if (!host) return;

    const desc = host.querySelector<HTMLElement>('[data-hero-desc]');

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
    let lastIn = false;

    const applyAt = (p: number) => {
      el.setFormProgress?.(span(p, FORM_FROM, FORM_TO));

      host.style.setProperty('--hero-cards', String(span(p, CARDS_FROM, CARDS_TO)));
      host.style.setProperty('--hero-head', String(span(p, HEAD_FROM, HEAD_TO)));

      const state = STATE_END.findIndex((end) => p <= end);
      if (state !== lastState) {
        lastState = state;
        host.dataset.heroState = String(state < 0 ? STATE_END.length - 1 : state);
      }

      // The reveal rides its own window past the formation, and the
      // descriptive block latches inside the same window, so the copy
      // arrives WITH the globe. Both hold to the unpin and reverse.
      const rev = span(p, REVEAL[0], REVEAL[1]);
      el.setReveal?.(rev);
      const on = rev > 0.4;
      if (on !== lastIn) {
        desc?.classList.toggle('is-in', on);
        lastIn = on;
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
      // Land the damped clock at the unpin (see mark-canvas.tsx).
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
      el.setReveal?.(0);
      desc?.classList.remove('is-in');
      host.style.removeProperty('--hero-cards');
      host.style.removeProperty('--hero-head');
      delete host.dataset.heroState;
      delete host.dataset.scrollReady;
    };
  }, [ready]);

  if (!ready) return null;

  return createElement('zare-globe-write', {
    ref: elRef,
    speed: String(speed),
    scale: String(scale),
    'data-lit': String(lit),
    'aria-hidden': 'true',
    class: className,
  });
}
