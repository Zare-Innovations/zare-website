import { Divider, Flex, Stack } from "@mantine/core";
import {
  IconChartPie,
  IconCommand,
  IconDatabase,
  IconDeviceDesktop,
  IconPhoneCall,
  IconScreenShare,
} from "@tabler/icons-react";

const services = [
  {
    title: "UI/UX Design",
    icon: IconScreenShare,
    description:
      "We create user-centric, intuitive designs that not only look great but also enhance the overall user experience. Whether it’s a mobile app or a website, our designs are crafted to engage users and align with your brand's identity.",
  },
  {
    title: "Software Development",
    icon: IconCommand,
    description:
      "Our custom software solutions, ranging from mobile apps to web-based platforms, are designed to meet your business's unique needs. With a focus on innovation and efficiency, we build solutions that help your business grow and stay competitive.",
  },
  {
    title: "Data Management and AI Solutions",
    icon: IconDatabase,
    description:
      "Our expertise in data scraping and research ensures you have access to critical information, while our machine learning and AI capabilities transform your data into actionable insights, helping you make informed, growth-oriented decisions.",
  },
  {
    title: "Customer Support",
    icon: IconPhoneCall,
    description:
      "We offer seamless, multichannel support across phone, email, chat, and social media. Our team, proficient in the highest level of English communication, delivers quick and efficient solutions, ensuring your customers receive exceptional service every time.",
  },
  {
    title: "Back Office Support",
    icon: IconDeviceDesktop,
    description:
      "Our back-office support services include project management, administrative tasks, and accounting. We ensure that your internal operations run like clockwork, giving you the freedom to focus on your business growth without worrying about the day-to-day details.",
  },
  {
    title: "HR Outsourcing",
    icon: IconChartPie,
    description:
      "From onboarding to payroll and recruitment, our HR services cover everything you need to manage your team efficiently. We handle the details, so you can focus on driving your business forward, knowing that your HR functions are in expert hands.",
  },
];

export default function Services() {
  return (
    <Stack className="bg-[#0A293B] p-12 gap-3 text-white items-center">
      <Flex className="flex flex-col mx-auto gap-2">
        <p className="text-2xl mx-auto font-bold">WHAT WE DO</p>
        <Divider size="sm" className="w-full" color="cyan" />
      </Flex>
      <Flex className="flex-row gap-6 items-center flex-wrap mx-auto">
        {services.map((service, index) => (
          <Flex
            className="flex-col border-r-[1px]  border-gray-600 w-[calc(33%-1rem)] p-6 gap-4"
            key={index}
          >
            <service.icon color="cyan" />
            <p className="text-xl font-bold">{service.title}</p>
            <p>{service.description}</p>
          </Flex>
        ))}
      
      </Flex>
    </Stack>
  );
}
