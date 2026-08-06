'use server';

import { headers } from 'next/headers';
import { Resend } from 'resend';

import { inquirySchema, LABELS } from '@/lib/inquiry-schema';
import { email as contactEmail, siteUrl } from '@/constants';

export interface InquiryState {
  status: 'idle' | 'success' | 'error';
  message?: string;
  /** Field name -> first error. Drives inline messages. */
  errors?: Record<string, string>;
  /** Echoed back so a failed submit never wipes what was typed. */
  values?: Record<string, string>;
}

const FROM =
  process.env.CONTACT_FROM_EMAIL ?? 'Zare Website <onboarding@resend.dev>';

// Single-instance limiter. The app runs as one container. If it is ever scaled
// horizontally this must move to Redis, because each instance would otherwise
// keep its own allowance.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);

  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(key);
    }
  }
  return recent.length > MAX_PER_WINDOW;
}

function renderBody(data: Record<string, unknown>): string {
  const label = (v: unknown) =>
    typeof v === 'string' && LABELS[v] ? LABELS[v] : String(v);

  return Object.entries(data)
    .filter(([k]) => k !== 'website')
    .map(([k, v]) => `${k}: ${label(v)}`)
    .join('\n');
}

export async function submitInquiry(
  _prev: InquiryState,
  formData: FormData,
): Promise<InquiryState> {
  const raw = Object.fromEntries(formData) as Record<string, string>;

  // Echo everything except the honeypot, so a rejected submit is not punished
  // by an emptied form.
  const values = { ...raw };
  delete values.website;

  // Next validates Origin against Host for Server Actions already. This is a
  // second, explicit check so the intent is visible in the code.
  const h = await headers();
  const origin = h.get('origin');
  if (origin && process.env.NODE_ENV === 'production') {
    try {
      if (new URL(origin).host !== new URL(siteUrl).host) {
        return { status: 'error', message: 'Request rejected.', values };
      }
    } catch {
      return { status: 'error', message: 'Request rejected.', values };
    }
  }

  const ip =
    h.get('x-forwarded-for')?.split(',')[0].trim() ??
    h.get('x-real-ip') ??
    'unknown';

  if (rateLimited(ip)) {
    return {
      status: 'error',
      message: `Too many submissions. Please email ${contactEmail} directly.`,
      values,
    };
  }

  // Honeypot. Report success so the bot does not retry, and send nothing.
  if (typeof raw.website === 'string' && raw.website.length > 0) {
    return { status: 'success' };
  }

  const parsed = inquirySchema.safeParse(raw);
  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0]);
      if (key && !errors[key]) errors[key] = issue.message;
    }
    return {
      status: 'error',
      message: 'Please check the highlighted fields.',
      errors,
      values,
    };
  }

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    // Deliberate: the key is rotated out until M0 follow-up completes. Fail
    // loudly and hand the visitor a working alternative rather than pretending
    // the message was sent.
    console.error('RESEND_API_KEY is not set. Inquiry dropped.');
    return {
      status: 'error',
      message: `Our form is temporarily unavailable. Please email ${contactEmail} and we will reply within one business day.`,
      values,
    };
  }

  const data = parsed.data;
  const subjectKind =
    data.pathway === 'project' ? 'Project inquiry' : 'Embedded team inquiry';

  try {
    const resend = new Resend(key);
    const { error } = await resend.emails.send({
      // Fixed sender. The display name was previously interpolated from user
      // input, which let a submitter forge the apparent sender.
      from: FROM,
      to: [contactEmail],
      replyTo: data.email,
      subject: `${subjectKind} — ${data.company}`,
      text: renderBody(data),
    });

    if (error) {
      console.error('Inquiry send error:', error);
      return {
        status: 'error',
        message: `We could not send that. Please email ${contactEmail} directly.`,
        values,
      };
    }

    return { status: 'success' };
  } catch (err) {
    console.error('submitInquiry failed:', err);
    return {
      status: 'error',
      message: `Something went wrong. Please email ${contactEmail} directly.`,
      values,
    };
  }
}
