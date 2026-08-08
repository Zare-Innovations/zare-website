'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';
import { servicePaths } from '@/content/services';
import { Container } from './container';
import { ZareLogo } from './logo';

// Nav labels stay conventional. A scanning executive needs predictable
// wayfinding; the brand voice belongs in section headlines, not here.
const NAV = [
  { href: '/work', label: 'Our Work' },
  { href: '/careers', label: 'Careers' },
  { href: '/contact', label: 'Contact' },
] as const;

/** How long the paths panel survives the pointer leaving it. Long enough to
 *  cross the gap between trigger and panel diagonally, short enough that the
 *  panel never feels stuck open. */
const CLOSE_DELAY = 160;

/**
 * The site header. Transparent over the hero, solid ink after 40px.
 *
 * Two disclosure surfaces hang off it, one per input mode:
 *
 * - Desktop: "What we do" opens a panel presenting the two service paths as
 *   equal-weight cards — the same information architecture rule TwoPaths
 *   enforces on the page. It is a disclosure, not a page, because the paths
 *   have no route of their own: they live at /#tech-ai and /#embedded.
 * - Mobile: the full-screen menu, which carries the same two paths under an
 *   eyebrow so a phone visitor is offered the same choice.
 *
 * Both close on Escape, on navigation, and on the pointer going elsewhere.
 */
export function Header({ solid = false }: { solid?: boolean } = {}) {
  const [scrolled, setScrolled] = useState(solid);
  const [menuOpen, setMenuOpen] = useState(false);
  const [pathsOpen, setPathsOpen] = useState(false);

  const pathname = usePathname();
  const pathsRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  // Escape closes whichever surface is open. Expected of anything modal.
  // The paths panel also returns focus to its trigger, so a keyboard visitor
  // is not dropped at the top of the document.
  useEffect(() => {
    if (!menuOpen && !pathsOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      setMenuOpen(false);
      if (pathsOpen) {
        setPathsOpen(false);
        triggerRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen, pathsOpen]);

  // A press anywhere outside the paths disclosure closes it.
  useEffect(() => {
    if (!pathsOpen) return;
    const onPress = (e: PointerEvent) => {
      if (!pathsRef.current?.contains(e.target as Node)) setPathsOpen(false);
    };
    window.addEventListener('pointerdown', onPress);
    return () => window.removeEventListener('pointerdown', onPress);
  }, [pathsOpen]);

  const holdOpen = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setPathsOpen(true);
  };
  const letClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setPathsOpen(false), CLOSE_DELAY);
  };

  const linkClass = (href: string, active: boolean) =>
    cn(
      'text-[13px] font-semibold no-underline transition-colors',
      active
        ? 'text-on-dark-strong underline decoration-accent decoration-2 underline-offset-8'
        : 'text-on-dark hover:text-on-dark-strong',
    );

  return (
    <>
      <header
        data-tone="ink"
        className={cn(
          'fixed inset-x-0 top-0 z-50 h-[76px] md:h-24',
          'flex items-center border-b transition-colors duration-300',
          scrolled || menuOpen || pathsOpen
            ? 'border-[var(--rule-color)] bg-surface-ink/95 backdrop-blur-md'
            : 'border-transparent bg-transparent',
        )}
      >
        <Container className="flex items-center gap-6">
          <Link href="/" className="text-on-dark-strong no-underline">
            <ZareLogo className="h-8 w-auto md:h-10" />
          </Link>

          <nav aria-label="Main" className="ml-auto hidden items-center gap-8 md:flex">
            {/* The two paths, disclosed. A button, not a link: the paths
                have no page of their own, so there is nowhere to navigate. */}
            <div
              ref={pathsRef}
              className="relative"
              onPointerEnter={holdOpen}
              onPointerLeave={letClose}
            >
              <button
                ref={triggerRef}
                type="button"
                onClick={() => setPathsOpen((open) => !open)}
                aria-expanded={pathsOpen}
                aria-controls="paths-panel"
                className={cn(
                  'flex items-center gap-1.5 text-[13px] font-semibold transition-colors',
                  pathsOpen ? 'text-on-dark-strong' : 'text-on-dark hover:text-on-dark-strong',
                )}
              >
                What we do
                <svg
                  viewBox="0 0 10 6"
                  aria-hidden="true"
                  className={cn(
                    'h-1.5 w-2.5 transition-transform duration-200 motion-reduce:transition-none',
                    pathsOpen && 'rotate-180',
                  )}
                >
                  <path
                    d="M1 1l4 4 4-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              {/* Kept mounted so closing animates too; `invisible` removes it
                  from the tab order while hidden. */}
              <div
                id="paths-panel"
                className={cn(
                  'absolute right-0 top-full w-[620px] max-w-[calc(100vw-48px)] pt-5',
                  'transition-all duration-200 motion-reduce:transition-none',
                  pathsOpen
                    ? 'visible translate-y-0 opacity-100'
                    : 'invisible -translate-y-1.5 opacity-0',
                )}
              >
                <div
                  className="rounded-lg border border-rule-dark bg-[#041a26] p-3 shadow-[0_24px_60px_rgba(1,10,16,.6)]"
                >
                  <div className="grid grid-cols-2 gap-3">
                    {servicePaths.map((path) => (
                      <Link
                        key={path.id}
                        href={`/#${path.id}`}
                        onClick={() => setPathsOpen(false)}
                        className="group flex flex-col gap-2 rounded-md border border-transparent p-4 no-underline transition-colors hover:border-rule-dark hover:bg-[rgba(10,44,64,.5)]"
                      >
                        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-accent-bright">
                          {path.index}
                        </span>
                        <span className="flex items-center gap-2 font-display text-[15px] font-semibold text-on-dark-strong">
                          {path.name}
                          <span
                            aria-hidden="true"
                            className="text-accent opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100"
                          >
                            →
                          </span>
                        </span>
                        <span className="text-[13px] leading-relaxed text-on-dark-muted">
                          {path.headline}
                        </span>
                        {path.subPaths ? (
                          <span className="mt-1 flex flex-wrap gap-1.5">
                            {path.subPaths.map((sub) => (
                              <span
                                key={sub.tag}
                                className="border border-rule-dark px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-accent-bright"
                              >
                                {sub.tag.split('·')[1]?.trim() ?? sub.tag}
                              </span>
                            ))}
                          </span>
                        ) : null}
                      </Link>
                    ))}
                  </div>
                  <div className="mt-3 border-t border-rule-dark px-4 pb-1 pt-3">
                    <Link
                      href="/contact"
                      onClick={() => setPathsOpen(false)}
                      className="text-[13px] font-semibold text-on-dark-muted no-underline transition-colors hover:text-accent"
                    >
                      Not sure which fits? Talk it through →
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {NAV.map((item) => {
              const active = pathname?.startsWith(item.href) ?? false;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  className={linkClass(item.href, active)}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              href="/contact?pathway=project"
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
            <span aria-hidden="true" className="grid gap-[5px]">
              <span
                className={cn(
                  'block h-0.5 w-5 bg-on-dark-strong transition-transform duration-200 motion-reduce:transition-none',
                  menuOpen && 'translate-y-[7px] rotate-45',
                )}
              />
              <span
                className={cn(
                  'block h-0.5 w-5 bg-on-dark-strong transition-opacity duration-200 motion-reduce:transition-none',
                  menuOpen && 'opacity-0',
                )}
              />
              <span
                className={cn(
                  'block h-0.5 w-5 bg-on-dark-strong transition-transform duration-200 motion-reduce:transition-none',
                  menuOpen && '-translate-y-[7px] -rotate-45',
                )}
              />
            </span>
          </button>
        </Container>
      </header>

      {menuOpen ? (
        <nav
          id="site-menu"
          aria-label="Mobile"
          data-tone="ink"
          className="fixed inset-0 z-40 flex flex-col justify-center gap-2 overflow-y-auto bg-surface-ink px-gutter-mobile pt-[76px] md:hidden"
        >
          <span className="font-mono text-label uppercase text-accent-bright">
            What we do
          </span>
          {servicePaths.map((path) => (
            <Link
              key={path.id}
              href={`/#${path.id}`}
              onClick={() => setMenuOpen(false)}
              className="flex flex-col gap-0.5 border-b border-[var(--rule-color)] py-3 no-underline"
            >
              <span className="font-display text-heading text-on-dark-strong">
                {path.name}
              </span>
              <span className="text-body-sm text-on-dark-muted">{path.headline}</span>
            </Link>
          ))}

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
            href="/contact?pathway=project"
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
