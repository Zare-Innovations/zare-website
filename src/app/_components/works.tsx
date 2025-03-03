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

const works = [
  {
    title: 'HR Outsourcing',
    image: WorksFrame1,
    anchor: 'hr-outsourcing',
  },
  {
    title: 'Software Development',
    image: WorksFrame2,
    anchor: 'software-development',
  },
  {
    title: 'Technology Consulting',
    image: WorksFrame3,
    anchor: 'technology-consulting',
  },
  {
    title: 'Data Engineering',
    image: WorksFrame4,
    anchor: 'data-engineering',
  },
];

export default function Works() {
  return (
    <Stack
      className="min-h-[40dvh] w-full p-8 items-center text-white"
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
          align="start"
          withIndicators
          slideSize="30%"
          slideGap={100}
          withControls={false}
          height="100%"
          style={{ flex: 1 }}
          styles={{
            indicators: {
              bottom: '-40px',
              gap: '5px',
              fill: 'black',
              //   backgroundColor: "black",
              width: 'fit-content',
              margin: 'auto',
            },
            indicator: {
              backgroundColor: 'white',
            },
          }}
        >
          {works?.map((work, index) => (
            <Carousel.Slide key={index}>
              <Flex
                key={index}
                className="relative flex-col gap-4 h-full border-white/40 border-2 rounded-3xl bg-[#ffffff10]"
              >
                <p className="p-4 text-xl font-semibold">{work.title}</p>
                <Divider size="sm" className="bg-white/40" />

                <div className="clip-path">
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
                    src={work.image.src}
                    width={200}
                    height={200}
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

        {/* <Flex className="relative flex-col gap-4 w-[33%] h-full border-white/40 border-2 rounded-3xl">
          <p className="p-4 text-xl font-semibold">HR Outsourcing</p>
          <Divider size="sm" className="bg-white/40"/>
          <Image src={WorksFrame1.src} width={200} height={200} alt="Frame 1" className="w-full"/>
          <Box className="w-36 h-36 flex items-center justify-center rounded-tl-full absolute bottom-0 right-0 bg-[#0c111a] z-10"><IconArrowUpRight size={40} className="ml-10 mt-6 " color="cyan"/></Box>
        </Flex>
        <Flex className="relative flex-col gap-4 w-[33%] h-full border-white/40 border-2 rounded-3xl">
          <p className="p-4 text-xl font-semibold">Software Development</p>
          <Divider size="sm" className="bg-white/40"/>
          <Image src={WorksFrame2.src} width={200} height={200} alt="Frame 1" className="w-full"/>
          <Box className="w-36 h-36 flex items-center justify-center rounded-tl-full absolute bottom-0 right-0 bg-[#0c111a] z-10"><IconArrowUpRight size={40} className="ml-10 mt-6 " color="cyan"/></Box>
        </Flex>
        <Flex className="relative flex-col gap-4 w-[33%] h-full border-white/40 border-2 rounded-3xl">
          <p className="p-4 text-xl font-semibold">Data Engineering</p>
          <Divider size="sm" className="bg-white/40"/>
          <Image src={WorksFrame3.src} width={200} height={200} alt="Frame 1" className="w-full"/>
          <Box className="w-36 h-36 flex items-center justify-center rounded-tl-full absolute bottom-0 right-0 bg-[#0c111a] z-10"><IconArrowUpRight size={40} className="ml-10 mt-6 " color="cyan"/></Box>
        </Flex> */}
      </Flex>
    </Stack>
  );
}
