/**
 * The results band that closes the featured-work section.
 *
 * Deliberately excludes the 50-70% cost saving. That figure is the widest
 * claim available and the only one without a stated basis, and putting it at
 * display size anchors the whole page on price, which is the position the
 * repositioning exists to escape. It belongs once, later, with its basis,
 * inside the engagement section. Never lead with cost.
 *
 * Also excludes "80+ placements in one month". Throughput is a staffing
 * signal; it lives in the embed track of How we deliver, where the question is
 * how fast a team can be assembled.
 *
 * What remains answers the three questions an executive actually has: how
 * fast, how long do people stay, how far does this reach.
 */

export interface ResultMetric {
  value: string;
  label: string;
  verified: boolean;
  note?: string;
}

export const results: ResultMetric[] = [
  {
    value: '1-2 wks',
    label: 'To your first vetted candidate',
    verified: true,
  },
  {
    value: '12+ mo',
    label: 'Longest embedded engagement',
    verified: true,
  },
  {
    value: '6',
    label: 'Countries served',
    verified: true,
  },
  {
    // Ships dimmed and labelled. An admitted gap is what makes the other three
    // believable, and it costs less than a rounded-up number would.
    value: '[—]',
    label: 'Platform uptime',
    verified: false,
    note: 'placeholder',
  },
];
