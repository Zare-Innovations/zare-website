import { beforeEach, describe, expect, it } from 'vitest';

import { candidateDeleteImpact, deleteCandidate, signInAs } from './index';
import { syncDiff, whenSynced } from './api';
import { USER_EXEC, USER_RECRUITER_1 } from './seed';
import { getSnapshot, resetDemo } from './store';

/** The seeded candidate with the most rows pointing at it. */
function busiestCandidate() {
  const s = getSnapshot();
  const weight = (id: string) => {
    const i = candidateDeleteImpact(s, id);
    return i.calls + i.shortlists * 10 + i.pipelines * 10 + i.placements * 10;
  };
  return [...s.candidates].sort((a, b) => weight(b.id) - weight(a.id))[0];
}

const refs = (id: string) => {
  const s = getSnapshot();
  return {
    candidate: s.candidates.some((c) => c.id === id),
    ...candidateDeleteImpact(s, id),
  };
};

const gone = { candidate: false, calls: 0, shortlists: 0, sentShortlists: 0, pipelines: 0, placements: 0 };

describe('deleting a candidate for good', () => {
  beforeEach(() => {
    resetDemo();
  });

  it('removes the record and every row that points at it', async () => {
    await signInAs(USER_EXEC);
    const c = busiestCandidate();
    const before = refs(c.id);
    expect(before.candidate).toBe(true);
    expect(before.calls + before.shortlists + before.pipelines + before.placements).toBeGreaterThan(0);

    const others = getSnapshot().candidates.length - 1;
    await deleteCandidate(c.id);

    expect(refs(c.id)).toEqual(gone);
    expect(getSnapshot().candidates).toHaveLength(others);
  });

  it('works on an archived candidate too', async () => {
    await signInAs(USER_EXEC);
    const archived = getSnapshot().candidates.find((c) => c.archived_reason && c.deleted_at === null);
    expect(archived).toBeDefined();
    await deleteCandidate(archived!.id);
    expect(refs(archived!.id).candidate).toBe(false);
  });

  it('is open to a recruiter as well as an exec', async () => {
    await signInAs(USER_RECRUITER_1);
    const c = busiestCandidate();
    await deleteCandidate(c.id);
    expect(refs(c.id)).toEqual(gone);
  });

  it('mirrors the delete to the API children first, the candidate last', async () => {
    await signInAs(USER_EXEC);
    const c = busiestCandidate();
    const prev = structuredClone(getSnapshot());
    await deleteCandidate(c.id);
    const next = getSnapshot();

    const sent: string[] = [];
    const realFetch = globalThis.fetch;
    globalThis.fetch = (async (url: string, init?: RequestInit) => {
      sent.push(`${init?.method} ${String(url).replace(/^.*\/api\//, '')}`);
      return new Response('', { status: 200 });
    }) as typeof fetch;
    try {
      syncDiff(prev, next);
      await whenSynced();
    } finally {
      globalThis.fetch = realFetch;
    }

    expect(sent.every((op) => op.startsWith('DELETE '))).toBe(true);
    expect(sent.at(-1)).toBe(`DELETE bench/candidate/${c.id}`);
    const impact = candidateDeleteImpact(prev, c.id);
    expect(sent).toHaveLength(1 + impact.calls + impact.shortlists + impact.pipelines + impact.placements);
  });

  it('leaves no shortlist or pipeline row pointing at a missing candidate', async () => {
    await signInAs(USER_EXEC);
    await deleteCandidate(busiestCandidate().id);
    const s = getSnapshot();
    const ids = new Set(s.candidates.map((c) => c.id));
    for (const rows of [s.calls, s.shortlistCandidates, s.requestCandidates, s.placements]) {
      for (const r of rows) expect(ids.has(r.candidate_id)).toBe(true);
    }
  });
});
