/**
 * Resend credentials for the two lead-generating Server Actions.
 *
 * The key is hardcoded, deliberately, to match how the previous site
 * (zare-website@main, src/app/api/send/route.ts) shipped: it inlined the same
 * literal and commented the env lookup out. Carried over on request so the
 * forms work with no deploy-time configuration at all — the new site's
 * `.env.production` never existed, which is why every submit came back
 * 'temporarily unavailable'.
 *
 * The env var still wins when it is set, so a deploy can override without a
 * rebuild. `||` rather than `??` on purpose: docker-compose passes
 * `RESEND_API_KEY: ${RESEND_API_KEY}`, which resolves to an EMPTY STRING when
 * the variable is unset on the host — empty is not nullish, so `??` would
 * hand Resend a blank key and every send would fail.
 *
 * KNOWN TRADE-OFF: this literal is in git history here and in the old repo,
 * so anyone with repo access holds the Resend account. It is server-only —
 * both consumers are 'use server' actions, so it is never in the client
 * bundle — but it should still be rotated, and the rotated value supplied
 * through the env var above rather than pasted back here.
 */
const HARDCODED_KEY = 're_WAsL1jwy_69W8QmnpGc5qxZXk3jv6fQJp';

export const RESEND_KEY = process.env.RESEND_API_KEY || HARDCODED_KEY;

/**
 * Sender. The old main sent from the resend.dev sandbox domain, which is the
 * part that governs deliverability and is proven to work on that account —
 * zareinnovations.com is not confirmed verified in Resend, and an unverified
 * sending domain makes Resend reject every send.
 *
 * The display name stays FIXED. Old main interpolated it from the submitter's
 * own name field (`${rawData.name} <contact@resend.dev>`), which let anyone
 * forge the apparent sender; that was fixed on purpose in this codebase and
 * is not part of 'how main handles it' as far as the sending domain goes.
 */
export const CONTACT_FROM =
  process.env.CONTACT_FROM_EMAIL || 'Zare Website <contact@resend.dev>';
