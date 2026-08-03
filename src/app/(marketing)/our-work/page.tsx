import type { Metadata } from "next";
import FilterableProjects from "./_components/filterable-projects";
import { ogImage, siteName, siteUrl } from "@/constants";
import { projectCategories } from "@/data/projects";

const pageUrl = `${siteUrl}/our-work`;
const ogImageUrl = ogImage.ourWork;

export const metadata: Metadata = {
  title: "Our Work",
  description:
    "Explore our portfolio of custom software, AI solutions, talent outsourcing, and data intelligence projects. See how Zare Innovations helps businesses scale globally.",
  openGraph: {
    title: `Our Work | ${siteName}`,
    description:
      "Explore our portfolio of custom software, AI, talent outsourcing, and data intelligence projects.",
    url: pageUrl,
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: `${siteName} — Our Work`,
      },
    ],
  },
  twitter: {
    title: `Our Work | ${siteName}`,
    description:
      "Explore our portfolio of custom software, AI, talent outsourcing, and data intelligence projects.",
    images: [ogImageUrl],
  },
  alternates: {
    canonical: pageUrl,
  },
};

const ourWorkJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: `Our Work | ${siteName}`,
  description:
    "Portfolio of custom software, AI solutions, talent outsourcing, and data intelligence projects delivered by Zare Innovations.",
  url: pageUrl,
  isPartOf: {
    "@type": "WebSite",
    name: siteName,
    url: siteUrl,
  },
  about: {
    "@type": "Organization",
    name: siteName,
    url: siteUrl,
  },
  hasPart: projectCategories.flatMap((category) =>
    category.projects.map((project) => ({
      "@type": "CreativeWork",
      name: project.title,
      url: project.about.link,
      image: `${siteUrl}${project.about.image}`,
      about: project.about.name.trim(),
      locationCreated: project.location,
    }))
  ),
};

export default function OurWork() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ourWorkJsonLd) }}
      />
      <FilterableProjects />
    </main>
  );
}
