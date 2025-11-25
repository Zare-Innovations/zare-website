import Image from 'next/image';
import React from 'react';

export default function Companies() {
  return (
    <div className="w-full flex flex-col gap-4 mt-10 overflow-hidden ">

      {/* 🔵 TOP SLIDER — normal direction */}
      <div className="w-full inline-flex flex-nowrap overflow-hidden">
        <ul className="flex items-center [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll">
          {logos.map((src, i) => (
            <li
              key={i}
              className="hover:saturate-100 hover:opacity-100 saturate-0 opacity-45 transition-all duration-200"
            >
              <Image width={100} height={100} alt="Company Logo" src={src} />
            </li>
          ))}
        </ul>

        {/* duplicate for seamless loop */}
        <ul className="flex items-center [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll">
          {logos.map((src, i) => (
            <li
              key={`dup-top-${i}`}
              className="hover:saturate-100 hover:opacity-100 saturate-0 opacity-45 transition-all duration-200"
            >
              <Image width={100} height={100} alt="Company Logo" src={src} />
            </li>
          ))}
        </ul>
      </div>

      {/* 🔵 BOTTOM SLIDER — reversed direction */}
      <div className="w-full inline-flex flex-nowrap overflow-hidden">
        <ul className="flex items-center [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll [animation-direction:reverse]">
          {logos.map((src, i) => (
            <li
              key={`bottom-${i}`}
              className="hover:saturate-100 hover:opacity-100 saturate-0 opacity-45 transition-all duration-200"
            >
              <Image width={120} height={120} alt="Company Logo" src={src} />
            </li>
          ))}
        </ul>

        {/* duplicate for seamless reverse loop */}
        <ul className="flex items-center [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll [animation-direction:reverse]">
          {logos.map((src, i) => (
            <li
              key={`dup-bottom-${i}`}
              className="hover:saturate-100 hover:opacity-100 saturate-0 opacity-45 transition-all duration-200"
            >
              <Image width={120} height={120} alt="Company Logo" src={src} />
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
}

/* you can include this inside the file or import it */
const logos = [
  "/our-work/logos/1.png",
  "/our-work/logos/15.png",
  "/our-work/logos/seed_of_life_white.svg",
  "/our-work/logos/3.png",
  "/our-work/logos/4.png",
  "/our-work/logos/5.png",
  "/our-work/logos/exelia.png",
  "/our-work/logos/7.png",
  "/our-work/logos/8.png",
  "/our-work/logos/9.png",
  "/our-work/logos/10.png",
  "/our-work/logos/11.svg",
  "/our-work/logos/12.png",
  "/our-work/logos/13.png",
  "/our-work/logos/14.png",
];
