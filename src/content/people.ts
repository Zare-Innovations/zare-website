/**
 * The people, and why they stay.
 *
 * Names and roles are transcribed from the approved copy in
 * docs/zare-website-v3. Everything that is not yet confirmed is represented
 * as an explicit absence rather than filled in:
 *
 *   founder quote   marked [QUOTE PENDING FOUNDER APPROVAL] in source, so
 *                   `approved: false` and the section renders without it
 *   linkedin        source has the literal placeholder [LINK], so omitted
 *   photography     none exists yet
 *   engineers       no consent yet, so none are named
 *
 * See docs/CONTENT-CHECKLIST.md items 2, 14, 15, 16.
 */

export interface Person {
  name: string;
  role: string;
  /** Omitted until real URLs exist. The source carries a [LINK] placeholder. */
  linkedin?: string;
  photo?: { src: string; alt: string };
}

export const founder: Person = {
  name: 'Emanuel Nebiyu Samuel',
  role: 'Founder & CEO',
};

/**
 * Renders only when `approved` is true. A quote awaiting sign-off is the one
 * thing on this page that must not appear early: it is attributed to a real
 * person who has not yet agreed to it.
 */
export const founderQuote = {
  text: 'We believe Africa should not only participate in the future of technology. We should help build it.',
  approved: false,
};

export const leadership: Person[] = [
  { name: 'Nathnael Gebreselassie', role: 'CTO' },
  { name: 'Michael Wondimu', role: 'COO' },
  { name: 'Addis Alemayehou', role: 'Strategy Advisor' },
];

/**
 * The retention mechanism, stated as economics rather than as a benefit.
 *
 * This is the reframe the whole section exists to carry: the wage floor is not
 * a perk, it is the reason engagements last, and long engagements are what
 * clients are actually buying. Verified figure.
 */
export const WAGE_FLOOR = {
  value: '+50%',
  label: "Minimum above Ethiopia's national average salary",
  detail: 'for every person on our roster',
};

/**
 * Whether engineers can be named publicly is a founder decision with a real
 * tradeoff: a named engineer with their stack and tenure is the strongest
 * proof available and also the most useful thing a recruiter could ask for.
 * Until it is made, the absence is labelled.
 */
export const ENGINEERS_PENDING = true;
