import type { Metadata } from "next";
import { getJob } from "@/lib/jobs";
import JobDetailContent from "./_components/job-detail-content";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const job = await getJob(id);

  if (!job) {
    return {
      title: "Job Not Found",
      description: "This job posting could not be found or is no longer available.",
    };
  }

  const truncatedDescription =
    job.description.length > 160
      ? job.description.slice(0, 157) + "..."
      : job.description;

  return {
    title: `${job.title} - ${job.workType}`,
    description: truncatedDescription,
    openGraph: {
      title: `${job.title} - ${job.workType}`,
      description: truncatedDescription,
      url: `https://zareinnovations.com/careers/${id}`,
      type: "website",
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
      card: "summary_large_image",
      title: `${job.title} - ${job.workType}`,
      description: truncatedDescription,
      images: ["/zare-logo.jpg"],
    },
    alternates: {
      canonical: `https://zareinnovations.com/careers/${id}`,
    },
  };
}

export default async function Careers({ params }: Props) {
  const { id } = await params;
  const job = await getJob(id);

  const jobPostingJsonLd = job
    ? {
        "@context": "https://schema.org",
        "@type": "JobPosting",
        title: job.title,
        description: job.description,
        datePosted: job.startDate,
        validThrough: job.endDate,
        employmentType: job.type?.toUpperCase().replace(/[\s-]/g, "_"),
        jobLocationType: job.workType?.toLowerCase() === "remote" ? "TELECOMMUTE" : undefined,
        jobLocation: {
          "@type": "Place",
          address: {
            "@type": "PostalAddress",
            addressLocality: job.location,
          },
        },
        skills: job.skills,
        hiringOrganization: {
          "@type": "Organization",
          name: "Zare Innovations",
          sameAs: "https://zareinnovations.com",
          logo: "https://zareinnovations.com/zare-logo.jpg",
        },
      }
    : null;

  return (
    <>
      {jobPostingJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jobPostingJsonLd) }}
        />
      )}
      <JobDetailContent job={job} />
    </>
  );
}
