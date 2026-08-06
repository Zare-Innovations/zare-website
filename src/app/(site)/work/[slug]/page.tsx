import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';

import { Section } from '@/components/layout/section';
import { Heading } from '@/components/typography/heading';
import { Eyebrow } from '@/components/typography/eyebrow';
import { MonoLabel } from '@/components/typography/mono-label';
import { QuoteBlock } from '@/components/data/quote-block';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Reveal } from '@/components/motion/reveal';
import { siteName, siteUrl } from '@/constants';
import {
  clientName,
  getCase,
  publishedCases,
  relatedCases,
  type CaseStudy,
} from '@/content/work';
import { DecisionList } from '../_components/decision-list';
import { SystemDiagram } from '../_components/system-diagram';
import { OutcomeGrid } from '../_components/outcome-grid';
import { EngagementShape } from '../_components/engagement-shape';
import { RelatedWork } from '../_components/related-work';

type Props = { params: Promise<{ slug: string }> };

// Only cases that carry enough narrative to be worth reading get a page.
export function generateStaticParams() {
  return publishedCases().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const c = getCase(slug);
  if (!c) return { title: 'Not found', robots: { index: false } };

  return {
    title: `${clientName(c.client)} · ${c.industry}`,
    description: c.summary,
    alternates: { canonical: `${siteUrl}/work/${c.slug}` },
    openGraph: {
      title: `${clientName(c.client)} · ${c.industry}`,
      description: c.summary,
      url: `${siteUrl}/work/${c.slug}`,
      type: 'article',
    },
  };
}

function caseJsonLd(c: CaseStudy) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: c.summary,
    about: clientName(c.client),
    locationCreated: c.location,
    creator: { '@type': 'Organization', name: siteName, url: siteUrl },
  };
}

function breadcrumbJsonLd(c: CaseStudy) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Our Work', item: `${siteUrl}/work` },
      {
        '@type': 'ListItem',
        position: 2,
        name: clientName(c.client),
        item: `${siteUrl}/work/${c.slug}`,
      },
    ],
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const c = getCase(slug);
  if (!c) notFound();

  const related = relatedCases(slug);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(caseJsonLd(c)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(c)) }}
      />

      <Header />

      <main id="main" className="pt-[76px] md:pt-24">
        {/* ------------------------------------------------------- hero */}
        <Section tone="ink" label="Case overview">
          <MonoLabel className="text-[var(--accent-text)]">
            {c.kind === 'system' ? 'System build' : 'Embedded engagement'}
          </MonoLabel>

          <Heading level={1} size="display-1" className="mt-6 max-w-[16em]">
            {c.summary}
          </Heading>

          <dl className="mt-12 grid gap-8 border-t border-[var(--rule-color)] pt-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ['Client', clientName(c.client)],
              ['Industry', c.industry],
              ['Location', c.location],
              ...(c.duration ? [['Running', c.duration]] : []),
            ].map(([label, value]) => (
              <div key={label}>
                <dt>
                  <MonoLabel muted>{label}</MonoLabel>
                </dt>
                <dd className="mt-2 text-body">{value}</dd>
              </div>
            ))}
          </dl>

          {!c.client.named ? (
            <p className="mt-8 max-w-[38em] text-body-sm text-on-dark-muted">
              {c.client.reason}
            </p>
          ) : null}
        </Section>

        {/* ---------------------------------------------------- problem */}
        <Section tone="paper" label="The problem">
          <Eyebrow>{c.kind === 'system' ? 'Problem' : 'Situation'}</Eyebrow>
          <Reveal>
            <p className="mt-8 max-w-[34em] text-display-3 font-display leading-tight text-[var(--heading-color)]">
              {c.kind === 'system' ? c.problem : c.situation}
            </p>
          </Reveal>
        </Section>

        {/* ------------------------------------- system OR engagement */}
        {c.kind === 'system' ? (
          <>
            <Section tone="mist" label="The system">
              <Eyebrow>What was built</Eyebrow>
              <Heading level={2} className="mt-5 max-w-[16em]">
                The system.
              </Heading>
              <div className="mt-12">
                <SystemDiagram components={c.system} />
              </div>
            </Section>

            <Section tone="paper" label="Engineering decisions">
              <Eyebrow>Engineering decisions</Eyebrow>
              <Heading level={2} className="mt-5 max-w-[18em]">
                What was chosen, and what it cost.
              </Heading>
              <div className="mt-14">
                <DecisionList decisions={c.decisions} />
              </div>
            </Section>
          </>
        ) : (
          <Section tone="mist" label="Engagement shape">
            <Eyebrow>How it worked</Eyebrow>
            <Heading level={2} className="mt-5 max-w-[16em]">
              The shape of the engagement.
            </Heading>
            <div className="mt-12">
              <EngagementShape caseStudy={c} />
            </div>
          </Section>
        )}

        {/* ---------------------------------------------------- delivery */}
        {c.delivery ? (
          <Section tone="mist" label="Delivery">
            <Eyebrow>Delivery</Eyebrow>
            <p className="mt-8 max-w-[38em] text-body">{c.delivery}</p>
          </Section>
        ) : null}

        {/* ----------------------------------------------------- outcome */}
        <Section tone="ink" label="Outcome">
          <Eyebrow>Outcome</Eyebrow>
          <Heading level={2} className="mt-5 max-w-[14em]">
            What changed.
          </Heading>
          <div className="mt-14">
            <OutcomeGrid outcomes={c.outcomes} />
          </div>

          {c.quote ? (
            <div className="mt-16 max-w-[42em] border-t border-[var(--rule-color)] pt-12">
              <QuoteBlock
                quote={c.quote.text}
                attribution={c.quote.attribution}
                role={c.quote.role}
                source={c.quote.source}
                size="display"
              />
            </div>
          ) : null}
        </Section>

        {/* ----------------------------------------------------- related */}
        {related.length > 0 ? (
          <Section tone="paper" label="Related work" compact>
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <Eyebrow>Related work</Eyebrow>
              <Link
                href="/work"
                className="font-mono text-label uppercase text-[var(--accent-text)] hover:underline"
              >
                All work →
              </Link>
            </div>
            <div className="mt-10">
              <RelatedWork cases={related} />
            </div>
          </Section>
        ) : null}
      </main>

      <Footer />
    </>
  );
}
