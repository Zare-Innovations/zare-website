'use client';

import React, { useEffect } from 'react';

interface CounterProps {
  start: number;
  end: number;
  duration: number;
}

export default function Counter({ start, end, duration }: CounterProps) {
  const [count, setCount] = React.useState(start);

  useEffect(() => {
    const timer = setInterval(
      () => {
        setCount((prevCount) => {
          const newCount = prevCount + 1;
          if (newCount >= end) {
            clearInterval(timer);
            return end;
          }
          return newCount;
        });
      },
      duration / (end - start)
    );
    return () => clearInterval(timer);
  }, [duration, end, start]);

  return <span>{count}</span>;
}
