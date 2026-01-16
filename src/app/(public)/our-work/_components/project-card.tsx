import { Card, Flex } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Project } from "../page";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="flex flex-col-reverse min-[884px]:flex-row gap-6 p-6 sm:p-8 lg:p-10">
      <Flex className="flex-col gap-4 justify-between flex-1 bg-white">
        <div className="flex flex-row items-start min-[884px]:flex-col justify-between gap-4">
          <Image
            src={project.about.logo}
            alt="Company logo"
            width={100}
            height={60}
            className="w-[100px] h-auto"
          />
          <h3 className=" text-end min-[884px]:text-start text-lg min-[500px]:text-2xl sm:text-3xl font-bold text-black">
            {project.title}
          </h3>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-sm sm:text-base text-[#6C6C6C] leading-relaxed">
            <span className="font-medium">Challenge: </span>
            {project.details.challenge}
          </p>
          <p className="text-sm sm:text-base text-[#6C6C6C] leading-relaxed">
            <span className="font-medium">Solution: </span>
            {project.details.solution}
          </p>
          <p className="text-sm sm:text-base text-[#6C6C6C] leading-relaxed">
            <span className="font-medium">Results: </span>
            {project.details.results}
          </p>
        </div>
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
}
