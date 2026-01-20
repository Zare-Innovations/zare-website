"use client";

import React from "react";
import ProjectCard from "./project-card";
import { Carousel, CarouselSlide } from "@mantine/carousel";
import projectClasses from "./projects.module.css";
import { Category } from "../page";

export default function ProjectCategory({ category }: { category: Category }) {
  return (
    <div className="w-full " id={category.category.trim().split(" ").join("-")}>
      <div className="flex flex-col items-start gap-2">
        <h2 className="text-2xl sm:text-[32px] font-bold">
          {category.category}
        </h2>
        <p className="text-[#6C6C6C]">{category.description}</p>
      </div>

      <Carousel
        classNames={projectClasses}
        withIndicators
        slideSize={{ base: "100%", md: "100%" }}
        slideGap={{ base: "sm", sm: "md", md: "lg" }}
        withControls={false}
        height="100%"
        className="w-full mt-10"
        controlSize={40}
        styles={{
          indicators: {
            top: "-24px",
            zIndex: "100",
            gap: "5px",
            width: "fit-content"
          },
          indicator: {
            height: "9px"
          },
          controls: {
            scale: "105%"
          },
          control: {
            backgroundColor: "cyan",
            color: "#9ca3af",
            border: "none"
          }
        }}
      >
        {category.projects.map((project, index) => (
          <CarouselSlide
            key={index}
            className="flex-col w-full gap-5 sm:gap-7 py-8 sm:px-10"
          >
            <ProjectCard project={project} />
          </CarouselSlide>
        ))}
      </Carousel>
    </div>
  );
}
