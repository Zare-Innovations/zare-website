import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { IconCalendarEvent, IconMail } from '@tabler/icons-react';

import { cn } from '@/lib/utils';
import { linkSurface, panelSurface } from '@/components/content/surface';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Section } from '@/components/layout/section';
import { Heading } from '@/components/typography/heading';
import { Eyebrow } from '@/components/typography/eyebrow';
import { MonoLabel } from '@/components/typography/mono-label';
import { isPathway, type Pathway } from '@/lib/inquiry-schema';
import { pathways } from '@/content/contact';
import { officePhotos } from '@/content/office';
import {
  addressEthiopia,
  addressUSA,
  cityEthiopia,
  cityUSA,
  consultationLink,
  email,
  phone,
  phoneEthiopia,
  siteUrl,
  stateUSA,
} from '@/constants';
import { InquiryForm } from './_components/inquiry-form';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Start a software project or build an embedded engineering team with Zare Innovations. We reply within one business day.',
  alternates: { canonical: `${siteUrl}/contact` },
};

type Props = {
  searchParams: Promise<{ pathway?: string; type?: string }>;
};

/**
 * Pathway selection is a pair of links, not client state.
 *
 * The URL is the source of truth, so /contact?pathway=team is shareable, works
 * from every CTA on the site, and renders the right form on the server with no
 * hydration. It also means the choice survives a refresh.
 */
function PathwayTabs({ active }: { active: Pathway }) {
  return (
    <nav aria-label="Inquiry type" className="flex flex-col border-t border-[var(--rule-color)] sm:flex-row">
      {(['project', 'team'] as const).map((p) => {
        const isActive = p === active;
        return (
          <Link
            key={p}
            href={`/contact?pathway=${p}`}
            aria-current={isActive ? 'page' : undefined}
            scroll={false}
            className={`flex-1 border-b-2 px-1 py-5 no-underline transition-colors ${
              isActive
                ? 'border-accent text-[var(--heading-color)]'
                : 'border-transparent text-[var(--muted-color)] hover:text-[var(--heading-color)]'
            }`}
          >
            <span className="font-display text-heading">{pathways[p].tab}</span>
          </Link>
        );
      })}
    </nav>
  );
}

export default async function ContactPage({ searchParams }: Props) {
  const params = await searchParams;
  const pathway: Pathway = isPathway(params.pathway) ? params.pathway : 'project';
  const copy = pathways[pathway];
  const [emailUser, emailDomain] = email.split('@');

  const defaultTeamType =
    params.type === 'operations'
      ? 'business-operations'
      : params.type === 'talent'
        ? 'technology-talent'
        : undefined;

  return (
    <>
      <Header />

      <main id="main" className="pt-header-h md:pt-header-h-md">
        <Section tone="ink" label="Contact">
          <Eyebrow>Next step</Eyebrow>
          <Heading level={1} size="display-1" className="mt-6 max-w-[12em]">
            What should we build together?
          </Heading>
          <p className="mt-6 max-w-[34em] text-body text-on-dark-muted">
            Two ways in. Pick the one that matches what you need, and you will
            get a reply from someone who has read it.
          </p>
        </Section>

        <Section tone="paper" label="Inquiry">
          <div className="grid gap-16 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
            <div>
              <PathwayTabs active={pathway} />

              <div className="mt-10">
                <Heading level={2} size="display-3">
                  {copy.headline}
                </Heading>
                <p className="mt-4 max-w-[34em] text-body-sm text-[var(--muted-color)]">
                  {copy.description}
                </p>
              </div>

              <div className="mt-10">
                {/* key remounts the form when the pathway changes, so fields
                    from the other pathway never linger in state. */}
                <InquiryForm
                  key={pathway}
                  pathway={pathway}
                  defaultTeamType={defaultTeamType}
                />
              </div>
            </div>

            <aside className="flex flex-col gap-4">
              {/* Prefer to talk: the room the scoping call happens in, with
                  these people, and the way to book it. A dark plate on the
                  light band — data-tone gives everything inside it the ink
                  tone's heading, eyebrow and muted colours. */}
              <div
                data-tone="ink"
                className="relative isolate flex min-h-[26rem] flex-col justify-end overflow-hidden bg-surface-ink p-6 text-on-dark sm:p-8"
              >
                <Image
                  src={officePhotos.boardroomPresentation.src}
                  alt={officePhotos.boardroomPresentation.alt}
                  placeholder="blur"
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="-z-20 object-cover object-[62%_35%]"
                />
                {/* Fades the bright table into ink so the copy reads. */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 -z-10 bg-gradient-to-t from-surface-ink via-surface-ink/80 to-surface-ink/10"
                />

                <Eyebrow>Prefer to talk</Eyebrow>
                <Heading level={2} size="heading" className="mt-4 max-w-[18em]">
                  Thirty minutes, with the people who would do the work.
                </Heading>
                <a
                  href={consultationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-7 inline-flex h-12 w-full items-center justify-center gap-2 rounded-md bg-accent px-6 text-[14.5px] font-bold text-accent-contrast no-underline transition-colors hover:bg-accent-bright"
                >
                  <IconCalendarEvent size={18} stroke={1.9} aria-hidden="true" className="shrink-0" />
                  Book a call →
                </a>
              </div>

              {/* Explicit fallback, not a primary path. Some corporate mail
                  clients have no mailto handler; the form is the route that
                  always works. */}
              <a
                href={`mailto:${email}`}
                className={cn(panelSurface, linkSurface, 'group flex items-center gap-4 p-5 no-underline')}
              >
                <span
                  aria-hidden="true"
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-accent/10 text-[var(--accent-text)]"
                >
                  <IconMail size={20} stroke={1.9} />
                </span>
                <span className="flex min-w-0 flex-col gap-1">
                  <MonoLabel muted>Or email us</MonoLabel>
                  {/* On the narrowest phones the address may still wrap:
                      the <wbr> makes it break after the @, not mid-word. */}
                  <span className="font-mono text-body-sm text-[var(--accent-text)] [overflow-wrap:anywhere] group-hover:underline">
                    {emailUser}@<wbr />
                    {emailDomain}
                  </span>
                </span>
                {/* The whole card is the link; on phones the arrow would cost
                    the address its single line. */}
                <span
                  aria-hidden="true"
                  className="ml-auto hidden shrink-0 text-[22px] text-[var(--accent-text)] transition-transform duration-150 group-hover:translate-x-1 sm:block"
                >
                  →
                </span>
              </a>
            </aside>
          </div>
        </Section>

        {/* Scheduler. A plain iframe rather than a JS embed: same result, no
            client bundle, and it lazy-loads below the fold. */}
        <Section tone="mist" label="Book a call">
          <Eyebrow>Book a call</Eyebrow>
          <Heading level={2} size="display-3" className="mt-5 max-w-[16em]">
            Thirty minutes, with the people who would do the work.
          </Heading>
          <div className="mt-10 overflow-hidden border border-[var(--rule-color)]">
            <iframe
              src={`${consultationLink}?hide_gdpr_banner=1&background_color=f0f1f2&text_color=0a293b&primary_color=1a737a`}
              title="Book a 30-minute call with Zare Innovations"
              loading="lazy"
              className="h-[700px] w-full border-0"
            />
          </div>
        </Section>

        <Section tone="ink" label="Offices" compact>
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <MonoLabel className="text-accent">Registered office</MonoLabel>
              <address className="mt-4 font-mono text-caption not-italic leading-loose">
                {addressUSA}
              </address>
              <a
                href={`tel:${phone.replace(/\s/g, '')}`}
                className="mt-3 inline-block font-mono text-caption text-on-dark hover:text-accent"
              >
                {phone}
              </a>
              <MonoLabel muted size="caption" className="mt-1 block">
                {cityUSA}, {stateUSA}
              </MonoLabel>
            </div>

            <div>
              <MonoLabel className="text-accent">Engineering centre</MonoLabel>
              <address className="mt-4 font-mono text-caption not-italic leading-loose">
                {addressEthiopia}
              </address>
              <a
                href={`tel:${phoneEthiopia.replace(/\s/g, '')}`}
                className="mt-3 inline-block font-mono text-caption text-on-dark hover:text-accent"
              >
                {phoneEthiopia}
              </a>
              <MonoLabel muted size="caption" className="mt-1 block">
                {cityEthiopia}, UTC+3, no daylight saving
              </MonoLabel>
            </div>
          </div>
        </Section>
      </main>

      <Footer />
    </>
  );
}
