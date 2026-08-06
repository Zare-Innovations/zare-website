'use client';

import { useEffect } from 'react';

/**
 * Enables reveal animations, and drives every `<Reveal>` on the page from a
 * single IntersectionObserver.
 *
 * Two responsibilities, deliberately combined so there is exactly one observer
 * per page rather than one per revealed element:
 *
 * 1. Add `anim` to <html>, but only when the reveal is guaranteed to run.
 *    Hidden initial states live behind `html.anim` in globals.css, so without
 *    this class every element is visible at rest. That is what keeps content
 *    from vanishing in prerendered snapshots, with JS disabled, or in a
 *    background tab where IntersectionObserver never fires.
 *
 * 2. Observe `[data-reveal]` and add `is-in` as each enters the viewport.
 *
 * Rendered once, in the site layout.
 */
export function AnimGate() {
  useEffect(() => {
    const root = document.documentElement;

    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    // No observer support, reduced motion, or a document that is not visible:
    // leave `anim` off entirely so everything renders in its final state.
    if (prefersReduced || typeof IntersectionObserver === 'undefined') {
      return;
    }

    let observer: IntersectionObserver | null = null;

    const start = () => {
      if (observer) return;
      root.classList.add('anim');

      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            entry.target.classList.add('is-in');
            // Reveals run once. Stop observing immediately so scrolling back
            // up does not re-trigger, and so the observer sheds work.
            observer?.unobserve(entry.target);
          }
        },
        { rootMargin: '0px 0px -12% 0px', threshold: 0.15 },
      );

      document
        .querySelectorAll('[data-reveal]')
        .forEach((el) => observer?.observe(el));
    };

    if (document.visibilityState === 'visible') {
      start();
    } else {
      document.addEventListener('visibilitychange', start, { once: true });
    }

    // Failsafe. If anything above fails to run, reveal everything after 3s
    // rather than leaving the page blank.
    const failsafe = window.setTimeout(() => {
      root.classList.add('anim');
      document
        .querySelectorAll('[data-reveal]:not(.is-in)')
        .forEach((el) => el.classList.add('is-in'));
    }, 3000);

    return () => {
      window.clearTimeout(failsafe);
      document.removeEventListener('visibilitychange', start);
      observer?.disconnect();
    };
  }, []);

  return null;
}
