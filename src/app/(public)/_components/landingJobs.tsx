'use client';
import { Button } from "@mantine/core";
import { Jobs } from "../careers/_components/jobs";
import Link from "next/link";

export function LandingJobs() {
  return (
    <div className="text-center  px-4 md:px-0">
      {/* Title */}
      <h1 className="text-2xl md:text-4xl font-bold mb-4">
       WE’RE HIRING! JOIN OUR TEAM TODAY
      </h1>

      {/* Subtitle */}
      <p className=" text-gray-600 mb-8 max-w-2xl mx-auto">
        Join our team of passionate people to drive the future of Zare Innovations
      </p>

      {/* Jobs List */}
      <Jobs />

      {/* Button below jobs */}
      <div className="mt-8">
        <Link href="/careers" className="inline-block">
          <Button className="px-6 py-3 text-lg">
            View All Job Openings
          </Button>
        </Link>
      </div>
    </div>
  );
}
