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
    <Flex className="flex-col">
      <Stack className="px-4 sm:px-8 lg:px-16 py-10 bg-[#0A293B] text-white">
        <Flex className="w-full flex-col gap-10 md:flex-row md:flex-wrap lg:flex-nowrap">

          <Flex className="w-full md:w-1/5 items-start">
            <Image
              src="/zarelogo.svg"
              width={160}
              height={160}
              alt="Zare Logo"
              className="w-40 md:w-44"
            />
          </Flex>


          <Flex className="flex-col gap-2 w-full md:w-1/5">
            <p className="text-lg font-semibold">Explore</p>
            <Link href="/#aboutUs" className="text-sm hover:underline">
              About
            </Link>
            <Link href="/#services" className="text-sm hover:underline">
              Services
            </Link>
            <Link href="/our-work" className="text-sm hover:underline">
              Our Work
            </Link>
          </Flex>


          <Flex className="flex-col gap-2 w-full md:w-1/5">
            <p className="text-lg font-semibold">Send Us An Email</p>
            <Link
              href="mailto:info@zareinnovations.com"
              className="flex items-center gap-2 text-sm hover:underline"
            >
              <IconMail className="h-5 w-5" />
              info@zareinnovations.com
            </Link>
          </Flex>

          <Flex className="flex-col gap-3 w-full md:w-2/5">
            <p className="text-lg font-semibold">Give Us A Call</p>
            <Flex className="gap-6 flex-wrap">
              <Flex className="flex-col gap-1 w-1/2 min-w-[150px]">
                <p className="font-semibold">USA</p>
                <p className="text-sm">+1 703 395 5235</p>
              </Flex>
              <Flex className="flex-col gap-1 w-1/2 min-w-[150px]">
                <p className="font-semibold">Ethiopia</p>
                <p className="text-sm">+251 93 816 9380</p>
              </Flex>
            </Flex>
          </Flex>


          <Flex className="flex-col gap-2 w-full md:w-2/5">
            <p className="text-lg font-semibold">Where To Find Us</p>
            <div>
              <p className="font-semibold">USA</p>
              <Flex className="gap-2 text-sm mt-1">
                <IconMapPinFilled className="mt-0.5" />
                <span>
                  5501 Seminary Road, Falls Church VA, 22041, Unit 1710 South,
                  United States
                </span>
              </Flex>
            </div>
            <div>
              <p className="font-semibold mt-3">Ethiopia</p>
              <Flex className="gap-2 text-sm mt-1">
                <IconMapPinFilled className="mt-0.5" />
                <span>
                  Meskel Flower, Aster Plaza 3rd Floor, Addis Ababa, Ethiopia
                </span>
              </Flex>
            </div>
          </Flex>
        </Flex>


        <div className="flex justify-center mt-6">
          <Link
            className="rounded-full p-2 bg-[#06b6d450] hover:bg-white group transition-colors"
            href="https://www.linkedin.com/company/zare-innovations"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconBrandLinkedin
              className="block group-hover:hidden"
              color="white"
            />
            <IconBrandLinkedin
              className="hidden group-hover:block"
              color="#00A9AB"
            />
          </Link>
        </div>
      </Stack>

      <BottomFooter />
    </Flex>
  );
}
