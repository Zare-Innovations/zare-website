import React from 'react';
import ProjectCard from './project-card';
import { IconCheck } from '@tabler/icons-react';

export default function Recruitment() {
  return (
    <div
      className="w-full lg:max-w-[710px] lg:px-10 lg:pr-24"
      id="hr-outsourcing"
    >
      <ProjectCard src={'/our-work/recruitment.png'} className="scale-150" />
      <h2 className="bg-[#00A9AB] w-[331px] px-8 text-center flex items-center justify-center py-2 text-lg text-white font-medium rounded-lg my-5">
        HR Outsourcing
      </h2>

      <p>
        Connected global businesses with top talent to optimize operations and
        drive success.
      </p>

      <div className="my-5 space-y-3 pr-8">
        <div className="text-wrap w-full flex justify-center gap-3">
          <div>
            <IconCheck className="h-4 w-4 text-[#00A9AB] mt-1" />
          </div>
          <div>
            Recruited top-tier{' '}
            <span className="font-bold">
              UI/UX designers, front-end, and back-end developers
            </span>{' '}
            for software companies in the U.S. and Cyprus, driving seamless user
            experiences and robust digital infrastructure.
          </div>
        </div>

        <div className="text-wrap w-full flex gap-3">
          <div>
            <IconCheck className="h-4 w-4 text-[#00A9AB] mt-2" />
          </div>
          <div>
            Hired back-office support specialists for a{' '}
            <span className="font-bold">U.S.-based government</span> contractor,
            streamlining operations, ensuring compliance, and enhancing overall
            efficiency.
          </div>
        </div>

        <div className="text-wrap w-full flex justify-center gap-3">
          <IconCheck className="h-8 w-8 text-[#00A9AB] -translate-y-[2px]" />
          <span>
            Sourced and onboarded skilled customer service agents for a leading{' '}
            <span className="font-bold">U.S. fitness company,</span>{' '}
            strengthening client relationships and delivering exceptional
            service experiences.
          </span>
        </div>
      </div>
    </div>
  );
}
