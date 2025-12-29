import { Card, Flex, Stack } from "@mantine/core";
import Image from "next/image";
import project1 from "../../../../public/projects/project1.png";
import project2 from "../../../../public/projects/project2.png";
import project3 from "../../../../public/projects/project3.png";
import project4 from "../../../../public/projects/project4.png";

import {
  Tilt,
  TiltContent
} from "@/components/animate-ui/primitives/effects/tilt";


function TiltImg({imgUrl}:{imgUrl: string}) {
  return (
    <Tilt className="w-full" maxTilt={20} perspective={1000}>
      <TiltContent asChild>
        <Card className="w-full p-0 gap-2">
          <Image
            src={imgUrl}
            width={500}
            height={500}
            alt="project-shot"
            className="mx-auto flex-1 w-full h-auto"
          />
        </Card>
      </TiltContent>
    </Tilt>
  );
}

export default function ProjectsOverview() {
  return (
    <Stack className="px-5 md:px-16 my-8" id="about">
      <Flex className="grid grid-cols-2 gap-4 items-center">
        {[project1, project3, project4, project2].map((project, index) => (
          <TiltImg key={index} imgUrl={project.src} />
        ))}
      </Flex>
    </Stack>
  );
}
