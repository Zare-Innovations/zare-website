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

const theRole = (
  <div className="flex flex-col items-start gap-2 text-[15px] min-[501px]:text-base text-black/80">
    <p>
      At Zare we are product & design focus. Meaning we put a lot of time and
      effort in those areas, and we&apos;re searching for talented designers to
      join our growing creative team.
    </p>
    <ul className=" flex flex-col items-start gap-1 pl-5 sm:pl-10 list-disc">
      <li>
        We focus on building an absolutely delightful user experience above all
        else. We also a well-crafted brand and sweat the little big details.
      </li>
      <li>
        Shout out to some of our design heroes: Mary Orapin, Lenny Rachitsky,
        Tobias van Schneider, and Refactoring UI. You too? Let&apos;s chat!
      </li>
    </ul>
  </div>
);

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
            {theRole}
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
