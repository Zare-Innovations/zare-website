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
  cityEthiopia,
  cityUSA,
  email,
  facebook,
  geoEthiopia,
  geoUSA,
  github,
  instagram,
  linkedin,
  logo,
  ogImage,
  phone,
  phoneEthiopia,
  postalCodeUSA,
  siteName,
  siteUrl,
  stateUSA,
  streetEthiopia,
  streetUSA,
} from '@/constants';

const logoUrl = `${siteUrl}${logo}`;

export const metadata: Metadata = {
  title: `${siteName} | Revolutionize Your Business`,
  description:
    'Zare Innovations is a leading tech company in Ethiopia and the USA offering custom software development, AI solutions, global talent outsourcing, and data intelligence services.',
  openGraph: {
    title: `${siteName} | Revolutionize Your Business`,
    description:
      'Leading tech company in Ethiopia and the USA. Custom software development, AI solutions, global talent outsourcing, and data intelligence services.',
    url: siteUrl,
    images: [
      {
        url: ogImage.home,
        width: 1200,
        height: 630,
        alt: siteName,
      },
    ],
  },
  alternates: {
    canonical: siteUrl,
  },
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: siteName,
  url: siteUrl,
  logo: logoUrl,
  description:
    'Custom software development, AI solutions, global talent outsourcing, and data intelligence services.',
  email: email,
  telephone: phone,
  address: [
    {
      '@type': 'PostalAddress',
      streetAddress: streetUSA,
      addressLocality: cityUSA,
      addressRegion: stateUSA,
      postalCode: postalCodeUSA,
      addressCountry: 'US',
    },
    {
      '@type': 'PostalAddress',
      streetAddress: streetEthiopia,
      addressLocality: cityEthiopia,
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
  '@id': `${siteUrl}/#addis-office`,
  name: `${siteName} - Ethiopia`,
  description:
    'Leading software development and technology company in Addis Ababa, Ethiopia. Custom software, AI solutions, talent outsourcing, and data intelligence.',
  url: siteUrl,
  logo: logoUrl,
  image: logoUrl,
  telephone: phoneEthiopia,
  email: email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: streetEthiopia,
    addressLocality: cityEthiopia,
    addressCountry: 'ET',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: geoEthiopia.latitude,
    longitude: geoEthiopia.longitude,
  },
  priceRange: '$$',
  openingHours: 'Mo-Fr 09:00-18:00',
  sameAs: [linkedin, instagram, facebook, github],
};

const localBusinessUSAJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${siteUrl}/#usa-office`,
  name: `${siteName} - USA`,
  description:
    'Technology company in Middletown, Delaware offering custom software development, AI solutions, talent outsourcing, and data intelligence services.',
  url: siteUrl,
  logo: logoUrl,
  image: logoUrl,
  telephone: phone,
  email: email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: streetUSA,
    addressLocality: cityUSA,
    addressRegion: stateUSA,
    postalCode: postalCodeUSA,
    addressCountry: 'US',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: geoUSA.latitude,
    longitude: geoUSA.longitude,
  },
  priceRange: '$$',
  openingHours: 'Mo-Fr 09:00-18:00',
  sameAs: [linkedin, instagram, facebook, github],
};

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: siteName,
  url: siteUrl,
};

const siteNavigationJsonLd = [
  {
    '@type': 'SiteNavigationElement',
    name: 'About Us',
    description: 'Learn how Zare Innovations empowers businesses with cutting-edge technology and global expertise.',
    url: `${siteUrl}/#aboutUs`,
  },
  {
    '@type': 'SiteNavigationElement',
    name: 'Services',
    description: 'Custom software development, AI solutions, talent outsourcing, and data intelligence services.',
    url: `${siteUrl}/#services`,
  },
  {
    '@type': 'SiteNavigationElement',
    name: 'Contact Us',
    description: 'Get in touch with Zare Innovations. Offices in the USA and Ethiopia.',
    url: `${siteUrl}/#contact-us`,
  },
  {
    '@type': 'SiteNavigationElement',
    name: 'Our Work',
    description: 'Explore our portfolio of custom software, AI solutions, talent outsourcing, and data intelligence projects.',
    url: `${siteUrl}/our-work`,
  },
  {
    '@type': 'SiteNavigationElement',
    name: 'Careers',
    description: 'Join our global team. Explore open positions in software development, AI, design, and more.',
    url: `${siteUrl}/careers`,
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
