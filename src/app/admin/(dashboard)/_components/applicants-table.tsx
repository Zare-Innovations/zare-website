'use client';
import { Table, Text, Anchor } from '@mantine/core';
import { StatusBadge } from './status-badge';

interface Applicant {
  name: string;
  email: string;
  job: string;
  experience: string;
  education: string;
  appliedOn: string;
  status: string;
}

export function ApplicantsTable({ applicants }: { applicants: Applicant[] }) {
  const rows = applicants.map((applicant, index) => (
    <Table.Tr key={index}>
      <Table.Td>
        <div>
          <Text size="sm" fw={500} c="#101828">
            {applicant.name}
          </Text>
          <Text size="xs" c="#64748b" mt={2}>
            {applicant.email}
          </Text>
        </div>
      </Table.Td>
      <Table.Td>
        <Text size="sm" c="#0a293b">
          {applicant.job}
        </Text>
      </Table.Td>
      <Table.Td>
        <Text size="sm" c="#0a293b">
          {applicant.experience}
        </Text>
      </Table.Td>
      <Table.Td>
        <Text size="sm" c="#0a293b">
          {applicant.education}
        </Text>
      </Table.Td>
      <Table.Td>
        <Text size="sm" c="#0a293b">
          {applicant.appliedOn}
        </Text>
      </Table.Td>
      <Table.Td>
        <Anchor href="#" size="sm" c="#0a293b" td="underline">
          View Resume
        </Anchor>
      </Table.Td>
      <Table.Td>
        <Anchor href="#" size="sm" c="#0a293b" td="underline">
          View Cover Letter
        </Anchor>
      </Table.Td>
      <Table.Td>
        <StatusBadge status={applicant.status} />
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <div
      style={{
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        overflow: 'hidden',
      }}
    >
      <Table
        highlightOnHover
        styles={{
          table: {
            backgroundColor: '#ffffff',
            borderCollapse: 'collapse',
          },
          th: {
            backgroundColor: '#ffffff',
            color: '#64748b',
            fontWeight: 500,
            fontSize: '14px',
            borderBottom: '1px solid #e7eaee',
            padding: '12px 16px',
            textAlign: 'left',
          },
          td: {
            borderBottom: '1px solid #e7eaee',
            padding: '16px',
            verticalAlign: 'top',
          },
          tr: {
            '&:hover': {
              backgroundColor: '#f7f8f9 !important',
            },
          },
        }}
      >
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Applicant Name</Table.Th>
            <Table.Th>Posted Job</Table.Th>
            <Table.Th>Experience</Table.Th>
            <Table.Th>Education</Table.Th>
            <Table.Th>Applied On</Table.Th>
            <Table.Th>Resume</Table.Th>
            <Table.Th>Cover Story</Table.Th>
            <Table.Th>Status</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </div>
  );
}
