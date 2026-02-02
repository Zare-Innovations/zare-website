"use client";

import { Card, Flex } from "@mantine/core";
import { useEffect, useMemo, useState, useRef } from "react";
import { useDebounce } from "use-debounce";
import CareerCard from "./career-card";
import CareersFilter from "./careers-filter";
import { Job, useGetJobsQuery } from "@/store/api/job.api";
import { IconRefresh } from "@tabler/icons-react";
import { CollectionQuery } from "@/app/core-fe/models/query";
import {
  buildWhere,
  type SearchableColumn,
  type SelectedFilter,
} from "@/app/utility/build-where";
import ContactUsForm from "../../_components/contact-us";

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
  // All jobs
  const [allJobs, setAllJobs] = useState<Job[]>([]);
  // State for filter selections
  const [selectedTitle, setSelectedTitle] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedLoc, setSelectedLoc] = useState<string | null>(null);
  const [query, setQuery] = useState<string>("");

  // Debounced search (500ms delay)
  const [debouncedSearch] = useDebounce(query, 500);

  // Define searchable columns (search across title, description, and skills)
  const primaryColumn: SearchableColumn = [
    { label: "Title", value: "title" },
    { label: "Description", value: "description" },
    { label: "Skills", value: "skills" },
  ];

  // Convert filter selections to SelectedFilter format
  const selectedFilters: SelectedFilter[] = useMemo(() => {
    const filters: SelectedFilter[] = [];
    if (selectedTitle) {
      filters.push({
        label: "Job Title",
        field: "title",
        operator: "=",
        value: selectedTitle,
        filterLabel: selectedTitle,
      });
    }
    if (selectedType) {
      filters.push({
        label: "Job Type",
        field: "workType",
        operator: "=",
        value: selectedType,
        filterLabel: selectedType,
      });
    }
    if (selectedLoc) {
      filters.push({
        label: "Location",
        field: "location",
        operator: "=",
        value: selectedLoc,
        filterLabel: selectedLoc,
      });
    }
    return filters;
  }, [selectedTitle, selectedType, selectedLoc]);

  // Build CollectionQuery args (memoized so RTK Query cache keys stay stable)
  const queryArgs: CollectionQuery | undefined = useMemo(() => {
    const where = buildWhere({
      primaryColumn,
      search: debouncedSearch,
      selectedFilters,
    });

    // Always include orderBy for consistent sorting
    // Only include where if there are conditions
    const query: CollectionQuery = {
      orderBy: [
        {
          column: "createdAt",
          direction: "DESC",
        },
      ],
    };

    if (where.length > 0) {
      query.where = where;
    }

    return query;
  }, [primaryColumn, debouncedSearch, selectedFilters]);

  const {
    data: jobsDataResponse,
    isLoading,
    isFetching,
    error,
    refetch,
  } = useGetJobsQuery(queryArgs);

  // It should not change when filtering/searching. Use a ref to track mount for clarity.
  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) {
      if (jobsDataResponse?.items) {
        setAllJobs(jobsDataResponse.items);
        mounted.current = true;
      }
    }
  }, [jobsDataResponse]);

  // Memoize results
  const results = jobsDataResponse?.items ?? [];

  const errorMsg = error
    ? typeof error === "string"
      ? error
      : "Failed to fetch jobs"
    : null;

  // Use isFetching for loading indicator, not just isLoading
  const showLoading = isFetching;

  return (
    <Flex className="relative flex flex-col gap-7 md:gap-10 px-5 md:px-16 pt-10 pb-20">
      <CareersFilter
        jobs={allJobs}
        isFetching={isLoading}
        selectedLoc={selectedLoc}
        selectedTitle={selectedTitle}
        selectedType={selectedType}
        query={query}
        setSelectedLoc={setSelectedLoc}
        setSelectedTitle={setSelectedTitle}
        setSelectedType={setSelectedType}
        setQuery={setQuery}
      />
      {showLoading ? (
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
          <Card className="w-max self-center flex flex-col items-center gap-5">
            <div className="flex flex-col items-center">
              <span className="text-red-600">
                Failed to load job openings, please try again!
              </span>
              <span className="text-black/70 text-sm">
                If this error is persistent, please feel free contact us directly.
              </span>
            </div>
            <button
              onClick={refetch}
              className={`w-full flex items-center justify-center gap-3 rounded-md px-2.5 py-1.5  text-xs min-[430px]:text-sm min-[500px]:text-base border-2 border-cyan-950 hover:border-[#10CFD1] hover:bg-[#10CFD1] hover:text-white transition-all duration-300`}
            >
              <IconRefresh size={19} />
              <span className="">Try again</span>
            </button>
          </Card>
        ) : (
            results.length === 0 ?
              <Card className="w-max self-center flex flex-col items-center gap-5 max-sm:px-5 max-md:px-16">
                {query || selectedLoc || selectedTitle || selectedType
                  ?
                  <span className="text-zinc-600 text-lg">
                    No job found with this filtering or query.
                  </span>
                  : <Card className="self-center flex flex-col items-center text-center gap-3">
                      <span className="text-black/70 text-wrap">
                        No open roles at the moment, but great talent is always welcome. If you're looking for meaningful work with a collaborative team, reach out to <a className="font-medium hover:underline hover:underline-offset-1">careers@zareinnovations.com</a>, we'd love to connect.
                      </span>
                    </Card>}
              </Card> :
              <div className="grid md:grid-cols-2 w-full gap-5 sm:gap-7">
                {results.map((job, i) => <CareerCard key={job.id + i} job={job} />)}
              </div>
      )}
    </Flex>
  );
};

export default CareersList;
