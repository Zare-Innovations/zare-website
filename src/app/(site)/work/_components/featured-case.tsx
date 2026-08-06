import Link from 'next/link';

import { type CaseStudy, clientName } from '@/content/work';
import { Heading } from '@/components/typography/heading';
import { MonoLabel } from '@/components/typography/mono-label';
import { panelSurface, linkSurface } from '@/components/content/surface';

/**
 * A featured case on the index.
 *
 * The hierarchy is fixed and deliberate: WHO it was for, WHAT was wrong, WHAT
 * was built, WHAT changed. A visitor scanning for three seconds should be able
 * to read down the left edge and get all four.
 *
 * This is a proof index, not a gallery. There is no image, because a screenshot
 * answers none of those four questions and turns the page into a portfolio.
 */
export function FeaturedCase({ caseStudy }: { caseStudy: CaseStudy }) {
  const problem =
    caseStudy.kind === 'system' ? caseStudy.problem : caseStudy.situation;

  const built =
    caseStudy.kind === 'system'
      ? caseStudy.system[0]?.component
      : caseStudy.podShape;

  const headline = caseStudy.outcomes[0];

  return (
    <article className={`${panelSurface} ${linkSurface} group`}>
      <Link
        href={`/work/${caseStudy.slug}`}
        className="grid gap-8 p-8 no-underline md:grid-cols-[1fr_auto] md:gap-16 md:p-12"
      >
        <div className="flex flex-col gap-7">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <MonoLabel className="text-[var(--accent-text)]">
              {clientName(caseStudy.client)}
            </MonoLabel>
            <MonoLabel muted size="caption">
              {caseStudy.industry} · {caseStudy.location}
              {caseStudy.duration ? ` · ${caseStudy.duration}` : ''}
            </MonoLabel>
          </div>

          <Heading level={3} size="display-3">
            {caseStudy.summary}
          </Heading>

          <dl className="flex flex-col gap-5 border-t border-[var(--rule-color)] pt-6">
            <div className="grid gap-1.5 md:grid-cols-[130px_1fr] md:gap-6">
              <dt>
                <MonoLabel muted>Problem</MonoLabel>
              </dt>
              <dd className="text-body-sm text-[var(--muted-color)]">
                {problem}
              </dd>
            </div>
            {built ? (
              <div className="grid gap-1.5 md:grid-cols-[130px_1fr] md:gap-6">
                <dt>
                  <MonoLabel muted>
                    {caseStudy.kind === 'system' ? 'System' : 'Team'}
                  </MonoLabel>
                </dt>
                <dd className="text-body-sm">{built}</dd>
              </div>
            ) : null}
          </dl>

          <span className="font-mono text-label uppercase text-[var(--accent-text)] group-hover:underline">
            Read the case study →
          </span>
        </div>

        {headline ? (
          <div className="flex flex-col justify-start border-t border-[var(--rule-color)] pt-7 md:min-w-[220px] md:border-l md:border-t-0 md:pl-12 md:pt-0">
            <MonoLabel muted>Outcome</MonoLabel>
            <span className="mt-3 block font-mono text-metric tabular-nums text-[var(--heading-color)]">
              {headline.value}
            </span>
            <span className="mt-2 font-mono text-label uppercase text-[var(--accent-text)]">
              {headline.metric}
            </span>
            <p className="mt-3 text-caption text-[var(--muted-color)]">
              {headline.context}
            </p>
          </div>
        ) : null}
      </Link>
    </article>
  );
}
