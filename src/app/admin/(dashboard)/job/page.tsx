'use client';

import { useState } from 'react';
import {
  Table,
  TextInput,
  Badge,
  ActionIcon,
  Group,
  Text,
  Container,
  Paper,
  Pagination,
  Anchor,
  rem,
} from '@mantine/core';
import {
  IconSearch,
  IconEdit,
  IconTrash,
  IconRefresh,
  IconChevronLeft,
  IconChevronRight,
} from '@tabler/icons-react';
import { jobListings } from '@/mock/job-listing';

interface JobListing {
  id: string;
  title: string;
  experience: string;
  jobType: string;
  workType: string;
  status: string;
  startDate: string;
  endDate: string;
  applications: number;
}

export default function JobManagement() {
  const [searchValue, setSearchValue] = useState('');
  const [activePage, setActivePage] = useState(1);

  const getStatusColor = (status: string) => {
    return status === 'Active' ? 'teal' : 'red';
  };

  const rows = jobListings.map((job: JobListing) => (
    <Table.Tr key={job.id}>
      <Table.Td>
        <div>
          <Text fw={500} size="sm">
            {job.title}
          </Text>
          <Text size="xs" c="dimmed">
            {job.experience}
          </Text>
        </div>
      </Table.Td>
      <Table.Td>
        <Text size="sm" c="dimmed">
          {job.jobType}
        </Text>
      </Table.Td>
      <Table.Td>
        <Text size="sm" c="dimmed">
          {job.workType}
        </Text>
      </Table.Td>
      <Table.Td>
        <Badge color={getStatusColor(job.status)} variant="light" size="sm">
          {job.status}
        </Badge>
      </Table.Td>
      <Table.Td>
        <Text size="sm" c="dimmed">
          {job.startDate}
        </Text>
      </Table.Td>
      <Table.Td>
        <Text size="sm" c="dimmed">
          {job.endDate}
        </Text>
      </Table.Td>
      <Table.Td>
        <Anchor size="sm" td="underline">
          {job.applications} applicants
        </Anchor>
      </Table.Td>
      <Table.Td>
        <Group gap="xs">
          {job.status === 'Closed' && (
            <ActionIcon variant="subtle" color="gray" size="sm">
              <IconRefresh style={{ width: rem(16), height: rem(16) }} />
            </ActionIcon>
          )}
          <ActionIcon variant="subtle" color="gray" size="sm">
            <IconEdit style={{ width: rem(16), height: rem(16) }} />
          </ActionIcon>
          <ActionIcon variant="subtle" color="red" size="sm">
            <IconTrash style={{ width: rem(16), height: rem(16) }} />
          </ActionIcon>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Container size="xl" py="md">
      <Paper p="md" radius="md" withBorder>
        {/* Search Bar */}
        <TextInput
          className="w-96"
          placeholder="Search job posts by title, location, or status..."
          leftSection={
            <IconSearch style={{ width: rem(16), height: rem(16) }} />
          }
          value={searchValue}
          onChange={(event) => setSearchValue(event.currentTarget.value)}
          mb="lg"
          size="md"
        />

        {/* Table */}
        <Table.ScrollContainer minWidth={800}>
          <Table verticalSpacing="md" horizontalSpacing="md">
            <Table.Thead>
              <Table.Tr>
                <Table.Th>
                  <Text fw={500} size="sm" c="dimmed">
                    Job Title
                  </Text>
                </Table.Th>
                <Table.Th>
                  <Text fw={500} size="sm" c="dimmed">
                    Job Type
                  </Text>
                </Table.Th>
                <Table.Th>
                  <Text fw={500} size="sm" c="dimmed">
                    Work Type
                  </Text>
                </Table.Th>
                <Table.Th>
                  <Text fw={500} size="sm" c="dimmed">
                    Status
                  </Text>
                </Table.Th>
                <Table.Th>
                  <Text fw={500} size="sm" c="dimmed">
                    Start Date
                  </Text>
                </Table.Th>
                <Table.Th>
                  <Text fw={500} size="sm" c="dimmed">
                    End Date
                  </Text>
                </Table.Th>
                <Table.Th>
                  <Text fw={500} size="sm" c="dimmed">
                    Applications
                  </Text>
                </Table.Th>
                <Table.Th>
                  <Text fw={500} size="sm" c="dimmed">
                    Actions
                  </Text>
                </Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        </Table.ScrollContainer>

        {/* Pagination */}
        <Group justify="space-between" mt="xl">
          <Group>
            <ActionIcon variant="subtle" color="gray" disabled>
              <IconChevronLeft style={{ width: rem(16), height: rem(16) }} />
            </ActionIcon>
            <Text size="sm" c="dimmed">
              Previous
            </Text>
          </Group>

          <Pagination
            total={3}
            value={activePage}
            onChange={setActivePage}
            size="sm"
          />

          <Group>
            <Text size="sm" c="dimmed">
              Next
            </Text>
            <ActionIcon variant="subtle" color="gray">
              <IconChevronRight style={{ width: rem(16), height: rem(16) }} />
            </ActionIcon>
          </Group>
        </Group>
      </Paper>
    </Container>
  );
}
