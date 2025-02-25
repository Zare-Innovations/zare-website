"use client";
import { Carousel } from "@mantine/carousel";
import { Divider, Flex, Stack } from "@mantine/core";
import Image from "next/image";

const testmonialsData = [
  {
    logo: "/testimonials/ubutix.png",
    description:
      "The UI/UX designer just gets it. What you see on the surface is a quiet, methodical guy that absorbs carefully and asks a few considered questions. But good lord - it’s underpinned by a profound depth of knowledge and vigilant understanding of what we’re trying to achieve on a strategic level. That means the output is incredibly considered and bang on the money the first time. He does a lot of thinking for us, and for that we’re hugely grateful and proud to have him on the team.",
    backgroundColor: "#0a293b",
    textColor: "white",
  },
  {
    logo: "/testimonials/exelia.png",
    description:
      "Wanted to give you feedback on the UI/UX Designer we hired through Zare, we are all very impressed with his designs, his professionalism, and how well he manages relationships with our clients. He is a diamond and we are extremely happy to have him as part of the Exelia family, thank you",
    backgroundColor: "#c2410c",
    textColor: "white",
  },
  {
    logo: "/testimonials/keysquare.png",
    description:
      "Great experience with Zare; we have one of the most talented engineers to work with, couldn't be happier!",
    backgroundColor: "#137bb3",
    textColor: "white",
  },
  {
    logo: "/testimonials/pickrell.png",
    description:
      "The front-end developer we hired through Zare Innovations has been a great addition to our team—reliable, skilled, and a solid contributor. We’ve also been impressed with how Zare proactively managed performance, making sure their developers meet expectations. A great partner to work with!",
    backgroundColor: "#a6aca9",
    textColor: "black",
  },
];

export default function Testimonials() {
  return (
    <Stack className="items-center p-12">
      <Flex className="flex-col gap-2 mx-auto">
        <p className="text-center font-bold text-2xl">Testimonials</p>
        <p className="font-semibold">What Our Clients Say About Us</p>
        <Divider size="sm" className="w-full" color="cyan" />
      </Flex>
      <Flex className="flex-wrap gap-20 mt-6 mb-6 h-full">
        <Carousel
          align="start"
          withIndicators
          slideSize="50%"
          slideGap="lg"
          withControls={false}
          height="100%"
          style={{ flex: 1 }}
          styles={{
            indicators: {
              bottom: '-40px',
              gap: '5px',
              fill: "black",
            //   backgroundColor: "black",
              width: "fit-content",
              margin: "auto",
            },
            indicator: {
                backgroundColor: "#0a293b",
            },
          }}
        >
          {testmonialsData?.map((testimonial, index) => (
            <Carousel.Slide key={index}>
              <Flex
                key={index}
                className={`rounded-lg gap-12 h-full bg-[${testimonial.backgroundColor}]  flex-col text-${testimonial?.textColor} p-8`}
                style={{ backgroundColor: testimonial?.backgroundColor }}
              >
                <Flex className="justify-between items-center">
                  <Image
                    alt="logo-1"
                    src={testimonial.logo}
                    width={200}
                    height={100}
                    className="w-40"
                    unoptimized
                  />
                  <Image
                    src={"/testimonials/quote-mark.png"}
                    height={200}
                    width={150}
                    alt="logo-2"
                    className="w-40"
                    unoptimized
                  />
                </Flex>
                <p>{testimonial.description}</p>
              </Flex>
            </Carousel.Slide>
          ))}
        </Carousel>
        {/* <Flex className="rounded-lg gap-8 bg-[#0A293B] w-1/3 flex-col text-white p-8">
          <Flex className="justify-between items-center">
            <Image
              alt="logo-2"
              src={"/testimonials/ubutix.png"}
              width={200}
              height={100}
              className="w-1/3"
              unoptimized
            />
            <Image
              src={"/testimonials/quote-mark.png"}
              height={200}
              width={150}
              alt="logo-2"
              className="w-1/3"
              unoptimized
            />
          </Flex>
          <p>
          {testmonialsData[1].description}
          </p>
        </Flex> */}
      </Flex>
    </Stack>
  );
}
