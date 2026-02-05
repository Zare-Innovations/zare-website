import React from 'react';
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
  },
};

export default function Careers() {
  return (
    <main>
      <Hero />
      <CareersList />
    </main>
  );
}
