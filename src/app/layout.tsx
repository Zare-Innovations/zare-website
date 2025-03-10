import type { Metadata } from 'next';

import './globals.css';

// core styles are required for all packages
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import '@mantine/notifications/styles.css';

import RootStyleRegistry from './mantine';
import { NavBar } from './_components/nav-bar';

import Footer from './_components/footer';

import localFont from 'next/font/local';

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
        className={`${gotham.className}  antialiased outline overflow-x-hidden`}
      >
        <RootStyleRegistry>
          <NavBar />
          {children}
          <Footer />
        </RootStyleRegistry>
      </body>
    </html>
  );
}
