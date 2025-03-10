import React from 'react';
import ProjectCard from './project-card';
import { IconCheck } from '@tabler/icons-react';

export default function DataEngineering() {
  return (
    <div
      className="w-full lg:max-w-[710px] lg:px-10 lg:pr-24"
      id="data-engineering"
    >
      <ProjectCard src={'/our-work/data-engineering.png'} />

      <h2 className="bg-[#00A9AB] w-[331px] px-8 text-center flex items-center justify-center py-2 text-lg text-white font-medium rounded-lg my-5">
        Data Engineering & Insights
      </h2>

      <p>
        Empowered organizations with targeted data collection, enabling improved
        communication and outreach.
      </p>

      <div className="my-5 space-y-3 pr-8">
        <div className="text-wrap w-full flex justify-center gap-3">
          <div>
            <IconCheck className="h-4 w-4 text-[#00A9AB] mt-1" />
          </div>
          <div>
            Conducted data mining to gather contact details for{' '}
            <span className="font-bold">200 journalists</span> across Africa,
            with 4 from each country, for a prominent{' '}
            <span className="font-bold">marketing</span> and communications
            agency based in South Africa.
          </div>
        </div>

        <div className="text-wrap w-full flex gap-3">
          <div>
            <IconCheck className="h-4 w-4 text-[#00A9AB] mt-2" />
          </div>
          <div>
            Collected and organized marketing data across Africa for an{' '}
            <span className="font-bold">e-ticketing</span> company aiming to be
            the first of its kind on the continent.
          </div>
        </div>

        <div className="text-wrap w-full flex justify-center gap-3">
          <IconCheck className="h-8 w-8 text-[#00A9AB] -translate-y-[2px]" />
          <span>
            Streamlined <span className="font-bold">ESG data</span> collection
            and reporting for a <span className="font-bold">$500M</span> private
            equity fund by utilizing an online portal and advanced machine
            learning insights
          </span>
        </div>
      </div>
    </div>
  );
}
