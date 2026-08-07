import Link from 'next/link';

import { Container } from '@/components/layout/container';
import { MonoLabel } from '@/components/typography/mono-label';
import { servicePaths } from '@/content/services';
import { MobiusCanvas } from '@/components/three/mobius-canvas';

// Imported directly rather than through next/dynamic. MobiusCanvas is a client
// component that renders null until Three.js has loaded inside an effect, so it
// contributes nothing to the server render and Three never enters the initial
// bundle. `dynamic(..., { ssr: false })` is additionally not allowed from a
// Server Component in Next 16.

/**
 * S1 — Hero.
 *
 * Built last, on purpose. Everything below it had to be convincing first.
 *
 * Two rules govern this section:
 *
 * 1. The copy NEVER waits for the animation. It is server-rendered at full
 *    opacity over a static gradient. If Three.js fails to load, WebGL is
 *    unavailable, or the visitor prefers reduced motion, the hero is
 *    unchanged apart from a still background.
 *
 * 2. The two paths are the primary interactive element, not a button pair
 *    below the fold. Self-identification into one of two funnels is the most
 *    important interaction on the site, and a generic "Get started" duplicates
 *    a decision the visitor has to make anyway.
 */
export function Hero() {
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
        <MobiusCanvas />
      </div>

      {/* Readability haze. Keeps the headline legible over the brightest part
          of the particle formation without dimming the whole canvas. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[2]"
        style={{
          backgroundImage:
            'radial-gradient(46% 34% at 50% 52%, rgba(3,16,25,.55), rgba(3,16,25,0) 70%)',
        }}
      />

      {/* Top padding is fluid against VIEWPORT HEIGHT, not width.
          The problem it solves is specifically short viewports: a 1366x768
          screen has roughly 630px of inner height once browser chrome is
          subtracted, and the hero stack measured about 725px, which pushed
          the two path cards below the fold. Those cards are the hero's entire
          purpose, so losing them undoes the decision to use them instead of a
          generic button pair.

          clamp(104px, 13vh, 168px) keeps 104px of clearance under the 96px
          header on short screens and opens back up to 168px on tall ones, so
          the hero is not shortened everywhere to fix a laptop. No new
          breakpoint: the query is the viewport itself. */}
      <Container className="relative z-[3] flex flex-1 flex-col pb-12 pt-[clamp(104px,13vh,168px)]">
        <div className="flex flex-1 flex-col items-center justify-center gap-5 text-center">
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

        {/* The two paths ARE the call to action, so they must stay above the
            fold on a laptop. See the padding note above. */}
        <div className="mt-8 flex flex-col items-center gap-5">
          <div className="grid w-full gap-4 sm:grid-cols-2 lg:max-w-4xl">
            {servicePaths.map((path) => (
              <Link
                key={path.id}
                href={path.cta.href}
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
