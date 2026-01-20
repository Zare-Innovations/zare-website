"use client";

import { useEffect, useState } from "react";
import { useInViewport } from "@mantine/hooks";

type Options = {
  end: number;
  duration?: number;
};

export function useCountUp({ end, duration = 1000 }: Options) {
  const [value, setValue] = useState(0);
  const { ref, inViewport } = useInViewport();

  useEffect(() => {
    if (!inViewport) return;

    let current = 0;
    const step = Math.max(duration / end, 16);

    const interval = setInterval(() => {
      current += 1;
      setValue(current);

      if (current >= end) {
        clearInterval(interval);
      }
    }, step);

    return () => clearInterval(interval);
  }, [end, duration, inViewport]);

  return { ref, value };
}
