'use client';

import { createElement, useEffect, useState } from 'react';

/**
 * Wrapper around the `<zare-mobius>` web component.
 *
 * The component itself is ported verbatim from
 * docs/zare-website-v3/design_handoff_particle_mobius_hero/mobius.js and is
 * deliberately NOT rewritten in React Three Fiber. It already does everything
 * a rewrite would have to redo: one draw call for 14,000 particles, all motion
 * in the vertex shader driven by a single uniform, IntersectionObserver lazy
 * init, tab-visibility pause, reduced-motion static render, and a WebGL-failure
 * fallback. A port would cost two days and produce slower code.
 *
 * Three.js is imported dynamically here so it never enters the initial bundle.
 * The web component polls for `window.THREE`, so assigning it asynchronously is
 * part of its contract rather than a workaround.
 */
export function MobiusCanvas({
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

  useEffect(() => {
    let cancelled = false;

    // Skip the whole download under reduced motion. The static gradient below
    // the canvas is the intended experience there, so there is nothing to load.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    (async () => {
      try {
        const THREE = await import('three');
        if (cancelled) return;
        (window as unknown as { THREE: unknown }).THREE = THREE;
        await import('./mobius.js');
        if (!cancelled) setReady(true);
      } catch {
        // Leaves the static gradient in place. The hero copy is unaffected.
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  if (!ready) return null;

  // createElement rather than JSX, so a custom element does not require
  // augmenting the global JSX namespace for one component.
  return createElement('zare-mobius', {
    variant: 'particles',
    speed: String(speed),
    markers: String(markers),
    scale: String(scale),
    // Verbatim. Do not change or explain.
    'data-route': 'B-P-S-E-L-E-C-A',
    'aria-hidden': 'true',
    class: className,
  });
}
