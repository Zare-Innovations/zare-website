/**
 * Photography from the September 2026 delivery-centre shoot (Addis Ababa).
 *
 * Twelve frames were selected from the 92-photo brand shoot; originals live
 * outside the repo in the shared assets drive. Exports are 1800px WebP under
 * public/office/. One record per frame so every placement shares the same
 * src and alt — a photo is a fact about the office, and facts live in data.
 *
 * Placement discipline: photos go where they substantiate a claim the page
 * is already making (the delivery centre exists, the ceremony is real, the
 * operations desk is staffed). Sections that argue with data — trust strip,
 * testimonials, security — deliberately carry none.
 */

export interface OfficePhoto {
  src: string;
  alt: string;
}

export const officePhotos = {
  /** Wide frontal frame of the open workspace, logo wall lit, four at work. */
  workspaceWide: {
    src: '/office/workspace-wide.webp',
    alt: 'The Zare Innovations delivery centre in Addis Ababa: four engineers at workstations under the lit company logo wall',
  },
  /** Calmer wide frame of the same room, all heads down. */
  workspaceCalm: {
    src: '/office/workspace-calm.webp',
    alt: 'Engineers working at their desks in the Zare delivery centre, Addis Ababa',
  },
  /** Over-shoulder frame, real code on both screens. */
  engineeringCode: {
    src: '/office/engineering-code.webp',
    alt: 'A Zare engineer writing code across a laptop and an external monitor',
  },
  /** Developer at code with a colleague reviewing beside the desk. */
  engineeringPair: {
    src: '/office/engineering-pair.webp',
    alt: 'Two Zare engineers reviewing code together at a workstation',
  },
  /** Two engineers sketching a system flow on the whiteboard. */
  whiteboardSession: {
    src: '/office/whiteboard-session.webp',
    alt: 'Two Zare engineers sketching a system flow on a whiteboard during a planning session',
  },
  /** Presenter at the meeting-room TV, team seated around the table. */
  boardroomPresentation: {
    src: '/office/boardroom-presentation.webp',
    alt: 'A Zare team member presenting to colleagues around the meeting-room table',
  },
  /** Coffee-corner conversation by the logo wall. */
  coffeeCorner: {
    src: '/office/coffee-corner.webp',
    alt: 'Zare team members talking over coffee in the office lounge',
  },
  /** Candid laughing frame at a desk near the logo wall. */
  deskLaughter: {
    src: '/office/desk-laughter.webp',
    alt: 'Two Zare team members laughing together at a desk',
  },
  /** The jebena pour — Ethiopian coffee ceremony in the office. */
  coffeeCeremonyPour: {
    src: '/office/coffee-ceremony-pour.webp',
    alt: 'Coffee poured from a jebena during an Ethiopian coffee ceremony at the Zare office',
  },
  /** Two colleagues tasting during the ceremony. */
  coffeeCeremonyTasting: {
    src: '/office/coffee-ceremony-tasting.webp',
    alt: 'Two Zare team members tasting coffee during the office coffee ceremony',
  },
  /** Operations specialist mid-call, headset on, at the logo wall. */
  operationsCall: {
    src: '/office/operations-call.webp',
    alt: 'A Zare operations specialist on a client call, wearing a headset',
  },
  /** Operations specialist at her desk, headset on. */
  operationsDesk: {
    src: '/office/operations-desk.webp',
    alt: 'A Zare operations specialist working at her desk with a headset',
  },
} as const satisfies Record<string, OfficePhoto>;
