import { Divider, Flex, Stack } from '@mantine/core';
import Image from 'next/image';

const services = [
  {
    title: 'UI/UX Design',

    icon: '/what-we-do/ui-ux.svg',
    description:
      "We create user-centric, intuitive designs that not only look great but also enhance the overall user experience. Whether it’s a mobile app or a website, our designs are crafted to engage users and align with your brand's identity.",
  },
  {
    title: 'Software Development',
    icon: '/what-we-do/software-development.svg',
    description:
      "Our custom software solutions, ranging from mobile apps to web-based platforms, are designed to meet your business's unique needs. With a focus on innovation and efficiency, we build solutions that help your business grow and stay competitive.",
  },
  {
    title: 'Data Management and AI Solutions',
    icon: '/what-we-do/data-management.svg',
    description:
      'Our expertise in data scraping and research ensures you have access to critical information, while our machine learning and AI capabilities transform your data into actionable insights, helping you make informed, growth-oriented decisions.',
  },
  {
    title: 'Customer Support',
    icon: '/what-we-do/customer-support.svg',
    description:
      'We offer seamless, multichannel support across phone, email, chat, and social media. Our team, proficient in the highest level of English communication, delivers quick and efficient solutions, ensuring your customers receive exceptional service every time.',
  },
  {
    title: 'Back Office Support',
    icon: '/what-we-do/backoffice.svg',
    description:
      'Our back-office support services include project management, administrative tasks, and accounting. We ensure that your internal operations run like clockwork, giving you the freedom to focus on your business growth without worrying about the day-to-day details.',
  },
  {
    title: 'HR Outsourcing',
    icon: '/what-we-do/hr-outsourcing.svg',
    description:
      'From onboarding to payroll and recruitment, our HR services cover everything you need to manage your team efficiently. We handle the details, so you can focus on driving your business forward, knowing that your HR functions are in expert hands.',
  },
];

export default function Services() {
  return (
    <Stack
      className="bg-[#0A293B] md:p-12 gap-3 text-white items-center"
      id="services"
    >
      <Flex className="flex flex-col mx-auto gap-2">
        <p className="text-2xl mx-auto font-bold mt-8 md:mt-0">WHAT WE DO</p>
        <Divider size="sm" className="w-full" color="cyan" />
      </Flex>
      <Flex className="relative flex-col md:flex-row gap-6 items-center flex-wrap mx-auto">
        <div className="hidden lg:block absolute top-1/2  translate-y-1/2 w-full mx-auto h-[1px] bg-gray-600">
          <div className="absolute left-1/3 -translate-x-[50px] w-16 h-[2px] bg-[#0A293B] border-2 border-[#0A293B]"></div>
          <div className="absolute left-2/3 -translate-x-[50px] w-16 h-[2px] -translate-y-1/2 bg-[#0A293B]  border-2 border-[#0A293B]"></div>
        </div>
        {services.map((service, index) => (
          <Flex
            className={`flex-col border-b-[1px] lg:border-b-0  border-gray-600 w-full lg:w-[calc(33%-1rem)] p-6 gap-4 min-h-[300px] ${(index + 1) % 3 === 0 ? '' : 'lg:border-r-[1px]'}`}
            key={index}
          >
            <Image
              src={service.icon}
              alt={service.title}
              width={100}
              height={100}
              className="h-6 w-6 aspect-square"
            />

            <p className="text-xl font-bold">{service.title}</p>
            <p>{service.description}</p>
          </Flex>
        ))}
      </Flex>
    </Stack>
  );
}
