import Link from 'next/link';

import { Container } from './container';
import { MonoLabel } from '@/components/typography/mono-label';
import {
  addressEthiopia,
  addressUSA,
  cityEthiopia,
  cityUSA,
  email,
  linkedin,
  postalCodeUSA,
  siteName,
  stateUSA,
  streetEthiopia,
  streetUSA,
} from '@/constants';

const SITE_LINKS = [
  { href: '/work', label: 'Our Work' },
  { href: '/careers', label: 'Careers' },
  { href: '/contact', label: 'Contact' },
] as const;

/**
 * Site footer. Server component.
 *
 * Both offices render in full: the Delaware entity and the Addis delivery
 * centre together are the structural fact the whole positioning rests on, and
 * a procurement reader needs to complete a vendor file without a call.
 */
export function Footer() {
  return (
    <footer
      data-tone="ink"
      className="border-t border-[var(--rule-color)] bg-surface-ink py-16 text-on-dark-muted"
    >
      <Container>
        <div className="grid gap-10 md:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <Link href="/" className="font-display leading-tight no-underline">
              <span className="block text-[17px] font-bold text-on-dark-strong">
                Zare
              </span>
              <span className="block text-[12px] tracking-[0.14em] text-accent">
                INNOVATIONS
              </span>
            </Link>
            <p className="mt-5 max-w-[22rem] text-body-sm">
              Senior engineers, embedded in your team, under US contracts, from
              our Addis Ababa engineering centre.
            </p>
            <a
              href={`mailto:${email}`}
              className="mt-4 inline-block font-mono text-caption text-on-dark hover:text-accent"
            >
              {email}
            </a>
          </div>

          <div>
            <MonoLabel className="text-accent">Registered office</MonoLabel>
            <address className="mt-3 font-mono text-caption not-italic leading-loose tabular-nums">
              {siteName}, LLC
              <br />
              {streetUSA}
              <br />
              {cityUSA}, {stateUSA} {postalCodeUSA}
            </address>
            <span className="sr-only">{addressUSA}</span>
          </div>

          <div>
            <MonoLabel className="text-accent">Delivery centre</MonoLabel>
            <address className="mt-3 font-mono text-caption not-italic leading-loose">
              {streetEthiopia}
              <br />
              {cityEthiopia}, Ethiopia
            </address>
            <span className="sr-only">{addressEthiopia}</span>

            <nav aria-label="Footer" className="mt-6 flex flex-col gap-1.5">
              {SITE_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-body-sm text-on-dark no-underline hover:text-accent"
                >
                  {link.label}
                </Link>
              ))}
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-body-sm text-on-dark no-underline hover:text-accent"
              >
                LinkedIn
              </a>
            </nav>
          </div>
        </div>

        <div className="mt-11 flex flex-wrap items-center justify-between gap-5 border-t border-[var(--rule-color)] pt-6">
          <MonoLabel size="caption" muted>
            © 2026 {siteName}, LLC. All rights reserved.
          </MonoLabel>
          {/* Dormant. Intentionally unexplained. */}
          <span
            aria-hidden="true"
            className="inline-flex items-center gap-1.5 font-mono text-caption tracking-[0.1em] text-accent"
          >
            ZARE : ——.——
            <span className="inline-block h-[1.05em] w-[0.55em] animate-[blink_1.8s_steps(1)_infinite] bg-accent align-text-bottom" />
          </span>
        </div>
      </Container>
    </footer>
  );
}
