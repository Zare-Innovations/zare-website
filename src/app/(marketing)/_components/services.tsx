import { Card, Flex, Stack } from "@mantine/core";
import Image from "next/image";
import ornament1 from "../../../../public/what-we-do/ornament1.png";
import ornament2 from "../../../../public/what-we-do/ornament2.png";

const services = [
  {
    title: "Technology Talent Partnerships",

    icon: "/what-we-do/earth.svg",
    description:
      "We connect you with Ethiopia's top tech professionals: engineers, designers, analysts, and managers who bring both technical expertise and fresh perspective to your team. Our talent integrates seamlessly into your workflow at rates that make scaling your team straightforward and sustainable."
  },
  {
    title: "Technical Support & Maintenance",
    icon: "/what-we-do/headset.svg",
    description:
      "24/7 technical assistance including system updates, performance monitoring, and troubleshooting to keep your software and infrastructure running smoothly."
  },
  {
    title: "Back Office Support",
    icon: "/what-we-do/folder.svg",
    description:
      "Our back-office support services include project management, administrative tasks, and accounting. We ensure that your internal operations run like clockwork, giving you the freedom to focus on your business growth without worrying about the day-to-day details."
  },
  {
    title: "Software Development & AI/ML Solutions",
    icon: "/what-we-do/ai.svg",
    description:
      "Build intelligent, scalable solutions tailored to your business. From custom web and mobile applications to enterprise systems and AI agents, we deliver technology that automates workflows, enhances decision-making, and drives innovation."
  },
  {
    title: "Customer Service & Virtual Assistance",
    icon: "/what-we-do/points.svg",
    description:
      "Our team provides responsive multi-channel customer service and professional virtual assistance, handling everything from customer inquiries and support tickets to administrative tasks, scheduling, data entry, and business operations management."
  }
];

export default function Services() {
  return (
    <Stack
      className="relative bg-[#F5F7FB] md:p-12 gap-7 items-center max-sm:px-5 max-md:px-16 max-md:py-10 "
      id="services"
    >
      <Flex className="flex flex-col mx-auto gap-3 sm:gap-5 text-center">
        <p className="text-2xl sm:text-3xl md:text-5xl font-semibold text-center uppercase">
          services we provide
        </p>
        <p className="text-xs sm:text-sm text-[#6C6C6C]">
          From new digital projects to process optimization and support, we
          partner with business to deliver impactful results.
        </p>
      </Flex>
      <Flex className="relative z-20 grid sm:grid-cols-2 xl:grid-cols-3 gap-4 mx-auto">
        {services.map((service, index) => (
          <Card
            key={index}
            className={` ${index === 3 && "xl:col-span-2"} ${index === services.length - 1 && "sm:max-xl:col-span-2"}`}
            p={5}
          >
            <Flex className={`flex-col p-6 gap-4 `}>
              <div className="bg-[#F5F7FB] p-1.5 min-[500px]:p-2.5 rounded-md self-start">
                <Image
                  src={service.icon}
                  alt={service.title}
                  width={100}
                  height={100}
                  className="h-6 w-6 aspect-square"
                />
              </div>

              <p className="text-xl font-bold">{service.title}</p>
              <p>{service.description}</p>
            </Flex>
          </Card>
        ))}
      </Flex>
      <Image
        src={ornament1}
        alt=""
        width={171}
        height={100}
        className="absolute top-[37%] left-0 -z-0 h-auto w-[171px] aspect-square"
      />
      <Image
        src={ornament2}
        alt=""
        width={171}
        height={100}
        className="absolute bottom-[17%] right-0 -z-0 h-auto w-[171px] aspect-square"
      />
    </Stack>
  );
}
