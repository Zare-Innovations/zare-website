import React from "react";

export default function Hero({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="w-full flex items-start min-[890px]:items-center flex-col min-[890px]:flex-row gap-5 min-[890px]:gap-10 min-h-[278px] bg-cyan-600 relative text-white py-5 px-5 md:px-16"
      style={{
        backgroundImage: `url(/careers/hero.svg)`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundColor: "#0a293b"
      }}
    >
      <div className="flex flex-col w-3/4">
        <h1 className="z-10 text-[36px] font-bold uppercase">
          solutions that scale your business
        </h1>
        <p className="z-10 text-base">
          From strategic talent placement and software development to AI
          solutions and operational support—we deliver end-to-end services that
          help you build faster, scale smarter, and compete globally.
        </p>
      </div>
      {children}
    </div>
  );
}
