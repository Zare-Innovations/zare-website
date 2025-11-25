'use client';
import { Button, Flex, Stack } from '@mantine/core';
import Link from 'next/link';
import React, { useEffect, useRef } from 'react';
import createGlobe from 'cobe';
import ZareEstimatorModal from './calculator-modal';

export default function HeroWeb() {
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

    window.addEventListener('resize', handleResize);
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
        baseColor: [10 / 255, 41 / 255, 59 / 255],
        markerColor: [0.1, 0.8, 1],
        glowColor: [1, 1, 1],
        markers: [
          [-30.5595, 22.9375] as [number, number], // South Africa
          [37.0902, -95.7129] as [number, number], // USA
          [14.4974, -14.4524] as [number, number], // Senegal
          [9.145, 40.4897] as [number, number],    // Ethiopia
          [35.1264, 33.4299] as [number, number],  // Cyprus
          [55.3781, -3.436] as [number, number],   // UK
          [55.1304, -106.3468] as [number, number],// Canada
          [52.5862, -2.1265] as [number, number],  // West Midlands
        ].map((loc) => ({ location: loc, size: 0.05 })),
        onRender: (state) => {
          state.phi = phi;
          phi += 0.01;
        },
      });

    return () => {
      if (globe) globe.destroy();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Stack id="aboutUs" className="  py-10   ">
      <Flex className="gap-8 flex-col lg:flex-row items-center">
        {/* Left Text Section */}
        <div className="flex flex-col gap-2 lg:w-3/5">
          <div className="text-5xl md:text-6xl font-medium text-center lg:text-left max-w-full">
            TRANSFORMING 
          </div>
            <div className="text-5xl md:text-6xl  font-medium text-center lg:text-left max-w-full">
             YOUR BUSINESS WITH 
          </div>
          <span className="text-cyan-500 tex-5xl  font-medium md:text-6xl">ZARE INNOVATIONS</span>
          <div className="text-[1.5rem] text-center  lg:text-left w-[90%]">
            Elevate your business with our diverse range of services, where quality meets affordability.
          </div>

          {/* Statistics */}
          <Flex className="gap-20 justify-center lg:justify-start  my-4 flex-wrap">
            <div className="text-center lg:text-left">
              <p className="text-3xl font-medium text-cyan-500">20+</p>
              <p className="text-sm">Clients Served</p>
            </div>
            <div className="text-center lg:text-left">
              <p className="text-3xl font-medium text-cyan-500">6+</p>
              <p className="text-sm">Countries</p>
            </div>
            <div className="text-center lg:text-left">
              <p className="text-3xl font-medium text-cyan-500">40+</p>
              <p className="text-sm">Jobs Created Locally</p>
            </div>
          </Flex>

          {/* Buttons */}
<div className="flex  flex-row  gap-6">
  <Link
    href="https://calendly.com/emanuel-ypgh/30min?month=2025-02"
    className=" "
    target="_blank"
  >
   <Button className="!text-sm" size="md">
  Book a Consultation
</Button>
  </Link>
  {/* <Button size="lg" variant="outline">Compare Rates Instantly</Button> */}
  <ZareEstimatorModal />
</div>


        </div>

        {/* Right Globe Section */}
        <div className="w-full flex lg:w-2/5">
          <canvas
            ref={canvasRef}
            style={{
              width: '100%',
              height: 'auto',
            
              aspectRatio: 1,
            }}
          />
        </div>
      </Flex>
    </Stack>
  );
}
