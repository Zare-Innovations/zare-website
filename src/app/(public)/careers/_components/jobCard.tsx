







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
    return (
        <div className="max-w-md w-full mx-auto bg-white shadow-lg rounded-lg p-4 sm:p-6 border">
            <h2 className="text-[0.95rem] sm:text-base font-medium mb-4">{title}</h2>

            <div className="flex flex-wrap gap-4 mb-4 text-[0.75rem] sm:text-[0.8rem]">
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

            <p className="text-[#64748B] text-[0.8rem] sm:text-[0.85rem] mb-4 leading-[1.59] tracking-[0.05em]  h-16">
                {description}
            </p>

            <hr className="border-t border-gray-300 my-4" />

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex flex-wrap gap-2">
                    {tags.map((tag, index) => (
                        <span
                            key={index}
                            className="bg-teal-50 text-teal-700 px-3 py-1 rounded-full text-[0.65rem]"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                <button className="text-[0.7rem] font-semibold bg-[#0A293B] text-white px-6 sm:px-10 py-2 rounded-lg hover:bg-teal-800 transition w-full sm:w-auto">
                    Apply
                </button>
            </div>
        </div>

    );
}