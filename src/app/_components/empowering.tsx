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
          // east africa
          { location: [9.019, 38.75], size: 0.05 },
          { location: [-1.2921, 37.8219], size: 0.05 },
          // west africa
          { location: [13.5317, -12.4604], size: 0.05 },
          // south africa
          { location: [-25.746, 28.187], size: 0.05 },
          // europe
          { location: [51.5074, -0.1278], size: 0.05 },
          // north america
          { location: [37.7595, -122.4367], size: 0.08 },
          { location: [40.7128, -74.006], size: 0.05 },
          { location: [38.7128, -76.006], size: 0.05 },
          { location: [35.7128, -78.006], size: 0.05 },
          // israel
          { location: [31.771959, 35.217018], size: 0.05 },
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
      <Flex className="gap-8 items-center">
        <div className="w-full flex md:w-1/2">
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
        <div className="flex flex-col gap-12 md:gap-4 md:w-1/2 pr-8">
          <p className="text-4xl text-center md:text-left md:text-6xl font-semibold">
            Empowering Growth,
            <span className="text-cyan-500"> Bridging Global Gaps</span>
          </p>
          <p className="text-center md:text-left font-semibold">
            At Zare Innovations, our mission goes beyond traditional Business
            Process Outsourcing (BPO) solutions. We are dedicated to creating
            impactful opportunities by drastically reducing unemployment across
            Ethiopia, while delivering exceptional, cost-effective services to
            businesses worldwide.
          </p>
          <p className="font-semibold">
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
