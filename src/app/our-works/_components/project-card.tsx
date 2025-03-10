import Image from 'next/image';
import React from 'react';

interface ProjectCardProps {
  src: string;
  className?: string;
}

export default function ProjectCard({ src, className }: ProjectCardProps) {
  return (
    <div className="bg-[#00A9AB4D] lg:w-[578px] h-[420px] rounded-[48px] flex items-center justify-center overflow-hidden max-w-full px-3">
      <div className="rounded-3xl overflow-hidden h-[386px] w-full lg:w-[545px]">
        <Image
          src={src}
          alt="Project card"
          width={2000}
          height={278}
          className={`object-cover w-full h-full ${className}`}
        />
      </div>
    </div>
  );
}
