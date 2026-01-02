"use client";
import { Card, Flex, Stack } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
interface Project {
  title: string;
  description: string;
  location: string;
  about: {
    link: string;
    name: string;
    logo: string;
    image: string;
  };
}

const projects: Project[] = [
  {
    title: "Pharmaceutical Dashboard Design and Development",
    description:
      "Designed and implemented a comprehensive pharmacy operations dashboard that streamlines daily workflows and strengthens compliance. The platform unifies a patient portal with centralized profiles, medication histories, refill requests, clinical notes, and secure messaging to enhance engagement and continuity of care.",
    location: "Addis Ababa, Ethiopia",
    about: {
      link: "https://medrafa.et/",
      name: "Medrafa",
      logo: "/our-work/madrafa-logo.png",
      image: "/our-work/medrafa.png"
    }
  },
  {
    title: "Custom Development for ERP Tool",
    description:
      "Developed a custom CRM/ERP tool tailored for internal use. The tool facilitates onboarding, employee and financial metrics tracking, invoice and payment request generation, lead and client management, and project management, significantly enhancing operational efficiency.",
    location: "Addis Ababa, Ethiopia",
    about: {
      link: "https://www.251communications.com/",
      name: " 251 Marketing & Communications",
      logo: "/our-work/251-logo.png",
      image: "/our-work/251-dashboard.png"
    }
  }
];

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <Card className="flex flex-col-reverse min-[884px]:flex-row gap-6 p-6 sm:p-8 lg:p-10">
      <Flex className="flex-col gap-4 justify-between flex-1 bg-white">
        <div className="flex flex-row items-start min-[884px]:flex-col justify-between gap-4">
          <Image
            src={project.about.logo}
            alt="Company logo"
            width={150}
            height={60}
            className="w-[150px] h-auto"
            unoptimized
          />
          <h3 className=" text-end min-[884px]:text-start text-lg min-[500px]:text-2xl sm:text-3xl lg:text-4xl font-bold text-black">
            {project.title}
          </h3>
        </div>

        <p className="text-sm sm:text-base text-[#6C6C6C] leading-relaxed">
          {project.description}
        </p>

        <div className="text-sm sm:text-base text-[#4A4A4A] mt-auto uppercase">
          <span>{project.location}</span>
          <span className="mx-2">|</span>
          <Link
            href={project.about.link}
            className="transition-all duration-300 hover:text-cyan-500"
          >
            <span className=" font-medium">
              {project.about.name.toUpperCase()}
            </span>
          </Link>
        </div>
      </Flex>
      <Flex className="flex-1 items-center justify-center">
        <Image
          src={project.about.image as string}
          alt={project.about.name}
          width={1200}
          height={800}
          className="w-full h-full object-contain rounded-lg"
          unoptimized
        />
      </Flex>
    </Card>
  );
};

export default function Works() {
  return (
    <Stack
      className="relative md:p-12 gap-4 sm:gap-7 items-center max-sm:px-5 max-md:px-16 max-md:py-10 "
      id="services"
    >
      <Flex className="flex flex-col mx-auto gap-3 sm:gap-5 text-center">
        <p className="text-2xl sm:text-3xl md:text-5xl font-semibold text-center uppercase">
          SOFTWARE SOLUTIONS BUILT TO SCALE
        </p>
        <p className="text-xs sm:text-sm text-[#6C6C6C]">
          From enterprise platforms to AI-powered applications, we deliver
          custom software solutions that solve real business challenges and
          drive measurable results.
        </p>
      </Flex>
      <Flex className="flex-col w-full gap-5 sm:gap-7 py-8">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </Flex>
      <Link
        href="/our-work"
        className={`w-max flex items-center gap-3 rounded-md px-2 min-[500px]:px-3 sm:px-6 text-xs  min-[430px]:text-sm min-[500px]:text-base py-2 sm:py-3 bg-cyan-950 text-white hover:bg-[#10CFD1] transition-all duration-300`}
      >
        View All Projects
      </Link>
    </Stack>
  );
}
