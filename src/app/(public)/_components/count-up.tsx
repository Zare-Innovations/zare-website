"use client";

import { useCountUp } from "@/hooks/use-count-up";

type StatProps = {
  label: string;
  end: number;
  suffix?: string;
};

export default function CountUp({ label, end, suffix = "" }: StatProps) {
  const { ref, value } = useCountUp({ end });

  return (
    <div ref={ref} className="flex flex-col items-start">
      <span className="text-2xl min-[478px]:text-3xl md:text-[36px] font-medium text-cyan-500">
        {value.toLocaleString()}
        {suffix}
      </span>
      <span className="w-max text-xs min-[478px]:text-sm text-black">{label}</span>
    </div>
  );
}
