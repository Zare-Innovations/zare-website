import JobCard from "./jobCard";

export function Jobs() {

    const jobs = [
        {
            title: "Senior Product Designer - Growth",
            experience: "5+",
            location: "Addis Ababa",
            type: "Full Time",
            workMode: "On Site",
            description:
                "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
            tags: ["UI Designer", "UX", "Product Design"],
        },
        {
            title: "Frontend Developer",
            experience: "3+",
            location: "Remote",
            type: "Part Time",
            workMode: "Remote",
            description:
                "We are looking for a skilled frontend developer to build modern web applications using React and TailwindCSS.",
            tags: ["React", "TailwindCSS", "JavaScript"],
        },
        {
            title: "Backend Engineer",
            experience: "4+",
            location: "Nairobi",
            type: "Full Time",
            workMode: "Hybrid",
            description:
                "Responsible for developing scalable backend services and APIs with Node.js and Express.",
            tags: ["Node.js", "API", "Databases"],
        },
    ];

    return (
        <div className="   mx-auto">
            <div className="grid md:grid-cols-3 gap-6">
                {jobs.map((job, index) => (
                    <JobCard key={index} {...job} />
                ))}
            </div>
        </div>
    );
}
