'use client';

import { IconArchive } from '@tabler/icons-react';
import { ComingSoon } from '../_components/coming-soon';

export default function ExpiredJobsPage() {
  return (
    <ComingSoon
      title="Expired & Closed Jobs"
      tagline="An archive of every posting that has run its course — with a one-click path to reopen, repost, or clone into a fresh listing."
      icon={<IconArchive size={22} />}
      bullets={[
        {
          title: 'Reopen or clone',
          description: 'Rehire for the same role without starting from scratch.',
        },
        {
          title: 'See past applicants',
          description: 'Historic candidate context stays attached to each closed post.',
        },
      ]}
      primary={{ label: 'View active jobs', href: '/admin/job' }}
    />
  );
}
