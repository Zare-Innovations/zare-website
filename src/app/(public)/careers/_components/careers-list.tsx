"use client";

import { Flex } from "@mantine/core";
import { useEffect, useState } from "react";
import CareerCard from "./career-card";
import CareersFilter from "./careers-filter";

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

const CareersList = () => {
  const [results, setResults] = useState<JobType[]>([]);
  const [selectedTitle, setSelectedTitle] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedLoc, setSelectedLoc] = useState<string | null>(null);

  const [query, setQuery] = useState<string>("");

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isFetching: boolean = (isLoading || error) as boolean;

  const fetchJobs = async (query: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/job?q=${query}`
      );
      console.log(res);
      if (!res.ok) throw new Error("Failed to fetch jobs");
      const data = await res.json();

      setResults(data.items);
    } catch (err) {
      console.log(err);
      setError("Something went wrong, " + (err as Error).message);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs('');
  }, []);

  useEffect(() => {
    fetchJobs(query)
  },[query]);

  return (
    <Flex className="relative flex flex-col gap-7 md:gap-10 px-5 md:px-16 pt-10 pb-20">
      <CareersFilter
        jobs={results}
        isFetching={results.length === 0}
        selectedLoc={selectedLoc}
        selectedTitle={selectedTitle}
        selectedType={selectedType}
        query={query}
        setSelectedLoc={setSelectedLoc}
        setSelectedTitle={setSelectedTitle}
        setSelectedType={setSelectedType}
        setQuery={setQuery}
      />
      <div className="grid md:grid-cols-2 w-full gap-5 sm:gap-7">
        {isFetching ? (
          Array.from("jobs").map((j, i) => (
            <div
              key={j + i}
              className="h-56 flex flex-col gap-4 p-3 sm:p-5 lg:p-7 bg-[#000]/5 rounded-sm"
            >
              <div className="h-10 flex items-center gap-5 justify-between">
                <div className=" w-3/4 h-full bg-[#0001] animate-pulse rounded-md" />
                <div className=" w-10 h-full bg-[#0001] animate-pulse rounded-md" />
              </div>
              <div className="flex-1 bg-[#0001] animate-pulse rounded-md" />
              <div className="h-8 flex items-center gap-5">
                <div className=" w-1/6 h-full bg-[#0001] animate-pulse rounded-full" />
                <div className=" w-1/6 h-full bg-[#0001] animate-pulse rounded-full" />
                <div className=" w-1/6 h-full bg-[#0001] animate-pulse rounded-full" />
              </div>
            </div>
          ))
        ) : error ? (
          <div>{error}</div>
        ) : (
          results.map((job, i) => <CareerCard key={job.id + i} job={job} />)
        )}
      </div>
    </Flex>
  );
};

export default CareersList;
