"use client";

import { Container, Grid, Card, Text, Title, Box } from "@mantine/core";
import {
  IconHeadphones,
  IconServer,
  IconUsers,
  IconRobot,
  IconNetwork,
} from "@tabler/icons-react";

const services = [
  {
    icon: <IconUsers size={36} stroke={1.5} />,
    title: "Technology Talent Partnerships",
    description:
      "Connect with Ethiopia’s skilled tech professionals. We recruit, vet, and place qualified developers and designers who integrate seamlessly with your team at competitive rates.",
  },
  {
    icon: <IconServer size={36} stroke={1.5} />,
    title: "Technical Support & Maintenance",
    description:
      "24/7 technical assistance including system updates, performance monitoring, and troubleshooting to keep your software and infrastructure running smoothly.",
  },
  {
    icon: <IconHeadphones size={36} stroke={1.5} />,
    title: "Back Office Support",
    description:
      "Our back-office support services include project management, administrative tasks, and accounting. We ensure your operations run like clockwork so you can focus on growth.",
  },
  {
    icon: <IconRobot size={36} stroke={1.5} />,
    title: "Software Development & AI/ML Solutions",
    description:
      "Build intelligent, scalable solutions tailored to your business. From web and mobile applications to AI agents, we deliver technology that automates workflows and drives innovation.",
  },
  {
    icon: <IconNetwork size={36} stroke={1.5} />,
    title: "Customer Service & Virtual Assistance",
    description:
      "Our team provides responsive multi-channel customer service and professional virtual assistance — handling inquiries, support tickets, scheduling, and operations management.",
  },
];

export function ServicesSection() {
  return (
    <Box bg="#f7fafd" py={80} id="services">
      <Container size="lg">
        <div className="text-center mb-10">
          <Title order={2} fw={700}>
            SERVICES WE PROVIDE
          </Title>
          <Text c="dimmed" mt={10}>
            From new digital projects to process optimization and support, we
            partner with businesses to deliver impactful results.
          </Text>
        </div>

        <Grid gutter="xl">
          {services.map((service, index) => (
            <Grid.Col
              key={service.title}
              span={{ base: 12, sm: 6, md: index === 3 ? 8 : 4 }}
              className="flex"
            >
              <Card
                shadow="sm"
                radius="md"
                p="lg"
                withBorder
                className="transition-all hover:shadow-lg bg-white flex flex-col h-full"
              >
                <Box className="flex flex-col space-y-3 flex-grow">
                  <Box
                    w={50}
                    h={50}
                    className="bg-gray-50 flex items-center justify-center rounded-md text-gray-700"
                  >
                    {service.icon}
                  </Box>
                  <Text fw={600} size="lg">
                    {service.title}
                  </Text>
                  <Text size="sm" c="dimmed" className="flex-grow">
                    {service.description}
                  </Text>
                </Box>
              </Card>
            </Grid.Col>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
