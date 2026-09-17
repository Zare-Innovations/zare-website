/**
 * The in-memory database.
 *
 * A plain mutable snapshot plus a subscriber list — enough to make the demo
 * genuinely interactive without pulling in a state library. It is deliberately
 * NOT exported outside lib/data: screens talk to index.ts, which is the seam
 * where real Postgres will land.
 *
 * Persistence is sessionStorage, so the demo survives navigation and reload
 * but a fresh tab starts from a clean, known seed. That is the right tradeoff
 * for showing partners: nobody has to remember what they clicked last time.
 */

import {
  seedArchetypes,
  seedCandidates,
  seedJobRuns,
  seedRequests,
  seedUsers,
  USER_RECRUITER_1,
} from './seed';
import type {
  Archetype,
  CallLog,
  Candidate,
  ClientRequest,
  JobRun,
  Placement,
  Shortlist,
  ShortlistCandidate,
  User,
} from './types';

export interface Snapshot {
  users: User[];
  archetypes: Archetype[];
  candidates: Candidate[];
  calls: CallLog[];
  requests: ClientRequest[];
  shortlists: Shortlist[];
  shortlistCandidates: ShortlistCandidate[];
  placements: Placement[];
  jobRuns: JobRun[];
  /** Who is "logged in". Fake auth: a role picker, no credentials. */
  currentUserId: string;
  /**
   * Whether anyone is signed in. The demo opens on the sign-in page, like
   * the real portal will. Replaced by the Supabase session.
   */
  signedIn: boolean;
  /** Seeded relative to this instant, so the demo ages correctly. */
  seededAt: number;
}

// Bumped when the snapshot shape changes, so an open session reseeds rather
// than reading records that are missing fields.
const STORAGE_KEY = 'zare-bench-demo-v9';
/**
 * Who is signed in lives under its own key, so a reseeded demo (a new data
 * version, a reset) never signs anyone out mid-task.
 */
const SESSION_KEY = 'zare-bench-session';

/**
 * Fills fields added after a snapshot was saved, so an open tab keeps its
 * data across an update instead of being wiped and sent to sign-in.
 */
function upgrade(s: Snapshot): Snapshot {
  return {
    ...s,
    placements: s.placements ?? [],
    candidates: s.candidates.map((c) => ({ ...c, ready_exit_alerted_for: c.ready_exit_alerted_for ?? null })),
    shortlists: s.shortlists.map((sl) => ({ ...sl, exported_document: sl.exported_document ?? null })),
    jobRuns: s.jobRuns.map((r) => ({ ...r, skipped_reason: r.skipped_reason ?? null })),
  };
}

function loadSession(): Pick<Snapshot, 'currentUserId' | 'signedIn'> | null {
  try {
    const raw = window.sessionStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as Pick<Snapshot, 'currentUserId' | 'signedIn'>) : null;
  } catch {
    return null;
  }
}

function build(now: number): Snapshot {
  const { candidates, calls } = seedCandidates(now);
  const { requests, shortlists, shortlistCandidates, placements } = seedRequests(now, candidates);
  return {
    users: seedUsers(now),
    archetypes: seedArchetypes(now),
    candidates,
    calls,
    requests,
    shortlists,
    shortlistCandidates,
    placements,
    jobRuns: seedJobRuns(now),
    currentUserId: USER_RECRUITER_1,
    signedIn: false,
    seededAt: now,
  };
}

let snapshot: Snapshot | null = null;
const listeners = new Set<() => void>();

function load(): Snapshot {
  if (typeof window === 'undefined') {
    // Server render: always a fresh seed. Nothing is mutated server-side, so
    // there is no state to lose — the client rehydrates immediately.
    return build(Date.now());
  }
  const session = loadSession();
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (raw) return { ...upgrade(JSON.parse(raw) as Snapshot), ...session };
  } catch {
    // Private mode, blocked storage, corrupt JSON — a fresh seed is always
    // a valid answer here.
  }
  const fresh = build(Date.now());
  // Keep the session only if that person exists in the fresh seed.
  return session && fresh.users.some((u) => u.id === session.currentUserId) ? { ...fresh, ...session } : fresh;
}

function persist() {
  if (typeof window === 'undefined' || !snapshot) return;
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
    window.sessionStorage.setItem(
      SESSION_KEY,
      JSON.stringify({ currentUserId: snapshot.currentUserId, signedIn: snapshot.signedIn }),
    );
  } catch {
    // Demo keeps working in memory even if storage refuses.
  }
}

export function getSnapshot(): Snapshot {
  if (!snapshot) snapshot = load();
  return snapshot;
}

/** Apply a mutation, persist it, and wake every subscriber. */
export function mutate(fn: (s: Snapshot) => void): void {
  const s = getSnapshot();
  fn(s);
  // Replace, never keep, the mutated snapshot. useSyncExternalStore compares
  // by reference: a user record edited in place is the same object, so a
  // hook returning it would never re-render. A fresh copy gives every record
  // a new identity. The data is small enough that this costs nothing, and it
  // also lets the derived cache, keyed on the snapshot, drop stale entries.
  snapshot = structuredClone(s);
  persist();
  listeners.forEach((l) => l());
}

export function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/** Back to the seeded state. Wired to a button in settings for demo resets. */
export function resetDemo(): void {
  // Data goes back to the seed; whoever is signed in stays signed in.
  const session = snapshot ? { currentUserId: snapshot.currentUserId, signedIn: snapshot.signedIn } : null;
  snapshot = { ...build(Date.now()), ...session };
  persist();
  listeners.forEach((l) => l());
}

export function newId(prefix: string): string {
  const uuid =
    typeof crypto !== 'undefined' && 'randomUUID' in crypto
      ? crypto.randomUUID()
      : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
  return `${prefix}-${uuid}`;
}
