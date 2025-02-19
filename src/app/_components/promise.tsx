import { Flex, Stack } from "@mantine/core";
import Illustration from "./illustration.png";
import Image from "next/image";
import { IconCircleCheckFilled } from "@tabler/icons-react";

const promises = [
  {
    title: "Tailored Solutions for Your Growth",
    description:
      "Our solutions are designed to evolve with your business, ensuring continuous growth and efficiency.",
  },
  {
    title: "Consistent Quality",
    description:
      "From customer support to software development, we offer end-to-end services to streamline your operations.",
  },
  {
    title: "Client-Focused Approach",
    description:
      "Your success is our priority. We take the time to understand your goals and work tirelessly to help you achieve them.",
  },
];

export default function Promise() {
  return (
    <Stack className="px-24">
      <Flex className="flex-row gap-6 items-center">
        <Stack className="gap-4 w-1/2">
          <p className="text-4xl md:text-6xl font-semibold">
            Our <span className="text-cyan-500">Promise</span> To You
          </p>
          <Stack className="gap-4 mt-4">
            {promises.map((promise, index) => (
              <Flex className="gap-3 flex-col" key={index}>
                <Flex className="gap-3 items-center">
                  <IconCircleCheckFilled color="#0A293B" />
                  <p className="text-xl font-semibold">{promise.title}</p>
                </Flex>
                <p className="text-lg">{promise.description}</p>
              </Flex>
            ))}
          </Stack>
        </Stack>
        <Image
          width={500}
          height={500}
          src={Illustration.src}
          alt="illustration"
          className="mx-auto"
        />
      </Flex>
    </Stack>
  );
}
