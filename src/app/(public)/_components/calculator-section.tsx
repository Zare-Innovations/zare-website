'use client';

import { Container, Title, Text, Grid, Card, Stack, Flex } from '@mantine/core';
import classes from './calculator-section.module.css';
import Image from 'next/image';
import ZareEstimatorModal from './calculator-modal';

const professionals = [
  {
    name: 'UX/UI Designer',
    rate: '25$/hr',
    avatars: '👨🏾',
    avatar: '/calculator/1.jpg',
    color: 'orange',
    bgColor: '#FFA500',
  },
  {
    name: 'Data Analyst',
    rate: '20$/hr',
    avatars: '👩🏾‍💼',
    avatar: '/calculator/2.jpg',
    color: 'blue',
    bgColor: '#4A90E2',
  },
  {
    name: 'Graphic Designer',
    rate: '15$/hr',
    avatars: '👩🏾‍🎨',
    avatar: '/calculator/3.jpg',
    color: 'pink',
    bgColor: '#E91E63',
  },
  {
    name: 'Backend Developer',
    rate: '30$/hr',
    avatars: '👨🏾‍💻',
    avatar: '/calculator/4.jpg',
    color: 'green',
    bgColor: '#4CAF50',
  },
];

export default function CalculatorSection() {
  return (
    <Flex className="px-5 md:px-12 mt-16" justify="center" align="center">
      <Flex w="100%" bg={'#0A293B'} px={'xl'}>
        <Container size="xl" py={80}>
          <Grid align="center" gutter={60}>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Stack gap={30}>
                <Title order={1} className={classes.title} size="h1" mb={16}>
                  Hire Smarter{' '}
                  <Text
                    component="span"
                    inherit
                    className={classes.titleAccent}
                  >
                    Spend Less
                  </Text>
                </Title>

                <Text size="lg" className={classes.description}>
                  Instantly see how much you could save by outsourcing top tier
                  talent with Zare. Compare real market rates vs. our expert
                  pricing — no email or guesswork needed.
                </Text>

                <ZareEstimatorModal />
              </Stack>
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 6 }} className="hidden md:block">
              <Grid gutter="lg" className="w-2/3">
                {professionals.map((professional, index) => (
                  <Grid.Col span={{ base: 12, md: 6 }} key={index}>
                    <Card
                      shadow="lg"
                      className={classes.professionalCard}
                      withBorder
                    >
                      <Stack
                        align="center"
                        justify="center"
                        className="h-[180px]"
                      >
                        <div>
                          <Image
                            src={professional.avatar}
                            alt={professional.name}
                            width={130}
                            height={150}
                          />
                        </div>

                        <Stack gap={4} align="center">
                          <Text size="xs" fw={600} c="dark.7" ta="center">
                            {professional.name} - {professional.rate}
                          </Text>
                        </Stack>
                      </Stack>
                    </Card>
                  </Grid.Col>
                ))}
              </Grid>
            </Grid.Col>
          </Grid>
        </Container>
      </Flex>
    </Flex>
  );
}
