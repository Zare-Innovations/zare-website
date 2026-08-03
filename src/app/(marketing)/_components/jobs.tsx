"use client";

import { Card, Flex, Stack } from "@mantine/core";
import Link from "next/link";
import CareerCard from "../careers/_components/career-card";
import { useGetJobsQuery } from "@/store/api/job.api";
import { careersEmail } from "@/constants";

const HOMEPAGE_JOBS_LIMIT = 4;

export default function Jobs() {
  const { data: jobsDataResponse, isLoading, isError } = useGetJobsQuery({
    orderBy: [{ column: "createdAt", direction: "DESC" }],
    take: HOMEPAGE_JOBS_LIMIT,
  });
  const jobs = jobsDataResponse?.items ?? [];

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
      {isLoading ? (
        <Flex className="grid md:grid-cols-2 w-full gap-5 sm:gap-7 py-8">
          {Array.from("jobs").map((j, i) => (
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
          ))}
        </Flex>
      ) : isError ? (
        <Card className=" w-max flex flex-col items-center gap-3">
          <span className="text-red-600">
            Unabe to load job openings, please refresh the page!
          </span>
          <Link
            href="/careers"
            className={`w-max flex items-center gap-3 rounded-md px-2 min-[500px]:px-3 sm:px-6 text-xs  min-[430px]:text-sm min-[500px]:text-base py-2 sm:py-3 bg-cyan-950 text-white hover:bg-[#10CFD1] transition-all duration-300`}
          >
            View all job Openings
          </Link>
        </Card>
      ) : jobs.length === 0 ? (
        <Card className="md:max-w-4xl self-center flex flex-col items-center text-center gap-3">
          <span className="text-black/70 text-wrap">
            No open roles at the moment, but great talent is always welcome. If
            you&apos;re looking for meaningful work with a collaborative team,
            reach out to{" "}
            <a
              href={`mailto:${careersEmail}`}
              className="font-medium hover:underline hover:underline-offset-1 cursor-pointer"
            >
              {careersEmail}
            </a>
            , we&apos;d love to connect.
          </span>
        </Card>
      ) : (
        <Flex className="grid md:grid-cols-2 w-full gap-5 sm:gap-7 py-8">
          {jobs.map((job, i) => (
            <CareerCard key={job.id} job={job} />
          ))}
        </Flex>
      )}
      {!isError && jobs.length > 0 && (
        <Link
          href="/careers"
          className={`w-max flex items-center gap-3 rounded-md px-2 min-[500px]:px-3 sm:px-6 text-xs  min-[430px]:text-sm min-[500px]:text-base py-2 sm:py-3 bg-cyan-950 text-white hover:bg-[#10CFD1] transition-all duration-300`}
        >
          View all job openings
        </Link>
      )}
    </Stack>
  );
}
