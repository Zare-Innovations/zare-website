import React from 'react';

export default function Hero() {
  return (
    <div
      className="w-full flex flex-col justify-center min-h-[278px] bg-cyan-600 relative text-white px-5 md:px-16"
      style={{
        backgroundImage: `url(/careers/hero.svg)`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundColor: "#0a293b"
      }}
    >
      <h1 className="z-10 text-[36px] font-bold">All Open Positions</h1>
      <p className="z-10 text-base">
        Work in a vibrant workspace that is remote first and dedicated to help
        you thrive
      </p>
    </div>
  );
}
