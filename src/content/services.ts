/**
 * The two categories. This is the information architecture spine: every
 * visitor routes into one of these, and they carry strictly equal weight.
 * The moment one looks like the main offering, half the audience self-selects
 * out.
 */

export interface SubPath {
  tag: string;
  title: string;
  description: string;
  capabilities: readonly string[];
}

export interface ServicePath {
  id: string;
  index: string;
  name: string;
  headline: string;
  description: string;
  capabilities?: readonly string[];
  /** Commercial de-risking. Display weight, not bullets. */
  highlights?: readonly string[];
  subPaths?: readonly SubPath[];
  cta: { label: string; href: string };
  /**
   * Rendered before anything else in the panel. "Embedded engineering"
   * collides with "embedded systems" for exactly the technical audience we
   * are addressing, and without this a reader files Zare next to Toptal.
   */
  definition?: string;
}

export const servicePaths: ServicePath[] = [
  {
    id: 'tech-ai',
    index: '01',
    name: 'Technology & AI',
    headline: 'Software and AI, engineered end to end.',
    description:
      'Software, AI, cloud systems, and digital products engineered end to end by our Addis Ababa engineering centre.',
    capabilities: [
      'Custom software and digital products',
      'Web and mobile platforms',
      'AI automation',
      'Cloud infrastructure and systems integration',
      'Technical consulting',
    ],
    cta: { label: 'Build with Zare', href: '/contact?pathway=project' },
  },
  {
    id: 'embedded',
    index: '02',
    name: 'Embedded Teams',
    headline: 'One team. Embedded in yours.',
    definition:
      'Embedded means your engineers work inside your workflow. Your Slack, your standups, your codebase, your roadmap. They remain part of a stable Zare engineering team, with the management, review, and continuity that implies.',
    description:
      'Vetted professionals and managed operations embedded directly into your organisation.',
    highlights: [
      'One monthly invoice, all-in',
      'Risk-free trial on every placement',
      'Dedicated placements, never shared',
    ],
    subPaths: [
      {
        tag: 'A · Technology Talent',
        title: 'Vetted engineers, inside your standups.',
        description:
          'Engineers, developers, technical specialists, and dedicated product teams integrated into your organisation.',
        capabilities: [
          'Dedicated engineers and managed development teams',
          'Product and engineering specialists',
          'Client-specific talent matching',
          'First vetted candidate in 1 to 2 weeks',
        ],
      },
      {
        tag: 'B · Business Operations',
        title: 'Managed operations, run as your own.',
        description:
          'Managed customer experience and back-office teams designed to operate as an extension of your business.',
        capabilities: [
          'Customer and technical support',
          'Data processing and administrative operations',
          'Virtual assistance and back-office workflows',
          'Operational reporting',
        ],
      },
    ],
    cta: { label: 'Build an embedded team', href: '/contact?pathway=team' },
  },
];
