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
      <h1 className="z-10 text-[36px] font-bold uppercase">
        solutions that scale your business
      </h1>
      <p className="z-10 text-base">
        From strategic talent placement and software development to AI solutions
        and operational support—we deliver end-to-end services that help you
        build faster, scale smarter, and compete globally.
      </p>
    </div>
  );
}
