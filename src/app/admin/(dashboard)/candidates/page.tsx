'use client';

import { IconAddressBook } from '@tabler/icons-react';
import { ComingSoon } from '../_components/coming-soon';

export default function CandidatesPage() {
  return (
    <ComingSoon
      title="Candidates"
      tagline="An internal roster of vetted candidates you can source from — separate from public applications. Backed by the /api/candidates endpoint that already holds 64+ imported records."
      icon={<IconAddressBook size={22} />}
      bullets={[
        {
          title: 'Bulk import from Excel',
          description:
            'Upload an .xlsx of candidates via POST /candidates/import to seed the roster in seconds.',
        },
        {
          title: 'Rich profile fields',
          description:
            'Track salary expectations, GitHub, voice notes, remarks and attached resumes per candidate.',
        },
        {
          title: 'Search & shortlist',
          description:
            'Query the roster to pair candidates against open job posts instantly.',
        },
      ]}
      primary={{ label: 'View applicants', href: '/admin/applicants' }}
    />
  );
}
