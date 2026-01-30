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
  title: 'Zare Innovations',
  description: 'Zare Innovations | Revolutionize Your Business',
  icons: {
    icon: '/zare-logo-footer.svg',
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
