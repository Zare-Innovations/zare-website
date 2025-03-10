import { Flex, Stack } from '@mantine/core';
import Illustration from './illustration.svg';
import Image from 'next/image';
import { IconCircleCheckFilled } from '@tabler/icons-react';

const promises = [
  {
    title: 'Tailored Solutions for Your Growth',
    description:
      'Our solutions are designed to evolve with your business, ensuring continuous growth and efficiency.',
  },
  {
    title: 'End-to-End Expertise',
    description:
      'From customer support and software development to data management and outsourcing, we deliver seamless, high-quality services designed to elevate your business.',
  },
  {
    title: 'Client-Focused Approach',
    description:
      'Your success is our priority. We take the time to understand your goals and work tirelessly to help you achieve them.',
  },
];

export default function Promise() {
  return (
    <Stack className="px-5 md:px-16 my-8" id="about">
      <Flex className="lg:flex-row flex-col gap-6 items-center">
        <Stack className="gap-4 lg:w-1/2">
          <p className="text-5xl md:text-6xl font-semibold text-center lg:text-start">
            Our <span className="text-cyan-500">Promise</span> To You
          </p>
          <Stack className="space-y-4 px-8 lg:px-0 mt-4">
            {promises.map((promise, index) => (
              <Flex
                className="gap-3 flex-col items-center lg:items-start"
                key={index}
              >
                <Flex className="gap-3 items-center text-center lg:text-start">
                  <IconCircleCheckFilled
                    color="#0A293B"
                    className="md:block hidden"
                  />
                  <p className="text-xl font-semibold text-center lg:text-start">
                    {promise.title}
                  </p>
                </Flex>
                <p className="text-lg text-center lg:text-start">
                  {promise.description}
                </p>
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
