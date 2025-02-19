import { Box, Divider, Flex, Stack } from "@mantine/core";
import Image from "next/image";
import WorksFrame1 from "./works-frame-1.png";
import WorksFrame2 from "./frame-2.png";
import WorksFrame3 from "./frame-3.png";
import WorksBg from "./works-bg.png";
import { IconArrowUpRight } from "@tabler/icons-react";

const works = [
    {
        title: "HR Outsourcing",
        image: WorksFrame1,
    },
    {
        title: "Software Development",
        image: WorksFrame2,
    },
    {
        title: "Technology Consulting",
        image: WorksFrame3,
    },
    {
        title: "Data Engineering",
        image: WorksFrame3,
    },
]

export default function Works() {
  return (
    <Stack
      className="min-h-[40dvh] w-full p-8 items-center text-white"
      style={{
        backgroundImage: `url(${WorksBg.src})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundColor: "#1e293b"
      }}
    >
      <p className="text-4xl font-semibold text-center">Our Work</p>
      <Flex className="w-full gap-16 py-8 mt-16">
        {/* {
            works?.map((work, index) => (
                <Flex className="relative flex-col gap-4 w-[33%] h-full border-white/40 border-2 rounded-3xl">
                    <p className="p-4 text-xl font-semibold">HR Outsourcing</p>
                    <Divider size="sm" className="bg-white/40"/>
                    <Image src={WorksFrame1.src} width={200} height={200} alt="Frame 1" className="w-full"/>
                    <Box className="w-36 h-36 flex items-center justify-center rounded-tl-full absolute bottom-0 right-0 bg-[#0c111a] z-10"><IconArrowUpRight size={40} className="ml-10 mt-6 " color="cyan"/></Box>
                </Flex>
            ))
        } */}
        <Flex className="relative flex-col gap-4 w-[33%] h-full border-white/40 border-2 rounded-3xl">
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
        </Flex>
      </Flex>
    </Stack>
  );
}
