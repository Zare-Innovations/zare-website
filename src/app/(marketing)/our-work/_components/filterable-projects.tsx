"use client";

import React, { useState } from "react";
import Hero from "./hero";
import { projectCategories } from "@/data/projects";
import ProjectCategory from "./project-category";
import Projectfilter from "./project-filter";

export default function FilterableProjects() {
  const [category, setCategory] = useState<string | null>(null);

  const filteredResults =
    category === null
      ? projectCategories
      : projectCategories.filter((c) => c.category === category);

  const selectCategory = (cat: string | null) => {
    setCategory((prev) => (cat === prev ? null : cat));
  };

  return (
    <>
      <Hero>
        <Projectfilter
          category={category}
          selectCategory={selectCategory}
          categories={projectCategories.map((cat) => cat.category)}
        />
      </Hero>
      <div className="flex flex-col items-center gap-12 px-5 md:px-16 py-10 md:py-16">
        {filteredResults.map((category, index) => (
          <ProjectCategory key={index} category={category} isFirstCategory={index === 0} />
        ))}
      </div>
    </>
  );
}
