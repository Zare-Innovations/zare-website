import type { CSSProperties } from 'react';
import Link from 'next/link';

import { Container } from '@/components/layout/container';
import { MonoLabel } from '@/components/typography/mono-label';
import { servicePaths } from '@/content/services';
import { GlobeHeroCanvas } from '@/components/three/globe-hero-canvas';

// Imported directly rather than through next/dynamic — see hero.tsx.

/**
 * S1 — Hero, globe variant.
 *
 * Same six-state scroll contract as the mark hero (see hero.tsx — swap the
 * import in page.tsx to switch versions). The mark hero's particle field
 * and scroll-flow WRITE a particle sphere, meridian by meridian, left of
 * centre — then the REAL v3 dotted Earth is revealed from inside it while
 * the particles lift off into an orbiting halo around it: the atmosphere
 * glow is particles, the globe underneath stays clean (globe-write.js).
 * The revealed globe is fully interactive — it spins, fine pointers can
 * drag it, Addis Ababa raises a label on hover, the served-country
 * markers pulse and delivery arcs carry flight lights — and a descriptive
 * block with real, clickable CTAs arrives on the right IN THE SAME WINDOW
 * as the reveal.
 *
 *   0  today's hero exactly: eyebrow, headline, two lines, both path cards
 *   1  the rest field sweeps right and over the top while the cards travel
 *      out of frame in X
 *   2  the stream pours down and writes the particle sphere
 *   3  the sphere completes — still pure particles
 *   4  the reveal — the real globe fades in, the shell becomes the halo,
 *      and the descriptive block slides in on the right
 *   5  interactive dwell: spin, drag, flights, hover label
 *   6  the unpin — globe, halo and copy hold their state; the next
 *      section arrives over the finished scene, no dispersal
 *
 * The three rules from hero.tsx govern this section unchanged. The
 * descriptive block is real content (NOT aria-hidden): its CTAs must be
 * focusable and clickable. It is visibility-hidden until latched, so it
 * never pollutes the tab order while the state-0 copy is up.
 */
export function HeroGlobe() {
  return (
    <div data-hero-scroll>
      <section
        data-tone="ink"
        aria-label="Zare Innovations"
        className="relative flex min-h-[100svh] flex-col overflow-hidden bg-surface-ink text-on-dark [[data-scroll-ready]_&]:sticky [[data-scroll-ready]_&]:top-0 [[data-scroll-ready]_&]:h-[100svh]"
        style={{
          // Static, server-rendered. This is the reduced-motion and no-WebGL
          // experience in full, not a placeholder for one.
          backgroundImage:
            'radial-gradient(120% 130% at 50% 38%, #0a2c40 0%, #051c2b 52%, #020f18 100%)',
        }}
      >
        <div className="pointer-events-none absolute inset-0 z-[1]">
          <GlobeHeroCanvas />
        </div>

        {/* Readability haze, nudged toward the globe's side of the frame. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[2]"
          style={{
            backgroundImage:
              'radial-gradient(46% 34% at 40% 50%, rgba(3,16,25,.5), rgba(3,16,25,0) 70%)',
          }}
        />

        {/* State 4. The descriptive block, right of the globe — REAL
            content with clickable CTAs, so no aria-hidden. Position and
            entrance in globals.css; it latches in the reveal window. */}
        <div className="pointer-events-none absolute inset-0 z-[3]">
          <div
            data-hero-desc
            className="pointer-events-auto absolute flex flex-col items-start gap-4"
          >
            <MonoLabel className="text-accent-bright">Global delivery</MonoLabel>
            <h2
              className="font-display font-semibold text-on-dark-strong"
              style={{
                fontSize: 'clamp(26px, 3vw, 44px)',
                lineHeight: 1.12,
                letterSpacing: '-0.01em',
                textShadow: '0 2px 26px rgba(2,15,24,.85)',
              }}
            >
              Rooted in Ethiopia. Connected to the world.
            </h2>
            <p
              className="text-body text-on-dark"
              style={{
                maxWidth: '30ch',
                textShadow: '0 1px 18px rgba(2,15,24,.8)',
              }}
            >
              Delivery from Addis Ababa to teams across multiple markets —
              senior engineers, working your day.
            </p>
            <div className="mt-2 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex h-12 items-center rounded-md px-7 font-semibold no-underline transition-opacity hover:opacity-85"
                style={{ background: '#40c1c7', color: '#03141d' }}
              >
                Start a project
              </Link>
              <Link
                href="/work"
                className="inline-flex h-12 items-center rounded-md border px-6 font-semibold no-underline backdrop-blur-[3px] transition-colors hover:border-accent"
                style={{
                  borderColor: 'rgba(64,193,199,.45)',
                  color: '#cfeef0',
                }}
              >
                Explore our work →
              </Link>
            </div>
          </div>
        </div>

        {/* Top padding is fluid against VIEWPORT HEIGHT, not width — see
            hero.tsx for the full rationale. */}
        <Container className="relative z-[4] flex flex-1 flex-col pb-12 pt-[clamp(104px,13vh,168px)]">
          <div
            data-hero-head
            className="flex flex-1 flex-col items-center justify-center gap-5 text-center"
          >
            <MonoLabel className="text-accent-bright">
              ዛሬ · Zare means today
            </MonoLabel>

            <h1
              className="max-w-[15em] font-display text-display-1 text-on-dark-strong"
              style={{ textShadow: '0 2px 30px rgba(2,15,24,.8)' }}
            >
              The next leap starts here.
            </h1>

            <p
              className="max-w-[34em] text-body text-on-dark"
              style={{ textShadow: '0 1px 18px rgba(2,15,24,.8)' }}
            >
              Senior engineers, embedded in your team, under US contracts, from
              our Addis Ababa engineering centre.
            </p>

            <p className="max-w-[30em] text-body-sm text-on-dark-muted">
              Engineers who stay with your product, not rotate through your
              account.
            </p>
          </div>

          {/* State 1. The cards part outward in X and clear the frame —
              see hero.tsx for the rationale. */}
          <div data-hero-cards className="mt-8 flex flex-col items-center gap-5">
            <div className="grid w-full gap-4 sm:grid-cols-2 lg:max-w-4xl">
              {servicePaths.map((path, i) => (
                <Link
                  key={path.id}
                  href={path.cta.href}
                  data-hero-card
                  style={{ '--dir': i === 0 ? -1 : 1 } as CSSProperties}
                  className="group flex flex-col gap-2 rounded-lg border border-rule-dark bg-[rgba(4,22,33,.6)] p-6 text-left no-underline backdrop-blur-[6px] transition-colors hover:border-accent hover:bg-[rgba(4,26,38,.72)]"
                >
                  <span className="flex items-center justify-between gap-4">
                    <span className="font-display text-body font-semibold text-on-dark-strong">
                      {path.name}
                    </span>
                    <span
                      aria-hidden="true"
                      className="text-accent transition-transform group-hover:translate-x-1.5"
                    >
                      →
                    </span>
                  </span>
                  <span className="text-body-sm text-on-dark-muted">
                    {path.headline}
                  </span>
                  {path.subPaths ? (
                    <span className="mt-2 flex flex-wrap gap-2">
                      {path.subPaths.map((sub) => (
                        <span
                          key={sub.tag}
                          className="border border-rule-dark px-2 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-accent-bright"
                        >
                          {sub.tag.split('·')[1]?.trim() ?? sub.tag}
                        </span>
                      ))}
                    </span>
                  ) : null}
                </Link>
              ))}
            </div>

            <Link
              href="/work"
              className="font-mono text-label uppercase text-on-dark-muted no-underline transition-colors hover:text-accent"
            >
              Explore our work →
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}
