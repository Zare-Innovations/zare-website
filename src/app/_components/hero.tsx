import { Button, Stack } from '@mantine/core';
import Image from 'next/image';
import Hero1 from './hero1.png';
import Link from 'next/link';
import Counter from './counter';

export default function Hero() {
  return (
    <Stack
      className="h-full w-full flex items-center justify-center gap-12 relative mb-10"
      pt={120}
    >
      <Image
        src={Hero1.src}
        alt="Hero image"
        width={200}
        height={200}
        className="absolute left-10"
      />

      <p className="absolute  right-10 mt-10 w-fit font-medium text-[#0a293b] text-sm bg-[#ECFEFF] text-nowrap p-3 rounded-lg">
        Built on Reputation
      </p>

      <p className="absolute shadow-lg  right-10 mt-10 w-fit font-medium text-[#0a293b] text-sm bg-[#ECFEFF] text-nowrap p-3 rounded-lg">
        Built on Reputation
      </p>

      <p className="mt-20 text-7xl w-[80%] font-bold text-center mx-auto z-10">
        Revolutionize Your Business <br />
        with
        <span className="text-cyan-500"> Zare Innovations</span>
      </p>

      <div className="absolute -bottom-8 right-10 bg-white shadow-lg  rounded-lg p-3">
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
              stroke-width="2"
              marker-end="url(#m)"
              stroke="#06b6d4"
            />
          </svg>
        </div>
        <p className="w-36 font-medium text-[#0a293b] text-sm">
          <Counter start={1} end={14} duration={2000} />+ Clients Served In Our
          First Year
        </p>
      </div>
      <p className="w-[80%] mx-auto text-center text-xl my-5">
        Elevate your business with our diverse BPO services tailored to
        perfection – where quality meets affordability.
      </p>
      <Link className="w-fit mx-auto" href="/#aboutUs">
        <Button size="lg">Learn More</Button>
      </Link>
    </Stack>
  );
}
