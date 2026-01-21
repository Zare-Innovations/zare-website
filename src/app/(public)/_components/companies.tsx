import Image from 'next/image';

const logos = [
  { url: "/our-work/logos/15.png", size: 100 },
  { url: "/our-work/logos/1.png", size: 100 },
  { url: "/our-work/logos/seed_of_life_white.svg", size: 65, bg: '#000' },
  { url: "/our-work/logos/acmg.png", size: 100 },
  { url: "/our-work/logos/251-logo.png", size: 60 },
  { url: "/our-work/logos/exelia.png", size: 100 },
  { url: "/our-work/logos/7.png", size: 80 },
  { url: "/our-work/logos/pickrell.png", size: 170 },
  { url: "/our-work/logos/8.png", size: 90 },
  { url: "/our-work/logos/10.png", size: 120 },
  { url: "/our-work/logos/11.svg", size: 100 },
  { url: "/our-work/logos/keysquare.png", size: 60 },
  { url: "/our-work/logos/crdle.png", size: 100 },
  { url: "/our-work/logos/13.png", size: 100 },
];

export default function Companies() {
  return (
    <div className="w-full flex flex-col gap-4 mt-10 overflow-hidden ">

      {/* 🔵 TOP SLIDER — normal direction */}
      <div className="w-full inline-flex flex-nowrap overflow-hidden">
        <ul className="flex items-center [&_li]:mx-10 [&_img]:max-w-none animate-infinite-scroll">
          {logos.map((src, i) => (
            <li
              key={i}
              className="hover:saturate-100 hover:opacity-100 saturate-0 opacity-45 transition-all duration-200"
            >
              <Image width={src.size} height={src.size} alt="Company Logo" src={src.url} style={src.bg ? {backgroundColor: src.bg, padding: '7px'}: {}} />
            </li>
          ))}
        </ul>

        {/* duplicate for seamless loop */}
        <ul className="flex items-center [&_li]:mx-10 [&_img]:max-w-none animate-infinite-scroll">
          {logos.map((src, i) => (
            <li
              key={`dup-top-${i}`}
              className="hover:saturate-100 hover:opacity-100 saturate-0 opacity-45 transition-all duration-200"
            >
              <Image width={src.size} height={src.size} alt="Company Logo" src={src.url} style={src.bg ? {backgroundColor: src.bg, padding: '7px'}: {}} />
            </li>
          ))}
        </ul>
      </div>

      {/* 🔵 BOTTOM SLIDER — reversed direction */}
      <div className="w-full inline-flex flex-nowrap overflow-hidden">
        <ul className="flex items-center [&_li]:mx-10 [&_img]:max-w-none animate-infinite-scroll [animation-direction:reverse]">
          {logos.map((src, i) => (
            <li
              key={`bottom-${i}`}
              className="hover:saturate-100 hover:opacity-100 saturate-0 opacity-45 transition-all duration-200"
            >
              <Image width={src.size} height={src.size} alt="Company Logo" src={src.url} style={src.bg ? {backgroundColor: src.bg, padding: '7px'}: {}} />
            </li>
          ))}
        </ul>

        {/* duplicate for seamless reverse loop */}
        <ul className="flex items-center [&_li]:mx-10 [&_img]:max-w-none animate-infinite-scroll [animation-direction:reverse]">
          {logos.map((src, i) => (
            <li
              key={`dup-bottom-${i}`}
              className="hover:saturate-100 hover:opacity-100 saturate-0 opacity-45 transition-all duration-200"
            >
              <Image width={src.size} height={src.size} alt="Company Logo" src={src.url} style={src.bg ? {backgroundColor: src.bg, padding: '7px'}: {}} />
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
}
