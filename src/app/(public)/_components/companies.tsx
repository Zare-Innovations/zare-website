import Image from 'next/image';

type LogoEntry = {
  url: string;
  size: number;
  name: string;
  bg?: string;
  unoptimized?: boolean;
};

const logos: LogoEntry[] = [
  { url: "/our-work/logos/good-firms.png", size: 100, name: "GoodFirms" },
  { url: "/our-work/logos/afig-funds.png", size: 100, name: "AFIG Funds" },
  { url: "/our-work/logos/seed_of_life_white.svg", size: 65, name: "Seed of Life", bg: '#000', unoptimized: true },
  { url: "/our-work/logos/acmg.png", size: 100, name: "ACMG" },
  { url: "/our-work/logos/251-logo.png", size: 60, name: "251 Marketing & Communications" },
  { url: "/our-work/logos/exelia.png", size: 100, name: "Exelia" },
  { url: "/our-work/logos/10-13.png", size: 80, name: "10-13" },
  { url: "/our-work/logos/pickrell.png", size: 170, name: "Pickrell Global Technologies" },
  { url: "/our-work/logos/ubutix.png", size: 90, name: "Ubutix" },
  { url: "/our-work/logos/mela.png", size: 120, name: "Mela" },
  { url: "/our-work/logos/kagol.svg", size: 80, name: "Kagool", unoptimized: true },
  { url: "/our-work/logos/hk.svg", size: 100, name: "HK", unoptimized: true },
  { url: "/our-work/logos/keysquare.png", size: 60, name: "KeySquare" },
  { url: "/our-work/logos/sabbell.png", size: 160, name: "Sabbell" },
  { url: "/our-work/logos/betterlife.svg", size: 65, name: "Better Life", unoptimized: true },
  { url: "/our-work/logos/crdle.png", size: 100, name: "Crdle" },
  { url: "/our-work/logos/AHF-logo.png", size: 100, name: "AHF" },
  { url: "/our-work/logos/usp.png", size: 100, name: "USP" },
  { url: "/our-work/logos/signature-logo.svg", size: 50, name: "Signature", unoptimized: true },
  { url: "/our-work/logos/gursha.png", size: 150, name: "Gursha" },
  { url: "/our-work/logos/kazana.png", size: 70, name: "Kazana" },
  { url: "/our-work/logos/sunbeam-logo.png", size: 75, name: "Sunbeam" },
  { url: "/our-work/logos/strat-tech.png", size: 80, name: "StratTech" },
  { url: "/our-work/logos/just-kids.png", size: 70, name: "Just Kids" },
];

const MARQUEE_ROW_HEIGHT = 170;

export default function Companies() {
  return (
    <div className="w-full flex flex-col sm:gap-4 mt-10 mb-14 overflow-hidden ">

      {/* 🔵 TOP SLIDER — normal direction */}
      <div
        className="w-full inline-flex flex-nowrap overflow-hidden"
        style={{ minHeight: MARQUEE_ROW_HEIGHT }}
      >
        <ul className="flex items-center [&_li]:mx-10 [&_img]:max-w-none animate-infinite-scroll">
          {logos.map((src, i) => (
            <li
              key={i}
              className="hover:saturate-100 hover:opacity-100 saturate-0 opacity-45 transition-all duration-200"
            >
              <Image width={src.size} height={src.size} alt={`${src.name} logo`} src={src.url} unoptimized={src.unoptimized} style={src.bg ? {backgroundColor: src.bg, padding: '7px'}: {}} />
            </li>
          ))}
        </ul>

        {/* duplicate for seamless loop */}
        <ul aria-hidden="true" className="flex items-center [&_li]:mx-10 [&_img]:max-w-none animate-infinite-scroll">
          {logos.map((src, i) => (
            <li
              key={`dup-top-${i}`}
              className="hover:saturate-100 hover:opacity-100 saturate-0 opacity-45 transition-all duration-200"
            >
              <Image width={src.size} height={src.size} alt="" src={src.url} unoptimized={src.unoptimized} style={src.bg ? {backgroundColor: src.bg, padding: '7px'}: {}} />
            </li>
          ))}
        </ul>
      </div>

      {/* 🔵 BOTTOM SLIDER — reversed direction */}
      <div
        className="w-full inline-flex flex-nowrap overflow-hidden"
        style={{ minHeight: MARQUEE_ROW_HEIGHT }}
      >
        <ul className="flex items-center [&_li]:mx-10 [&_img]:max-w-none animate-infinite-scroll [animation-direction:reverse]">
          {logos.map((src, i) => (
            <li
              key={`bottom-${i}`}
              className="hover:saturate-100 hover:opacity-100 saturate-0 opacity-45 transition-all duration-200"
            >
              <Image width={src.size} height={src.size} alt={`${src.name} logo`} src={src.url} unoptimized={src.unoptimized} style={src.bg ? {backgroundColor: src.bg, padding: '7px'}: {}} />
            </li>
          ))}
        </ul>

        {/* duplicate for seamless reverse loop */}
        <ul aria-hidden="true" className="flex items-center [&_li]:mx-10 [&_img]:max-w-none animate-infinite-scroll [animation-direction:reverse]">
          {logos.map((src, i) => (
            <li
              key={`dup-bottom-${i}`}
              className="hover:saturate-100 hover:opacity-100 saturate-0 opacity-45 transition-all duration-200"
            >
              <Image width={src.size} height={src.size} alt="" src={src.url} unoptimized={src.unoptimized} style={src.bg ? {backgroundColor: src.bg, padding: '7px'}: {}} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
