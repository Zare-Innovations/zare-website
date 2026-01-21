import { Flex, Stack } from "@mantine/core";
import Image from "next/image";
import { IconChecks } from "@tabler/icons-react";
import success from "../../../../public/assets/success.png";
import Link from "next/link";
import { consultationLink } from "@/constants";

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
    <Stack className="px-5 md:px-16 my-8 pt-10 sm:pt-5" id="about">
      <Flex className="sm:flex-row flex-col-reverse gap-4 md:gap-6 sm:items-center">
        <div className="flex flex-col max-sm:items-center gap-3 lg:w-1/2">
          <p className="text-2xl sm:text-3xl md:text-5xl font-semibold text-center sm:text-start uppercase">
            Our Commitment to{" "}
            <span className="text-cyan-500">Your Success</span>
          </p>
          <Stack className=" px-8 lg:px-0 mt-4">
            {promises.map((promise, index) => (
              <Flex
                className="gap-1 flex-col items-center sm:items-start"
                key={index}
              >
                <Flex className="gap-3 items-center text-center lg:text-start">
                  <IconChecks color="#10CFD1" className="sm:block hidden" />
                  <p className="text-base sm:text-lg font-semibold text-center sm:text-start">
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
            href={consultationLink}
            target="_blank"
            className={`w-max flex items-center gap-3 text-center rounded-md px-3 min-[500px]:px-5 sm:px-8 text-xs mt-4 min-[430px]:text-sm min-[500px]:text-base py-2 sm:py-3 bg-cyan-950 text-white hover:bg-[#10CFD1] transition-all duration-300`}
          >
            Book a consultation
          </Link>
          
        </div>
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
