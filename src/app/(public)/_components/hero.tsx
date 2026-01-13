import { Button, Stack } from '@mantine/core';
import Link from 'next/link';
import Counter from './counter';

export default function Hero() {
  return (
    <Stack
      className="h-full w-full flex items-center justify-center gap-12 relative mb-24"
      pt={120}
    >
      <p className="overflow-hidden max-w-full mt-8 text-5xl md:text-5xl lg:text-7xl lg:w-[80%] font-bold text-center mx-auto z-10">
        Revolutionize Your Business <br />
        with
        <span className="text-cyan-500"> Zare Innovations</span>
      </p>

      <div className="absolute top-10 lg:top-auto lg:-bottom-16 left-16 bg-white shadow-lg  rounded-lg p-3">
        <div className="-rotate-[10deg] my-2">
          <svg className="w-[20px] h-[20px] transition-[width] duration-2000 ease-in-out overflow-visible animate-profit-growth">
            <defs>
              <marker
                id="m"
                markerWidth="4"
                markerHeight="8"
                refX="0"
                refY="1"
                viewBox="0 0 1 2"
              >
                <polygon points="0,0 1,1 0,2" fill="#06b6d4" />
              </marker>
            </defs>
            <line
              x1="0"
              y1="50%"
              x2="100%"
              y2="50%"
              strokeWidth="2"
              markerEnd="url(#m)"
              stroke="#06b6d4"
            />
          </svg>
        </div>
        <p className="w-36 font-medium text-[#0a293b] text-sm">
          <Counter start={1} end={14} duration={2000} />+ clients served in our
          first year.
        </p>
      </div>
      <p className="px-8 lg:w-[80%] mx-auto text-center text-xl my-5">
        Elevate your business with our diverse BPO services – where quality
        meets affordability.
      </p>
      <Link className="w-fit mx-auto" href="/#aboutUs">
        <Button size="lg">Learn More</Button>
      </Link>
    </Stack>
  );
}
