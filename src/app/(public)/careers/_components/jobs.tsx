'use client';
import { Job, useGetJobsQuery } from "@/store/api/job.api";
import JobCard from "./jobCard";
import { useEffect, useState } from "react";

export function Jobs() {


    const [jobListings, setJobListings] = useState<Job[]>([]);
    const { data: jobsDataResponse } = useGetJobsQuery({});


    useEffect(() => {
        if (jobsDataResponse?.items) {
            setJobListings(jobsDataResponse.items);
        }
    }, [jobsDataResponse]);


    return (
        <div className="mx-auto">
            <div className="grid md:grid-cols-1 w-full md:w-[80%] mx-auto items-center gap-6 md:gap-8">
                {jobListings.map((job) => (
                    <JobCard key={job.id} job={job} />
                ))}
            </div>
        </div>
    );

}
