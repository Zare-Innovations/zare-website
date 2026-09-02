import Link from 'next/link';
import {
  IconTerminal2,
  IconHeadset,
  IconReceipt2,
  IconShieldCheck,
  IconLock,
} from '@tabler/icons-react';

import { Section } from '@/components/layout/section';
import { Heading } from '@/components/typography/heading';
import { Eyebrow } from '@/components/typography/eyebrow';
import { MonoLabel } from '@/components/typography/mono-label';
import { Reveal } from '@/components/motion/reveal';
import {
  servicePaths,
  type ComparisonRow,
  type ServicePath,
  type SubPath,
} from '@/content/services';

function CapabilityList({ items }: { items: readonly string[] }) {
  return (
    // body-sm, not caption: these lists are scanned as content (the
    // technical buyer's scope check), not read as annotations.
    <ul className="flex flex-col gap-3 font-mono text-body-sm">
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

/** Categorical marks for the two embedded sub-paths — tech vs operations. */
const SUBPATH_ICONS = {
  A: IconTerminal2,
  B: IconHeadset,
} as const;

/** The three commercial de-risking highlights, in data order: invoice,
 *  trial, dedication. Update alongside services.ts `highlights`. */
const HIGHLIGHT_ICONS = [IconReceipt2, IconShieldCheck, IconLock] as const;

function SubPathPanel({ sub }: { sub: SubPath }) {
  const TagIcon = SUBPATH_ICONS[sub.tag.charAt(0) as keyof typeof SUBPATH_ICONS];
  return (
    <article className="flex flex-col gap-4 border border-[var(--rule-color)] bg-surface-paper p-7">
      <span className="flex items-center gap-3">
        {TagIcon ? (
          <TagIcon
            size={22}
            stroke={1.9}
            aria-hidden="true"
            className="shrink-0 text-[var(--accent-text)]"
          />
        ) : null}
        <MonoLabel className="text-[var(--accent-text)]">{sub.tag}</MonoLabel>
      </span>
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
    <Section
      tone={tone}
      id={path.id}
      label={path.name}
      atmosphere={tone === 'deep' ? 'rings' : undefined}
    >
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
                {path.highlights.map((h, i) => {
                  const HighlightIcon = HIGHLIGHT_ICONS[i];
                  return (
                    <li
                      key={h}
                      className="flex items-center gap-3.5 font-display text-heading text-[var(--heading-color)]"
                    >
                      {HighlightIcon ? (
                        <HighlightIcon
                          size={24}
                          stroke={1.9}
                          aria-hidden="true"
                          className="shrink-0 text-[var(--accent-text)]"
                        />
                      ) : null}
                      {h}
                    </li>
                  );
                })}
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

        {path.comparison ? (
          <Reveal>
            <ComparisonTable rows={path.comparison} />
          </Reveal>
        ) : null}
      </div>
    </Section>
  );
}

/**
 * The profile's hiring comparison, as a seamless bordered table. The Zare
 * column reads at heading weight, the in-house column stays muted — the
 * table argues by typography, not by an arrow.
 */
function ComparisonTable({ rows }: { rows: readonly ComparisonRow[] }) {
  return (
    // White plate with a tinted header band (2026-08 comment round) — the
    // table reads as a document excerpt, not as part of the section wash.
    <div className="overflow-hidden rounded-lg border border-[var(--rule-color)] bg-surface-paper">
      <div
        role="table"
        aria-label="Hiring an in-house US engineer compared with a Zare embedded placement"
      >
        <div role="row" className="grid grid-cols-3 bg-surface-mist">
          <span role="columnheader" className="p-4 md:p-5" />
          <span
            role="columnheader"
            className="p-4 font-mono text-caption tracking-wide text-[var(--muted-color)] md:p-5"
          >
            In-house US hire
          </span>
          <span
            role="columnheader"
            className="p-4 font-mono text-caption tracking-wide text-[var(--accent-text)] md:p-5"
          >
            Zare embedded
          </span>
        </div>
        {rows.map((row) => (
          <div
            role="row"
            key={row.measure}
            className="grid grid-cols-3 border-t border-[var(--rule-color)]"
          >
            <span
              role="rowheader"
              className="p-4 font-mono text-caption text-[var(--muted-color)] md:p-5"
            >
              {row.measure}
            </span>
            <span role="cell" className="p-4 text-body-sm text-[var(--muted-color)] md:p-5">
              {row.inHouse}
            </span>
            <span
              role="cell"
              className="p-4 font-display text-body-sm font-semibold text-[var(--heading-color)] md:p-5"
            >
              {row.zare}
            </span>
          </div>
        ))}
      </div>
    </div>
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
