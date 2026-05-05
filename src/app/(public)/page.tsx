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
    'Zare Innovations is a leading tech company in Ethiopia and the USA offering custom software development, AI solutions, global talent outsourcing, and data intelligence services.',
  openGraph: {
    title: 'Zare Innovations | Revolutionize Your Business',
    description:
      'Leading tech company in Ethiopia and the USA. Custom software development, AI solutions, global talent outsourcing, and data intelligence services.',
    url: 'https://zareinnovations.com',
    images: [
      {
        url: '/zare-logo.jpg',
        width: 1200,
        height: 630,
        alt: 'Zare Innovations',
      },
    ],
  },
  alternates: {
    canonical: 'https://zareinnovations.com',
  },
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Zare Innovations',
  url: 'https://zareinnovations.com',
  logo: 'https://zareinnovations.com/zare-logo.jpg',
  description:
    'Custom software development, AI solutions, global talent outsourcing, and data intelligence services.',
  email: email,
  telephone: phone,
  address: [
    {
      '@type': 'PostalAddress',
      streetAddress: '651 N Broad St, Suite 201',
      addressLocality: 'Middletown',
      addressRegion: 'DE',
      postalCode: '19709',
      addressCountry: 'US',
    },
    {
      '@type': 'PostalAddress',
      streetAddress: 'Abyssinia Real Estate Building, 13th floor, Bole Japan, Africa Ave',
      addressLocality: 'Addis Ababa',
      addressCountry: 'ET',
    },
  ],
  sameAs: [linkedin, instagram, facebook, github],
  areaServed: [
    { '@type': 'Country', name: 'Ethiopia' },
    { '@type': 'Country', name: 'United States' },
    { '@type': 'Country', name: 'United Kingdom' },
    { '@type': 'Country', name: 'Canada' },
    { '@type': 'Country', name: 'South Africa' },
    { '@type': 'Country', name: 'Senegal' },
    { '@type': 'Country', name: 'Cyprus' },
  ],
  knowsAbout: [
    'Custom Software Development',
    'AI Solutions',
    'Talent Outsourcing',
    'Business Process Outsourcing',
    'Data Intelligence',
    'UI/UX Design',
  ],
};

const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://zareinnovations.com/#addis-office',
  name: 'Zare Innovations - Ethiopia',
  description:
    'Leading software development and technology company in Addis Ababa, Ethiopia. Custom software, AI solutions, talent outsourcing, and data intelligence.',
  url: 'https://zareinnovations.com',
  logo: 'https://zareinnovations.com/zare-logo.jpg',
  image: 'https://zareinnovations.com/zare-logo.jpg',
  telephone: phoneEthiopia,
  email: email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Abyssinia Real Estate Building, 13th floor, Bole Japan, Africa Ave',
    addressLocality: 'Addis Ababa',
    addressCountry: 'ET',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 9.0105,
    longitude: 38.7612,
  },
  priceRange: '$$',
  openingHours: 'Mo-Fr 09:00-18:00',
  sameAs: [linkedin, instagram, facebook, github],
};

const localBusinessUSAJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://zareinnovations.com/#usa-office',
  name: 'Zare Innovations - USA',
  description:
    'Technology company in Middletown, Delaware offering custom software development, AI solutions, talent outsourcing, and data intelligence services.',
  url: 'https://zareinnovations.com',
  logo: 'https://zareinnovations.com/zare-logo.jpg',
  image: 'https://zareinnovations.com/zare-logo.jpg',
  telephone: phone,
  email: email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: '5501 Seminary Road, Unit 1710 South',
    addressLocality: 'Falls Church',
    addressRegion: 'VA',
    postalCode: '22041',
    addressCountry: 'US',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 39.4496,
    longitude: -75.7163,
  },
  priceRange: '$$',
  openingHours: 'Mo-Fr 09:00-18:00',
  sameAs: [linkedin, instagram, facebook, github],
};

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Zare Innovations',
  url: 'https://zareinnovations.com',
};

const siteNavigationJsonLd = [
  {
    '@type': 'SiteNavigationElement',
    name: 'About Us',
    description: 'Learn how Zare Innovations empowers businesses with cutting-edge technology and global expertise.',
    url: 'https://zareinnovations.com/#aboutUs',
  },
  {
    '@type': 'SiteNavigationElement',
    name: 'Services',
    description: 'Custom software development, AI solutions, talent outsourcing, and data intelligence services.',
    url: 'https://zareinnovations.com/#services',
  },
  {
    '@type': 'SiteNavigationElement',
    name: 'Contact Us',
    description: 'Get in touch with Zare Innovations. Offices in the USA and Ethiopia.',
    url: 'https://zareinnovations.com/#contact-us',
  },
  {
    '@type': 'SiteNavigationElement',
    name: 'Our Work',
    description: 'Explore our portfolio of custom software, AI solutions, talent outsourcing, and data intelligence projects.',
    url: 'https://zareinnovations.com/our-work',
  },
  {
    '@type': 'SiteNavigationElement',
    name: 'Careers',
    description: 'Join our global team. Explore open positions in software development, AI, design, and more.',
    url: 'https://zareinnovations.com/careers',
  },
];

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(siteNavigationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessUSAJsonLd) }}
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
