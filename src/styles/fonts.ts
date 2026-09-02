import { Sora, Manrope, IBM_Plex_Mono } from 'next/font/google';

// These are applied ONLY by `app/(site)/layout.tsx`. The root layout still
// carries Gotham for the live marketing and admin routes, which are untouched
// until M3. Declaring the fonts here rather than in the root layout keeps them
// off every page that does not yet use them.

export const sora = Sora({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-sora',
  display: 'swap',
});

export const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-manrope',
  display: 'swap',
});

export const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['500'],
  variable: '--font-plex-mono',
  display: 'swap',
});

export const fontVariables = `${sora.variable} ${manrope.variable} ${plexMono.variable}`;
