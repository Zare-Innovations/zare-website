import React from 'react';

export default function Hero() {
  return (
    <div
      className="bg-[#0a293b] md:text-[40px] font-medium flex flex-col justify-center items-center min-h-[278px] bg-red-00 relative text-white text-center text-[28px] w-full"
      style={{
        backgroundImage: `url(/our-work/hero.svg)`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundColor: '#0a293b',
      }}
    >
      <h1 className="z-10">Our Work</h1>
      <p className="z-10">Transformative Projects & Success Stories</p>
    </div>
  );
}
