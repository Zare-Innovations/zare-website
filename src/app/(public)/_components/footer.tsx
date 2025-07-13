
import { Flex, Stack } from '@mantine/core';
import {
  IconBrandLinkedin,
  IconMail,
  IconMapPinFilled,
} from '@tabler/icons-react';
import Image from 'next/image';
import Link from 'next/link';
import BottomFooter from './footer-bottom';

export default function Footer() {
  return (
    <Flex className="flex-col mt-auto">
      <Stack className="px-4 sm:px-8 lg:px-16 py-10 bg-[#0A293B] text-white ">

        <Flex className="flex-col gap-10 md:flex-row md:flex-wrap  lg:flex-nowrap justify-between ">
          {/* Logo */}
          <Flex className="items-start  justify-start">
            <Link href="/">
              <Image
                src="/zarelogo.svg"
                width={160}
                height={160}
                alt="Zare Logo"
                className="w-36 md:w-56"
              />
            </Link>
          </Flex>

          {/* Explore */}
          <Flex className="flex-col gap-2">
            <div className="text-lg font-semibold  flex items-center gap-2">
              <Image
                src="/title-line.svg"
                width={100}
                height={100}
                alt=""
                className="h-[1.8rem] w-auto"
              />
              <span>Explore</span>
            </div>

            <Link href="/#aboutUs" className="text-md hover:underline">About</Link>
            <Link href="/#services" className="text-md hover:underline">Services</Link>
            <Link href="/our-work" className="text-md hover:underline">Our Work</Link>
          </Flex>

          {/* Email */}
          <Flex className="flex-col gap-2">


            <div className="text-lg font-semibold  flex items-center gap-2">
              <Image
                src="/title-line.svg"
                width={100}
                height={100}
                alt=""
                className="h-[1.8rem] w-auto"
              />
              <span>Send Us An Email</span>
            </div>
            <Link
              href="mailto:info@zareinnovations.com"
              className="flex items-center gap-2 text-md hover:underline"
            >
              <IconMail className="h-5 w-5" />
              info@zareinnovations.com
            </Link>
          </Flex>

          {/* Phone */}
          <Flex className="flex-col gap-3">


            <div className="text-lg font-semibold  flex items-center gap-2">
              <Image
                src="/title-line.svg"
                width={100}
                height={100}
                alt=""
                className="h-[1.8rem] w-auto"
              />
              <span>Give Us A Call</span>
            </div>
            <Flex className="gap-8  flex-row">
              <Flex className="flex-col gap-1 ">
                <p className="font-semibold">USA</p>
                <p className="text-md">+1 703 395 5235</p>
              </Flex>
              <Flex className="flex-col gap-1 ">
                <p className="font-semibold">Ethiopia</p>
                <p className="text-md">+251 93 816 9380</p>
              </Flex>
            </Flex>
          </Flex>

          {/* Location */}
          <Flex className="flex-col gap-2">


            <div className="text-lg font-semibold  flex items-center gap-2">
              <Image
                src="/title-line.svg"
                width={100}
                height={100}
                alt=""
                className="h-[1.8rem] w-auto"
              />
              <span>Where To Find Us</span>
            </div>
            <div>
              <p className="font-semibold">USA</p>
              <Flex className="gap-2 text-sm mt-1">
                <IconMapPinFilled className="mt-0.5 shrink-0" />
                <span className="w-full sm:w-[18rem]">
                  5501 Seminary Road, Falls Church VA, 22041, Unit 1710 South, United States
                </span>
              </Flex>
            </div>
            <div>
              <p className="font-semibold mt-3">Ethiopia</p>
              <Flex className="gap-2 text-sm mt-1">
                <IconMapPinFilled className="mt-0.5 shrink-0" />
                <span className="w-full sm:w-[18rem]">
                  Meskel Flower, Aster Plaza 3rd Floor, Addis Ababa, Ethiopia
                </span>
              </Flex>
            </div>
          </Flex>
        </Flex>

        {/* LinkedIn Icon */}
        <div className="flex justify-center mt-8">
          <Link
            className="rounded-full p-2 bg-[#06b6d450] hover:bg-white group transition-colors"
            href="https://www.linkedin.com/company/zare-innovations"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconBrandLinkedin className="block group-hover:hidden" color="white" />
            <IconBrandLinkedin className="hidden group-hover:block" color="#00A9AB" />
          </Link>
        </div>
      </Stack>

      <BottomFooter />
    </Flex>
  );
}
