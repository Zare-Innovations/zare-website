"use client";
import { Carousel } from "@mantine/carousel";
import { Flex } from "@mantine/core";
import Image from "next/image";
import carouselClassNames from "./testimonials.module.css";
import quote from "../../../../public/testimonials/quote.png";
import Link from "next/link";

const testmonialsData = [
  {
    logo: "/testimonials/ubutix.png",
    content: (
      <p>
        The UI/UX designer <b>just gets it</b>. What you see on the surface is a
        quiet, methodical guy that absorbs carefully and asks a few considered
        questions. But good lord - it’s underpinned by a{" "}
        <b>profound depth of knowledge and vigilant understanding</b> of what
        we’re trying to achieve on a strategic level. That means the output is
        incredibly considered and bang on the money the first time.{" "}
        <b>He does a lot of thinking for us</b>, and for that we’re hugely
        grateful and proud to have him on the team.
      </p>
    )
  },
  {
    logo: "/testimonials/exelia.png",
    content: (
      <p>
        Wanted to give you feedback on the UI/UX Designer we hired through Zare,
        <b>we are all very impressed with his designs, his professionalism</b>,
        and how well he manages relationships with our clients. He is a{" "}
        <b>diamond and we are extremely happy</b> to have him as part of the
        Exelia family, thank you
      </p>
    )
  },
  {
    logo: "/testimonials/keysquare.png",
    content: (
      <p>
        Great experience with Zare; we have one of the most talented engineers
        to work with, couldn&apos;t be happier!
      </p>
    )
  },
  {
    logo: "/testimonials/pickrell.png",
    content: (
      <p>
        The developers we hired through Zare Innovations has been a{" "}
        <b>
          great addition to our team—reliable, skilled, and a solid contributor
        </b>
        . We&apos;ve also been impressed with how Zare proactively managed
        performance, making sure their developers meet expectations. A great
        partner to work with!
      </p>
    )
  }
];

export default function Testimonials() {
  return (
    <Flex className="bg-[#F5F7FB] flex-col gap-6 mb-6 -mt-4 h-full pb-12">
      <Carousel
        classNames={carouselClassNames}
        withIndicators
        slideSize={{ base: "100%", md: "100%" }}
        slideGap={{ base: "sm", sm: "md", md: "lg" }}
        withControls={true}
        height="100%"
        className="w-full max-w-[90vw] mx-auto"
        controlSize={40}
        styles={{
          indicators: {
            bottom: "-30px",
            gap: "5px",
            width: "fit-content",
            margin: "auto"
          },
          indicator: {
            height: "9px"
          },
          controls: {
            scale: "105%"
          },
          control: {
            backgroundColor: "transparent",
            color: "#9ca3af",
            border: "none"
          }
        }}
      >
        {testmonialsData?.map((testimonial, index) => (
          <Carousel.Slide key={index} className="w-screen p-2sm:p-5 lg:p-10">
            <Flex
              key={index}
              className="h-full relative flex-col items-center gap-8 justify-center "
            >
              {/* Main content - centered */}
              <Flex className="items-center justify-center gap-8 max-w-4xl w-full text-center relative z-10">
                <Image
                  src={quote}
                  height={250}
                  width={250}
                  alt="opening-quote"
                  className="self-start w-[24px] sm:w-[60px] lg:w-[90px] h-auto flex-shrink-0"
                  unoptimized
                />
                <div className="flex-1 text-xs sm:text-base lg:text-lg">
                  {testimonial.content}
                </div>
                <Image
                  src={quote}
                  height={250}
                  width={250}
                  alt="closing-quote"
                  className="self-end w-[24px] sm:w-[60px] lg:w-[90px] h-auto rotate-180 flex-shrink-0"
                  unoptimized
                />
              </Flex>
              <Image
                alt="company logo"
                src={testimonial.logo}
                width={200}
                height={100}
                className={`w-24 sm:w-40 mt-4 ${index === 1 ? "bg-[#0a293b]" : ""}`}
                unoptimized
              />
            </Flex>
          </Carousel.Slide>
        ))}
      </Carousel>
      <div className="self-center flex items-center gap-3 min-[500px]:gap-7 mt-10 sm:mt-14">
        {[
          { href: "", label: "Book a consultation", outlined: false },
          { href: "", label: "Compare Rates Instantly", outlined: true }
        ].map((link, index) => (
          <Link
            key={index}
            href={link.href}
            className={`w-max flex items-center gap-3 rounded-md px-2 min-[500px]:px-3 sm:px-6 text-xs  min-[430px]:text-sm min-[500px]:text-base ${link.outlined ? "py-[7px] sm:py-2.5 border-2 border-cyan-950 hover:border-[#10CFD1] hover:bg-[#10CFD1] hover:text-white" : "py-2 sm:py-3 bg-cyan-950 text-white hover:bg-[#10CFD1]"} transition-all duration-300`}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </Flex>
  );
}
