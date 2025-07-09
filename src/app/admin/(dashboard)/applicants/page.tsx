import { IconSearch } from '@tabler/icons-react';

import { Pagination } from '../_components/pagination';
import { ApplicantsTable } from '../_components/applicants-table';
import { applicants } from '@/mock/applicants';

export default function JobApplicantTracker() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <div className="relative">
          <IconSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#64748b] h-4 w-4" />
          <input
            type="text"
            placeholder="Search job posts by title, location, or status..."
            className="w-full pl-10 pr-4 py-2 border border-[#e7eaee] rounded-md bg-[#ffffff] text-[#0a293b] placeholder-[#64748b] focus:outline-none focus:ring-2 focus:ring-[#eaecf0]"
          />
        </div>
      </div>

      <ApplicantsTable applicants={applicants} />

      <div className="mt-8">
        <Pagination />
      </div>
    </div>
  );
}
