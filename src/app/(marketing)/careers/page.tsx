import type { Metadata } from 'next';
import Hero from "./_components/hero";
import CareersList from './_components/careers-list';
import { ogImage, siteName, siteUrl } from '@/constants';

const pageUrl = `${siteUrl}/careers`;
const ogImageUrl = ogImage.careers;

export const metadata: Metadata = {
  title: 'Careers',
  description:
    'Join the Zare Innovations team. Explore open positions in software development, AI, design, and more. Build your career with a global technology company.',
  openGraph: {
    title: `Careers at ${siteName}`,
    description:
      'Explore open positions and join our global team of innovators.',
    url: pageUrl,
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: `Careers at ${siteName}`,
      },
    ],
  },
  twitter: {
    title: `Careers at ${siteName}`,
    description:
      'Explore open positions and join our global team of innovators.',
    images: [ogImageUrl],
  },
  alternates: {
    canonical: pageUrl,
  },
};

const careersPageJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: `Careers at ${siteName}`,
  description:
    'Join the Zare Innovations team. Explore open positions in software development, AI, design, and more.',
  url: pageUrl,
  isPartOf: {
    '@type': 'WebSite',
    name: siteName,
    url: siteUrl,
  },
  about: {
    '@type': 'Organization',
    name: siteName,
    url: siteUrl,
  },
};

export default function Careers() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(careersPageJsonLd) }}
      />
      <Hero />
      <CareersList />
    </main>
  );
}
