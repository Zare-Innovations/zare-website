'use client';
import { Button, Flex, Stack } from '@mantine/core';
import Link from 'next/link';
import React, { useEffect, useRef } from 'react';
import createGlobe from 'cobe';

export default function Empowering() {
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
          { location: [52.5862, -2.1265], size: 0.05 },
        ],
        onRender: (state) => {
          // Called on every animation frame.
          // `state` will be an empty object, return updated params.
          state.phi = phi;
          phi += 0.01;
        },
      });

    return () => {
      if (globe) {
        globe.destroy();
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Stack id="aboutUs">
      <Flex className="gap-8 flex-col lg:flex-row items-center">
        <div className="w-full flex lg:w-1/2 justify-center">
          <canvas
            ref={canvasRef}
            style={{
              width: '100%',
              height: 'auto',
              maxWidth: 600,
              aspectRatio: 1,
            }}
          />
        </div>
        <div className="flex flex-col gap-12 lg:gap-8 lg:w-1/2 md:pr-8 px-4">
          <p className="text-5xl text-center lg:text-left md:text-6xl font-semibold  max-w-full break-words">
            Empowering Growth,
            <span className="text-cyan-500"> Bridging Global Gaps</span>
          </p>
          <p className="text-center md:text-left">
            At Zare Innovations, our mission goes beyond traditional Business
            Process Outsourcing (BPO) solutions. We are dedicated to creating
            impactful opportunities by drastically reducing unemployment across
            Ethiopia, while delivering exceptional, cost-effective services to
            businesses worldwide.
          </p>
          <p className="text-center md:text-left">
            With a base in Addis Ababa and representation in the USA, our
            mission is twofold: driving sustainable growth across Ethiopia by
            creating jobs and connecting businesses globally through superior
            BPO services. Together, we aim to build a future where innovation
            and talent from Ethiopia help power the global economy.
          </p>
          <Link
            href="https://calendly.com/emanuel-ypgh/30min?month=2025-02"
            className="mx-auto md:ml-0"
            target="_blank"
          >
            <Button size="lg">Book a Consulation</Button>
          </Link>
        </div>
      </Flex>
    </Stack>
  );
}
