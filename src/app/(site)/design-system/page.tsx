import type { Metadata } from 'next';

import { Section } from '@/components/layout/section';
import { Container } from '@/components/layout/container';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Heading } from '@/components/typography/heading';
import { Eyebrow } from '@/components/typography/eyebrow';
import { MonoLabel } from '@/components/typography/mono-label';
import { Metric } from '@/components/data/metric';
import { FactBlock } from '@/components/data/fact-block';
import { QuoteBlock } from '@/components/data/quote-block';
import { CaseStudyCard } from '@/components/content/case-study-card';
import { PersonCard } from '@/components/content/person-card';
import { Reveal } from '@/components/motion/reveal';

// INTERNAL REFERENCE ROUTE. Not linked from anywhere, excluded from the
// sitemap, and deleted before launch. It exists so the tonal acts, the type
// rhythm, and the contrast pairs can be checked in a browser rather than
// reasoned about in a stylesheet.
export const metadata: Metadata = {
  title: 'Design System (internal)',
  robots: { index: false, follow: false, nocache: true },
};

// Classes are written out in full. Tailwind extracts statically, so a
// template literal like `text-${token}` produces no CSS.
const TYPE_SCALE = [
  { token: 'display-1', cls: 'font-display text-display-1', use: 'Page headline. One per page.' },
  { token: 'display-2', cls: 'font-display text-display-2', use: 'Section headline.' },
  { token: 'display-3', cls: 'font-display text-display-3', use: 'Card and subsection headline.' },
  { token: 'heading', cls: 'font-display text-heading', use: 'Small headings, person names.' },
  { token: 'body', cls: 'text-body', use: 'Default prose.' },
  { token: 'body-sm', cls: 'text-body-sm', use: 'Card copy, secondary prose.' },
  { token: 'caption', cls: 'text-caption', use: 'Metadata, addresses.' },
  { token: 'label', cls: 'font-mono text-label uppercase', use: 'Mono eyebrows and labels.' },
] as const;

const SURFACES = [
  { name: 'surface-ink', hex: '#020f18', use: 'Acts I and III' },
  { name: 'surface-deep', hex: '#051c2b', use: 'Alternate dark' },
  { name: 'surface-navy', hex: '#0a293b', use: 'Panels on dark' },
  { name: 'surface-mist', hex: '#f0f1f2', use: 'Act II alternate' },
  { name: 'surface-paper', hex: '#ffffff', use: 'Act II base' },
] as const;

const ACCENTS = [
  { name: 'accent', hex: '#40c1c7', use: 'Affordance, rules, focus' },
  { name: 'accent-bright', hex: '#10cfd1', use: 'Eyebrows on dark only' },
  { name: 'accent-ink', hex: '#1c7a80', use: 'Teal text on light. AA safe.' },
] as const;

export default function DesignSystemPage() {
  return (
    <>
      <Header />

      <main id="main" className="pt-[76px] md:pt-24">
        {/* ---------------------------------------------- internal banner */}
        <Section tone="navy" compact label="Internal notice">
          <Eyebrow>Internal reference</Eyebrow>
          <Heading level={1} size="display-2" className="mt-5">
            Zare design system
          </Heading>
          <p className="mt-4 max-w-[34em] text-body text-on-dark-muted">
            Not a public page. Not linked, not indexed, not tracked. Deleted
            before launch. Its job is to make the tonal acts, the type rhythm,
            and the contrast pairs checkable in a browser.
          </p>
        </Section>

        {/* ------------------------------------------------------ type */}
        <Section tone="paper" label="Typography">
          <Eyebrow>Typography</Eyebrow>
          <Heading level={2} className="mt-5 max-w-[16em]">
            Sora carries the argument. Manrope carries the prose. Mono carries
            the facts.
          </Heading>

          <div className="mt-14 flex flex-col gap-10 border-t border-[var(--rule-color)] pt-10">
            {TYPE_SCALE.map((row) => (
              <div
                key={row.token}
                className="grid gap-3 md:grid-cols-[200px_1fr] md:items-baseline"
              >
                <div className="flex flex-col gap-1">
                  <MonoLabel className="text-[var(--accent-text)]">
                    {row.token}
                  </MonoLabel>
                  <MonoLabel muted size="caption">
                    {row.use}
                  </MonoLabel>
                </div>
                <p className={row.cls}>Engineers who stay with your product.</p>
              </div>
            ))}
          </div>

          <div className="mt-14 border-t border-[var(--rule-color)] pt-10">
            <MonoLabel muted>The mono rule</MonoLabel>
            <p className="mt-4 max-w-[38em] text-body">
              Mono is for data only: dates, addresses, entity names, stack
              names, status. Never for a sentence. This is the single rule that
              does most of the work of reading as a systems company.
            </p>
            <p className="mt-4 font-mono text-caption tabular-nums">
              Zare Innovations, LLC · Delaware, US · 5.0 Clutch · Since 2024
            </p>
          </div>
        </Section>

        {/* ---------------------------------------------------- colour */}
        <Section tone="mist" label="Colour">
          <Eyebrow>Colour</Eyebrow>
          <Heading level={2} className="mt-5">
            Five surfaces, one accent.
          </Heading>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {SURFACES.map((s) => (
              <div key={s.name} className="border border-[var(--rule-color)]">
                <div className="h-24" style={{ background: s.hex }} />
                <div className="flex flex-col gap-1 p-4">
                  <MonoLabel>{s.name}</MonoLabel>
                  <MonoLabel muted size="caption">
                    {s.hex}
                  </MonoLabel>
                  <MonoLabel muted size="caption">
                    {s.use}
                  </MonoLabel>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {ACCENTS.map((a) => (
              <div key={a.name} className="border border-[var(--rule-color)]">
                <div className="h-16" style={{ background: a.hex }} />
                <div className="flex flex-col gap-1 p-4">
                  <MonoLabel>{a.name}</MonoLabel>
                  <MonoLabel muted size="caption">
                    {a.hex} · {a.use}
                  </MonoLabel>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-8 max-w-[38em] text-body-sm text-[var(--muted-color)]">
            Teal is affordance, not decoration. If it appears more than about
            six times in a viewport it has become decoration and must be
            reduced. On light grounds only accent-ink is permitted as text:
            #40c1c7 on white fails WCAG AA.
          </p>
        </Section>

        {/* ------------------------------------------------- evidence */}
        <Section tone="paper" label="Evidence primitives">
          <Eyebrow>Evidence</Eyebrow>
          <Heading level={2} className="mt-5">
            Metric, FactBlock, QuoteBlock.
          </Heading>

          <div className="mt-12 flex flex-wrap gap-x-16 gap-y-10">
            <Metric value="50-70%" label="Cost savings vs US hiring" />
            <Metric value="12+ mo" label="Longest embedded engagement" />
            <Metric value="80+" label="Placements in one month" />
            <Metric
              value="[—]"
              label="Platform uptime"
              verified={false}
              note="placeholder"
            />
          </div>

          <p className="mt-6 max-w-[38em] text-body-sm text-[var(--muted-color)]">
            The dimmed placeholder ships. An admitted gap is what makes the
            other four numbers believable.
          </p>

          <div className="mt-16 grid gap-12 border-t border-[var(--rule-color)] pt-12 md:grid-cols-2">
            <FactBlock
              title="Verified"
              facts={[
                'Zare Innovations, LLC · Delaware, US',
                'Delivery centre · Addis Ababa, Ethiopia',
                '6 countries served',
                '5.0 rating on Clutch',
              ]}
            />
            <QuoteBlock
              quote="They are constantly responsive and check in frequently to ensure that all expectations are being met."
              attribution="Pickrell Global Technologies"
              role="Technology services · Concord, NC"
              source="Verified Clutch review · February 2025"
            />
          </div>
        </Section>

        {/* ---------------------------------------------------- cards */}
        <Section tone="ink" label="Content primitives">
          <Eyebrow>Content</Eyebrow>
          <Heading level={2} className="mt-5">
            Cards that mean something.
          </Heading>
          <p className="mt-4 max-w-[38em] text-body text-on-dark-muted">
            There is no generic Card. A card is a visual similarity, not a
            business concept. Components are named for what they represent.
          </p>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <Reveal>
              <CaseStudyCard
                client="LitPulse"
                industry="Biomedical research"
                location="Washington DC"
                title="A federated research engine for biomedical science."
                summary="Unified scattered biomedical sources into one fast, deduplicated stream."
                href="#"
                metrics={[
                  { value: '>99%', label: 'Dedup accuracy' },
                  { value: '<2s', label: 'Response time' },
                  { value: '>40%', label: 'Full-text recovery' },
                ]}
                stack={['FastAPI', 'LangGraph', 'Next.js', 'PostgreSQL', 'Redis']}
              />
            </Reveal>
            <Reveal delay={90}>
              <CaseStudyCard
                client="Pickrell Global Technologies"
                industry="Technology services"
                location="Concord, NC"
                title="An embedded pod, running since January 2024."
                summary="Three-developer pod inside the client's delivery organisation."
                href="#"
                stack={['React', 'NestJS', 'AWS']}
              />
            </Reveal>
          </div>

          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <PersonCard
              name="Placeholder Name"
              role="Senior Backend Engineer"
              built="LitPulse ingestion pipeline"
              stack={['Python', 'FastAPI', 'PostgreSQL']}
              withZareSince="2024"
            />
            <PersonCard
              name="Placeholder Name"
              role="Founder & CEO"
              withZareSince="2023"
            />
          </div>

          <p className="mt-8 max-w-[38em] text-body-sm text-on-dark-muted">
            PersonCard degrades to initials when no portrait exists. A labelled
            absence is more honest than a stock headshot. Real names pending
            consent.
          </p>
        </Section>

        {/* ------------------------------------------------- spacing */}
        <Section tone="paper" label="Spacing and motion">
          <Eyebrow>Spacing and motion</Eyebrow>
          <Heading level={2} className="mt-5">
            Density over whitespace.
          </Heading>

          <dl className="mt-12 grid gap-8 border-t border-[var(--rule-color)] pt-10 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ['section', '104px', 'Desktop section padding'],
              ['section-compact', '88px', 'Dense bands'],
              ['section-mobile', '60px', 'Mobile'],
              ['gutter', '56 / 20px', 'Container gutter'],
            ].map(([token, value, use]) => (
              <div key={token}>
                <dt>
                  <MonoLabel className="text-[var(--accent-text)]">
                    {token}
                  </MonoLabel>
                </dt>
                <dd className="mt-2 font-mono text-heading tabular-nums">
                  {value}
                </dd>
                <dd className="mt-1 text-body-sm text-[var(--muted-color)]">
                  {use}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-14 border-t border-[var(--rule-color)] pt-10">
            <MonoLabel muted>Motion</MonoLabel>
            <p className="mt-4 max-w-[38em] text-body">
              Motion serves formation, confirmation, or first-view attention.
              Nothing else. Hidden reveal states exist only under{' '}
              <code className="font-mono text-caption">html.anim</code>, which
              is never added under reduced motion, so content is visible at rest
              wherever it cannot animate. Disable JavaScript and this page is
              fully readable.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {(['rise', 'fade', 'clip'] as const).map((variant, i) => (
                <Reveal
                  key={variant}
                  variant={variant}
                  delay={i * 90}
                  className="border border-[var(--rule-color)] p-6"
                >
                  <MonoLabel className="text-[var(--accent-text)]">
                    {variant}
                  </MonoLabel>
                  <p className="mt-2 text-body-sm text-[var(--muted-color)]">
                    Scroll away and back. It reveals once.
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </Section>

        {/* --------------------------------------------- act transition */}
        <Section tone="deep" label="Tonal transition check" compact>
          <Container className="px-0">
            <MonoLabel muted>Act transition</MonoLabel>
            <Heading level={2} size="display-3" className="mt-4">
              Three acts, not eleven alternations.
            </Heading>
            <p className="mt-4 max-w-[38em] text-body text-on-dark-muted">
              Dark for orientation, light for evidence, dark for people. Within
              an act, vary density rather than background. That is what makes a
              long page read as one authored document.
            </p>
          </Container>
        </Section>
      </main>

      <Footer />
    </>
  );
}
