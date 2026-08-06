/**
 * Delivered work. The single source of truth for /work, /work/[slug], and the
 * homepage featured-work section.
 *
 * Two case models, deliberately. A system build and an embedded engagement
 * answer different questions, and forcing one template onto both produces
 * either a thin page or invented architecture. See
 * docs/decisions/005-two-case-study-models.md
 */

// ---------------------------------------------------------------- primitives

export type Client =
  | { named: true; name: string; url?: string }
  | { named: false; descriptor: string; reason: string };

export interface Outcome {
  value: string;
  metric: string;
  /**
   * REQUIRED. "40% improvement" is a number without meaning; "40% improvement
   * in full-text recovery after rebuilding the indexing strategy" is evidence.
   * The type makes the first one impossible to express.
   */
  context: string;
  verified: boolean;
}

export interface Decision {
  decision: string;
  /** What was given up. A decision with no tradeoff was not a decision. */
  tradeoff: string;
  result: string;
}

export interface SystemComponent {
  component: string;
  note: string;
}

export interface CaseQuote {
  text: string;
  attribution: string;
  role: string;
  source: string;
}

interface CaseBase {
  slug: string;
  client: Client;
  industry: string;
  location: string;
  /** Rank on /work and the homepage. `false` means it appears only in the reference list. */
  featured: false | 1 | 2 | 3;
  /** One line. Used on cards and on the homepage. The outcome, not the deliverable. */
  summary: string;
  duration?: string;
  outcomes: Outcome[];
  /** How Zare actually worked with the client. */
  delivery?: string;
  quote?: CaseQuote;
}

export interface SystemCase extends CaseBase {
  kind: 'system';
  problem: string;
  system: SystemComponent[];
  /**
   * May be empty while the engineering interview is outstanding. The page then
   * renders a labelled gap. It is never filled with plausible-sounding
   * invention: a reader who knows the domain spots that instantly, and it
   * costs more trust than the empty section does.
   */
  decisions: Decision[];
  /** Technologies appear only inside decisions. There is no stack strip. */
  stack: string[];
}

export interface EngagementCase extends CaseBase {
  kind: 'engagement';
  situation: string;
  podShape: string;
  integration: string[];
  /** The retention argument, in this client's specific terms. */
  continuity?: string;
}

export type CaseStudy = SystemCase | EngagementCase;

/** A delivered project recorded without a full narrative. Never linked. */
export interface WorkReference {
  title: string;
  client: string;
  industry: string;
  location: string;
  note: string;
}

// ----------------------------------------------------------------- the cases

export const caseStudies: CaseStudy[] = [
  {
    kind: 'system',
    slug: 'litpulse-federated-research-engine',
    client: { named: true, name: 'LitPulse' },
    industry: 'Biomedical research',
    location: 'Washington DC',
    featured: 1,
    summary:
      'A federated research engine that unifies scattered biomedical sources into one deduplicated stream.',
    problem:
      'Biomedical researchers lose hours to the same paper appearing under different identifiers across databases, and to full text sitting behind sources their search tool never reaches. The cost is not only time: a review built on an incomplete corpus is a review with a hole in it.',
    system: [
      {
        component: 'LitPortal',
        note: 'The federated multi-agent research engine Zare built inside the LitPulse platform. It queries multiple biomedical sources, reconciles duplicate records, and returns a single ranked stream.',
      },
      {
        component: 'Platform context',
        note: 'LitPortal sits alongside the wider LitPulse modules: LitScreen, LitHub, LitStream, LitScholar and LitForum.',
      },
    ],
    // Pending the engineering interview. See ADR 005.
    decisions: [],
    stack: ['FastAPI', 'LangGraph', 'Next.js', 'PostgreSQL', 'Redis'],
    outcomes: [
      {
        value: '>99%',
        metric: 'Deduplication accuracy',
        context:
          'across records federated from multiple biomedical sources, where the same paper appears under different identifiers.',
        verified: true,
      },
      {
        value: '<2s',
        metric: 'Response time',
        context: 'for a federated query spanning multiple upstream sources.',
        verified: true,
      },
      {
        value: '>40%',
        metric: 'Full-text recovery',
        context:
          'improvement in retrieving full text for records where it was previously unreachable.',
        verified: true,
      },
    ],
  },

  {
    kind: 'engagement',
    slug: 'pickrell-embedded-engineering-pod',
    client: {
      named: true,
      name: 'Pickrell Global Technologies',
      url: 'https://pickrellglobaltechnologies.com/',
    },
    industry: 'Technology services',
    location: 'Concord, North Carolina',
    featured: 2,
    duration: 'Since January 2024',
    summary:
      'A three-developer pod embedded in the client delivery organisation, running continuously since January 2024.',
    situation:
      'The client needed to grow its engineering capacity but was constrained by the cost and competition of hiring in the United States. It needed developers inside its own delivery organisation, not a vendor working at arm\'s length.',
    podShape: 'Three full-time developers, dedicated, not shared with other clients.',
    integration: [
      'Working inside the client delivery organisation',
      'Dedicated placements, never shared across clients',
      'Performance managed by Zare, with regular client check-ins',
    ],
    continuity:
      'The same engagement has run since January 2024. Continuity, not headcount, is what the client is buying.',
    outcomes: [
      {
        value: '$50,000-199,999',
        metric: 'Engagement value',
        context: 'as reported in the client\'s verified public review.',
        verified: true,
      },
      {
        value: '5.0',
        metric: 'Verified client rating',
        context: 'Clutch review published February 2025, after a year of delivery.',
        verified: true,
      },
      {
        value: '>50%',
        metric: 'Reduction in talent overhead',
        context:
          'against the cost of hiring the equivalent team locally in the United States.',
        verified: true,
      },
    ],
    quote: {
      text: 'They are constantly responsive and check in frequently to ensure that all expectations are being met.',
      attribution: 'Pickrell Global Technologies',
      role: 'Technology services · Concord, NC',
      source: 'Verified Clutch review · February 2025',
    },
  },
];

// ------------------------------------------------------------- other work
// Recorded, not narrated. These have no detail page: a case study page with no
// engineering reasoning behind it damages the argument the deep pages make.

export const workReferences: WorkReference[] = [
  {
    title: 'Multi-tier engineering pod',
    client: 'Joveo',
    industry: 'Programmatic recruitment advertising',
    location: 'California, USA',
    note: 'A multi-tier pod embedded alongside the in-house team for 12+ months, working in the core platform codebase. Outcome figures pending client approval.',
  },
  {
    title: 'Custom ERP and CRM platform',
    client: '251 Marketing & Communications',
    industry: 'Marketing and communications',
    location: 'Addis Ababa, Ethiopia',
    note: 'An internal platform covering onboarding and employee metrics, invoicing, client relationships, and project and resource allocation.',
  },
  {
    title: 'Pharmaceutical operations dashboard',
    client: 'Medrafa',
    industry: 'Pharmaceutical',
    location: 'Addis Ababa, Ethiopia',
    note: 'End-to-end design and frontend implementation for an operations dashboard over an existing pharmacy tracking system.',
  },
  {
    title: 'Custom geotagging software',
    client: 'KeySquare Labs',
    industry: 'Geospatial',
    location: 'Virginia, USA',
    note: 'A .NET geospatial processing tool built for data requirements their off-the-shelf tooling could not handle.',
  },
  {
    title: 'Rapid technical hiring, 80+ roles',
    client: 'Kagool',
    industry: 'Technology consultancy',
    location: 'London, UK',
    note: 'A vetted pipeline of more than 80 candidates delivered within one month to staff a new Addis Ababa branch on schedule.',
  },
  {
    title: 'Embedded UI/UX designer',
    client: 'Exelia Technologies',
    industry: 'Technology',
    location: 'Nicosia, Cyprus',
    note: 'A full-time remote designer placed to close a specialist skills gap the local market could not fill.',
  },
  {
    title: 'Managed customer support team',
    client: 'CRDLE',
    industry: 'Technology',
    location: 'Pittsburgh, Pennsylvania, USA',
    note: 'A dedicated customer support team operating as an extension of the client business.',
  },
  {
    title: 'Embedded back-office specialist',
    client: '10.13 Enterprise',
    industry: 'Professional services',
    location: 'Washington DC, USA',
    note: 'A vetted back-office specialist placed into the client operations team.',
  },
  {
    title: 'Pan-African media database',
    client: 'Africa Communications Media Group',
    industry: 'Communications',
    location: 'Sandton, South Africa',
    note: 'A verified database of 200 journalists across the continent, collected and cleaned for a targeted outreach campaign.',
  },
  {
    title: 'Technology consulting programme',
    client: 'AFIG Funds',
    industry: 'Private equity',
    location: 'Washington DC, USA',
    note: 'CRM selection, automated ESG data collection and reporting, investor reporting enhancements, and an international e-commerce build.',
  },
  {
    title: 'Website and identity builds',
    client: 'Eight clients',
    industry: 'Hospitality, healthcare, finance, real estate',
    location: 'Ethiopia, Kenya, USA',
    note: 'Gursha Ethiopian Kitchen, Kazana Group, Just Kids Autism Center, Better Life, Sunbeam ABA Center, HK Financial Advisory, Signature Residence, Sabbell.',
  },
];

// ------------------------------------------------------------------ helpers

/**
 * A detail page is earned. A case is published only when it carries enough
 * narrative to be worth reading: the problem or situation, and at least one
 * outcome. Missing engineering decisions do not block publication, because the
 * page renders that gap honestly.
 */
export function hasDetailPage(c: CaseStudy): boolean {
  const hasOutcome = c.outcomes.length > 0;
  return c.kind === 'system'
    ? Boolean(c.problem) && c.system.length > 0 && hasOutcome
    : Boolean(c.situation) && hasOutcome;
}

export const publishedCases = () => caseStudies.filter(hasDetailPage);

export const featuredCases = () =>
  publishedCases()
    .filter((c) => c.featured !== false)
    .sort((a, b) => Number(a.featured) - Number(b.featured));

export const getCase = (slug: string) =>
  caseStudies.find((c) => c.slug === slug && hasDetailPage(c));

export const relatedCases = (slug: string, limit = 2) =>
  publishedCases()
    .filter((c) => c.slug !== slug)
    .slice(0, limit);

export const clientName = (c: Client) =>
  c.named ? c.name : c.descriptor;
