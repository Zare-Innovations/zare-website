import { beforeEach, describe, expect, it } from 'vitest';

import { archiveCandidate, createCandidate, signInAs, updateContact } from './index';
import { USER_RECRUITER_1 } from './seed';
import { getSnapshot, resetDemo } from './store';

const GITHUB = 'https://github.com/abebe';
const AUDIO = 'https://drive.google.com/file/d/1AbC/view';

const row = (id: string) => getSnapshot().candidates.find((c) => c.id === id)!;

async function add(extra: { github_url?: string; audio_url?: string } = {}) {
  const res = await createCandidate({
    archetype_id: getSnapshot().archetypes[0].id,
    full_name: 'Abebe Kebede',
    phone: '0911 765 432',
    email: '',
    location: '',
    linkedin_url: '',
    ...extra,
  });
  if (!res.ok) throw new Error(JSON.stringify(res.errors));
  return res.id;
}

const contactOf = (id: string) => {
  const c = row(id);
  return { full_name: c.full_name!, phone: c.phone!, email: c.email ?? '', location: c.location ?? '', linkedin_url: c.linkedin_url ?? '' };
};

describe('GitHub and audio links on a candidate', () => {
  beforeEach(async () => {
    resetDemo();
    await signInAs(USER_RECRUITER_1);
  });

  it('are saved when a candidate is added, and blank when left out', async () => {
    const withLinks = row(await add({ github_url: ` ${GITHUB} `, audio_url: AUDIO }));
    expect(withLinks).toMatchObject({ github_url: GITHUB, audio_url: AUDIO });

    resetDemo();
    await signInAs(USER_RECRUITER_1);
    expect(row(await add())).toMatchObject({ github_url: null, audio_url: null });
  });

  it('refuse a link that is not GitHub or Google Drive', async () => {
    const res = await createCandidate({
      archetype_id: getSnapshot().archetypes[0].id,
      full_name: 'Abebe Kebede',
      phone: '0911 765 432',
      email: '',
      location: '',
      linkedin_url: '',
      audio_url: 'https://dropbox.com/s/1',
    });
    expect(res.ok).toBe(false);
  });

  it('can be edited and cleared, and are left alone by a caller that does not send them', async () => {
    const id = await add({ github_url: GITHUB, audio_url: AUDIO });

    await updateContact(id, contactOf(id));
    expect(row(id)).toMatchObject({ github_url: GITHUB, audio_url: AUDIO });

    await updateContact(id, { ...contactOf(id), github_url: '', audio_url: 'https://docs.google.com/uc?id=2' });
    expect(row(id)).toMatchObject({ github_url: null, audio_url: 'https://docs.google.com/uc?id=2' });
  });

  it('are erased with the other details on Do not contact', async () => {
    const id = await add({ github_url: GITHUB, audio_url: AUDIO });
    await archiveCandidate(id, 'do_not_contact');
    expect(row(id)).toMatchObject({ github_url: null, audio_url: null, full_name: null });
  });
});
