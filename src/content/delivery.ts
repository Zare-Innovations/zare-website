/**
 * How we deliver: two parallel tracks.
 *
 * A project buyer and a team buyer ask the same question, "how do you actually
 * do this?", and need completely different answers. Running these as two
 * sequential sections makes every visitor scroll through the other buyer's
 * content. Side by side, each reads only their half, and the dual model reads
 * as a fact about the company rather than as a longer page.
 */

export interface StackLayer {
  name: string;
  description: string;
  technologies: readonly string[];
}

/** The build track: what happens when Zare builds the system. */
export const buildStack: StackLayer[] = [
  {
    name: 'BUILD',
    description:
      'Product and AI engineering that ships fast without cutting corners.',
    technologies: ['React · Next.js', 'NestJS · Python', 'FastAPI · LangGraph'],
  },
  {
    name: 'RUN',
    description: 'Managed cloud infrastructure sized to each product.',
    technologies: ['AWS · Azure', 'Docker', 'PostgreSQL · Redis'],
  },
  {
    name: 'DELIVER',
    description:
      'Automated pipelines, observable systems, access-controlled releases.',
    technologies: ['GitHub Actions · CI/CD', 'Monitoring', 'Secure deployment'],
  },
];

/** The embed track: eight steps between an application and a client's team. */
export const vettingSteps: readonly { n: string; label: string }[] = [
  { n: '01', label: 'Application screening' },
  { n: '02', label: 'Communication assessment' },
  { n: '03', label: 'Technical assessment' },
  { n: '04', label: 'Practical project' },
  { n: '05', label: 'Technical interview' },
  { n: '06', label: 'Reference verification' },
  { n: '07', label: 'Client matching' },
  { n: '08', label: 'Ongoing performance review' },
];

/**
 * Facts about the embed track that are verified today.
 *
 * Replacement policy, notice period, and the step 02 communication standard
 * are deliberately absent: they are real commitments and we do not have them
 * in writing yet. See docs/CONTENT-CHECKLIST.md
 */
export const embedFacts: readonly string[] = [
  'First vetted candidate in 1 to 2 weeks',
  'Dedicated placements, never shared across clients',
  '80+ technical placements delivered in one month, for Kagool',
];
