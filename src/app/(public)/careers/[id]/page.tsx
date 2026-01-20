"use client";

import React from "react";
import Hero from "./_components/hero";

import { useParams } from "next/navigation";
import Details from "./_components/Details";
import ApplyForm from "./_components/apply-form";
import { Button } from "@mantine/core";
import { ParamValue } from "next/dist/server/request/params";

export interface JobType {
  id: string;
  title: string;
  yearsOfExperience: number;
  location: string;
  type: string;
  workType: string;
  skills: string;
  startDate: string;
  endDate: string;
  description: string;
}

function useJobDetail() {
  const { id } = useParams();
  const [job, setJob] = React.useState<JobType | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);

  const fetchJob = async (id: ParamValue) => {
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/job/${id}`
      );
      if (!res.ok) throw new Error("Failed to fetch job detail");
      const data = await res.json();
      setJob(data ?? null);
    } catch (err) {
      setError("Something went wrong, " + (err as Error).message);
      setJob(null);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (!id) return;

    fetchJob(id);
  }, [id]);

  const retry =  () => {
    fetchJob(id);
  }

  return { job, loading, error, retry };
}

export default function Careers() {
  const { job, loading, error, retry } = useJobDetail();

  return (
    <main>
      {!loading && !error && job ? (
        <Hero job={job} />
      ) : (
        <div
          className="w-full flex flex-col justify-center gap-3 min-h-[278px] bg-cyan-600 relative text-white px-5 md:px-16"
          style={{
            backgroundImage: `url(/careers/hero.svg)`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundColor: "#0a293b"
          }}
        >
          {loading ? (
            <>
              <h1 className="w-max z-10 text-[36px] font-bold uppercase text-white/0 bg-cyan-500/20 rounded-sm animate-pulse">
                Graphic Designer
              </h1>
              <div className="w-3/4 flex flex-col gap-2">
                <div className="w-full h-8 z-10 text-base text-white/0 bg-cyan-500/20 rounded-sm animate-pulse" />
                <div className="w-1/2 h-8 z-10 text-base text-white/0 bg-cyan-500/20 rounded-sm animate-pulse" />
              </div>
              <div className="flex flex-wrap gap-2.5 text-sm capitalize">
                <span className="h-7 bg-cyan-500/20 rounded-full px-3 py-1 text-white/0 animate-pulse">
                  Full-time
                </span>
                <span className="h-7 bg-cyan-500/20 rounded-full px-3 py-1 text-white/0 animate-pulse">
                  Remote
                </span>
                <span className="h-7 bg-cyan-500/20 rounded-full px-3 py-1 text-white/0 animate-pulse">
                  Competitive Salary
                </span>
              </div>
            </>
          ) : (
            <>
              <span className="text-red-400 text-base">{error}</span>
              <span className="text-red-400 text-base">
                Refresh the page or Click the button below.
              </span>
              <Button
                size="sm"
                className="self-start transition-all duration-300 bg-cyan-500/20 hover:bg-cyan-500"
                disabled={loading}
                onClick={() => retry()}
              >
                Try again
              </Button>
            </>
          )}
        </div>
      )}
      <Details job={job} />
      <ApplyForm />
    </main>
  );
}
