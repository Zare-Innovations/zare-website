import type { Metadata } from "next";
import FilterableProjects from "./_components/filterable-projects";

export const metadata: Metadata = {
  title: "Our Work",
  description:
    "Explore our portfolio of custom software, AI solutions, talent outsourcing, and data intelligence projects. See how Zare Innovations helps businesses scale globally.",
  openGraph: {
    title: "Our Work | Zare Innovations",
    description:
      "Explore our portfolio of custom software, AI, talent outsourcing, and data intelligence projects.",
    url: "https://zareinnovations.com/our-work",
    images: [
      {
        url: "/zare-logo.jpg",
        width: 1200,
        height: 630,
        alt: "Zare Innovations",
      },
    ],
  },
  twitter: {
    title: "Our Work | Zare Innovations",
    description:
      "Explore our portfolio of custom software, AI, talent outsourcing, and data intelligence projects.",
    images: ["/zare-logo.jpg"],
  },
  alternates: {
    canonical: "https://zareinnovations.com/our-work",
  },
};

export default function OurWork() {
  return (
    <main>
      <FilterableProjects />
    </main>
  );
}
