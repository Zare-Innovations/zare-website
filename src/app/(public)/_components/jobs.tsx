"use client";
import { Card, Flex, Stack } from "@mantine/core";
import { IconArrowUpRight } from "@tabler/icons-react";
import Link from "next/link";
interface Job {
  title: string;
  description: string;
  location: string[];
  id: string;
}

const jobs: Job[] = [
  {
    title: "Graphic Designer",
    description:
      "Are you a creative powerhouse with a passion for design? Join our team as a full-team Graphic Designer and unleash your talent from anywhere in the world. In this role, you’ll be responsible for creating visually...",
    location: ["Full-Time", "On-Site", "Competitive Salary"],
    id: "1"
  },
  {
    title: "Frontend Developer",
    description:
      "Are you a creative powerhouse with a passion for design? Join our team as a full-team Graphic Designer and unleash your talent from anywhere in the world. In this role, you’ll be responsible for creating visually...",
    location: ["Full-Time", "On-Site", "Competitive Salary"],
    id: "2"
  },
  {
    title: "Backend Developer",
    description:
      "Are you a creative powerhouse with a passion for design? Join our team as a full-team Graphic Designer and unleash your talent from anywhere in the world. In this role, you’ll be responsible for creating visually...",
    location: ["Full-Time", "On-Site", "Competitive Salary"],
    id: "3"
  },
  {
    title: "UI/UX Designer",
    description:
      "Are you a creative powerhouse with a passion for design? Join our team as a full-team Graphic Designer and unleash your talent from anywhere in the world. In this role, you’ll be responsible for creating visually...",
    location: ["Full-Time", "On-Site", "Competitive Salary"],
    id: "4"
  }
];

const JobCard = ({ job }: { job: Job }) => {
  return (
    <Card className="flex flex-col gap-4 p-3 sm:p-5 lg:p-7">
      <div className="n">
        <Link
          href={`/careers/${job.id}`}
          className="flex flex-row items-center justify-between transition-all duration-300 text-black hover:text-cyan-500"
        >
          <h3 className=" text-start text-lg font-medium ">
            {job.title}
          </h3>
          <IconArrowUpRight className="w-6 h-6" />
        </Link>
      </div>
      <p className="text-sm text-[#6C6C6C] leading-relaxed">
        {job.description}
      </p>

      <div className="flex flex-wrap gap-2.5 text-sm mt-auto capitalize">
        {job.location.map((location) => (
          <span
            key={location}
            className="text-cyan-500 border border-cyan-500 rounded-full px-3 py-1"
          >
            {location}
          </span>
        ))}
      </div>
    </Card>
  );
};

export default function Jobs() {
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
        {jobs.map((job) => (
          <JobCard key={job.title} job={job} />
        ))}
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
