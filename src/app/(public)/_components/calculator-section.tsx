"use client";

import { Flex } from "@mantine/core";
import Image from "next/image";
import ZareEstimatorModal from "./calculator-modal";

export default function CalculatorSection() {
  return (
    <Flex className="w-screen items-center gap-5 min-[1080px]:gap-10 px-5 md:px-12 mt-10 sm:mt-16">
      <Image
        src="/calculator/calculator-shot.svg"
        alt="Zare ROI Calculator"
        width={600}
        height={600}
        className="sm:block hidden flex-1 h-auto w-1/2 rounded-xl"
        unoptimized
      />

      <div className="sm:w-3/5 min-[1080px]:w-1/2  flex flex-col max-sm:items-center min-[500px]:gap-4 sm:gap-10">
        <p className="text-2xl md:text-3xl min-[1080px]:text-5xl font-semibold max-sm:text-center uppercase">
          <span className="text-cyan-500">COMPARE RATES</span> ACROSS BPO&apos;S
          AND HIRE <span className="text-cyan-500">SMARTER WITH</span>{" "}
          ZARE&apos;s ROI Calculator
        </p>
        <Image
          src="/calculator/calculator-shot.svg"
          alt="Zare ROI Calculator"
          width={600}
          height={600}
          unoptimized
          className="sm:hidden block w-full min-[500px]:w-4/6 h-auto max-w-full rounded-xl"
        />
        <ZareEstimatorModal />
      </div>
    </Flex>
  );
}
