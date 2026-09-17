import { Sora, Manrope, IBM_Plex_Mono } from 'next/font/google';

// The one type system for the rebuilt site and the staff portal: applied by
// `app/(site)/layout.tsx` and `app/(bench)/portal/layout.tsx`, never by the
// root layout. The root layout still carries Gotham for the live marketing and
// admin routes, which are untouched until M3, so declaring the fonts here keeps
// them off every page that does not use them.
//
// Manrope 500 and Plex Mono 400 and 600 are here for the portal's dense data
// screens; next/font only downloads a weight a page actually renders.

export const sora = Sora({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-sora',
  display: 'swap',
});

export const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-manrope',
  display: 'swap',
});

export const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-plex-mono',
  display: 'swap',
});

export const fontVariables = `${sora.variable} ${manrope.variable} ${plexMono.variable}`;
