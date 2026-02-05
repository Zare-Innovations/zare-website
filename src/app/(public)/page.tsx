import type { Metadata } from 'next';
import { Stack } from '@mantine/core';
import Hero from './_components/hero';
import Empowering from './_components/empowering';
import Promise from './_components/promise';
import Services from './_components/services';
import Testimonials from "./_components/testimonials";
import Works from './_components/works';
import Companies from './_components/companies';
import CalculatorSection from './_components/calculator-section';
import ProjectsOverview from "./_components/projects-overview";
import Jobs from "./_components/jobs";
import Contact from './_components/contact';
import {
  addressUSA,
  addressEthiopia,
  phone,
  phoneEthiopia,
  email,
  linkedin,
  instagram,
  facebook,
  github,
} from '@/constants';

export const metadata: Metadata = {
  title: 'Zare Innovations | Revolutionize Your Business',
  description:
    'Custom software development, AI solutions, global talent outsourcing, and data intelligence services. Zare Innovations helps businesses scale with cutting-edge technology.',
  openGraph: {
    title: 'Zare Innovations | Revolutionize Your Business',
    description:
      'Custom software development, AI solutions, global talent outsourcing, and data intelligence services.',
    url: 'https://zareinnovations.com',
  },
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Zare Innovations',
  url: 'https://zareinnovations.com',
  logo: 'https://zareinnovations.com/zare-logo_lg.png',
  description:
    'Custom software development, AI solutions, global talent outsourcing, and data intelligence services.',
  email: email,
  telephone: phone,
  address: [
    {
      '@type': 'PostalAddress',
      streetAddress: '5501 Seminary Road, Unit 1710 South',
      addressLocality: 'Falls Church',
      addressRegion: 'VA',
      postalCode: '22041',
      addressCountry: 'US',
    },
    {
      '@type': 'PostalAddress',
      streetAddress: 'Meskel Flower, Aster Plaza 3rd Floor',
      addressLocality: 'Addis Ababa',
      addressCountry: 'ET',
    },
  ],
  sameAs: [linkedin, instagram, facebook, github],
  knowsAbout: [
    'Custom Software Development',
    'AI Solutions',
    'Talent Outsourcing',
    'Business Process Outsourcing',
    'Data Intelligence',
    'UI/UX Design',
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <Stack>
        <Hero />
        <Companies />
        <Empowering />
        <Promise />
        <ProjectsOverview />
        <Services />
        <Testimonials />
        <Works />
        <CalculatorSection />
        <Jobs />
        <Contact />
      </Stack>
    </>
  );
}
