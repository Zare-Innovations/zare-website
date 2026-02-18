"use client";

import React from "react";
import ProjectCard from "./project-card";
import { Carousel, CarouselSlide } from "@mantine/carousel";
import projectClasses from "./projects.module.css";
import type { ProjectsList } from "@/data/projects";

export default function ProjectCategory({ category }: { category: ProjectsList }) {

  const isWeb = category.category === 'Website development';

  return (
    <div className="w-full " id={category.category.trim().split(" ").join("-")}>
      <div className="flex flex-col items-start gap-2">
        <h2 className="text-2xl sm:text-[32px] font-bold">
          {category.category}
        </h2>
        <p className="text-[#6C6C6C]">{category.description}</p>
      </div>
      <div className={`${projectClasses.carouselWrapper} w-full mt-10`}>
        <Carousel
          classNames={projectClasses}
          withIndicators
          slideSize={{ base: "100%", md: "100%" }}
          slideGap={{ base: "sm", sm: "md", md: "lg" }}
          withControls={true}
          height="100%"
          className="w-full"
          controlSize={40}
          styles={{
            indicators: {
              top: "-24px",
              zIndex: "100",
              gap: "5px"
            },
            indicator: {
              height: "9px"
            }
          }}
        >
          {category.projects.map((project, index) => (
            <CarouselSlide key={index} className="h-full py-8">
              <ProjectCard project={project} isWeb={isWeb} />
            </CarouselSlide>
          ))}
        </Carousel>
      </div>
    </div>
  );
}
