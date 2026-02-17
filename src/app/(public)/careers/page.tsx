import type { Metadata } from 'next';
import Hero from "./_components/hero";
import CareersList from './_components/careers-list';

export const metadata: Metadata = {
  title: 'Careers',
  description:
    'Join the Zare Innovations team. Explore open positions in software development, AI, design, and more. Build your career with a global technology company.',
  openGraph: {
    title: 'Careers at Zare Innovations',
    description:
      'Explore open positions and join our global team of innovators.',
    url: 'https://zareinnovations.com/careers',
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
    title: 'Careers at Zare Innovations',
    description:
      'Explore open positions and join our global team of innovators.',
    images: ['/zare-logo.jpg'],
  },
  alternates: {
    canonical: 'https://zareinnovations.com/careers',
  },
};

const careersPageJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Careers at Zare Innovations',
  description:
    'Join the Zare Innovations team. Explore open positions in software development, AI, design, and more.',
  url: 'https://zareinnovations.com/careers',
  isPartOf: {
    '@type': 'WebSite',
    name: 'Zare Innovations',
    url: 'https://zareinnovations.com',
  },
  about: {
    '@type': 'Organization',
    name: 'Zare Innovations',
    url: 'https://zareinnovations.com',
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
