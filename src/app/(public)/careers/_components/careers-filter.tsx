import React, { useMemo, useState } from "react";
import { JobType } from "./careers-list";
import { Button, Select, TextInput } from "@mantine/core";
import { Filter } from "lucide-react";

const jobTypes = ["Full-Time", "Part-Time", "Contract", "Freelance"];

const CareersFilter = ({
  jobs,
  isFetching,
  selectedLoc,
  selectedTitle,
  selectedType,
  query,

  setSelectedLoc,
  setSelectedTitle,
  setSelectedType,
  setQuery,
}: {
  jobs: JobType[];
  isFetching: boolean;
  selectedLoc: string | null;
  selectedTitle: string | null;
  selectedType: string | null;
  query: string;

  setSelectedLoc: (loc: string | null) => void;
  setSelectedTitle: (loc: string | null) => void;
  setSelectedType: (loc: string | null) => void;
  setQuery: (q: string) => void;
}) => {
  const [isFiltering, setIsFiltering] = useState(false);

  const getUniqueValues = (arr: string[]) => Array.from(new Set(arr));
  const jobTitleOptions = useMemo(
    () => getUniqueValues(jobs.map((job) => job.title)),
    [jobs]
  );
  const jobLocationOptions = useMemo(
    () => getUniqueValues(jobs.map((job) => job.location)),
    [jobs]
  );
  const jobTypeOptions = useMemo(
    () => getUniqueValues(jobs.map((job) => job.workType)),
    [jobs]
  );

  return (
    <>
      <div className="relative w-full flex flex-col min-[1120px]:flex-row min-[1120px]:items-center gap-5 sm:gap-7">
        <div
          className={`${isFiltering ? "hidden max-[500px]:flex" : "hidden "} absolute z-50 top-[120%] flex-col gap-5 sm:gap-7 bg-white border border-[#0002] rounded-sm p-3 origin-top`}
        >
          <Select
            placeholder="Job Title"
            label="Title"
            data={jobTitleOptions}
            value={selectedTitle}
            onChange={(e) => setSelectedTitle(e)}
            styles={{
              input: {
                backgroundColor: "#f8f8f8",
                color: "#000",
                padding: "18px 18px",
              },
              label: {
                fontWeight: "normal",
              },
            }}
            className="min-w-44 flex-1"
          />
          <Select
            placeholder="Job Type"
            label="Type"
            data={jobTypes.map((loc, idx) => ({
              value: loc,
              label: loc,
              disabled: !jobTypeOptions.includes(loc),
            }))}
            value={selectedType}
            onChange={setSelectedType}
            styles={{
              input: {
                backgroundColor: "#f8f8f8",
                color: "#000",
                padding: "18px 18px",
              },
              label: {
                fontWeight: "normal",
              },
            }}
            className="flex-1"
          />
          <Select
            placeholder="Job Location"
            label="Location"
            data={jobLocationOptions}
            value={selectedLoc}
            onChange={setSelectedLoc}
            styles={{
              input: {
                backgroundColor: "#f8f8f8",
                color: "#000",
                padding: "18px 18px",
              },
              label: {
                fontWeight: "normal",
              },
            }}
            className="flex-1"
          />
        </div>
        <div
          className={`flex-1 hidden min-[501px]:flex items-center gap-5 sm:gap-7`}
        >
          {isFetching ? (
            <>
              <div className="min-w-44 h-[37px] bg-[#0001] flex-1 rounded-sm animate-pulse" />
              <div className="min-w-44 h-[37px] bg-[#0001] flex-1 rounded-sm animate-pulse" />
              <div className="min-w-44 h-[37px] bg-[#0001] flex-1 rounded-sm animate-pulse" />
            </>
          ) : (
            <>
              <Select
                placeholder="Job Title"
                data={jobTitleOptions}
                value={selectedTitle}
                onChange={setSelectedTitle}
                styles={{
                  input: {
                    backgroundColor: "#f8f8f8",
                    color: "#000",
                    padding: "18px 18px",
                  },
                }}
                className="min-w-44 flex-1"
              />
              <Select
                placeholder="Job Type"
                  data={jobTypes.map((loc, idx) => ({
                    value: loc,
                    label: loc,
                    disabled: !jobTypeOptions.includes(loc),
                  }))}
                value={selectedType}
                onChange={setSelectedType}
                styles={{
                  input: {
                    backgroundColor: "#f8f8f8",
                    color: "#000",
                    padding: "18px 18px",
                  },
                }}
                className="flex-1"
              />
              <Select
                placeholder="Job Location"
                  data={jobLocationOptions}
                value={selectedLoc}
                onChange={setSelectedLoc}
                styles={{
                  input: {
                    backgroundColor: "#f8f8f8",
                    color: "#000",
                    padding: "18px 18px",
                  },
                }}
                className="flex-1"
              />
            </>
          )}
        </div>
        <div className=" flex items-center gap-5 sm:gap-7 min-[1120px]:justify-end">
          {isFetching ? (
            <div className="hidden max-[500px]:flex w-24 h-[37px] bg-[#0001] rounded-sm animate-pulse" />
          ) : (
            <Button
              pr={18}
              pl={14}
              className={`hidden max-[500px]:flex items-center  border border-[#0002] ${isFiltering ? "bg-cyan-500 text-white" : "bg-[#f8f8f8] hover:bg-cyan-500 text-[#0009]"} transition-all duration-300`}
              onClick={() => setIsFiltering((is) => !is)}
            >
                <Filter size={14} />
                <span className="font-normal pl-1.5 pr-4">Filter</span>
            </Button>
          )}

          {isFetching ? <div className="max-[500px]:w-full min-w-64 w-64 h-[37px] bg-[#0001] flex-1 rounded-sm animate-pulse" />
            : <TextInput
            placeholder="Search Jobs"
            value={query}
            onChange={(e) => setQuery(e.currentTarget.value)}
            type="text"
            styles={{
              input: {
                backgroundColor: "#f8f8f8",
                color: "#000",
                padding: "18px 18px",
                transition: "border-color 0.2s",
              },
            }}
            className="max-[500px]:w-full w-64"
            />}
        </div>
      </div>
    </>
  );
};

export default CareersFilter;
