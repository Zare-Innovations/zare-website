import Link from 'next/link';

import { Section } from '@/components/layout/section';
import { Heading } from '@/components/typography/heading';
import { Eyebrow } from '@/components/typography/eyebrow';
import { MonoLabel } from '@/components/typography/mono-label';
import { Reveal } from '@/components/motion/reveal';
import { servicePaths, type ServicePath, type SubPath } from '@/content/services';

function CapabilityList({ items }: { items: readonly string[] }) {
  return (
    <ul className="flex flex-col gap-2.5 font-mono text-caption">
      {items.map((item) => (
        <li key={item} className="flex items-baseline gap-3">
          <span aria-hidden="true" className="text-[var(--accent-text)]">
            /
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function SubPathPanel({ sub }: { sub: SubPath }) {
  return (
    <article className="flex flex-col gap-4 border border-[var(--rule-color)] bg-surface-paper p-7">
      <MonoLabel className="text-[var(--accent-text)]">{sub.tag}</MonoLabel>
      <Heading level={3} size="display-3">
        {sub.title}
      </Heading>
      <p className="text-body-sm text-[var(--muted-color)]">{sub.description}</p>
      <div className="mt-auto pt-3">
        <CapabilityList items={sub.capabilities} />
      </div>
    </article>
  );
}

function PathSection({ path, tone }: { path: ServicePath; tone: 'deep' | 'mist' }) {
  return (
    <Section tone={tone} id={path.id} label={path.name}>
      <div className="flex flex-col gap-10">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          <div className="flex flex-col items-start gap-6">
            <Eyebrow>
              {path.index} · {path.name}
            </Eyebrow>

            {/* h2: these are top-level page sections. The sub-paths below are
                h3. Keeping the outline flat here is what stops h1 -> h3. */}
            <Heading level={2} size="display-2" className="max-w-[14em]">
              {path.headline}
            </Heading>

            {/* Definition first. Without it, "embedded" is read as embedded
                systems, or as staff augmentation. Both are the wrong frame. */}
            {path.definition ? (
              <p className="max-w-[36em] border-l-2 border-accent pl-5 text-body">
                {path.definition}
              </p>
            ) : null}

            <p className="max-w-[36em] text-body text-[var(--muted-color)]">
              {path.description}
            </p>

            <Link
              href={path.cta.href}
              className="mt-2 inline-flex h-12 items-center rounded-md bg-accent px-7 text-[14.5px] font-bold text-accent-contrast no-underline transition-colors hover:bg-accent-bright"
            >
              {path.cta.label}
            </Link>
          </div>

          <div className="flex flex-col gap-8">
            {path.capabilities ? (
              <CapabilityList items={path.capabilities} />
            ) : null}

            {/* Commercial de-risking at display weight, not as bullets.
                These three answer the top objections to embedded teams. */}
            {path.highlights ? (
              <ul className="flex flex-col gap-4 border-t border-[var(--rule-color)] pt-7">
                {path.highlights.map((h) => (
                  <li
                    key={h}
                    className="font-display text-heading text-[var(--heading-color)]"
                  >
                    {h}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>

        {path.subPaths ? (
          <div className="grid gap-5 md:grid-cols-2">
            {path.subPaths.map((sub, i) => (
              <Reveal key={sub.tag} delay={i * 90}>
                <SubPathPanel sub={sub} />
              </Reveal>
            ))}
          </div>
        ) : null}
      </div>
    </Section>
  );
}

/**
 * S3 — The two paths.
 *
 * The IA spine. Every visitor routes into one of these. The two panels carry
 * strictly equal visual weight: the moment one reads as the main offering,
 * half the audience concludes the site is not for them.
 */
export function TwoPaths() {
  return (
    <>
      <PathSection path={servicePaths[0]} tone="deep" />
      <PathSection path={servicePaths[1]} tone="mist" />
    </>
  );
}
