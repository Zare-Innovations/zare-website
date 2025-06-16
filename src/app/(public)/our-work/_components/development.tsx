import React from 'react';
import ProjectCard from './project-card';
import { IconCheck } from '@tabler/icons-react';

export default function Development() {
  return (
    <div
      className="w-full lg:max-w-[710px] lg:px-10 lg:pr-24"
      id="software-development"
    >
      <ProjectCard src={'/our-work/dashboard-overview.png'} />

      <h2 className="bg-[#00A9AB] px-8 text-center flex items-center justify-center py-2 text-lg text-white font-medium rounded-lg my-5 w-[331px]">
        Software Development
      </h2>

      <p>
        Delivered customized software platforms to meet client-specific needs
        and improve workflow automation.
      </p>

      <div className="my-5 space-y-3 pr-8">
        <div className="text-wrap w-full flex justify-center gap-3">
          <div>
            <IconCheck className="h-4 w-4 text-[#00A9AB] mt-1" />
          </div>
          <div>
            Developed <span className="font-bold">Ethiopia&apos;s first</span>{' '}
            comprehensive dashboard for pharmaceutical metrics, including
            inventory and prescription tracking, setting a new standard for the
            industry.
          </div>
        </div>

        <div className="text-wrap w-full flex gap-3">
          <div>
            <IconCheck className="h-4 w-4 text-[#00A9AB] mt-2" />
          </div>
          <div>
            Built a <span className="font-bold">geotagging .NET solution</span>{' '}
            for enhanced geospatial capabilities.
          </div>
        </div>

        <div className="text-wrap w-full flex justify-center gap-3">
          <IconCheck className="h-8 w-8 text-[#00A9AB] -translate-y-[2px]" />
          <span>
            Designed and implemented a custom{' '}
            <span className="font-bold">ERP solution</span> for one of
            Ethiopia’s leading marketing agencies, streamlining operations and
            driving efficiency.
          </span>
        </div>
      </div>
    </div>
  );
}
