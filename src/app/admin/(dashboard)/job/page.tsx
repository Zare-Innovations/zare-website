'use client';

import { useEffect, useState } from 'react';
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
  Modal,
  Button,
} from '@mantine/core';
import {
  IconSearch,
  IconEdit,
  IconTrash,
  IconRefresh,
  IconChevronLeft,
  IconChevronRight,
} from '@tabler/icons-react';
import { Job,  useDeleteJobMutation, useGetJobsQuery } from '@/store/api/job.api';
import { useDebounce } from 'use-debounce';
import { notifications } from '@mantine/notifications';
import { useRouter } from 'next/navigation';


export default function JobManagement() {
  const [activePage, setActivePage] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const [debouncedSearch] = useDebounce(searchValue, 2000); // 2 seconds



const where: any[] = [];


const searchableKeys: (keyof Job)[] = ['title'];

if (debouncedSearch) {
  searchableKeys.forEach(key => {
    where.push([
      {
        column: key,
        value: `%${debouncedSearch}%`,
        operator: 'ILIKE',
      },
    ]);
  });
}




const { 
  data: jobsDataResponse, 
 
  refetch 
} = useGetJobsQuery({where});


  const [deleteJob] = useDeleteJobMutation();

  const [jobListings, setJobListings] = useState<Job[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);

  const itemsPerPage = 10;
const totalPages = Math.ceil(jobListings.length / itemsPerPage);
  const paginatedJobs = jobListings.slice(
  (activePage - 1) * itemsPerPage,
  activePage * itemsPerPage
);


const router = useRouter();
  useEffect(() => {
    if (jobsDataResponse?.items) {
      setJobListings(jobsDataResponse.items);
    }
  }, [jobsDataResponse]);

  const handleDeleteClick = (jobId: string) => {
    setSelectedJobId(jobId);
    setModalOpen(true);
  };

 const handleEditClick = (jobId: string) => {
  router.push(`/admin/job/${jobId}`);
};
  const handleConfirmDelete = async () => {
    if (selectedJobId) {
      try {
        await deleteJob({ id: selectedJobId }).unwrap();
        await refetch(); 
        setModalOpen(false);
        setSelectedJobId(null);
      } catch {
        setModalOpen(false)
        notifications.show({
          title: 'Delete Failed',
          message: 'Cannot delete this job. Please try again.',
          color: 'red',
        });
        ;
      }
    }
  };

  // const getStatusColor = (status: string) => {
  //   return status === 'Active' ? 'teal' : 'red';
  // };

  const rows = paginatedJobs.length > 0
    ? paginatedJobs.map((job) => (
      <Table.Tr key={job.id}>
        <Table.Td>
          <div>
            <Text fw={500} size="sm">
              {job.title}
            </Text>
            <Text size="xs" c="dimmed">
              {/* If job.experience is not present in Job, remove or adjust this line */}
              {'experience' in job ? (job as any).experience : ''}
            </Text>
          </div>
        </Table.Td>
        <Table.Td>
          <Text size="sm" c="dimmed">
            {/* If job.jobType is not present in Job, remove or adjust this line */}
            {job?.type}
          </Text>
        </Table.Td>
        <Table.Td>
          <Text size="sm" c="dimmed">
            {/* If job.workType is not present in Job, remove or adjust this line */}
            {'workType' in job ? (job as any).workType : ''}
          </Text>
        </Table.Td>
        <Table.Td>
          <Badge
            color={new Date(job.endDate) < new Date() ? 'red' : 'green'}
            variant="light"
            size="sm"
          >
            {new Date(job.endDate) < new Date() ? 'CLOSED' : 'ACTIVE'}
          </Badge>
        </Table.Td>
        <Table.Td>
          <Text size="sm" c="dimmed">
            {job.startDate ? new Date(job.startDate).toLocaleDateString(undefined, {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            }) : ''}
          </Text>
        </Table.Td>

        <Table.Td>
          <Text size="sm" c="dimmed">
            {job.endDate ? new Date(job.endDate).toLocaleDateString(undefined, {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            }) : ''}
          </Text>
        </Table.Td>

        <Table.Td>
          <Anchor size="sm" td="underline">
            {/* If job.applications is not present in Job, remove or adjust this line */}
            {'applications' in job ? (job as any).applications : 0} applicants
          </Anchor>
        </Table.Td>
        <Table.Td>
          <Group gap="xs">
            {(job as any).status === 'Closed' && (
              <ActionIcon variant="subtle" color="gray" size="sm">
                <IconRefresh style={{ width: rem(16), height: rem(16) }} />
              </ActionIcon>
            )}
            <ActionIcon variant="subtle" color="gray" size="sm"
             onClick={() => handleEditClick(job.id)}>
              <IconEdit style={{ width: rem(16), height: rem(16) }} />
            </ActionIcon>
            <ActionIcon
              variant="subtle"
              color="red"
              size="sm"
              onClick={() => handleDeleteClick(job.id)}
            >
              <IconTrash style={{ width: rem(16), height: rem(16) }} />
            </ActionIcon>
          </Group>
        </Table.Td>
      </Table.Tr>
    ))
    : null;

  return (
    <Container size="xl" py="md">
      <Paper p="md" radius="md" withBorder>
        {/* Search Bar */}
        <TextInput
          className="w-96"
          placeholder="Search job posts by title, location, or status..."
          leftSection={<IconSearch style={{ width: rem(16), height: rem(16) }} />}
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
  total={totalPages}
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

        <Modal
          opened={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Delete Job"
          centered
        >
          <Text>Are you sure you want to delete this job?</Text>
          <Group mt="md" justify="flex-end">
            <Button variant="default" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button color="red" onClick={handleConfirmDelete}>
              Delete
            </Button>
          </Group>
        </Modal>
      </Paper>
    </Container>
  );
}


