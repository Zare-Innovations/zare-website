'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

import { cn } from '@/lib/utils';
import { Container } from './container';

// Nav labels stay conventional. A scanning executive needs predictable
// wayfinding; the brand voice belongs in section headlines, not here.
const NAV = [
  { href: '/work', label: 'Our Work' },
  { href: '/careers', label: 'Careers' },
  { href: '/contact', label: 'Contact' },
] as const;

/**
 * The site header. Transparent over the hero, solid ink after 40px.
 *
 * The only client component in M1. Everything else in the design system is a
 * server component.
 */
export function Header({ solid = false }: { solid?: boolean } = {}) {
  const [scrolled, setScrolled] = useState(solid);
  const [menuOpen, setMenuOpen] = useState(false);

  // `solid` pins the scrolled appearance. Pages that do not open on a dark
  // section need it, because the transparent state renders white text over
  // whatever is underneath.
  useEffect(() => {
    if (solid) return;
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [solid]);

  // Prevent the page scrolling behind the open mobile panel.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  // Escape closes the panel. Expected of anything modal.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  return (
    <>
      <header
        data-tone="ink"
        className={cn(
          'fixed inset-x-0 top-0 z-50 h-[76px] md:h-24',
          'flex items-center border-b transition-colors duration-300',
          scrolled || menuOpen
            ? 'border-[var(--rule-color)] bg-surface-ink/95 backdrop-blur-md'
            : 'border-transparent bg-transparent',
        )}
      >
        <Container className="flex items-center gap-6">
          <Link
            href="/"
            className="font-display leading-tight text-on-dark-strong no-underline"
          >
            <span className="block text-[17px] font-bold">Zare</span>
            <span className="block text-[12px] font-normal tracking-[0.14em] text-accent">
              INNOVATIONS
            </span>
          </Link>

          <nav aria-label="Main" className="ml-auto hidden items-center gap-8 md:flex">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[13px] font-semibold text-on-dark no-underline transition-colors hover:text-on-dark-strong"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="inline-flex h-11 items-center rounded-md bg-accent px-6 text-[14px] font-bold text-accent-contrast no-underline transition-colors hover:bg-accent-bright"
            >
              Start a project
            </Link>
          </nav>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="site-menu"
            className="ml-auto grid h-12 w-12 place-items-center rounded-md border border-[var(--rule-color)] md:hidden"
          >
            <span className="sr-only">{menuOpen ? 'Close menu' : 'Open menu'}</span>
            <span aria-hidden="true" className="flex flex-col gap-[5px]">
              <span className="block h-0.5 w-5 bg-on-dark-strong" />
              <span className="block h-0.5 w-5 bg-on-dark-strong" />
              <span className="block h-0.5 w-5 bg-on-dark-strong" />
            </span>
          </button>
        </Container>
      </header>

      {menuOpen ? (
        <nav
          id="site-menu"
          aria-label="Mobile"
          data-tone="ink"
          className="fixed inset-0 z-40 flex flex-col justify-center gap-2 bg-surface-ink px-gutter-mobile md:hidden"
        >
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="border-b border-[var(--rule-color)] py-3 font-display text-display-3 text-on-dark-strong no-underline"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setMenuOpen(false)}
            className="mt-6 inline-flex h-12 items-center justify-center rounded-md bg-accent px-6 font-bold text-accent-contrast no-underline"
          >
            Start a project
          </Link>
        </nav>
      ) : null}
    </>
  );
}
