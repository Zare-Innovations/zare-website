import { Flex, Stack } from "@mantine/core";
import { IconMapPinFilled } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <Stack className="p-6 py-10 bg-[#0A293B]">
      <Flex className="w-full gap-6 text-white">
        <Image
          src={"/zare-logo-footer.svg"}
          width={100}
          height={100}
          alt="Zare Logo"
          className="w-[15%]"
        />
        <Flex className="flex gap-4 w-[15%] flex-col">
          <p className="text-lg font-semibold">Explore</p>
          <Link href={"/#about"}>ABOUT</Link>
          <Link href={"/#services"}>SERVICES</Link>
          <Link href={"/#clients"}>CLIENTS & PROJECTS</Link>
          <Link href={"/#careers"}>CAREERS</Link>
        </Flex>
        <Flex className="flex gap-2 w-[15%] flex-col">
          <p className="text-lg font-semibold">Send Us An Email</p>
          <Link href={"mailto:info@zareinnovations.com"}>
            info@zareinnovations.com
          </Link>
        </Flex>
        <Flex className="flex gap-2 w-[25%] flex-col">
          <p className="text-lg font-semibold">Give Us A Call</p>
          <Flex className="gap-4">
            <Flex className="w-1/2 gap-2 flex-col">
              <p className="text-lg font-semibold">USA</p>
              <p>+1 703 395 5235</p>
              <p>+1 703 395 5235</p>
            </Flex>
            <Flex className="w-1/2 gap-2 flex-col">
              <p className="text-lg font-semibold">Ethiopia</p>
              <p>+251 93 816 9380</p>
              <p>+251 93 215 2547</p>
            </Flex>
          </Flex>
        </Flex>
        <Flex className="flex gap-2 w-[30%] flex-col">
          <p className="text-lg font-semibold">Where To Find Us</p>
          <p className="text-lg font-semibold">USA</p>
          <Flex className="gap-2">
            <IconMapPinFilled />
            5501 Seminary Road, Falls Church VA, 22041,Unit 1710 South, 22041,
            United States
          </Flex>
          <p className="text-lg font-semibold">Ethiopia</p>
          <Flex className="gap-2">
            <IconMapPinFilled />
            5Meskel Flower, Aster Plaza 3rd Floor,Addis Ababa, Ethiopia
          </Flex>
        </Flex>
      </Flex>
    </Stack>
  );
}
