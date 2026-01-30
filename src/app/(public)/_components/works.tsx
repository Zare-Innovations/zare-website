"use client";
import { Flex, Stack } from "@mantine/core";
import Link from "next/link";
import { Project } from "../our-work/page";
import ProjectCard from "../our-work/_components/project-card";

const projects: Project[] = [
  {
    title: "Pickrell Global Technologies",
    location: "Pennsylvania, USA",
    details: {
      challenge:
        "The client needed to expand its software team but was hindered by the high overhead costs and intense competition for talent in the USA.",
      solution:
        "Sourced, vetted, and recruited three full-time remote software developers from Ethiopia, creating a cost-effective and highly skilled global talent pipeline.",
      results:
        "Successfully integrated three high-performing developers into the client's team, cutting talent overhead costs by over 50% while exceeding all performance expectations.",
    },
    about: {
      link: "https://pickrellglobaltechnologies.com/",
      name: "Pickrell Global Technologies",
      logo: '/our-work/logos/pickrell.png',
      image: '/our-work/shots/pickrell.png',
    },
  },
  {
    title: "Pharmaceutical Dashboard Design and Development",
    details: {
      challenge:
        "The client had a powerful pharmacy tracking system but lacked the UI/UX expertise to create a user-friendly dashboard for it.",
      solution:
        "Provided end-to-end UI/UX design and frontend implementation for a comprehensive pharmaceutical operations dashboard, turning complex data into a clean and intuitive interface.",
      results:
        "Delivered an intuitive dashboard that streamlined pharmacy operations. The enhanced UI led to increased user engagement and greater data accessibility for faster decision-making."
    },
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
    details: {
      challenge:
        "Inefficient internal processes and a lack of centralized data management were hindering operational scalability and creating data silos.",
      solution: `
       Developed a custom, all-in-one CRM/ERP tool tailored for internal use. The platform facilitates:
      - Onboarding and employee metrics tracking
      - Financial management and invoicing
      - Lead and client relationship management
      - Project management and resource allocation
      `,
      results:
        "Significantly enhanced operational efficiency, improved data visibility across all departments, and streamlined core business processes from HR to finance and project delivery."
    },
    location: "Addis Ababa, Ethiopia",
    about: {
      link: "https://www.251communications.com/",
      name: " 251 Marketing & Communications",
      logo: "/our-work/251-logo.png",
      image: "/our-work/251-dashboard.png"
    }
  }
];

export default function Works() {
  return (
    <Stack
      className="relative md:p-12 gap-4 sm:gap-7 items-center max-sm:px-5 max-md:px-16 max-md:py-10 "
      id="services"
    >
      <Flex className="flex flex-col mx-auto gap-3 sm:gap-5 text-center">
        <p className="text-2xl sm:text-3xl md:text-5xl font-semibold text-center uppercase">
          SOFTWARE THAT SHIPS, TEAMS THAT SCALE.
        </p>
        <p className="text-xs sm:text-sm text-[#6C6C6C]">
          Build AI-powered applications and enterprise platforms with us, or scale your engineering team with lean full-stack talent from Ethiopia. Modern solutions, real results, half the cost.
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
