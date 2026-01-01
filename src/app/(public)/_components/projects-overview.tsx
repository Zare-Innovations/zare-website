import { Card, Stack } from "@mantine/core";
import Image from "next/image";
import project1 from "../../../../public/projects/project1.png";
import project2 from "../../../../public/projects/project2.png";
import project3 from "../../../../public/projects/project3.png";
import project4 from "../../../../public/projects/project4.png";

import {
  Tilt,
  TiltContent
} from "@/components/animate-ui/primitives/effects/tilt";

function TiltImg({ imgUrl }: { imgUrl: string }) {
  return (
    <Tilt className="w-full h-full " maxTilt={10} perspective={600}>
      <TiltContent
        asChild
        className="rounded-md overflow-hidden max-sm:shadow-[0.5px_0.5px_5px_1px_rgba(0,0,0,0.2)]"
      >
        <Card className="w-full h-full p-0 flex items-center justify-center overflow-hidden">
          <div className="relative w-full aspect-[4/2]">
            <Image
              src={imgUrl}
              fill
              alt="project-shot"
              className="object-cover w-full h-full"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </Card>
      </TiltContent>
    </Tilt>
  );
}

export default function ProjectsOverview() {
  return (
    <Stack className="px-5 md:px-16 my-8" id="about">
      <div className="grid grid-cols-2 gap-y-4 sm:gap-4 lg:px-20">
        {[project1, project3, project4, project2].map((project, index) => (
          <div
            className={`w-full h-full min-h-0 ${index === 0 && " max-sm:translate-x-6"} ${index === 1 && "max-sm:-translate-y-6 max-sm:-translate-x-6"} ${index === 3 && " max-sm:-translate-x-6"} ${index === 2 && " max-sm:translate-y-6 max-sm:translate-x-6"}`}
            key={index}
          >
            <TiltImg imgUrl={project.src} />
          </div>
        ))}
      </div>
    </Stack>
  );
}
