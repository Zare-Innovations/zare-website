/**
 * Clients for the trust strip.
 *
 * Every entry carries its engagement shape. A logo wall without context is the
 * oldest device in the outsourcing playbook and reads as aspirational: the
 * reader assumes a one-off, or a pitch that never closed. "Pickrell · 3-dev
 * pod · since Jan 2024" is a different claim entirely, and it is checkable.
 *
 * Clients whose engagement we cannot describe accurately are held in
 * `pendingClients` and not rendered. See docs/CONTENT-CHECKLIST.md
 */

export interface ClientRef {
  name: string;
  /** What Zare actually did. Never a capability, always the engagement. */
  engagement: string;
  /** Duration where known. The strongest single signal in this list. */
  duration?: string;
  industry: string;
}

export const clients: ClientRef[] = [
  {
    name: 'Joveo',
    engagement: 'Multi-tier engineering pod',
    duration: '12+ months',
    industry: 'Recruitment advertising',
  },
  {
    name: 'Pickrell Global Technologies',
    engagement: 'Three-developer pod',
    duration: 'Since Jan 2024',
    industry: 'Technology services',
  },
  {
    name: 'LitPulse',
    engagement: 'Federated research engine',
    industry: 'Biomedical research',
  },
  {
    name: 'Kagool',
    engagement: '80+ technical placements in one month',
    industry: 'Technology consultancy',
  },
  {
    name: 'Exelia Technologies',
    engagement: 'Embedded product designer',
    industry: 'Technology',
  },
  {
    name: '251 Marketing & Communications',
    engagement: 'Custom ERP and CRM platform',
    industry: 'Marketing',
  },
  {
    name: 'Medrafa',
    engagement: 'Pharmaceutical operations dashboard',
    industry: 'Pharmaceutical',
  },
  {
    name: 'KeySquare Labs',
    engagement: 'Custom geospatial processing tool',
    industry: 'Geospatial',
  },
  {
    name: 'AFIG Funds',
    engagement: 'Technology consulting programme',
    industry: 'Private equity',
  },
  {
    name: 'Africa Communications Media Group',
    engagement: 'Pan-African media database',
    industry: 'Communications',
  },
  {
    name: 'CRDLE',
    engagement: 'Managed customer support team',
    industry: 'Technology',
  },
  {
    name: '10.13 Enterprise',
    engagement: 'Embedded back-office specialist',
    industry: 'Professional services',
  },
];

/**
 * Real clients whose engagement shape is not documented well enough to state.
 * Held out of the render rather than listed as a bare name.
 */
export const pendingClients = ['Tenasol', 'KEFI Gold & Copper'] as const;

export interface VerifiedFact {
  fact: string;
  /** Where a reader can check it. Absent means not yet linkable. */
  href?: string;
}

export const verifiedFacts: VerifiedFact[] = [
  { fact: 'Zare Innovations, LLC · Delaware, US' },
  { fact: 'Engineering centre · Addis Ababa, Ethiopia' },
  { fact: '6 countries served' },
  // TODO(content): the Clutch profile URL. An unlinked rating is an assertion;
  // a linked one is evidence. Blocking before launch.
  { fact: '5.0 rating on Clutch' },
];
