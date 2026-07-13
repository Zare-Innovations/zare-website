'use client';
import { Anchor, Table, Text } from '@mantine/core';
import type { AppliedJob } from '@/store/api/applied-jobs.api';
import { StatusSelect } from '../applicants/_components/status-select';
import { RowActions } from '../applicants/_components/row-actions';

const formatAppliedOn = (iso: string) => {
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } catch {
    return iso;
  }
};

const truncate = (s: string, n = 90) =>
  s.length > n ? s.slice(0, n).trimEnd() + '…' : s;

export function ApplicantsTable({
  applicants,
  jobTitleById,
  onView,
  onDelete,
}: {
  applicants: AppliedJob[];
  jobTitleById: Record<string, string>;
  onView: (applicant: AppliedJob) => void;
  onDelete: (applicant: AppliedJob) => void;
}) {
  const rows = applicants.map((applicant) => (
    <Table.Tr key={applicant.id}>
      <Table.Td>
        <Text size="sm" fw={500} c="#101828">
          {applicant.fullName}
        </Text>
        <Text size="xs" c="#64748b" mt={2}>
          {applicant.email}
        </Text>
        {applicant.phone && (
          <Text size="xs" c="#64748b">
            {applicant.phone}
          </Text>
        )}
      </Table.Td>
      <Table.Td>
        <Text size="sm" c="#0a293b">
          {jobTitleById[applicant.jobId] ?? applicant.jobId}
        </Text>
      </Table.Td>
      <Table.Td>
        <Text size="sm" c="#0a293b">
          {formatAppliedOn(applicant.createdAt)}
        </Text>
      </Table.Td>
      <Table.Td>
        {applicant.resume ? (
          <Anchor
            href={applicant.resume}
            target="_blank"
            rel="noopener noreferrer"
            size="sm"
            c="#0a293b"
            td="underline"
          >
            View Resume
          </Anchor>
        ) : (
          <Text size="sm" c="#64748b">
            —
          </Text>
        )}
      </Table.Td>
      <Table.Td style={{ maxWidth: 320 }}>
        <Text
          size="sm"
          c="#0a293b"
          title={applicant.coverLetter}
          style={{ whiteSpace: 'pre-wrap' }}
        >
          {truncate(applicant.coverLetter)}
        </Text>
      </Table.Td>
      <Table.Td>
        <StatusSelect applicant={applicant} />
      </Table.Td>
      <Table.Td style={{ width: 40 }}>
        <RowActions
          applicant={applicant}
          onView={onView}
          onDelete={onDelete}
        />
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
            <Table.Th>Applicant</Table.Th>
            <Table.Th>Job Applied For</Table.Th>
            <Table.Th>Applied On</Table.Th>
            <Table.Th>Resume</Table.Th>
            <Table.Th>Cover Letter</Table.Th>
            <Table.Th>Status</Table.Th>
            <Table.Th />
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </div>
  );
}
