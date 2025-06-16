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
      <Stack className="p-6 py-10 bg-[#0A293B]">
        <Flex className="w-full text-white flex-col md:flex-wrap lg:flex-nowrap md:flex-row gap-8">
          <div className="md:w-[20%] mr-20">
            <Image
              src={'/zare-logo-footer.svg'}
              width={100}
              height={100}
              alt="Zare Logo"
              className="w-full"
            />
          </div>

          <Flex className="flex gap-4 md:w-[10%] flex-col">
            <p className="text-lg font-semibold">Explore</p>
            <Link href={'/#aboutUs'}>ABOUT</Link>
            <Link href={'/#services'}>SERVICES</Link>
            <Link href={'/our-work'}>OUR WORK</Link>
          </Flex>

          <Flex className="flex gap-2 w-full md:w-[20%] flex-col">
            <p className="text-lg font-semibold">Send Us An Email</p>
            <Link
              href={'mailto:careers@zareinnovations.com'}
              className="flex gap-2 items-center"
            >
              <IconMail className="h-6 w-6" />
              <span>info@zareinnovations.com</span>
            </Link>
          </Flex>

          <Flex className="flex gap-2 md:w-[25%] flex-col">
            <p className="text-lg w-2/3 mx-auto font-semibold">
              Give Us A Call
            </p>
            <Flex className="gap-4 flex-col sm:flex-row">
              <Flex className="sm:w-1/2 gap-2 flex-col">
                <p className="font-semibold">USA</p>
                <p className="text-sm">+1 703 395 5235</p>
              </Flex>
              <Flex className="sm:w-1/2 gap-2 flex-col">
                <p className="font-semibold">Ethiopia</p>
                <p className="text-sm">+251 93 816 9380</p>
              </Flex>
            </Flex>
          </Flex>

          <Flex className="flex gap-2 md:w-[30%] flex-col">
            <p className="text-lg font-semibold">Where To Find Us</p>
            <p className="font-semibold">USA</p>
            <Flex className="gap-2 text-sm">
              <IconMapPinFilled />
              5501 Seminary Road, Falls Church VA, 22041, Unit 1710 South,
              22041, United States
            </Flex>
            <p className="font-semibold">Ethiopia</p>
            <Flex className="text-sm gap-2">
              <IconMapPinFilled />
              Meskel Flower, Aster Plaza 3rd Floor,Addis Ababa, Ethiopia
            </Flex>
          </Flex>
        </Flex>

        <div className="flex items-center w-full gap-4">
          <Link
            className="rounded-full p-2 bg-[#06b6d450] hover:bg-white group mx-auto"
            href="https://www.linkedin.com/company/zare-innovations"
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
