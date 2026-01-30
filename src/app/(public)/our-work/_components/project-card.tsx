import Image from "next/image";
import Link from "next/link";
import { Project } from "../page";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="w-full flex flex-col-reverse min-[884px]:flex-row gap-6 sm:gap-8 p-5 sm:p-8 lg:p-10 rounded-lg bg-white shadow-md border border-cyan-950/10">
      <div className="w-full flex flex-col gap-4 justify-between flex-1 min-w-0">
        <div className="flex flex-row items-start min-[884px]:flex-col justify-between gap-4">
          <Image
            src={project.about.logo}
            alt={`${project.about.name} logo`}
            width={100}
            height={60}
            className="w-[70px] sm:w-[100px] h-auto flex-shrink-0"
          />
          <h3 className="text-start text-lg min-[500px]:text-2xl sm:text-3xl font-bold text-black">
            {project.title}
          </h3>
        </div>

        <div className="flex flex-col gap-2.5">
          <p className="text-sm sm:text-base xl2:text-lg text-[#6C6C6C] leading-relaxed">
            <span className="font-medium text-black/75">Challenge: </span>
            {project.details.challenge}
          </p>
          <p className="text-sm sm:text-base xl2:text-lg text-[#6C6C6C] leading-relaxed">
            <span className="font-medium text-black/75">Solution: </span>
            {project.details.solution}
          </p>
          <p className="text-sm sm:text-base xl2:text-lg text-[#6C6C6C] leading-relaxed">
            <span className="font-medium text-black/75">Results: </span>
            {project.details.results}
          </p>
        </div>

        <div className="flex gap-1 flex-wrap text-sm sm:text-base text-[#4A4A4A] mt-2 uppercase">
          <span className="w-max">{project.location}</span>
          <span className="mx-2">|</span>
          <Link
            href={project.about.link}
            target="_blank"
            rel="noopener noreferrer"
            className="w-max font-medium transition-colors duration-300 hover:text-cyan-500"
          >
            {project.about.name.toUpperCase()}
          </Link>
        </div>
      </div>

      <div className="w-full min-[884px]:flex-1 flex items-center justify-center min-w-0">
        <Image
          src={project.about.image}
          alt={`${project.title} screenshot`}
          width={1200}
          height={800}
          className="w-full max-h-[300px] min-[884px]:max-h-[400px] object-cover min-[884px]:object-contain rounded-lg"
        />
      </div>
    </article>
  );
}
