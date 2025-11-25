"use client";

import Image from "next/image";
import { Title, Text } from '@mantine/core';
const projects = [{
  image: "/project/251-train.svg", logo: "/our-work/logos/3.png", title: "", client: "",
  location: "Washington, D.C., USA | NUMEDIC LLC",
  description: "Revolutionary systematic literature search and research synthesis tool for medical and scientific domains using sophisticated multi-agent system."
},
{
  image: "/project/pharmaceutical.svg", logo: "/our-work/logos/medefa.svg", title: "Pharmaceutical Dashboard",
  client: "MedRafa", location: "Addis Ababa, Ethiopia",
  description: "Designed a comprehensive pharmacy operations dashboard that streamlines daily workflows and strengthens compliance."
},
{
  image: "/project/251.svg", logo: "/our-work/logos/3.png", title: "Internal CRM/ERP Tool Development",
  client: "",
  location: "Addis Ababa . Ethiopia | Marketing & Communications",
  description: "Developed a custom CRM/ERP tool tailored for internal use. The tool facilitates onboarding, employee and financial metrics tracking, invoice and payment request generation, lead and client management, and project management, significantly enhancing operational efficiency"
},
{
  image: "/project/geotagging.svg", logo: "/our-work/logos/14.png",
  title: "Geotagging Software Development", client: "",
  location: "VIRGINIA, USA | KEYSQUARE LABS",
  description: "Developed a customized geotagging solution using the .NET framework to enhance geospatial data processing and location-based capabilities."
}];
export default function AlternatingProjectList() {
  return (
    <div>
      {projects.map((project, i) => {
        const reversed = i % 2 !== 0;
        return (
          <div
            key={i}
            className={`grid grid-cols-1 md:grid-cols-2 items-stretch border-b border-gray-200`}
          >
            {/* IMAGE CARD */}
            <div
              className={`bg-white p-0 flex items-stretch ${reversed ? "md:order-last md:border-l" : "md:order-first md:border-r"
                } border-gray-200`}
            >
              <Image
                src={project.image}
                alt={project.title}
                width={650}
                height={400}
                className="object-cover w-full h-full"
              />
            </div>


            {/* DESCRIPTION CARD */}
            <div className={`bg-white p-12 flex flex-col justify-center ${reversed ? "md:order-first" : "md:order-last"
              }`}
            >
              <div className="space-y-6">
                {/* Top Row: Logo (optional) + View Project */}
                <div className="flex justify-between items-start">
                  {/* Larger logo size */}
                  {project.logo ? (
                    <div className="w-20 h-20 flex items-center justify-center rounded-sm overflow-hidden">
                      <Image
                        src={project.logo}
                        alt={`${project.title} logo`}
                        width={80}
                        height={80}
                        className="object-contain"
                      />
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center leading-tight tracking-tight rounded-sm w-20 h-20 bg-gray-100" />
                  )}


                  <a
                    href="#"
                    className="text-gray-500 text-sm hover:opacity-70 font-semibold tracking-wide flex items-center gap-1"
                  >
                    VIEW PROJECT ↗
                  </a>
                </div>


                {/* Title */}
                <h2 className="text-3xl font-bold tracking-tight leading-snug">
                  {project.title}
                </h2>


                {/* Description */}
                <p className="text-gray-600 leading-relaxed text-base max-w-xl">
                  {project.description}
                </p>


                {/* Meta row */}
                <p className="text-sm font-semibold text-[#003366] underline uppercase tracking-wide">
                  {project.location} · {project.client}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
