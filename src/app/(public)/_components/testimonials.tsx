'use client';
import { Carousel } from '@mantine/carousel';
import { Divider, Flex, Stack } from '@mantine/core';
import Image from 'next/image';
import carouselClassNames from './testimonials.module.css';

const testmonialsData = [
  {
    logo: '/testimonials/ubutix.png',
    description:
      'The UI/UX designer just gets it. What you see on the surface is a quiet, methodical guy that absorbs carefully and asks a few considered questions. But good lord - it’s underpinned by a profound depth of knowledge and vigilant understanding of what we’re trying to achieve on a strategic level. That means the output is incredibly considered and bang on the money the first time. He does a lot of thinking for us, and for that we’re hugely grateful and proud to have him on the team.',
    backgroundColor: '#0a293b',
    textColor: 'white',
  },
  {
    logo: '/testimonials/exelia.png',
    description:
      'Wanted to give you feedback on the UI/UX Designer we hired through Zare, we are all very impressed with his designs, his professionalism, and how well he manages relationships with our clients. He is a diamond and we are extremely happy to have him as part of the Exelia family, thank you',
    backgroundColor: '#c2410c',
    textColor: 'white',
  },
  {
    logo: '/testimonials/keysquare.png',
    description:
      "Great experience with Zare; we have one of the most talented engineers to work with, couldn't be happier!",
    backgroundColor: '#137bb3',
    textColor: 'white',
  },
  {
    logo: '/testimonials/pickrell.png',
    description:
      'The front-end developer we hired through Zare Innovations has been a great addition to our team—reliable, skilled, and a solid contributor. We’ve also been impressed with how Zare proactively managed performance, making sure their developers meet expectations. A great partner to work with!',
    backgroundColor: '#FFFFFF',
    textColor: 'black',
  },
  // {
  //   logo: '/testimonials/afig.png',
  //   description:
  //     'Delivered comprehensive technology consulting for a half-billion-dollar private equity fund. Services included needs analysis and SAAS tool selection for a robust CRM, automating ESG data collection and reporting, enhancing investor reporting via AI and ML, custom development for an international e-commerce platform, and creating a robust platform for streamlining board meeting summary documents by integrating AI tools.',
  //   backgroundColor: '#D97706',
  //   textColor: 'white',
  // },
  // {
  //   logo: '/testimonials/medrafa.png',
  //   description:
  //     'Delivered comprehensive technology consulting for a half-billion-dollar private equity fund. Services included needs analysis and SAAS tool selection for a robust CRM, automating ESG data collection and reporting, enhancing investor reporting via AI and ML, custom development for an international e-commerce platform, and creating a robust platform for streamlining board meeting summary documents by integrating AI tools.',
  //   backgroundColor: '#D1FAE5',
  //   textColor: '#F8FAFC',
  // },
];

export default function Testimonials() {
  return (
    <Stack className="items-center p-3 md:p-12 w-full overflow-hidden">
      <Flex className="flex-col gap-2 mx-auto">
        <p className="text-center font-bold text-2xl">Testimonials</p>
        <p className="font-semibold">What Our Clients Say About Us</p>
        <Divider size="sm" className="w-full" color="cyan" />
      </Flex>
      <Flex className="flex-wrap gap-20 mt-6 mb-6 h-full">
        <Carousel
          classNames={carouselClassNames}
          align="start"
          withIndicators
          slideSize={{ base: '100%', md: '50%' }}
          slideGap={{ base: 'sm', sm: 'md', md: 'lg' }}
          withControls={true}
          height="100%"
          className="w-full max-w-[90vw]"
          loop={true}
          controlSize={40}
          styles={{
            indicators: {
              bottom: '-30px',
              gap: '5px',
              width: 'fit-content',
              margin: 'auto',
            },
            indicator: {
              height: '9px',
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
          {testmonialsData?.map((testimonial, index) => (
            <Carousel.Slide key={index} className="p-2 pb-6">
              <Flex
                key={index}
                className={`rounded-lg gap-12 h-full flex-col p-8 shadow-lg`}
                style={{
                  backgroundColor: testimonial?.backgroundColor,
                  color: testimonial?.textColor,
                  maxWidth: '100%',
                }}
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
                    src={'/testimonials/quote-mark.png'}
                    height={200}
                    width={150}
                    alt="logo-2"
                    className="w-40 opacity-25 contrast-50"
                    unoptimized
                  />
                </Flex>
                <p>{testimonial.description}</p>
              </Flex>
            </Carousel.Slide>
          ))}
        </Carousel>
      </Flex>
    </Stack>
  );
}
