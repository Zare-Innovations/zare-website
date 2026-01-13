'use client';
import { useState } from "react";
import { Button, Flex } from "@mantine/core";
import Link from "next/link";
import Image from "next/image";
import ZareEstimatorModal from "./calculator-modal";

const testimonials = [
  {
    logo: "/testimonials/ubutix.png",
    description:
      "The UI/UX designer just gets it. What you see on the surface is a quiet, methodical guy that absorbs carefully and asks a few considered questions. But good lord - it’s underpinned by a profound depth of knowledge and vigilant understanding of what we’re trying to achieve on a strategic level. That means the output is incredibly considered and bang on the money the first time. He does a lot of thinking for us, and for that we’re hugely grateful and proud to have him on the team.",
   
 
  },
  {
    logo: "/testimonials/exelia.svg",
    description:
      "Wanted to give you feedback on the UI/UX Designer we hired through Zare, we are all very impressed with his designs, his professionalism, and how well he manages relationships with our clients. He is a diamond and we are extremely happy to have him as part of the Exelia family, thank you",
  
   
  },
  {
    logo: "/testimonials/keysquare.png",
    description:
      "Great experience with Zare; we have one of the most talented engineers to work with, couldn't be happier!",
  
  },
  {
    logo: "/testimonials/pickrell.svg",
    description:
      "The front-end developer we hired through Zare Innovations has been a great addition to our team—reliable, skilled, and a solid contributor. We’ve also been impressed with how Zare proactively managed performance, making sure their developers meet expectations. A great partner to work with!",
  
  },
];

export default function TestimonialSliderText() {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () =>
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  // Touch swipe logic
  let touchStartX = 0;
  let touchEndX = 0;

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX = e.targetTouches[0].clientX;
  };

const handleTouchEnd = () => {
  const swipeDistance = touchStartX - touchEndX;
  if (Math.abs(swipeDistance) < 50) return;

  if (swipeDistance > 50) {
    next();
  } else {
    prev();
  }
};
  const current = testimonials[index];

  return (
    <div
      className="flex flex-col items-center max-w-8xl mx-auto p-8 md:p-12 text-center select-none"

      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Quote container */}
      <div className="relative w-full">
        <span className="absolute -top-10 left-0 text-[7rem] text-gray-200 select-none leading-[0.6]">
          “
        </span>
        <span className="absolute -bottom-10 right-0 text-[7rem] text-gray-200 select-none leading-[0.6]">
          ”
        </span>

        {/* FIXED HEIGHT TEXT BLOCK */}
        <div className="h-[200px] flex items-center">
          <p
            key={index}
            className="text-md md:text-md leading-relaxed italic opacity-90 px-6 transition-opacity duration-300 ease-in-out"
         
          >
            {current.description}
          </p>
        </div>
      </div>

      {/* Company Logo + Navigation */}
      <div className="flex items-center gap-6 mt-10">
        <button
          onClick={prev}
          className="text-3xl hover:opacity-60 transition select-none"
         
        >
          ❮
        </button>

        {/* COMPANY LOGO (REPLACES TEXT) */}
        <Image
          src={current.logo}
          alt="Company Logo"
          width={120}
          height={60}
          className="object-contain mx-2"
        />

        <button
          onClick={next}
          className="text-3xl hover:opacity-60 transition select-none"
        
        >
          ❯
        </button>
      </div>

      {/* CTA Buttons */}
      <Flex className="gap-4 mt-8 flex-wrap justify-center">
        <Link
          href="https://calendly.com/emanuel-ypgh/30min?month=2025-02"
          target="_blank"
        >
          <Button size="lg">Book a Consultation</Button>
        </Link>
        <ZareEstimatorModal />
      </Flex>
    </div>
  );
}
