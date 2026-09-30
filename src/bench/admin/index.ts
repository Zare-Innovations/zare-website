'use client';

/**
 * The admin data layer for the portal.
 *
 * Same shape as `@/bench/data`: reads are hooks, writes are async
 * functions. It talks to the landing-api directly through the portal's own
 * `request` helper, so it carries the portal's bearer token and brings
 * neither Redux nor Mantine into these screens — the admin area's own
 * RTK Query modules stay where they are until /admin is retired.
 */

import { useCallback, useEffect, useState } from 'react';

import { request } from '@/bench/data/api';
import type { CreatedAccount, Job, JobInput, StaffUser } from './types';

/** Everything, in one page. These lists are tens of rows, not thousands. */
const ALL = `?q=${encodeURIComponent('t=1000')}`;

/* --------------------------------------------------------------- reads --- */

interface Loadable<T> {
  data: T;
  loading: boolean;
  error: string | null;
  reload: () => void;
}

/**
 * State is one object set only from the fetch callbacks: setting it
 * synchronously inside the effect body would cascade renders, which the
 * repo's react-hooks rules reject.
 */
interface FetchState<T> {
  data: T;
  loading: boolean;
  error: string | null;
}

function useCollection<T>(path: string, enabled = true): Loadable<T[]> {
  const [state, setState] = useState<FetchState<T[]>>({
    data: [],
    loading: enabled,
    error: null,
  });
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!enabled) return;
    let live = true;
    request('GET', `${path}${ALL}`)
      .then((res) => {
        if (live) {
          setState({ data: (res?.items ?? []) as T[], loading: false, error: null });
        }
      })
      .catch((err: unknown) => {
        if (live) setState((s) => ({ ...s, loading: false, error: String(err) }));
      });
    return () => {
      live = false;
    };
  }, [path, enabled, tick]);

  const reload = useCallback(() => {
    setState((s) => ({ ...s, loading: true }));
    setTick((t) => t + 1);
  }, []);

  return { ...state, reload };
}

function useRecord<T>(path: string, id: string | null): Loadable<T | null> {
  const [state, setState] = useState<FetchState<T | null>>({
    data: null,
    loading: Boolean(id),
    error: null,
  });
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!id) return;
    let live = true;
    request('GET', `${path}/${id}`)
      .then((res) => {
        if (live) setState({ data: res as T, loading: false, error: null });
      })
      .catch((err: unknown) => {
        if (live) setState((s) => ({ ...s, loading: false, error: String(err) }));
      });
    return () => {
      live = false;
    };
  }, [path, id, tick]);

  const reload = useCallback(() => {
    setState((s) => ({ ...s, loading: true }));
    setTick((t) => t + 1);
  }, []);

  return { ...state, reload };
}

export const useJobs = () => useCollection<Job>('job');
export const useJob = (id: string | null) => useRecord<Job>('job', id);
// The user controller lists per organisation (`list/:id`), and every
// account sits in the one the admin area has always read: '1'.
export const useStaff = () => useCollection<StaffUser>('user/list/1');
export const useStaffMember = (id: string | null) =>
  useRecord<StaffUser>('user', id);

/* -------------------------------------------------------------- writes --- */

export async function createJob(input: JobInput): Promise<Job> {
  return (await request('POST', 'job', input)) as Job;
}

export async function updateJob(id: string, input: JobInput): Promise<Job> {
  return (await request('PUT', `job/${id}`, { ...input, id })) as Job;
}

export async function deleteJob(id: string): Promise<void> {
  await request('DELETE', `job/${id}`);
}

/**
 * Creating a staff member is two calls: the account (which generates a
 * first-time password) and then the exchange for the chosen one. Without
 * the second, sign-in refuses the account with `password_not_updated`.
 * Returns the generated password only when the exchange failed, so the
 * caller can still hand over something that works.
 */
export async function createStaff(input: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
}): Promise<{ email: string; password: string; usable: boolean }> {
  const account = (await request('POST', 'accounts/create-account', {
    firstName: input.firstName,
    lastName: input.lastName,
    email: input.email,
    phoneNumber: input.phone,
    type: 'web',
    // Required by the DTO, then ignored by the service: there is no
    // organisations table yet.
    organizationId: 'zare',
  })) as CreatedAccount;

  try {
    await request('POST', 'accounts/update-password', {
      email: account.email,
      firstTimePassword: account.firstTimePassword,
      password: input.password,
    });
    return { email: account.email, password: input.password, usable: true };
  } catch {
    return {
      email: account.email,
      password: account.firstTimePassword,
      usable: false,
    };
  }
}

/** Only the columns the `users` table actually has. */
export async function updateStaff(
  id: string,
  input: { firstName: string; lastName: string; email: string },
): Promise<void> {
  await request('PUT', `user/${id}`, { ...input, id });
}

export async function deleteStaff(id: string): Promise<void> {
  await request('DELETE', `user/${id}`);
}

export * from './types';
