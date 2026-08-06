import type { Metadata } from 'next';

import './globals.css';

import localFont from 'next/font/local';
import { logo, ogImage, siteName, siteUrl } from '@/constants';

// The root layout deliberately holds NO providers. Redux and Mantine belong to
// the route groups that use them: `(marketing)/layout.tsx` and
// `admin/layout.tsx`. Keeping them here forced every visitor to download the
// admin panel's runtime. See docs/superpowers/specs — M0.

const gotham = localFont({
  src: [
    {
      path: './fonts/Gotham-Light.otf',
      weight: '200',
      style: 'normal',
    },
    {
      path: './fonts/Gotham-Book.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/Gotham-Medium.otf',
      weight: '500',
    },
    {
      path: './fonts/Gotham-Bold.otf',
      weight: '700',
    },
  ],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} | Revolutionize Your Business`,
    template: `%s | ${siteName}`,
  },
  description:
    'Zare Innovations is a technology company based in Ethiopia and the USA, delivering custom software development, AI solutions, talent outsourcing, and data intelligence services to help businesses scale globally.',
  keywords: [
    'custom software development',
    'AI solutions',
    'talent outsourcing',
    'Ethiopian BPO company',
    'Offshore Talen',
    'data intelligence',
    'Zare Innovations',
    'tech companies in Ethiopia',
    'software companies in Ethiopia',
    'software development Ethiopia',
    'IT company Addis Ababa',
    'tech company USA',
    'software outsourcing Ethiopia',
    'African tech company',
    'Ethiopian software company',
  ],
  authors: [{ name: siteName }],
  creator: siteName,
  publisher: siteName,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: siteName,
    images: [
      {
        url: ogImage.home,
        width: 1200,
        height: 630,
        alt: siteName,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: [ogImage.home],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: logo,
    apple: logo,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${gotham.className} antialiased overflow-x-hidden`}>
        {children}
      </body>
    </html>
  );
}
