import { Flex, Stack } from "@mantine/core";
import Image from "next/image";
import future from "../../../../public/assets/future.png";

export default function Empowering() {
  return (
    <Stack id="aboutUs">
      <Flex className="gap-8 flex-col sm:flex-row items-center">
        <div className="relative w-1/2 flex items-center justify-center">
          <Image
            src={future}
            alt="Build your future with us!"
            className="scale-100 sm:scale-90"
          />
        </div>
        <div className="flex flex-col gap-4 lg:gap-6 sm:w-1/2 md:pr-8 px-4">
          <p className="text-2xl sm:text-3xl md:text-5xl text-center font-semibold sm:text-left  max-w-full break-words">
            Bridging Worlds,
            <span className="text-cyan-500"> Building Futures.</span>
          </p>
          <p className="text-center sm:text-left text-sm md:text-base">
            At Zare Innovations, our mission goes beyond traditional Business
            Process Outsourcing (BPO) solutions. We are dedicated to creating
            impactful opportunities by drastically reducing unemployment across
            Ethiopia, while delivering exceptional, cost-effective services to
            businesses worldwide.
          </p>
          <p className="text-center sm:text-left text-sm md:text-base">
            With a base in Addis Ababa and representation in the USA, our
            mission is twofold: driving sustainable growth across Ethiopia by
            creating jobs and connecting businesses globally through superior
            BPO services. Together, we aim to build a future where innovation
            and talent from Ethiopia help power the global economy.
          </p>
        </div>
      </Flex>
    </Stack>
  );
}
