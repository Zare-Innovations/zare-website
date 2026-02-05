import type { MetadataRoute } from "next";
import { getAllJobs } from "@/lib/jobs";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: "https://zareinnovations.com",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: "https://zareinnovations.com/careers",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: "https://zareinnovations.com/our-work",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  let jobPages: MetadataRoute.Sitemap = [];
  try {
    const jobs = await getAllJobs();
    jobPages = jobs.map((job) => ({
      url: `https://zareinnovations.com/careers/${job.id}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));
  } catch {
    // If API is unavailable, return only static pages
  }

  return [...staticPages, ...jobPages];
}
