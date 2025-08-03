`use client`;
import { useEffect, useRef, useState } from "react";
import JobsApplyModal from "./JobsApplyModal";

type JobCardProps = {
    title: string;
    experience: string | number;
    location: string;
    type: string;
    workMode: string;
    description: string;
    tags: string[];
};

export default function JobCard({
    title,
    experience,
    location,
    type,
    workMode,
    description,
    tags,
}: JobCardProps) {

   const [isClamped, setIsClamped] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const ref = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (el) {
      const lineHeight = parseFloat(getComputedStyle(el).lineHeight);
      const maxHeight = lineHeight * 3;
      setIsClamped(el.scrollHeight > maxHeight);
    }
  }, [description]);

    return (
        <div className=" w-full mx-auto bg-white shadow-lg rounded-lg p-4 px-6 border ">
            <h2 className="text-[0.95rem] sm:text-base font-medium mb-4">{title}</h2>

            <div className="flex  w-full  justify-between flex-wrap gap-4 mb-4 text-[0.8rem]">
                <div>
                    <span className="text-teal-600 font-semibold">X of Experience</span>
                    <p className="text-gray-500 text-sm">{experience}</p>
                </div>
                <div>
                    <span className="text-teal-600 font-semibold">Location</span>
                    <p className="text-gray-500 text-sm">{location}</p>
                </div>
                <div>
                    <span className="text-teal-600 font-semibold">Type</span>
                    <p className="text-gray-500 text-sm">{type}</p>
                </div>
                <div>
                    <span className="text-teal-600 font-semibold">Mode</span>
                    <p className="text-gray-500 text-sm">{workMode}</p>
                </div>
            </div>

            <hr className="border-t border-gray-300 my-4" />

          <p
        ref={ref}
        className={`text-[#64748B] text-[0.8rem] sm:text-[0.85rem] mb-2 leading-[1.59] tracking-[0.05em] transition-all duration-300 ${
          expanded ? "" : "line-clamp-3"
        }`}
      >
        {description}
      </p>

      {isClamped && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-teal-400 font-semibold text-[0.8rem]  hover:underline"
        >
          {expanded ? "View less" : "View more"}
        </button>
      )}
            <hr className="border-t border-gray-300 py-2" />

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex flex-wrap gap-2">
                    {tags.map((tag, index) => (
                        <span
                            key={index}
                            className="bg-teal-50 text-teal-700 px-3 py-1 rounded-full text-[0.7rem]"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
             <JobsApplyModal/>
        
            </div>
        </div>

    );
}