import React from "react";
import { Card } from "@mantine/core";
import Link from "next/link";
import { IconArrowUpRight } from "@tabler/icons-react";
import { Job } from "@/store/api/job.api";

// Job descriptions are stored as HTML from the admin RichText editor. On a
// truncated 4-line card preview we don't want to render the markup — just
// show the readable text. Strip tags, decode common entities, and preserve
// paragraph / list-item breaks so the clamp looks natural.
function htmlToPlainText(html: string | undefined | null): string {
  if (!html) return "";
  return html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/(p|div|li|h[1-6])>/gi, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/[ \t]+/g, " ")
    .replace(/\n\s*\n+/g, "\n\n")
    .trim();
}

const CareerCard = ({ job }: { job: Job }) => {
  // Prefer the "About the Job" summary for the card teaser; fall back to
  // the full description when it's not set.
  const previewText =
    htmlToPlainText(job.aboutJob) || htmlToPlainText(job.description);
  return (
    <Card className="flex flex-col gap-4 p-3 sm:p-5 lg:p-7">
      <Link
        href={`/careers/${job.id}`}
        className="flex flex-row items-center justify-between transition-all duration-300 text-black hover:text-cyan-500"
      >
        <h3 className=" text-start text-lg font-medium ">{job.title}</h3>
        <IconArrowUpRight className="w-6 h-6" />
      </Link>
      <p className="text-sm text-[#6C6C6C] leading-relaxed line-clamp-4 whitespace-pre-line">
        {previewText}
      </p>

      <div className="flex flex-wrap gap-2.5 text-sm mt-auto capitalize">
        <span className="text-cyan-500 border border-cyan-500 rounded-full px-3 py-1 line-clamp-4 text-ellipsis">
          {job.location}
        </span>
        <span className="text-cyan-500 border border-cyan-500 rounded-full px-3 py-1">
          {job.type}
        </span>
        <span className="text-cyan-500 border border-cyan-500 rounded-full px-3 py-1">
          {job.workType}
        </span>
      </div>
    </Card>
  );
};

export default CareerCard;
