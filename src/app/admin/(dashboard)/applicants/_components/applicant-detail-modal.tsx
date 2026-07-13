'use client';

import {
  Anchor,
  Divider,
  Group,
  Modal,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import {
  IconBriefcase,
  IconCalendar,
  IconFileText,
  IconMail,
  IconPhone,
} from '@tabler/icons-react';
import type { AppliedJob } from '@/store/api/applied-jobs.api';
import { StatusSelect } from './status-select';

const formatDate = (iso?: string) => {
  if (!iso) return '—';
  try {
    return new Date(iso).toLocaleString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return iso;
  }
};

export function ApplicantDetailModal({
  applicant,
  jobTitleById,
  onClose,
}: {
  applicant: AppliedJob | null;
  jobTitleById: Record<string, string>;
  onClose: () => void;
}) {
  return (
    <Modal
      opened={applicant !== null}
      onClose={onClose}
      title={
        applicant ? (
          <Title order={4} c="#101828">
            {applicant.fullName}
          </Title>
        ) : (
          'Applicant details'
        )
      }
      size="lg"
      centered
    >
      {applicant && (
        <Stack gap="md">
          <Group justify="space-between" align="center">
            <Text size="sm" c="#64748b">
              Application status
            </Text>
            <StatusSelect applicant={applicant} />
          </Group>

          <Divider />

          <Stack gap="xs">
            <Group gap="xs">
              <IconBriefcase size={16} color="#64748b" />
              <Text size="sm" c="#0a293b">
                <span className="font-medium">Job:</span>{' '}
                {jobTitleById[applicant.jobId] ?? applicant.jobId}
              </Text>
            </Group>
            <Group gap="xs">
              <IconMail size={16} color="#64748b" />
              <Anchor
                href={`mailto:${applicant.email}`}
                size="sm"
                c="#0a293b"
                td="underline"
              >
                {applicant.email}
              </Anchor>
            </Group>
            {applicant.phone && (
              <Group gap="xs">
                <IconPhone size={16} color="#64748b" />
                <Anchor
                  href={`tel:${applicant.phone}`}
                  size="sm"
                  c="#0a293b"
                >
                  {applicant.phone}
                </Anchor>
              </Group>
            )}
            <Group gap="xs">
              <IconCalendar size={16} color="#64748b" />
              <Text size="sm" c="#0a293b">
                Applied on {formatDate(applicant.createdAt)}
              </Text>
            </Group>
            {applicant.updatedAt &&
              applicant.updatedAt !== applicant.createdAt && (
                <Group gap="xs">
                  <IconCalendar size={16} color="#64748b" />
                  <Text size="sm" c="#64748b">
                    Last updated {formatDate(applicant.updatedAt)}
                  </Text>
                </Group>
              )}
            {applicant.resume && (
              <Group gap="xs">
                <IconFileText size={16} color="#64748b" />
                <Anchor
                  href={applicant.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  size="sm"
                  c="#0a293b"
                  td="underline"
                >
                  Open resume
                </Anchor>
              </Group>
            )}
          </Stack>

          <Divider label="Cover Letter" labelPosition="left" />

          <Text
            size="sm"
            c="#0a293b"
            style={{
              whiteSpace: 'pre-wrap',
              maxHeight: 320,
              overflowY: 'auto',
            }}
          >
            {applicant.coverLetter || 'No cover letter provided.'}
          </Text>
        </Stack>
      )}
    </Modal>
  );
}
