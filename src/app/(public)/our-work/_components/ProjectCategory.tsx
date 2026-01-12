import React from 'react';
import ProjectCard from './project-card';
import { ProjectsList } from "../page";
import { Flex } from "@mantine/core";

export default function ProjectCategory({
  projectList
}: {
  projectList: ProjectsList;
}) {
  return (
    <div
      className="w-full "
      id={projectList.category.trim().split(" ").join("-")}
    >
      <div className="flex flex-col items-start gap-2">
        <h2 className="text-2xl sm:text-[32px] font-bold">
          {projectList.category}
        </h2>
        <p className="text-[#6C6C6C]">{projectList.description}</p>
      </div>

      <Flex className="flex-col w-full gap-5 sm:gap-7 py-8">
        {projectList.projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </Flex>
    </div>
  );
}
