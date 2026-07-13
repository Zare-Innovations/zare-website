'use client';

import { Anchor, Text } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useState } from 'react';
import { resolveDownloadUrl } from '@/lib/s3';

/**
 * Opens the resume in a new tab. `resume` may be a full URL (used as-is) or
 * an S3 key/id (resolved via the presigned-URL download endpoint on click).
 */
export function ResumeLink({
  resume,
  label = 'View Resume',
  emptyLabel = '—',
}: {
  resume?: string | null;
  label?: string;
  emptyLabel?: string;
}) {
  const [isLoading, setIsLoading] = useState(false);

  if (!resume) {
    return (
      <Text size="sm" c="#64748b">
        {emptyLabel}
      </Text>
    );
  }

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (isLoading) return;
    setIsLoading(true);
    try {
      const url = await resolveDownloadUrl(resume);
      window.open(url, '_blank', 'noopener,noreferrer');
    } catch (err) {
      console.error('Failed to open resume', err);
      notifications.show({
        color: 'red',
        title: 'Could not open resume',
        message: 'The file link is invalid or the server is unreachable.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Anchor
      href="#"
      onClick={handleClick}
      size="sm"
      c="#0a293b"
      td="underline"
    >
      {isLoading ? 'Opening…' : label}
    </Anchor>
  );
}
