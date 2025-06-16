import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react';

export function Pagination() {
  return (
    <div className="flex items-center justify-between">
      <button className="flex items-center gap-2 text-[#64748b] hover:text-[#0a293b]">
        <IconArrowLeft className="h-4 w-4" />
        <span>Previous</span>
      </button>

      <div className="flex items-center gap-2">
        <button className="h-8 w-8 flex items-center justify-center rounded-md bg-[#0a293b] text-white">
          1
        </button>
        <button className="h-8 w-8 flex items-center justify-center rounded-md text-[#64748b] hover:bg-[#f7f8f9]">
          2
        </button>
        <button className="h-8 w-8 flex items-center justify-center rounded-md text-[#64748b] hover:bg-[#f7f8f9]">
          3
        </button>
        <span className="text-[#64748b]">...</span>
      </div>

      <button className="flex items-center gap-2 text-[#64748b] hover:text-[#0a293b]">
        <span>Next</span>
        <IconArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
}
