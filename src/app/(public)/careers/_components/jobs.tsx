'use client';
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
                " It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
            tags: ["UI Designer", "UX", "Product Design"],
        },
        {
            title: "Frontend Developer",
            experience: "3+",
            location: "Remote",
            type: "Part Time",
            workMode: "Remote",
            description:
                "We are looking It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.It is a long established fact that a reader will be distracted by the readable content of a page when looking for a skilled frontend developer to build modern web applications using React and TailwindCSS.",
            tags: ["React", "TailwindCSS", "JavaScript"],
        },
        {
            title: "Backend Engineer",
            experience: "4+",
            location: "Nairobi",
            type: "Full Time",
            workMode: "Hybrid",
            description:
                "Responsible It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.It is a long established fact that a reader will be distracted by the readable content of a page when looking for developing scalable backend services and APIs with Node.js and Express.",
            tags: ["Node.js", "API", "Databases"],
        },


             {
            title: "Backend Engineer",
            experience: "4+",
            location: "Nairobi",
            type: "Full Time",
            workMode: "Hybrid",
            description:
                "Responsible  It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.It is a long established fact that a reader will be distracted by the readable content of a page when lookingfor developing scalable backend services and APIs with Node.js and Express.",
            tags: ["Node.js", "API", "Databases"],
        },

               {
            title: "Senior Product Designer - Growth",
            experience: "5+",
            location: "Addis Ababa",
            type: "Full Time",
            workMode: "On Site",
            description:
                "It is  It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.It is a long established fact that a reader will be distracted by the readable content of a page when lookinga long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
            tags: ["UI Designer", "UX", "Product Design"],
        },
    ];

    return (
        <div className="   mx-auto">
      <div className="grid md:grid-cols-1 w-full md:w-[80%] mx-auto items-center gap-6 md:gap-8">
                {jobs.map((job, index) => (
                    <JobCard key={index} {...job} />
                ))}
            </div>
        </div>
    );
}
