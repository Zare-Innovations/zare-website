"use client";

import { Flex } from "@mantine/core";
import type { JobType } from "@/types/job";

const aboutZare = (
  <p className="z-10 text-[15px] min-[501px]:text-base text-black/80">
    Our mission: To build a super powerful and exceptionally delightful team.
    Our recruitment platform empowers businesses to find exceptional creative
    talent who can bring their brand visions to life. <br />
    But here is the thing - long gone are the days when businesses could just
    post a job ad online and wait for applications. Today, businesses need to
    actively seek out the best candidates, provide a great experience, nurture
    relationships and create a staff employee brand. Which takes a lot of time,
    effort, and tool switching between Excel, Gmail, Slack, LinkedIn, Behance,
    ATS... That&apos;s where Zare comes in. We are reinventing the whole
    recruiting stack from the ground up, crafting breathtaking platform that is
    at (no more switching), with a lot of automations (no more repetitive
    tasks), and centralizing all the data in one place.
  </p>
);

const jobDescriptionClasses = [
  "text-[15px] min-[501px]:text-base text-black/80",
  "[&>*:first-child]:mt-0 [&>*:last-child]:mb-0",
  "[&_p]:my-3 [&_p]:leading-relaxed",
  "[&_h1]:text-2xl [&_h1]:font-semibold [&_h1]:mt-6 [&_h1]:mb-2",
  "[&_h2]:text-xl [&_h2]:font-semibold [&_h2]:mt-5 [&_h2]:mb-2",
  "[&_h3]:text-lg [&_h3]:font-medium [&_h3]:mt-4 [&_h3]:mb-1.5",
  "[&_ul]:list-disc [&_ul]:pl-5 sm:[&_ul]:pl-10 [&_ul]:my-3 [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-1",
  "[&_ol]:list-decimal [&_ol]:pl-5 sm:[&_ol]:pl-10 [&_ol]:my-3 [&_ol]:flex [&_ol]:flex-col [&_ol]:gap-1",
  "[&_li]:leading-relaxed",
  "[&_a]:text-cyan-500 [&_a]:underline hover:[&_a]:text-cyan-600",
  "[&_strong]:font-semibold [&_b]:font-semibold",
  "[&_em]:italic [&_i]:italic",
  "[&_mark]:bg-yellow-200 [&_mark]:px-1 [&_mark]:rounded-sm",
  "[&_u]:underline",
  "[&_blockquote]:border-l-4 [&_blockquote]:border-cyan-500 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-black/70",
  "[&_code]:bg-black/5 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-[0.9em]",
].join(" ");

const formatDate = (dateString?: string) => {
  if (!dateString) return "-";
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  } catch {
    return dateString;
  }
};

const Details = ({ job }: { job: JobType | null }) => {
  return (
    <Flex className="relative flex flex-col gap-10 md:gap-14 px-5 md:px-16 pt-10 pb-20">
      {job ? (
        <>
          <div className="flex flex-col gap-1.5">
            <h3 className="z-10 text-[26px] min-[501px]:text-[32px] font-medium uppercase">
              About Zare
            </h3>
            {aboutZare}
          </div>
          <div className="flex flex-col gap-1.5">
            <h3 className="z-10 text-[26px] min-[501px]:text-[32px] font-medium uppercase">
              The Role
            </h3>
            {job.description ? (
              <div
                className={jobDescriptionClasses}
                dangerouslySetInnerHTML={{ __html: job.description }}
              />
            ) : (
              <p className="text-[15px] min-[501px]:text-base text-black/60">
                No description provided.
              </p>
            )}
          </div>
          <div className="flex flex-col gap-1.5">
            <h3 className="z-10 text-base font-medium uppercase">
              Job Details
            </h3>
            <dl className="px-5 grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-2 text-[15px] min-[501px]:text-base">
              <div className="flex">
                <dt className=" min-w-[140px]">Location:</dt>
                <dd className="ml-2">{job.location || "-"}</dd>
              </div>
              <div className="flex">
                <dt className=" min-w-[140px]">Work Type:</dt>
                <dd className="ml-2">{job.workType || "-"}</dd>
              </div>
              <div className="flex">
                <dt className=" min-w-[140px]">Job Type:</dt>
                <dd className="ml-2">{job.type || "-"}</dd>
              </div>
              <div className="flex">
                <dt className=" min-w-[140px]">Years Experience:</dt>
                <dd className="ml-2">
                  {typeof job.yearsOfExperience === "number"
                    ? job.yearsOfExperience
                    : "-"}
                </dd>
              </div>
              <div className="flex">
                <dt className=" min-w-[140px]">Skills Required:</dt>
                <dd className="ml-2">
                  {job.skills
                    ? job.skills.split(",").map((s, i) => (
                        <span
                          key={i}
                          className="inline-block text-cyan-500 bg-cyan-500/10 backdrop-blur-md px-2 py-0.5 rounded text-sm mr-2 mb-1"
                        >
                          {s.trim()}
                        </span>
                      ))
                    : "-"}
                </dd>
              </div>
              <div className="flex">
                <dt className=" min-w-[140px]">Salary:</dt>
                <dd className="ml-2">Based on sompany scale</dd>
              </div>
              <div className="flex">
                <dt className=" min-w-[140px]">Start Date:</dt>
                <dd className="ml-2">{formatDate(job.startDate)}</dd>
              </div>
              <div className="flex">
                <dt className=" min-w-[140px]">End Date:</dt>
                <dd className="ml-2">{formatDate(job.endDate)}</dd>
              </div>
            </dl>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col gap-5">
            <span className="w-1/4 z-10 h-10 bg-cyan-500/20 rounded-sm animate-pulse" />
            <div className="w-3/4 flex flex-col gap-2">
              <div className="w-full h-6 z-10 bg-cyan-500/20 rounded-sm animate-pulse" />
              <div className="w-full h-6 z-10 bg-cyan-500/20 rounded-sm animate-pulse" />
              <div className="w-1/2 h-6 z-10 bg-cyan-500/20 rounded-sm animate-pulse" />
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <span className="w-1/4 z-10 h-10 bg-cyan-500/20 rounded-sm animate-pulse" />
            <div className="w-3/4 flex flex-col gap-2">
              <div className="w-full h-6 z-10 bg-cyan-500/20 rounded-sm animate-pulse" />
              <div className="w-full h-6 z-10 bg-cyan-500/20 rounded-sm animate-pulse" />
              <div className="w-1/2 h-6 z-10 bg-cyan-500/20 rounded-sm animate-pulse" />
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <span className="w-1/4 z-10 h-10 bg-cyan-500/20 rounded-sm animate-pulse" />
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 flex-col gap-x-7 gap-y-4">
              <div className="flex items-center gap-3">
                <div className="w-full h-6 z-10 bg-cyan-500/20 rounded-sm animate-pulse" />
                <div className="w-full h-6 z-10 bg-cyan-500/20 rounded-sm animate-pulse" />
              </div>
              <div className="flex items-center gap-3">
                <div className="w-full h-6 z-10 bg-cyan-500/20 rounded-sm animate-pulse" />
                <div className="w-full h-6 z-10 bg-cyan-500/20 rounded-sm animate-pulse" />
              </div>
              <div className="flex items-center gap-3">
                <div className="w-full h-6 z-10 bg-cyan-500/20 rounded-sm animate-pulse" />
                <div className="w-full h-6 z-10 bg-cyan-500/20 rounded-sm animate-pulse" />
              </div>
              <div className="flex items-center gap-3">
                <div className="w-full h-6 z-10 bg-cyan-500/20 rounded-sm animate-pulse" />
                <div className="w-full h-6 z-10 bg-cyan-500/20 rounded-sm animate-pulse" />
              </div>
               </div>
          </div>
        </>
      )}
    </Flex>
  );
};

export default Details;
