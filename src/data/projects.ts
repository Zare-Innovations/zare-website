export interface Project {
  title: string;
  details: {
    challenge: string;
    solution: string;
    results: string;
  };
  location: string;
  about: {
    link: string;
    name: string;
    logo: string;
    image: string;
  };
}

export interface ProjectsList {
  category: string;
  description: string;
  projects: Project[];
}

export const projectCategories: ProjectsList[] = [
  {
    category: "Custom Software & AI Solutions",
    description:
      "Bespoke software engineering and AI-driven solutions built to address unique operational and business challenges. Our expertise covers full-stack development, custom ERP and CRM systems, next-generation UI/UX, and pioneering AI applications—delivering measurable improvements in efficiency, data integration, and decision-making for organizations across industries.",
    projects: [
      {
        title: "251 Marketing - Custom ERP/CRM Tool",
        location: "Addis Ababa, Ethiopia",
        details: {
          challenge:
            "Inefficient internal processes and a lack of centralized data management were hindering operational scalability and creating data silos.",
          solution:
            "Developed a custom, all-in-one CRM/ERP tool tailored for internal use. The platform facilitates onboarding and employee metrics tracking, financial management and invoicing, lead and client relationship management, project management and resource allocation.",
          results:
            "Significantly enhanced operational efficiency, improved data visibility across all departments, and streamlined core business processes from HR to finance and project delivery.",
        },
        about: {
          link: "https://www.251communications.com/",
          name: "251 Marketing & Communications",
          logo: "/our-work/251-logo.png",
          image: "/our-work/251-dashboard.png",
        },
      },
      {
        title: "Medrafa - Pharmaceutical Operations Dashboard",
        location: "Addis Ababa, Ethiopia",
        details: {
          challenge:
            "The client had a powerful pharmacy tracking system but lacked the UI/UX expertise to create a user-friendly dashboard for it.",
          solution:
            "Provided end-to-end UI/UX design and frontend implementation for a comprehensive pharmaceutical operations dashboard, turning complex data into a clean and intuitive interface.",
          results:
            "Delivered an intuitive dashboard that streamlined pharmacy operations. The enhanced UI led to increased user engagement and greater data accessibility for faster decision-making.",
        },
        about: {
          link: "https://medrafa.et/",
          name: "Medrafa",
          logo: "/our-work/madrafa-logo.png",
          image: "/our-work/medrafa.png",
        },
      },
      // {
      //   title: "Numedic LLC - AI-Powered Medical Research Tool",
      //   location: "Washington, D.C., USA",
      //   details: {
      //     challenge:
      //       "Medical researchers were slowed down by manual, inefficient, and error-prone systematic literature review processes.",
      //     solution:
      //       "Architected a revolutionary research tool using a multi-agent AI system to automate and optimize literature searches in a compliant, structured workflow.",
      //     results:
      //       "Delivered a flagship AI platform that dramatically accelerates research timelines and improves the accuracy of systematic reviews, transforming a critical part of the medical research process.",
      //   },
      //   about: {
      //     link: "/",
      //     name: "Numedic LLC",
      //     logo: PLACEHOLDER_LOGO,
      //     image: PLACEHOLDER_IMAGE,
      //   },
      // },
      {
        title: "KeySquare Labs - Custom Geotagging Software",
        location: "Virginia, USA",
        details: {
          challenge:
            "The client needed to perform highly specialized geospatial data processing that was impossible with their existing off-the-shelf tools.",
          solution:
            "Designed and developed a high-performance, customized geotagging software solution using the .NET framework, tailored to the client's unique data requirements.",
          results:
            "Empowered the client with a powerful, custom-built tool that unlocked new data analysis capabilities. The client stated: \"Great experience with Zare; we have one of the most talented engineers to work with, couldn't be happier!\"",
        },
        about: {
          link: "https://www.keysquarelabs.com/",
          name: "KeySquare Labs",
          logo: '/our-work/logos/keysquare.png',
          image: '/our-work/shots/keysquare.png',
        },
      },
    ],
  },
  {
    category: "Talent & BPO Operations",
    description:
      "Global talent sourcing and business process outsourcing for technology and customer service needs. We help clients overcome local talent shortages and reduce operational costs by recruiting, vetting, and integrating high-performing remote technical teams or customer support agents, yielding seamless expansion and notable cost-efficiency.",
    projects: [
      {
        title: "Pickrell Global Technologies",
        location: "Pennsylvania, USA",
        details: {
          challenge:
            "The client needed to expand its software team but was hindered by the high overhead costs and intense competition for talent in the USA.",
          solution:
            "Sourced, vetted, and recruited three full-time remote software developers from Ethiopia, creating a cost-effective and highly skilled global talent pipeline.",
          results:
            "Successfully integrated three high-performing developers into the client's team, cutting talent overhead costs by over 50% while exceeding all performance expectations.",
        },
        about: {
          link: "https://pickrellglobaltechnologies.com/",
          name: "Pickrell Global Technologies",
          logo: '/our-work/logos/pickrell.png',
          image: '/our-work/shots/pickrell.png',
        },
      },
      {
        title: "Exelia Technologies - Global UI/UX Designer Hire",
        location: "Nicosia, Cyprus",
        details: {
          challenge:
            "The Cyprus-based client faced a limited local talent pool for specialized UI/UX design skills, creating a bottleneck in their product development.",
          solution:
            "Conducted a targeted global search to identify and facilitate the direct hire of a top-tier remote UI/UX Designer from Ethiopia.",
          results:
            "The client successfully closed a critical skills gap by hiring a full-time remote designer who consistently exceeds performance expectations and brings a world-class design perspective.",
        },
        about: {
          link: "https://www.exeliatech.com/",
          name: "Exelia Technologies",
          logo: '/our-work/logos/exelia-transparent.png',
          image: '/our-work/shots/exelia.png',
        },
      },
      {
        title: "CRDLE - Customer Service BPO",
        location: "Pittsburgh, Pennsylvania, USA",
        details: {
          challenge:
            "The client needed a scalable customer support operation for its US clientele without the high cost and administrative burden of an in-house team.",
          solution:
            "Deployed a full-service Business Process Outsourcing (BPO) solution, managing a dedicated team of customer service representatives from Ethiopia.",
          results:
            "Established a highly efficient and professional customer service operation that delivers exceptional service at a fraction of the cost, allowing the client to focus on core business growth.",
        },
        about: {
          link: "https://crdle.com/",
          name: "CRDLE",
          logo: '/our-work/logos/crdle.png',
          image: '/our-work/shots/crdle.png',
        },
      },
      {
        title: "Kagool - Rapid Talent Acquisition",
        location: "London, UK",
        details: {
          challenge:
            "The UK-based client faced the urgent need to staff over 80 positions for a new branch in Addis Ababa within an aggressive one-month deadline.",
          solution:
            "Deployed a rapid, high-volume talent acquisition strategy, leveraging deep local networks and an accelerated vetting process.",
          results:
            "Successfully delivered a vetted pipeline of over 80 qualified candidates within one month, enabling a smooth, on-schedule operational launch for the new African branch.",
        },
        about: {
          link: "https://www.kagool.com/",
          name: "Kagool",
          logo: '/our-work/logos/kagol.svg',
          image: '/our-work/shots/kagol.png',
        },
      },
    ],
  },
  {
    category: "Data Mining & Intelligence",
    description:
      "Precise data acquisition, cleaning, and analysis to fuel marketing, communications, and strategic decision-making. We enable organizations to accelerate outreach and build powerful business intelligence through customized data mining operations, systematic lead generation, and creation of actionable datasets across diverse markets.",
    projects: [
      {
        title: "Africa Communications Media Group - Media Database",
        location: "Pan-African",
        details: {
          challenge:
            "The client needed a comprehensive media contact list to support a pan-African communications campaign but lacked the resources to collect the data manually.",
          solution:
            "Executed a targeted data mining operation to collect contact details and social media information for 200 journalists across the African continent.",
          results:
            "Delivered a clean, verified, and actionable database of 200 key media contacts, empowering the client to launch a highly effective and targeted outreach campaign.",
        },
        about: {
          link: "https://africacommunicationsgroup.com/",
          name: "Africa Communications Media Group",
          logo: '/our-work/logos/acmg.png',
          image: '/our-work/shots/acmg.png',
        },
      },
      // {
      //   title: "Ubutix - Marketing Intelligence",
      //   location: "London, UK",
      //   details: {
      //     challenge:
      //       "To support its platform launch, the client required targeted market intelligence and lead-generation data on potential partners and sponsors across Africa.",
      //     solution:
      //       "Provided comprehensive data scraping and data mining services to build targeted marketing lists and gather intelligence on event organizers and corporate entities.",
      //     results:
      //       "Equipped the Ubutix marketing team with valuable, actionable data that fueled their strategic outreach and was instrumental in securing early partnerships and driving user adoption.",
      //   },
      //   about: {
      //     link: "/",
      //     name: "Ubutix",
      //     logo: PLACEHOLDER_LOGO,
      //     image: PLACEHOLDER_IMAGE,
      //   },
      // },
    ],
  },
];
