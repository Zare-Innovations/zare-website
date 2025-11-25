'use client';
import { Button, Flex, Stack } from '@mantine/core';
import Link from 'next/link';
import React, { useEffect } from 'react';
import Image from 'next/image';


export default function Empower() {

    const features = [
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


  return (
    <Stack id="aboutUs">
      <Flex className="gap-8 flex-col lg:flex-row items-center">
        <div className="w-full flex lg:w-1/2 justify-center">

          <Image
            src={'/see.svg'}
            width={600}
            height={600}
            alt="vision image"
            className="ml-auto"
          />
        </div>
        <div className="flex flex-col gap-12 lg:gap-8 lg:w-1/2 md:pr-8 px-4">
          <p className="text-5xl text-center lg:text-left md:text-6xl font-semibold  max-w-full break-words">
            Bridging Worlds,
            <span className="text-cyan-500"> Building Futures</span>
          </p>
          <p className="text-center md:text-left">
           At Zare Innovations, our mission goes beyond traditional Business Process Outsourcing (BPO) solutions. We are dedicated to creating impactful opportunities by drastically reducing unemployment across Ethiopia, while delivering exceptional, cost-effective services to businesses worldwide.
With a base in Addis Ababa and representation in the USA, our mission is twofold: driving sustainable growth across Ethiopia by creating jobs and connecting businesses globally through superior BPO services. Together, we aim to build a future where innovation and talent from Ethiopia help power the global economy.
          </p>



          <Link
            href="https://calendly.com/emanuel-ypgh/30min?month=2025-02"
            className="mx-auto md:ml-0"
            target="_blank"
          >
            <Button size="lg">Book a Consulation</Button>
          </Link>
        </div>
      </Flex>



            <Flex className="gap-8 flex-col lg:flex-row items-center">
 
        <div className="flex flex-col gap-12 lg:gap-8 lg:w-1/2 md:pr-8 px-4">
          <p className="text-5xl text-center lg:text-left md:text-6xl font-semibold  max-w-full break-words">
            Our Commitment to,
            <span className="text-cyan-500"> Your Success</span>
          </p>
     
      <div className="max-w-4xl mx-auto flex flex-col gap-8">
        {features.map((feature, index) => (
          <div key={index} className="flex items-start gap-4">
            <div className="flex-shrink-0 mt-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="text-cyan-500 w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M9 12l2 2 4-4" />
                <circle cx="12" cy="12" r="10" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
              <p className="text-gray-600 mt-1 text-base leading-relaxed">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>


          <Link
            href="https://calendly.com/emanuel-ypgh/30min?month=2025-02"
            className="mx-auto md:ml-0"
            target="_blank"
          >
            <Button size="lg">Book a Consulation</Button>
          </Link>
        </div>


               <div className="w-full flex lg:w-1/2 justify-center">

          <Image
            src={'/growth.svg'}
            width={600}
            height={600}
            alt="vision image"
            className="ml-auto"
          />
        </div>
      </Flex>
    </Stack>
  );
}
