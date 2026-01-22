"use client";

import { Card, Flex, Stack } from "@mantine/core";
import Link from "next/link";
import { useEffect, useState } from "react";
import CareerCard from "../careers/_components/career-card";
import { Job, useGetJobsQuery } from "@/store/api/job.api";

export default function Jobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const { data: jobsDataResponse, isLoading, isError } = useGetJobsQuery({});

  useEffect(() => {
    if (jobsDataResponse?.items) {
      // Limit to 4 jobs for display
      if (jobsDataResponse.items.length > 4) {
        setJobs(jobsDataResponse.items.slice(0, 4));
      } else {
        setJobs(jobsDataResponse.items);
      }
    }
  }, [jobsDataResponse]);

  return (
    <Stack
      className="relative md:p-12 gap-4 sm:gap-7 items-center max-sm:px-5 max-md:px-16 max-md:py-10 "
      id="services"
    >
      <Flex className="flex flex-col mx-auto gap-3 sm:gap-5 text-center">
        <p className="text-2xl sm:text-3xl md:text-5xl font-semibold text-center uppercase">
          We’re hiring! join our team today
        </p>
        <p className="text-xs sm:text-sm text-[#6C6C6C]">
          Join our team of passionate people to drive the future of zare
          innovations
        </p>
      </Flex>
      <Flex className="grid md:grid-cols-2 w-full gap-5 sm:gap-7 py-8">
        {isLoading ? (
          Array.from("jobs").map((j, i) => (
            <div
              key={j + i}
              className="h-56 flex flex-col gap-4 p-3 sm:p-5 lg:p-7 bg-[#000]/5 rounded-sm"
            >
              <div className="h-10 flex items-center gap-5 justify-between">
                <div className=" w-3/4 h-full bg-[#0001] animate-pulse rounded-md" />
                <div className=" w-10 h-full bg-[#0001] animate-pulse rounded-md" />
              </div>
              <div className="flex-1 bg-[#0001] animate-pulse rounded-md" />
              <div className="h-8 flex items-center gap-5">
                <div className=" w-1/6 h-full bg-[#0001] animate-pulse rounded-full" />
                <div className=" w-1/6 h-full bg-[#0001] animate-pulse rounded-full" />
                <div className=" w-1/6 h-full bg-[#0001] animate-pulse rounded-full" />
              </div>
            </div>
          ))
        ) : isError ? (
          <Card className="w-max self-center flex flex-col items-center gap-3">
            <span className="text-red-600">
              Unabe to load Jobs, please refresh the page!
            </span>
            <Link
              href="/careers"
              className={`w-max flex items-center gap-3 rounded-md px-2 min-[500px]:px-3 sm:px-6 text-xs  min-[430px]:text-sm min-[500px]:text-base py-2 sm:py-3 bg-cyan-950 text-white hover:bg-[#10CFD1] transition-all duration-300`}
            >
              View all jobs Openings
            </Link>
          </Card>
        ) : (
          jobs.map((job, i) => <CareerCard key={job.id} job={job} />)
        )}
      </Flex>
      <Link
        href="/careers"
        className={`w-max flex items-center gap-3 rounded-md px-2 min-[500px]:px-3 sm:px-6 text-xs  min-[430px]:text-sm min-[500px]:text-base py-2 sm:py-3 bg-cyan-950 text-white hover:bg-[#10CFD1] transition-all duration-300`}
      >
        View All Job Openings
      </Link>
    </Stack>
  );
}
