import React from 'react'
import { Card } from '@mantine/core';
import Link from 'next/link';
import { IconArrowUpRight } from '@tabler/icons-react';
import { JobType } from './careers-list';

const CareerCard = ({ job }: { job: JobType }) => {
  return (
    <Card className="flex flex-col gap-4 p-3 sm:p-5 lg:p-7">
          <Link
            href={`/careers/${job.id}`}
            className="flex flex-row items-center justify-between transition-all duration-300 text-black hover:text-cyan-500"
          >
            <h3 className=" text-start text-lg font-medium ">{job.title}</h3>
            <IconArrowUpRight className="w-6 h-6" />
          </Link>
      <p className="text-sm text-[#6C6C6C] leading-relaxed">
        {job.description}
      </p>

      <div className="flex flex-wrap gap-2.5 text-sm mt-auto capitalize">
        <span className="text-cyan-500 border border-cyan-500 rounded-full px-3 py-1">
          {job.location}
        </span>
        <span className="text-cyan-500 border border-cyan-500 rounded-full px-3 py-1">
          {job.type}
        </span>
        <span className="text-cyan-500 border border-cyan-500 rounded-full px-3 py-1">
          {job.workType}
        </span>
      </div>
    </Card>
  );
};

export default CareerCard;
