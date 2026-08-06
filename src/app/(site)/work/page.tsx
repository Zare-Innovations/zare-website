import type { Metadata } from 'next';

import { Section } from '@/components/layout/section';
import { Heading } from '@/components/typography/heading';
import { Eyebrow } from '@/components/typography/eyebrow';
import { MonoLabel } from '@/components/typography/mono-label';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Reveal } from '@/components/motion/reveal';
import { featuredCases, workReferences } from '@/content/work';
import { FeaturedCase } from './_components/featured-case';

// noindex until launch cutover. /our-work is live, indexed, and remains
// canonical until /work replaces it. Shipping both as indexable would split
// the same content across two URLs for the duration of the rebuild.
export const metadata: Metadata = {
  title: 'Our Work',
  robots: { index: false, follow: false },
};

export default function WorkPage() {
  const featured = featuredCases();

  return (
    <>
      <Header />

      <main id="main" className="pt-[76px] md:pt-24">
        <Section tone="ink" label="Engineering work">
          <Eyebrow>Our work</Eyebrow>
          <Heading level={1} size="display-1" className="mt-6 max-w-[15em]">
            Systems we built, and teams that stayed.
          </Heading>
          <p className="mt-6 max-w-[36em] text-body text-on-dark-muted">
            Each of these is a real engagement with a named client. Where a
            figure is not yet verified or a client has not cleared publication,
            we say so rather than rounding it into a claim.
          </p>
        </Section>

        <Section tone="paper" label="Featured work">
          {/* The cases below are h3. Without this the outline skips h1 -> h3.
              Kept visually hidden because the hero already frames the section
              and a second visible headline here would compete with the cards. */}
          <Heading level={2} size="heading" className="sr-only">
            Featured work
          </Heading>
          <div className="flex flex-col gap-6">
            {featured.map((c, i) => (
              <Reveal key={c.slug} delay={i * 90}>
                <FeaturedCase caseStudy={c} />
              </Reveal>
            ))}
          </div>
        </Section>

        <Section tone="mist" label="Other delivered work">
          <Eyebrow>Also delivered</Eyebrow>
          <Heading level={2} size="display-3" className="mt-5 max-w-[20em]">
            Recorded, not narrated.
          </Heading>
          <p className="mt-4 max-w-[38em] text-body-sm text-[var(--muted-color)]">
            These engagements are real but are not written up as case studies. A
            case study page with no engineering reasoning behind it would weaken
            the ones that have it.
          </p>

          <ul className="mt-12 flex flex-col border-t border-[var(--rule-color)]">
            {workReferences.map((ref) => (
              <li
                key={`${ref.client}-${ref.title}`}
                className="grid gap-2 border-b border-[var(--rule-color)] py-6 md:grid-cols-[220px_1fr] md:gap-10"
              >
                <div className="flex flex-col gap-1">
                  <MonoLabel className="text-[var(--accent-text)]">
                    {ref.client}
                  </MonoLabel>
                  <MonoLabel muted size="caption">
                    {ref.industry} · {ref.location}
                  </MonoLabel>
                </div>
                <div>
                  <h3 className="font-display text-heading text-[var(--heading-color)]">
                    {ref.title}
                  </h3>
                  <p className="mt-1.5 text-body-sm text-[var(--muted-color)]">
                    {ref.note}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </Section>
      </main>

      <Footer />
    </>
  );
}
