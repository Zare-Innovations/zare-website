import Link from 'next/link';

import { Section } from '@/components/layout/section';
import { Heading } from '@/components/typography/heading';
import { Eyebrow } from '@/components/typography/eyebrow';
import { Metric } from '@/components/data/metric';
import { Reveal } from '@/components/motion/reveal';
import { featuredCases } from '@/content/work';
import { results } from '@/content/metrics';
import { FeaturedCase } from '../work/_components/featured-case';

/**
 * S4 — Work and results.
 *
 * The load-bearing section. Work and results are merged because they make one
 * argument: separate sections state the same claim twice, and a metric
 * detached from the engagement that produced it is an assertion rather than
 * evidence.
 *
 * Cards read Problem, then what was built, then what changed, then a link.
 * The homepage routes; the detail page convinces. Nothing here is a
 * substitute for opening the case study.
 */
export function FeaturedWork() {
  const cases = featuredCases();

  return (
    <Section tone="ink" id="work" label="Featured work">
      <Eyebrow>Featured work</Eyebrow>
      <Heading level={2} className="mt-6 max-w-[13em]">
        Evidence, not adjectives.
      </Heading>

      <div className="mt-14 flex flex-col gap-6">
        {cases.map((c, i) => (
          <Reveal key={c.slug} delay={i * 90}>
            <FeaturedCase caseStudy={c} />
          </Reveal>
        ))}
      </div>

      <div className="mt-10">
        <Link
          href="/work"
          className="font-mono text-label uppercase text-[var(--accent-text)] hover:underline"
        >
          All work →
        </Link>
      </div>

      {/* Results band. Closes the section rather than forming its own, so the
          numbers sit next to the engagements that produced them. */}
      <div className="mt-20 border-t border-[var(--rule-color)] pt-14">
        <Eyebrow>Results</Eyebrow>
        <div className="mt-10 grid gap-x-16 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {results.map((r, i) => (
            <Reveal key={r.label} delay={i * 70}>
              <Metric
                value={r.value}
                label={r.label}
                verified={r.verified}
                note={r.note}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
