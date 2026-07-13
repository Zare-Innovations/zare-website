'use client';

import { useMemo, useState } from 'react';
import { IconRefresh, IconSearch } from '@tabler/icons-react';
import { Card } from '@mantine/core';
import { useDebounce } from 'use-debounce';
import { ApplicantsTable } from '../_components/applicants-table';
import { useGetAppliedJobsQuery } from '@/store/api/applied-jobs.api';
import { useGetJobsQuery } from '@/store/api/job.api';

export default function JobApplicantTracker() {
  const [query, setQuery] = useState('');
  const [debouncedQuery] = useDebounce(query, 300);

  const {
    data: appliedJobsData,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useGetAppliedJobsQuery(undefined);

  const { data: jobsData } = useGetJobsQuery({
    orderBy: [{ column: 'createdAt', direction: 'DESC' }],
  });

  const jobTitleById = useMemo(() => {
    const map: Record<string, string> = {};
    (jobsData?.items ?? []).forEach((j) => {
      map[j.id] = j.title;
    });
    return map;
  }, [jobsData]);

  const applicants = useMemo(() => {
    const all = appliedJobsData?.items ?? [];
    const needle = debouncedQuery.trim().toLowerCase();
    if (!needle) return all;
    return all.filter((a) => {
      const title = jobTitleById[a.jobId] ?? '';
      return (
        a.fullName.toLowerCase().includes(needle) ||
        a.email.toLowerCase().includes(needle) ||
        title.toLowerCase().includes(needle)
      );
    });
  }, [appliedJobsData, debouncedQuery, jobTitleById]);

  const showEmpty =
    !isLoading && !isFetching && !isError && applicants.length === 0;

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <div className="relative">
          <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748b] h-4 w-4" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search applicants by name, email, or job..."
            className="w-full pl-10 pr-4 py-2 border border-[#e7eaee] rounded-md bg-[#ffffff] text-[#0a293b] placeholder-[#64748b] focus:outline-none focus:ring-2 focus:ring-[#eaecf0]"
          />
        </div>
      </div>

      {isLoading || isFetching ? (
        <div className="rounded-md bg-white border border-[#e7eaee] p-6 flex flex-col gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-10 bg-[#f1f5f9] animate-pulse rounded-sm" />
          ))}
        </div>
      ) : isError ? (
        <Card className="w-max mx-auto flex flex-col items-center gap-4 p-6">
          <span className="text-red-600">
            Failed to load applications, please try again.
          </span>
          <button
            onClick={() => refetch()}
            className="w-full flex items-center justify-center gap-3 rounded-md px-3 py-1.5 text-sm border-2 border-cyan-950 hover:border-[#10CFD1] hover:bg-[#10CFD1] hover:text-white transition-all duration-300"
          >
            <IconRefresh size={19} />
            <span>Try again</span>
          </button>
        </Card>
      ) : showEmpty ? (
        <div className="text-[#64748b] p-8 text-center bg-white rounded-md border border-[#e7eaee]">
          {debouncedQuery.trim()
            ? 'No applicants match your search.'
            : 'No applications yet.'}
        </div>
      ) : (
        <ApplicantsTable
          applicants={applicants}
          jobTitleById={jobTitleById}
        />
      )}
    </div>
  );
}
