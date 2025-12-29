import { Button, Flex, Stack } from "@mantine/core";
import Image from "next/image";
import { IconChecks } from "@tabler/icons-react";
import success from "../../../../public/assets/success.png";
import Link from "next/link";

const promises = [
  {
    title: "Tailored Solutions for Your Growth",
    description:
      "Our solutions are designed to evolve with your business, ensuring continuous growth and efficiency."
  },
  {
    title: "End-to-End Expertise",
    description:
      "From customer support and software development to data management and outsourcing, we deliver seamless, high-quality services designed to elevate your business."
  },
  {
    title: "Client-Focused Approach",
    description:
      "Your success is our priority. We take the time to understand your goals and work tirelessly to help you achieve them."
  }
];

export default function Promise() {
  return (
    <Stack className="px-5 md:px-16 my-8" id="about">
      <Flex className="sm:flex-row flex-col-reverse gap-4 md:gap-6 items-center">
        <Stack className="gap-3 lg:w-1/2">
          <p className="text-2xl sm:text-3xl md:text-5xl font-semibold text-center sm:text-start uppercase">
            Our Commitment to{" "}
            <span className="text-cyan-500">Your Success</span>
          </p>
          <Stack className="space-y-2 px-8 lg:px-0 mt-4">
            {promises.map((promise, index) => (
              <Flex
                className="gap-1 flex-col items-center sm:items-start"
                key={index}
              >
                <Flex className="gap-3 items-center text-center lg:text-start">
                  <IconChecks color="#10CFD1" className="sm:block hidden" />
                  <p className="text-base sm:text-lg md:text-xl font-semibold text-center sm:text-start">
                    {promise.title}
                  </p>
                </Flex>
                <p className="text-sm sm:text-base md:text-lg text-center sm:text-start">
                  {promise.description}
                </p>
              </Flex>
            ))}
          </Stack>
          <Link
            href="https://calendly.com/emanuel-ypgh/30min?month=2025-02"
            className="mx-auto sm:ml-0 sm:mt-2"
            target="_blank"
          >
            <Button size="lg">Book a Consulation</Button>
          </Link>
        </Stack>
        <Image
          width={500}
          height={500}
          src={success.src}
          alt="illustration"
          className="mx-auto"
        />
      </Flex>
    </Stack>
  );
}
