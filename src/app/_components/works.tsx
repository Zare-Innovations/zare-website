'use client';
import { Divider, Flex, Stack } from '@mantine/core';
import Image from 'next/image';
import WorksFrame1 from './works-frame-1.png';
import WorksFrame2 from './frame-2.png';
import WorksFrame3 from './frame-3.png';
import WorksFrame4 from './frame-4.png';
import WorksBg from './works-bg.png';
import { IconArrowUpRight } from '@tabler/icons-react';
import { Carousel } from '@mantine/carousel';
import Link from 'next/link';
import carouselClassNames from './our-work.module.css';

const works = [
  {
    title: 'HR Outsourcing',
    src: WorksFrame1,
    image: '/our-work/recruitment.png',
    anchor: 'hr-outsourcing',
  },
  {
    title: 'Software Development',
    src: WorksFrame2,
    image: '/our-work/dashboard-overview.png',
    anchor: 'software-development',
  },
  {
    title: 'Technology Consulting',
    image: '/our-work/technical-consulting.png',
    src: WorksFrame4,
    anchor: 'technology-consulting',
  },
  {
    title: 'Data Engineering & Insights',
    src: WorksFrame3,
    image: '/our-work/data-engineering.png',
    anchor: 'data-engineering',
  },
];

export default function Works() {
  return (
    <Stack
      className="min-h-[40dvh] w-full p-3 md:p-8 items-center text-white overflow-hidden"
      style={{
        backgroundImage: `url(${WorksBg.src})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundColor: '#1e293b',
      }}
    >
      <p className="text-4xl font-semibold text-center">Our Work</p>
      <Flex className="w-full gap-16 py-8 mt-16 h-[50%]">
        <Carousel
          className="w-full"
          classNames={carouselClassNames}
          controlSize={40}
          align="start"
          withControls={true}
          containScroll="trimSnaps"
          withIndicators
          slideSize={{ base: '100%', sm: '50%', md: '33%', lg: '33%' }}
          slideGap={{ base: 'sm', sm: 'md', md: 'lg', lg: 100 }}
          height="100%"
          styles={{
            indicators: {
              bottom: '-40px',
              gap: '5px',
              width: 'fit-content',
              margin: 'auto',
            },
            indicator: {
              height: '9px',
              fill: 'white',
            },
            controls: {
              scale: '105%',
            },
            control: {
              backgroundColor: 'white',
              color: 'black',
            },
          }}
        >
          {works?.map((work, index) => (
            <Carousel.Slide key={index}>
              <Flex
                key={`work-${index}`}
                className="relative flex-col gap-4 h-full border-white/40 border-2 rounded-[32px] bg-[#ffffff10]"
              >
                <p className="p-4 text-xl font-semibold">{work.title}</p>
                <Divider size="sm" className="bg-white/40" />

                <div className="clip-path bg-white">
                  <svg width="0" height="0">
                    <defs>
                      <clipPath
                        id="curveClip"
                        clipPathUnits="objectBoundingBox"
                      >
                        <path
                          d="M0,0 
                          L0,1 L0.65,1 
                          A0.1,0.1 0,0 0.75,0.9
                          
                          L0.75,0.8
                          A0.1,0.1 0,0 1 0.85,0.7

                          A0.15,0.15 0,0 0 1,0.55                                                                                  
                          L1,0 Z"
                        />
                      </clipPath>
                    </defs>
                  </svg>

                  <Image
                    src={work.src.src}
                    width={4000}
                    height={4200}
                    alt="Frame 1"
                    className="w-full"
                  />
                </div>

                <div className="w-28 h-28 flex items-center justify-center rounded-tl-full absolute bottom-0 right-0 z-10">
                  <Link
                    href={`/our-works#${work.anchor}`}
                    className="flex items-center justify-center rounded-full bg-cyan-400 w-12 aspect-square h-12 p-2"
                  >
                    <IconArrowUpRight width={40} height={40} color="white" />
                  </Link>
                </div>
              </Flex>
            </Carousel.Slide>
          ))}
        </Carousel>
      </Flex>
    </Stack>
  );
}
