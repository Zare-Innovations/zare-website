import React from 'react';
import Hero from './_components/hero';
import { projectCategories } from "@/data/projects";
import ProjectCategory from "./_components/ProjectCategory";
export interface Project {
  title: string;
  details: {
    challenge: string;
    solution: string;
    results: string;
  };
  location: string;
  about: {
    link: string;
    name: string;
    logo: string;
    image: string;
  };
}

export interface ProjectsList {
  category: string;
  description: string;
  projects: Project[];
}

export default function OurWork() {
  return (
    <main>
      <Hero />
      <div className="flex flex-col items-center gap-12 px-5 md:px-16 py-10 md:py-16">
        {projectCategories.map((category, index) => (
          <ProjectCategory key={index} projectList={category} />
        ))}
      </div>
    </main>
  );
}
