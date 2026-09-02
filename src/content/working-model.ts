/**
 * How Zare works with a client's team.
 *
 * Deliberately not a world map. "Six countries served" is a vanity metric: no
 * buyer has ever chosen a partner because of a count, and a globe with dots on
 * it answers none of the questions they actually have. The question underneath
 * is always the same, and it is operational:
 *
 *   "My team is in Boston. Will yours be awake?"
 *
 * So the section is built from time, not territory. Every region below is a
 * place Zare has actually delivered, traceable to a named engagement in
 * src/content/work.ts. None of it is a market we would like to be in.
 */

export interface ClientRegion {
  region: string;
  /** Hours behind Addis under standard time. */
  hoursBehind: number;
  /** Hours behind under the region's daylight saving time, where observed. */
  hoursBehindDst?: number;
  /** The engagement that makes this region a fact rather than a claim. */
  evidence: string;
}

/**
 * Addis Ababa is UTC+3 and does not observe daylight saving, so the offset to
 * a client only moves when the CLIENT changes clocks. That is a real
 * operational advantage and it is worth stating plainly: the working
 * relationship shifts twice a year at most, and never at our end.
 */
export const ADDIS_UTC_OFFSET = '+3';

export const clientRegions: ClientRegion[] = [
  {
    region: 'US West',
    hoursBehind: 11,
    hoursBehindDst: 10,
    evidence: 'Joveo · California',
  },
  {
    region: 'US East',
    hoursBehind: 8,
    hoursBehindDst: 7,
    evidence: 'Pickrell · North Carolina · LitCurrent · Washington DC',
  },
  {
    region: 'UK',
    hoursBehind: 3,
    hoursBehindDst: 2,
    evidence: 'Kagool · London',
  },
  {
    region: 'South Africa',
    hoursBehind: 1,
    evidence: 'Africa Communications Media Group · Sandton',
  },
  {
    region: 'Cyprus',
    hoursBehind: 1,
    hoursBehindDst: 0,
    evidence: 'Exelia Technologies · Nicosia',
  },
  // Ethiopia ("same time") removed per the 2026-08 leadership comment
  // round — the band shows distance FROM Addis; the zero row was noise.
];

/**
 * The communication model. These describe how an embedded engineer actually
 * works, not a service level we have invented.
 */
export const communicationModel: readonly string[] = [
  'In your Slack, not a ticketing portal',
  'In your standups, on your schedule',
  'In your codebase, on your permissions',
  'On your roadmap, not a separate backlog',
];

/**
 * The overlap commitment (how many hours of the client's day engineers
 * cover) still has no agreed number in writing. The pending placeholder
 * box was removed from the homepage in the 2026-08 leadership comment
 * round; when the commitment is agreed it can return as a stated fact.
 * See docs/CONTENT-CHECKLIST.md item 17.
 */
