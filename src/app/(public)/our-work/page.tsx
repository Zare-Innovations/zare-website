"use client";

import React, { useState } from "react";
import Hero from "./_components/hero";
import { projectCategories } from "@/data/projects";
import ProjectCategory from "./_components/ProjectCategory";
import Projectfilter from "./_components/project-filter";
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

export interface Category {
  category: string;
  description: string;
  projects: Project[];
}

export default function OurWork() {
  const [category, setCategory] = useState<string | null>(null);

  const filteredResults =
    category === null
      ? projectCategories
      : projectCategories.filter((c) => c.category === category);

  const selectCategory = (cat: string | null) => {
    setCategory((prev) => (cat === prev ? null : cat));
  };

  return (
    <main>
      <Hero>
        <Projectfilter
          category={category}
          selectCategory={selectCategory}
          categories={projectCategories.map((cat) => cat.category)}
        />
      </Hero>
      <div className="flex flex-col items-center gap-12 px-5 md:px-16 py-10 md:py-16">
        {filteredResults.map((category, index) => (
          <ProjectCategory key={index} category={category} />
        ))}
      </div>
    </main>
  );
}
