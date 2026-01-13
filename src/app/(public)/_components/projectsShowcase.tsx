'use client';

import Image from 'next/image';

export default function ProjectsShowcase() {
  const projects = [
    { src: '/project/251.svg', alt: '251 ERP' },
    { src: '/project/realstate.svg', alt: 'Real Estate UI Design' },
    { src: '/project/251-train.svg', alt: 'Training Progress Interface' },
    { src: '/project/dashboard.svg', alt: 'Inventory Overview Dashboard' },
  ];

  return (
    <section className="">

   
      <div className="px-10 py-10">

          
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-0">
         
          <div className="relative h-[30rem]">
            <Image src={projects[0].src} alt={projects[0].alt} fill className="object-cover" />
          </div>

          <div className="relative h-[27rem] ">
            <Image src={projects[1].src} alt={projects[1].alt} fill className="object-cover" />
          </div>

          {/* Bottom-left (staggered up slightly) */}
          <div className="relative h-[30rem] sm:-mt-12 ">
            <Image src={projects[2].src} alt={projects[2].alt} fill className="object-cover" />
          </div>

          {/* Bottom-right */}
          <div className="relative h-[27rem] sm:-mt-24">
            <Image src={projects[3].src} alt={projects[3].alt} fill className="object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}
