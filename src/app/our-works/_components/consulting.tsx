import React from 'react';
import ProjectCard from './project-card';
import { IconCheck } from '@tabler/icons-react';

export default function Consulting() {
  return (
    <div
      className="w-full lg:max-w-[710px] lg:px-10 lg:pr-24"
      id="technology-consulting"
    >
      <ProjectCard src={'/our-work/technical-consulting.png'} />

      <h2 className="w-[331px] bg-[#00A9AB]  px-8 text-center flex items-center justify-center py-2 text-lg text-white font-medium rounded-lg my-5">
        Tech Consulting
      </h2>

      <p>
        Streamlined operational processes for businesses and integrated advanced
        tools to enhance efficiency and decision-making.
      </p>

      <div className="my-5 space-y-3 pr-8">
        <div className="text-wrap w-full flex justify-center gap-3">
          <div>
            <IconCheck className="h-4 w-4 text-[#00A9AB] mt-1" />
          </div>
          <div>
            Delivered comprehensive technology consulting for a{' '}
            <span className="font-bold">private equity</span> fund, enhancing
            investor reporting with AI/ML tools.
          </div>
        </div>

        <div className="text-wrap w-full flex gap-3">
          <div>
            <IconCheck className="h-4 w-4 text-[#00A9AB] mt-2" />
          </div>
          <div>
            Conducted <span className="font-bold">SaaS</span> tool selection to
            optimize <span className="font-bold">CRM</span> processes for a
            global organization.
          </div>
        </div>

        <div className="text-wrap w-full flex justify-center gap-3">
          <IconCheck className="h-8 w-8 text-[#00A9AB] -translate-y-[2px]" />
          <span>
            Designed a <span className="font-bold">custom</span> e-commerce
            platform for a leading shoe retailer in Senegal, driving digital
            transformation and expanding online reach.
          </span>
        </div>
      </div>
    </div>
  );
}
