import type { Metadata } from 'next';

import './globals.css';

// core styles are required for all packages
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/dates/styles.css';

import RootStyleRegistry from './mantine';

import localFont from 'next/font/local';
import { Providers } from '@/store/provider';

const gotham = localFont({
  src: [
    {
      path: './fonts/Gotham-Light.otf',
      weight: '200',
      style: 'light',
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
  metadataBase: new URL('https://zareinnovations.com'),
  title: {
    default: 'Zare Innovations | Revolutionize Your Business',
    template: '%s | Zare Innovations',
  },
  description:
    'Zare Innovations is a technology company based in Ethiopia and the USA, delivering custom software development, AI solutions, talent outsourcing, and data intelligence services to help businesses scale globally.',
  keywords: [
    'custom software development',
    'AI solutions',
    'talent outsourcing',
    'BPO',
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
  authors: [{ name: 'Zare Innovations' }],
  creator: 'Zare Innovations',
  publisher: 'Zare Innovations',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Zare Innovations',
    images: [
      {
        url: '/zare-logo.jpg',
        width: 1200,
        height: 630,
        alt: 'Zare Innovations',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/zare-logo.jpg'],
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
    canonical: 'https://zareinnovations.com',
  },
  icons: {
    icon: '/zare-logo.jpg',
    apple: '/zare-logo.jpg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${gotham.className} antialiased overflow-x-hidden`}
      >
        <Providers>
        <RootStyleRegistry>{children}</RootStyleRegistry>
        </Providers>
      </body>
    </html>
  );
}
