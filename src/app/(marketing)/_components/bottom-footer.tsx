import { Flex } from "@mantine/core";
import { IconBrandLinkedin } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";

export default function BottomFooter() {
  return (
    <Flex className="w-screen flex-col gap-2 py-4 bg-background px-5 md:px-12">
      <div className="flex flex-col gap-2 pb-1.5 border-b border-border">
        <div className="w-36">
          <Link href="/">
            <Image
              src={"/zare-innovations-logo.svg"}
              width={1500}
              height={1500}
              className="w-full"
              alt="Zare Logo"
            />
          </Link>
        </div>
        <Flex className="items-center justify-between gap-6">
          <span className="text-sm">Delivering Excellence</span>
          <Link
            href="https://www.linkedin.com/company/zare-innovations"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconBrandLinkedin className="text-cyan-950 transition-all duration-300 hover:text-cyan-600" />
          </Link>
        </Flex>
      </div>
      <p className="self-start text-start">
        ©2026 Zare Innovations All Right Reserved.
      </p>
    </Flex>
  );
}
