'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ArrowLeft, ArrowRight, Lock } from 'lucide-react';

import {
  createCandidate,
  useArchetypes,
  useCurrentUser,
  useDuplicateCandidates,
  useUsers,
  validateContact,
  type ContactErrors,
} from '@/bench/data';
import { DuplicateNotice } from '@/bench/components/duplicate-notice';
import { FormField, inputCls, Section, Segmented } from '@/bench/components/form-bits';
import { StepIndicator } from '@/bench/components/step-indicator';
import { cn } from '@/bench/utils';

/**
 * Add a candidate, step 1: who they are and how to reach them.
 *
 * Saving here creates a Raw record on purpose. Sourcing and assessing are
 * different jobs, often done on different days by different people, so a
 * name and number can land on the bench before anyone has interviewed them.
 * Raw candidates never count toward health and never enter the call queue.
 */

export default function NewCandidatePage() {
  const router = useRouter();
  const archetypes = useArchetypes();
  const users = useUsers();
  const me = useCurrentUser();

  const [archetypeId, setArchetypeId] = useState(archetypes[0]?.id ?? '');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('+251 ');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('Addis Ababa');
  const [linkedin, setLinkedin] = useState('');
  const [ownerId, setOwnerId] = useState(me.id);
  const [notes, setNotes] = useState('');
  const [touched, setTouched] = useState(false);
  const [saving, setSaving] = useState<null | 'raw' | 'assess'>(null);
  const [ackDuplicate, setAckDuplicate] = useState(false);

  const contact = { full_name: fullName, phone, email, location, linkedin_url: linkedin };
  const duplicates = useDuplicateCandidates(contact);
  const [serverErrors, setServerErrors] = useState<ContactErrors & { form?: string }>({});

  // The same rules the data layer applies, shown as the person types.
  const contactErrors = validateContact(contact);
  const errors = {
    archetype: archetypeId ? null : 'Choose a role.',
    fullName: contactErrors.full_name ?? null,
    phone: contactErrors.phone ?? serverErrors.phone ?? null,
    email: contactErrors.email ?? null,
    linkedin: contactErrors.linkedin_url ?? null,
  };
  const valid = Object.values(errors).every((e) => e === null);
  const blockedByDuplicate = duplicates.phone.length > 0 || (duplicates.similar.length > 0 && !ackDuplicate);

  async function save(next: 'raw' | 'assess') {
    setTouched(true);
    if (!valid || blockedByDuplicate) return;
    setSaving(next);
    const res = await createCandidate({ ...contact, archetype_id: archetypeId, owner_id: ownerId, notes });
    if (!res.ok) {
      setSaving(null);
      setServerErrors(res.errors);
      return;
    }
    router.push(next === 'assess' ? `/portal/candidates/${res.id}/assess` : `/portal/candidates/${res.id}`);
  }

  const err = (e: string | null) => (touched ? e : null);

  return (
    <div className="px-5 py-6">
      <Link href="/portal/candidates" className="mb-4 inline-flex items-center gap-1.5 text-[12px] text-bench-ink-faint hover:text-bench-ink">
        <ArrowLeft size={12} /> Candidates
      </Link>

      <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-[19px] font-semibold tracking-tight">Add candidate</h1>
          <p className="mt-1 text-[13px] text-bench-ink-dim">
            Save now as Raw, and assess when you have interviewed them.
          </p>
        </div>
        <StepIndicator step={1} />
      </div>

      <form
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          void save('assess');
        }}
        className="grid max-w-3xl gap-4"
      >
        <Section title="Role">
          <Segmented
            label="Role"
            value={archetypeId}
            onChange={setArchetypeId}
            options={archetypes.map((a) => ({ value: a.id, label: a.name }))}
            invalid={Boolean(err(errors.archetype))}
          />
        </Section>

        <Section
          title="Identity and contact"
          description="Internal only. None of this ever appears on anything a client receives."
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField label="Full name" htmlFor="full_name" error={err(errors.fullName)} className="sm:col-span-2">
              <input
                id="full_name"
                autoFocus
                autoComplete="off"
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                  setAckDuplicate(false);
                }}
                aria-invalid={Boolean(err(errors.fullName))}
                className={inputCls}
              />
            </FormField>
            <FormField label="Phone" htmlFor="phone" error={err(errors.phone)}>
              <input
                id="phone"
                type="tel"
                autoComplete="off"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  setAckDuplicate(false);
                }}
                aria-invalid={Boolean(err(errors.phone))}
                className={cn(inputCls, 'tabular')}
              />
            </FormField>
            <FormField label="Email" hint="Optional" htmlFor="email" error={err(errors.email)}>
              <input
                id="email"
                type="email"
                autoComplete="off"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setAckDuplicate(false);
                }}
                aria-invalid={Boolean(err(errors.email))}
                className={inputCls}
              />
            </FormField>
            <FormField label="Location" htmlFor="location">
              <input id="location" value={location} onChange={(e) => setLocation(e.target.value)} className={inputCls} />
            </FormField>
            <FormField label="LinkedIn" hint="Optional" htmlFor="linkedin" error={err(errors.linkedin)}>
              <input
                id="linkedin"
                type="url"
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
                placeholder="https://www.linkedin.com/in/…"
                aria-invalid={Boolean(err(errors.linkedin))}
                className={inputCls}
              />
            </FormField>
          </div>

          <DuplicateNotice matches={duplicates} acknowledged={ackDuplicate} onAcknowledge={setAckDuplicate} />
        </Section>

        <Section title="Ownership and notes">
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField label="Owner" hint="Who keeps their availability current" htmlFor="owner">
              <select id="owner" value={ownerId} onChange={(e) => setOwnerId(e.target.value)} className={inputCls}>
                {users.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.full_name}
                  </option>
                ))}
              </select>
            </FormField>
            <FormField label="CV" htmlFor="cv">
              <div className="flex h-9 items-center gap-2 rounded-md border border-dashed border-bench-line px-3 text-[12px] text-bench-ink-faint">
                <Lock size={12} /> Uploads arrive with file storage in the real build
              </div>
            </FormField>
            <FormField label="Internal notes" hint="Optional · never exported" htmlFor="notes" className="sm:col-span-2">
              <textarea
                id="notes"
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Where you found them, who referred them, anything the next person should know"
                className={cn(inputCls, 'h-auto resize-y py-2')}
              />
            </FormField>
          </div>
        </Section>

        <div className="flex flex-wrap items-center justify-end gap-2 pb-6">
          {touched && (!valid || blockedByDuplicate) && (
            <span className="mr-auto text-[12px] text-bench-critical">
              {duplicates.phone.length > 0
                ? 'This phone number is already on the bench.'
                : blockedByDuplicate
                  ? 'Confirm this is a different person first.'
                  : 'Fix the highlighted fields.'}
            </span>
          )}
          <Link href="/portal/candidates" className="px-3 py-2 text-[12.5px] text-bench-ink-faint hover:text-bench-ink">
            Cancel
          </Link>
          <button
            type="button"
            onClick={() => void save('raw')}
            disabled={saving !== null}
            className="h-9 rounded-md border border-bench-line-bright bg-bench-surface px-3.5 text-[12.5px] font-medium text-bench-ink-dim transition-colors hover:text-bench-ink disabled:opacity-50"
          >
            Save as Raw
          </button>
          <button
            type="submit"
            disabled={saving !== null}
            className="flex h-9 items-center gap-1.5 rounded-md bg-accent px-4 text-[12.5px] font-semibold text-accent-contrast transition-colors hover:bg-accent-bright disabled:opacity-50"
          >
            Save and assess <ArrowRight size={14} />
          </button>
        </div>
      </form>
    </div>
  );
}
