import type { Metadata } from 'next';

import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Section } from '@/components/layout/section';
import { Heading } from '@/components/typography/heading';
import { MonoLabel } from '@/components/typography/mono-label';
import { TrustStrip } from '../_sections/trust-strip';
import { TwoPaths } from '../_sections/two-paths';
import { FeaturedWork } from '../_sections/featured-work';
import { HowWeDeliver } from '../_sections/how-we-deliver';
import { WorkingModel } from '../_sections/working-model';

/**
 * The homepage under construction.
 *
 * Lives at /home-preview rather than / because `(marketing)/page.tsx` already
 * resolves to /, and two pages cannot claim the same path. At launch cutover
 * this file moves to `(site)/page.tsx`, the marketing group is retired, and
 * the noindex comes off.
 *
 * M3 scope is S2 to S5 only. There is deliberately no hero: the page has to be
 * convincing before the signature moment exists, and building the hero first
 * would let a weak argument hide behind an animation.
 */
export const metadata: Metadata = {
  title: 'Homepage preview (internal)',
  robots: { index: false, follow: false, nocache: true },
};

export default function HomePreviewPage() {
  return (
    <>
      <Header />

      <main id="main" className="pt-[76px] md:pt-24">
        {/* Placeholder for S1. Marks the gap rather than filling it, so the
            sections below are judged on their own. Removed with M2. */}
        <Section tone="navy" label="Hero placeholder" compact>
          <MonoLabel className="text-[var(--accent-text)]">
            Internal preview · S1 hero not built
          </MonoLabel>
          <Heading level={1} size="display-3" className="mt-4 max-w-[24em]">
            Sections S2 to S5. The hero is built last, on purpose.
          </Heading>
          <p className="mt-3 max-w-[38em] text-body-sm text-on-dark-muted">
            If the argument below only works once an animation sits on top of
            it, the argument is not finished.
          </p>
        </Section>

        <TrustStrip />
        <TwoPaths />
        <FeaturedWork />
        <HowWeDeliver />
        <WorkingModel />
      </main>

      <Footer />
    </>
  );
}
