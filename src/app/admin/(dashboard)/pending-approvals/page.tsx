'use client';

import { IconClockHour4 } from '@tabler/icons-react';
import { ComingSoon } from '../_components/coming-soon';

export default function PendingApprovalsPage() {
  return (
    <ComingSoon
      title="Pending Approvals"
      tagline="A single queue for job posts and applicant actions that need a decision from you — designed to make sign-offs a matter of seconds, not tabs."
      icon={<IconClockHour4 size={22} />}
      bullets={[
        {
          title: 'One inbox, every approval',
          description: 'New job posts, status changes, edit requests — all in one place.',
        },
        {
          title: 'Bulk approve or reject',
          description: 'Select multiple items and act on them in one click.',
        },
      ]}
      primary={{ label: 'View job posts', href: '/admin/job' }}
    />
  );
}
