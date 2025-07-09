import { Grid, GridCol, Stack } from '@mantine/core';
import React from 'react';
import Development from './development';
import Consulting from './consulting';
import Recruitment from './recruitment';
import DataEngineering from './data-engineering';

export default function Projects() {
  return (
    <Stack px="xl" py="xl" gap="md">
      <h1 className="text-2xl lg:text-4xl font-medium px-4 lg:px-8">
        At Zare Innovations
      </h1>
      <p className="px-4 lg:px-8">
        We have had the privilege of working with a diverse range of clients and
        delivering exceptional digital products that drive success.
      </p>

      <Grid columns={2} mt={50}>
        <GridCol span={{ base: 2, md: 1 }}>
          <Development />
        </GridCol>
        <GridCol span={{ base: 2, md: 1 }}>
          <Consulting />
        </GridCol>
        <GridCol span={{ base: 2, md: 1 }}>
          <Recruitment />
        </GridCol>
        <GridCol span={{ base: 2, md: 1 }}>
          <DataEngineering />
        </GridCol>
      </Grid>
    </Stack>
  );
}
