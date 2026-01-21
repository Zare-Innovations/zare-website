"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import createGlobe from "cobe";
import CountUp from "@/app/(public)/_components/count-up";
import { consultationLink } from "@/constants";
import ZareEstimatorModal from "./calculator-modal";

const Globe = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    let phi = 0;

    const handleResize = () => {
      if (canvasRef.current) {
        const width = canvasRef.current.clientWidth * window.devicePixelRatio;
        const height = canvasRef.current.clientHeight * window.devicePixelRatio;
        canvasRef.current.width = width;
        canvasRef.current.height = height;
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    const globe =
      canvasRef.current &&
      createGlobe(canvasRef.current, {
        devicePixelRatio: window.devicePixelRatio,
        width: canvasRef.current.width,
        height: canvasRef.current.height,
        phi: 0,
        theta: 0,
        dark: 1,
        diffuse: 1.2,
        mapSamples: 16000,
        mapBrightness: 6,
        baseColor: [10 / 255, 41 / 255, 59 / 255], // Updated base color (#0A293B)
        markerColor: [0.1, 0.8, 1],
        glowColor: [1, 1, 1],
        markers: [
          // South Africa
          { location: [-30.5595, 22.9375], size: 0.05 },

          // USA
          { location: [37.0902, -95.7129], size: 0.05 },

          // Senegal
          { location: [14.4974, -14.4524], size: 0.05 },

          // Ethiopia
          { location: [9.145, 40.4897], size: 0.05 },

          // Cyprus
          { location: [35.1264, 33.4299], size: 0.05 },

          // United Kingdom
          { location: [55.3781, -3.436], size: 0.05 },

          // Canada
          { location: [55.1304, -106.3468], size: 0.05 },

          // West Midlands
          { location: [52.5862, -2.1265], size: 0.05 }
        ],
        onRender: (state) => {
          // Called on every animation frame.
          // `state` will be an empty object, return updated params.
          state.phi = phi;
          phi += 0.01;
        }
      });

    return () => {
      if (globe) {
        globe.destroy();
      }
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="relative h-auto w-1/4 min-[1000px]:w-2/5 min-[1270px]:w-1/2 flex items-end">
      <div className="h-auto max-[1000px]:absolute max-[400px]:-right-[330%] max-[450px]:-right-[300%] max-[600px]:-right-[250%] max-md:-right-[160%] max-[1000px]:-right-[100%] w-[350px] min-[450px]:w-[400px] min-[950px]:w-[500px] min-[1000px]:w-full flex-1 flex justify-end">
        <canvas
          ref={canvasRef}
          style={{
            width: "100%",
            height: "auto",
            maxWidth: 600,
            aspectRatio: 1
          }}
        />
      </div>
    </div>
  );
};

const stats = [
  { label: "Clients Served", end: 20, suffix: "+" },
  { label: "Countries", end: 6, suffix: "+" },
  { label: "Jobs Created Locally", end: 40, suffix: "+" }
];

const HeroStats = () => {
  return (
    <div className="flex items-center gap-3 min-[500px]:gap-7 mb-3">
      {stats.map((stat) => (
        <CountUp
          key={stat.label}
          label={stat.label}
          end={stat.end}
          suffix={stat.suffix}
        />
      ))}
    </div>
  );
};

export default function Hero() {
  return (
    <div className="relative w-screen flex justify-between gap-5 md:gap-7 p-4 min-[500px]:p-6 sm:px-16 overflow-x-hidden">
      <div className="max-w-3/4 max-md:w-3/4 min-[1000px]:min-w-1/2 flex-1 flex flex-col items-start justify-center gap-3 min-[450px]:gap-5 z-10 bg-gradient-to-r from-white via-white/90">
        <p className="overflow-hidden text-2xl min-[450px]:text-3xl sm:text-4xl md:text-5xl min-[1150px]:text-6xl text-start font-medium">
          Revolutionize Your Business with <br />
          <span className="text-cyan-500"> Zare Innovations</span>
        </p>
        <p className="min-[450px]:text-lg md:text-[24px] text-black">
          Elevate your business with our diverse range of services, where
          quality meets affordability.
        </p>
        <HeroStats />
        <div className="flex items-center gap-3 min-[500px]:gap-7">
          
          <Link
      href={consultationLink}
      target="_blank"
      className={`w-max flex items-center gap-3 rounded-md px-2 min-[500px]:px-3 sm:px-6 text-xs  min-[430px]:text-sm min-[500px]:text-base py-2 sm:py-3 bg-cyan-950 text-white hover:bg-[#10CFD1] transition-all duration-300`}
    >
      Book a consultation
    </Link>
    <ZareEstimatorModal>Compare Rates Instantly</ZareEstimatorModal>
        </div>
      </div>
      <Globe />
    </div>
  );
}
