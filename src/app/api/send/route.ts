import { EmailTemplate } from '@/app/(marketing)/_components/email-template';
import { careersEmail, siteUrl } from '@/constants';
import { Resend } from 'resend';

// The API key is read lazily, not at module scope. Reading it at module scope
// throws during build and during boot when the variable is absent, which takes
// the whole app down over a single broken route.
function getResend(): Resend | null {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

// Resend requires a verified sender domain. The display name used to be
// interpolated from user input, which let a submitter forge the apparent
// sender. The address is now fixed and the submitter's name travels in the
// body and the reply-to.
const FROM = process.env.CONTACT_FROM_EMAIL ?? 'Zare Website <onboarding@resend.dev>';

// Single-instance in-memory limiter. The app runs as one container, so this
// is sufficient. If it is ever scaled horizontally this must move to Redis,
// because each instance would otherwise keep its own allowance.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);

  // Bound the map so a flood of unique IPs cannot grow it without limit.
  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(key);
    }
  }

  return recent.length > MAX_PER_WINDOW;
}

function clientIp(req: Request): string {
  const fwd = req.headers.get('x-forwarded-for');
  if (fwd) return fwd.split(',')[0].trim();
  return req.headers.get('x-real-ip') ?? 'unknown';
}

function sameOrigin(req: Request): boolean {
  const origin = req.headers.get('origin');
  // Same-origin form posts from some browsers omit Origin entirely. Absence is
  // allowed; a present but foreign Origin is not.
  if (!origin) return true;
  if (process.env.NODE_ENV !== 'production') return true;
  try {
    return new URL(origin).host === new URL(siteUrl).host;
  } catch {
    return false;
  }
}

interface RawData {
  name?: unknown;
  email?: unknown;
  phoneNumber?: unknown;
  message?: unknown;
  website?: unknown;
}

const str = (v: unknown, max: number): string =>
  typeof v === 'string' ? v.trim().slice(0, max) : '';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  if (!sameOrigin(req)) {
    return Response.json({ error: 'Forbidden' }, { status: 403 });
  }

  if (rateLimited(clientIp(req))) {
    return Response.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429 },
    );
  }

  let raw: RawData;
  try {
    raw = await req.json();
  } catch {
    return Response.json({ error: 'Invalid request body' }, { status: 400 });
  }

  // Honeypot. Bots fill every field they find; humans never see this one.
  // Answer 200 so the bot believes it succeeded and does not retry.
  if (str(raw.website, 200).length > 0) {
    return Response.json({ ok: true });
  }

  const name = str(raw.name, 120);
  const email = str(raw.email, 200);
  const phoneNumber = str(raw.phoneNumber, 60);
  const message = str(raw.message, 5000);

  if (!name || !message || !EMAIL_RE.test(email)) {
    return Response.json({ error: 'Invalid submission' }, { status: 400 });
  }

  const resend = getResend();
  if (!resend) {
    console.error('RESEND_API_KEY is not set. Contact form submission dropped.');
    return Response.json(
      { error: 'Contact is temporarily unavailable' },
      { status: 503 },
    );
  }

  try {
    const component = await EmailTemplate({ name, email, phoneNumber, message });

    // NOTE: general website inquiries have always been routed to the careers
    // inbox. Preserved here so M0 stays a security change only, but this looks
    // wrong and should be confirmed before M5 rebuilds the contact flow.
    const { data, error } = await resend.emails.send({
      from: FROM,
      to: [careersEmail],
      replyTo: email,
      subject: `Website inquiry from ${name}`,
      react: component,
    });

    if (error) {
      console.error('Email send error:', error);
      return Response.json({ error: 'Unable to send message' }, { status: 502 });
    }

    return Response.json({ ok: true, id: data?.id });
  } catch (error) {
    console.error('POST /api/send error:', error);
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
