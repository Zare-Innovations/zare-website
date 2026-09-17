'use client';

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import { AlertTriangle, ArrowLeft, Check, CircleDashed, RotateCcw, SlidersHorizontal, X } from 'lucide-react';

import {
  assessCandidate,
  assessmentTextWarnings,
  calculateOverall,
  CONCERN_MAX,
  exportBlockReason,
  MAX_OVERALL_OVERRIDE,
  MIN_EXPORT_SCORE,
  MIN_OVERRIDE_REASON,
  scoreLabel,
  SHIFT_OPTIONS,
  STRENGTH_MAX,
  useArchetypes,
  useBenchTags,
  useCandidate,
  validateAssessment,
  type Archetype,
  type AssessmentErrors,
  type AssessmentField,
  type AssessmentInput,
  type CandidateView,
  type EnglishLevel,
  type Seniority,
} from '@/bench/data';
import { findLeaks, toExportCandidate, type ExportCandidate } from '@/bench/export/shortlist';
import { CharCount, FormField, inputCls, ScoreInput, Section, Segmented, StepBtn, TagInput } from '@/bench/components/form-bits';
import { StepIndicator } from '@/bench/components/step-indicator';
import { cn, formatDate } from '@/bench/utils';

/**
 * Assess a candidate, step 2. Also used to re-assess.
 *
 * Everything entered here is permanent assessment data, so the screen is
 * built around the one artefact it feeds: the page a client reads. That page
 * is rendered live on the right from the same whitelist the PDF uses, so the
 * assessor sees exactly what will leave the building while they write it.
 */

const SENIORITY: { value: Seniority; label: string }[] = [
  { value: 'junior', label: 'Junior' },
  { value: 'mid', label: 'Mid' },
  { value: 'senior', label: 'Senior' },
  { value: 'lead', label: 'Lead' },
];
const ENGLISH: { value: EnglishLevel; label: string }[] = [
  { value: 'C2', label: 'C2' },
  { value: 'C1', label: 'C1' },
  { value: 'B2', label: 'B2' },
  { value: 'B1', label: 'B1' },
  { value: 'below', label: 'Below B1' },
];

export default function AssessPage() {
  const { id } = useParams<{ id: string }>();
  const v = useCandidate(id);
  const archetype = useArchetypes().find((a) => a.id === v?.archetype_id);

  if (!v || !archetype) {
    return (
      <div className="px-5 py-16 text-center">
        <div className="text-[15px] font-medium">Candidate not found</div>
        <Link href="/portal/candidates" className="mt-4 inline-block text-[12.5px] text-accent hover:text-accent-bright">
          Back to candidates
        </Link>
      </div>
    );
  }
  return <AssessForm key={v.id} v={v} archetype={archetype} />;
}

function AssessForm({ v, archetype }: { v: CandidateView; archetype: Archetype }) {
  const router = useRouter();
  const tags = useBenchTags(archetype.id);
  const isNew = v.assessed_at === null;
  const techWeighted = archetype.technical_weight >= 0.5;
  const showsStack = v.stack.length > 0 || techWeighted;

  // ---- form state, seeded once from the record
  const [years, setYears] = useState(v.years_experience === null ? '' : String(v.years_experience));
  const [seniority, setSeniority] = useState<Seniority | null>(v.seniority);
  const [english, setEnglish] = useState<EnglishLevel | null>(v.english_level);
  const [stack, setStack] = useState<string[]>(v.stack);
  const [skills, setSkills] = useState<string[]>(v.skills);
  const [comm, setComm] = useState<number | null>(v.communication_score);
  const [tech, setTech] = useState<number | null>(v.technical_score);
  const [techOn, setTechOn] = useState(v.technical_score !== null || techWeighted);
  const [adjust, setAdjust] = useState(() => {
    // Stored as a delta in tenths, so moving a sub-score keeps the
    // assessor's adjustment rather than silently discarding it.
    const calc = calculateOverall(archetype, v.communication_score, v.technical_score);
    return v.overall_score !== null && calc !== null ? Math.round((v.overall_score - calc) * 10) : 0;
  });
  const [adjusting, setAdjusting] = useState(adjust !== 0);
  const [reason, setReason] = useState(v.overall_override_reason ?? '');
  const [strengths, setStrengths] = useState<[string, string]>([v.strengths[0] ?? '', v.strengths[1] ?? '']);
  const [concern, setConcern] = useState(v.concern ?? '');
  const [notes, setNotes] = useState(v.notes ?? '');
  // Only what is already on record. A Raw candidate starts with no shifts.
  const [shifts, setShifts] = useState<string[]>(v.shift_flexibility);
  const [setup, setSetup] = useState(v.setup_verified);

  const [submitted, setSubmitted] = useState(false);
  const [serverErrors, setServerErrors] = useState<AssessmentErrors>({});
  const [saving, setSaving] = useState(false);
  const savedRef = useRef(false);

  const techValue = techOn ? tech : null;
  const calculated = calculateOverall(archetype, comm, techValue);
  const overall = calculated === null ? null : clampScore(calculated + adjust / 10);

  // Rebuilt only when a field changes, so everything downstream can depend on it.
  const input: AssessmentInput = useMemo(
    () => ({
      years_experience: years.trim() === '' ? null : Number(years),
      seniority,
      english_level: english,
      stack: showsStack ? stack : [],
      skills,
      communication_score: comm,
      technical_score: techValue,
      overall_score: adjust === 0 ? null : overall,
      overall_override_reason: adjust === 0 ? null : reason,
      strengths,
      concern,
      notes,
      shift_flexibility: shifts,
      setup_verified: setup,
    }),
    [years, seniority, english, showsStack, stack, skills, comm, techValue, adjust, overall, reason, strengths, concern, notes, shifts, setup],
  );

  const liveErrors = validateAssessment(input, archetype);
  const errors: AssessmentErrors = submitted ? { ...liveErrors, ...serverErrors } : {};
  const err = (k: AssessmentField) => errors[k] ?? null;
  const errorCount = Object.keys(liveErrors).length;

  // ---- the draft as it will exist once saved, for the preview and checks
  const draft: CandidateView = useMemo(() => {
    // Saving an assessment never changes availability, so a Known or Raw
    // record with a live confirmation becomes Ready, and nothing else does.
    const fresh = v.layer === 'ready' || (v.layer === 'raw' && v.availability_status === 'available' && (v.days_until_expiry ?? -1) >= 0);
    return {
      ...v,
      ...input,
      stack: input.stack,
      overall_score: overall,
      overall_score_calculated: calculated,
      concern: concern.trim() || null,
      strengths: strengths.map((s) => s.trim()),
      assessed_at: v.assessed_at ?? new Date().toISOString(),
      layer: v.layer === 'archived' ? 'archived' : fresh ? 'ready' : 'known',
    };
  }, [v, input, overall, calculated, concern, strengths]);

  const leaks = findLeaks([draft]);
  const textWarnings = assessmentTextWarnings({ strengths, concern });
  // A real confirmation: an Available call on record. Nothing else is shown
  // to the client as confirmed.
  const confirmed = v.availability_status === 'available' && v.last_verified_at !== null;
  const scored = comm !== null || techValue !== null;
  const communicationOnly = techValue === null && archetype.technical_weight > 0;
  const exportCandidate = toExportCandidate(draft, v.last_verified_at ?? new Date().toISOString());

  // ---- unsaved changes guard
  const [initial] = useState(input);
  const dirty = useMemo(() => !sameInput(input, initial), [input, initial]);
  useEffect(() => {
    const onBeforeUnload = (e: BeforeUnloadEvent) => {
      if (dirty && !savedRef.current) e.preventDefault();
    };
    window.addEventListener('beforeunload', onBeforeUnload);
    return () => window.removeEventListener('beforeunload', onBeforeUnload);
  }, [dirty]);

  async function save() {
    setSubmitted(true);
    setServerErrors({});
    if (errorCount > 0) {
      requestAnimationFrame(() => document.querySelector('[role="alert"]')?.scrollIntoView({ block: 'center', behavior: 'smooth' }));
      return;
    }
    setSaving(true);
    const res = await assessCandidate(v.id, input);
    setSaving(false);
    if (!res.ok) {
      setServerErrors(res.errors);
      return;
    }
    savedRef.current = true;
    router.push(`/portal/candidates/${v.id}`);
  }

  function nudge(delta: number) {
    if (calculated === null) return;
    const next = Math.max(-MAX_OVERALL_OVERRIDE * 10, Math.min(MAX_OVERALL_OVERRIDE * 10, adjust + delta));
    const result = calculated + next / 10;
    if (result < 1 - 1e-9 || result > 5 + 1e-9) return;
    setAdjust(next);
  }

  return (
    <div className="px-5 py-6 pb-24">
      <Link href={`/portal/candidates/${v.id}`} className="mb-4 inline-flex items-center gap-1.5 text-[12px] text-bench-ink-faint hover:text-bench-ink">
        <ArrowLeft size={12} /> {v.full_name}
      </Link>

      <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-[19px] font-semibold tracking-tight">
            {isNew ? 'Assess' : 'Re-assess'} {v.full_name}
          </h1>
          <p className="mt-1 text-[13px] text-bench-ink-dim">
            <span className="tabular">{v.ref_code}</span> · {archetype.name}
            {!isNew && ` · last assessed ${formatDate(v.assessed_at)}`}
          </p>
        </div>
        {isNew && <StepIndicator step={2} />}
      </div>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_400px]">
        <form
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            void save();
          }}
          className="flex min-w-0 flex-col gap-4"
        >
          {/* ---- profile ---- */}
          <Section title="Profile">
            <div className="grid gap-4 sm:grid-cols-[120px_minmax(0,1fr)]">
              <FormField label="Experience" hint="years" htmlFor="years" error={err('years_experience')}>
                <input
                  id="years"
                  type="number"
                  inputMode="decimal"
                  min={0}
                  max={60}
                  step={0.5}
                  value={years}
                  onChange={(e) => setYears(e.target.value)}
                  aria-invalid={Boolean(err('years_experience'))}
                  className={cn(inputCls, 'tabular')}
                />
              </FormField>
              <FormField label="Seniority" error={err('seniority')}>
                <Segmented label="Seniority" value={seniority} onChange={setSeniority} options={SENIORITY} invalid={Boolean(err('seniority'))} />
              </FormField>
              <FormField label="English" error={err('english_level')} className="sm:col-span-2">
                <Segmented label="English" value={english} onChange={setEnglish} options={ENGLISH} invalid={Boolean(err('english_level'))} />
              </FormField>
              {showsStack && (
                <FormField label="Stack" hint="Languages, frameworks, platforms" className="sm:col-span-2">
                  <TagInput value={stack} onChange={setStack} suggestions={tags.stack} placeholder="Type and press Enter" label="Stack" />
                </FormField>
              )}
              <FormField
                label={showsStack ? 'Skills' : 'Tools and skills'}
                hint={showsStack ? undefined : 'Shown to clients as the candidate’s stack'}
                className="sm:col-span-2"
              >
                <TagInput value={skills} onChange={setSkills} suggestions={tags.skills} placeholder="Type and press Enter" label="Tools and skills" />
              </FormField>
            </div>
          </Section>

          {/* ---- scores ---- */}
          <Section
            title="Scores"
            description={
              scored
                ? `Overall uses this role's weights from Settings: ${Math.round(archetype.communication_weight * 100)}% communication, ${Math.round(archetype.technical_weight * 100)}% technical.${communicationOnly ? ' Without a technical score it is communication only.' : ''}`
                : undefined
            }
          >
            <div className="grid gap-4 lg:grid-cols-2">
              <FormField label="Communication" htmlFor="comm" error={err('communication_score')}>
                <ScoreInput id="comm" value={comm} onChange={setComm} invalid={Boolean(err('communication_score'))} />
              </FormField>

              {techOn ? (
                <FormField
                  label="Technical"
                  htmlFor="tech"
                  error={err('technical_score')}
                  hint={
                    !techWeighted && (
                      <button
                        type="button"
                        onClick={() => {
                          setTechOn(false);
                          setTech(null);
                        }}
                        className="text-bench-ink-faint hover:text-bench-ink"
                      >
                        Remove
                      </button>
                    )
                  }
                >
                  <ScoreInput id="tech" value={tech} onChange={setTech} invalid={Boolean(err('technical_score'))} />
                </FormField>
              ) : (
                <FormField label="Technical" hint="Optional for this role">
                  <button
                    type="button"
                    onClick={() => setTechOn(true)}
                    className="flex h-[46px] w-full items-center justify-center rounded-md border border-dashed border-bench-line text-[12px] text-bench-ink-faint transition-colors hover:border-bench-line-bright hover:text-bench-ink"
                  >
                    Add a technical score
                  </button>
                </FormField>
              )}
            </div>

            {/* overall */}
            <div
              className={cn(
                'mt-4 rounded-md border p-3.5',
                err('overall_score') || err('overall_override_reason') ? 'border-bench-critical/50' : 'border-bench-line-bright',
              )}
            >
              <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
                <div>
                  <div className="text-[11.5px] text-bench-ink-dim">Overall</div>
                  <div className="mt-1 flex items-baseline gap-2">
                    <span className="tabular text-[28px] font-semibold leading-none">
                      {overall === null ? '—' : overall.toFixed(1)}
                    </span>
                    {overall !== null && (
                      <span className={cn('text-[12px]', scoreLabel(overall) ? 'text-bench-ink-dim' : 'text-bench-critical')}>
                        {scoreLabel(overall) ?? `Below ${MIN_EXPORT_SCORE.toFixed(1)}: not exportable`}
                      </span>
                    )}
                  </div>
                  <div className="mt-1 text-[11px] text-bench-ink-faint">
                    {calculated === null ? (
                      'Score communication to calculate.'
                    ) : adjust === 0 ? (
                      communicationOnly ? 'As calculated, communication only.' : 'As calculated.'
                    ) : (
                      <>
                        Calculated <span className="tabular text-bench-ink-dim">{calculated.toFixed(1)}</span>{' '}
                        <span className={cn('tabular', adjust > 0 ? 'text-accent' : 'text-bench-warning')}>
                          {adjust > 0 ? '+' : '−'}
                          {(Math.abs(adjust) / 10).toFixed(1)} adjusted
                        </span>
                      </>
                    )}
                  </div>
                </div>

                <div className="ml-auto flex items-center gap-2">
                  {adjusting ? (
                    <>
                      <StepBtn label="Lower overall by 0.1" onClick={() => nudge(-1)} disabled={calculated === null || adjust <= -MAX_OVERALL_OVERRIDE * 10}>
                        <span className="text-[12px] leading-none">−</span>
                      </StepBtn>
                      <span className="tabular w-10 text-center text-[12px] text-bench-ink-dim">
                        {adjust === 0 ? '±0.0' : `${adjust > 0 ? '+' : '−'}${(Math.abs(adjust) / 10).toFixed(1)}`}
                      </span>
                      <StepBtn label="Raise overall by 0.1" onClick={() => nudge(1)} disabled={calculated === null || adjust >= MAX_OVERALL_OVERRIDE * 10}>
                        <span className="text-[12px] leading-none">+</span>
                      </StepBtn>
                      <button
                        type="button"
                        onClick={() => {
                          setAdjust(0);
                          setAdjusting(false);
                        }}
                        className="ml-1 flex items-center gap-1 text-[11.5px] text-bench-ink-faint hover:text-bench-ink"
                      >
                        <RotateCcw size={11} /> Use calculated
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      disabled={calculated === null}
                      onClick={() => setAdjusting(true)}
                      className="flex h-8 items-center gap-1.5 rounded-md border border-bench-line px-2.5 text-[12px] text-bench-ink-dim transition-colors enabled:hover:border-bench-line-bright enabled:hover:text-bench-ink disabled:opacity-40"
                    >
                      <SlidersHorizontal size={12} /> Adjust
                    </button>
                  )}
                </div>
              </div>

              {err('overall_score') && (
                <p role="alert" className="mt-2 text-[11px] text-bench-critical">
                  {err('overall_score')}
                </p>
              )}

              {adjusting && adjust !== 0 && (
                <div className="fade-up mt-3 border-t border-bench-line pt-3">
                  <FormField
                    label="Why is overall different from the calculation?"
                    hint={
                      <span className={cn(reason.trim().length < MIN_OVERRIDE_REASON ? 'text-bench-warning' : 'text-bench-ink-faint')}>
                        {reason.trim().length < MIN_OVERRIDE_REASON
                          ? `${MIN_OVERRIDE_REASON - reason.trim().length} more characters`
                          : 'Internal only'}
                      </span>
                    }
                    htmlFor="reason"
                    error={err('overall_override_reason')}
                  >
                    <textarea
                      id="reason"
                      rows={2}
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      placeholder="What the sub-scores miss, e.g. leadership, a weak code sample, an outdated stack"
                      aria-invalid={Boolean(err('overall_override_reason'))}
                      className={cn(inputCls, 'h-auto resize-y py-2')}
                    />
                  </FormField>
                </div>
              )}
            </div>
          </Section>

          {/* ---- strengths & consideration ---- */}
          <Section
            title="Strengths and consideration"
            description="Printed on the client page. Exactly two strengths and one consideration: specific, observed, and about the work. Leave out availability, calls, salary, names and contact details; those belong in notes."
          >
            <div className="grid gap-4">
              {([0, 1] as const).map((i) => (
                <FormField
                  key={i}
                  label={`Strength ${i + 1}`}
                  hint={<CharCount value={strengths[i]} max={STRENGTH_MAX} />}
                  htmlFor={`strength-${i}`}
                  error={err(i === 0 ? 'strengths.0' : 'strengths.1')}
                >
                  <input
                    id={`strength-${i}`}
                    value={strengths[i]}
                    onChange={(e) => setStrengths((s) => (i === 0 ? [e.target.value, s[1]] : [s[0], e.target.value]))}
                    placeholder={i === 0 ? 'e.g. Handles escalations without needing a supervisor' : 'e.g. Writes clear, complete case notes'}
                    aria-invalid={Boolean(err(i === 0 ? 'strengths.0' : 'strengths.1'))}
                    className={inputCls}
                  />
                </FormField>
              ))}
              <FormField
                label="Consideration"
                hint={<CharCount value={concern} max={CONCERN_MAX} />}
                htmlFor="concern"
                error={err('concern')}
              >
                <input
                  id="concern"
                  value={concern}
                  onChange={(e) => setConcern(e.target.value)}
                  placeholder="e.g. Has not worked a rotating night shift before"
                  aria-invalid={Boolean(err('concern'))}
                  className={inputCls}
                />
              </FormField>

              {textWarnings.length > 0 && (
                <div role="status" className="flex items-start gap-2 rounded-md border border-bench-warning/30 bg-bench-warning/[0.06] px-3 py-2 text-[12px]">
                  <AlertTriangle size={13} className="mt-0.5 shrink-0 text-bench-warning" aria-hidden />
                  <ul className="text-bench-ink-dim">
                    {textWarnings.map((w) => (
                      <li key={w}>{w}</li>
                    ))}
                  </ul>
                </div>
              )}

              {leaks.length > 0 && (
                <div className="flex items-start gap-2 rounded-md border border-bench-warning/30 bg-bench-warning/[0.06] px-3 py-2 text-[12px]">
                  <AlertTriangle size={13} className="mt-0.5 shrink-0 text-bench-warning" />
                  <div>
                    <div className="text-bench-warning">This text would block export.</div>
                    <ul className="mt-0.5 text-bench-ink-dim">
                      {leaks.map((l) => (
                        <li key={l.reason}>{l.reason}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </Section>

          {/* ---- work setup ---- */}
          <Section
            title="Shifts and work setup"
            description="Availability, notice period and start date are confirmed on a call, never entered here."
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField label="Shifts they can work">
                <div role="group" aria-label="Shifts they can work" className="flex flex-wrap gap-1.5">
                  {SHIFT_OPTIONS.map((s) => {
                    const on = shifts.includes(s);
                    return (
                      <button
                        key={s}
                        type="button"
                        aria-pressed={on}
                        onClick={() => setShifts((cur) => (on ? cur.filter((x) => x !== s) : [...cur, s]))}
                        className={cn(
                          'rounded-md border px-2.5 py-1.5 text-[12px] transition-colors',
                          on ? 'border-accent/40 bg-accent/10 text-accent' : 'border-bench-line bg-bench-surface-2 text-bench-ink-dim hover:text-bench-ink',
                        )}
                      >
                        {s}
                      </button>
                    );
                  })}
                </div>
              </FormField>
              <FormField label="Home work setup">
                <label className="flex h-9 cursor-pointer items-center gap-2.5 text-[12.5px]">
                  <input
                    type="checkbox"
                    checked={setup}
                    onChange={(e) => setSetup(e.target.checked)}
                    className="h-4 w-4 accent-[var(--color-accent)]"
                  />
                  Verified: reliable power backup, connection and a quiet space
                </label>
              </FormField>
            </div>
          </Section>

          <Section title="Internal notes">
            <textarea
              aria-label="Internal notes"
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Anything useful for the team. Never exported."
              className={cn(inputCls, 'h-auto resize-y py-2')}
            />
          </Section>

          <div className="flex flex-wrap items-center justify-end gap-2">
            {submitted && errorCount > 0 && (
              <span className="mr-auto text-[12px] text-bench-critical">
                {errorCount} {errorCount === 1 ? 'field needs' : 'fields need'} attention.
              </span>
            )}
            <Link href={`/portal/candidates/${v.id}`} className="px-3 py-2 text-[12.5px] text-bench-ink-faint hover:text-bench-ink">
              {isNew ? 'Assess later' : 'Cancel'}
            </Link>
            <button
              type="submit"
              disabled={saving}
              className="h-9 rounded-md bg-accent px-4 text-[12.5px] font-semibold text-accent-contrast transition-colors hover:bg-accent-bright disabled:opacity-50"
            >
              {isNew ? 'Complete assessment' : 'Save assessment'}
            </button>
          </div>
        </form>

        {/* ---- live client preview ---- */}
        <aside className="min-w-0 xl:sticky xl:top-4 xl:self-start">
          <ExportChecks draft={draft} errorCount={errorCount} leaks={leaks.length} verified={v.last_verified_at !== null} />
          <ClientPage c={exportCandidate} role={archetype.name} confirmed={confirmed} />
        </aside>
      </div>
    </div>
  );
}

// ------------------------------------------------------------- preview ----

function ExportChecks({
  draft,
  errorCount,
  leaks,
  verified,
}: {
  draft: CandidateView;
  errorCount: number;
  leaks: number;
  verified: boolean;
}) {
  const floor = draft.overall_score !== null && draft.overall_score >= MIN_EXPORT_SCORE;
  const ready = draft.layer === 'ready';
  const exportable = errorCount === 0 && leaks === 0 && !exportBlockReason(draft);

  const rows: { ok: boolean; label: string; pending?: boolean }[] = [
    { ok: errorCount === 0, label: errorCount === 0 ? 'Assessment complete' : `${errorCount} required ${errorCount === 1 ? 'field' : 'fields'} left` },
    draft.overall_score === null
      ? { ok: false, pending: true, label: 'Overall not scored yet' }
      : { ok: floor, label: floor ? `Overall ${MIN_EXPORT_SCORE.toFixed(1)} or above` : `Overall below ${MIN_EXPORT_SCORE.toFixed(1)}: cannot be exported` },
    { ok: leaks === 0, label: leaks === 0 ? 'No name, contact or salary in the text' : 'Text mentions identity or salary' },
    {
      ok: ready,
      pending: !ready,
      label: ready
        ? 'Availability confirmed recently'
        : verified
          ? 'Availability has expired: call to confirm'
          : 'Never called: confirm availability after saving',
    },
  ];

  return (
    <section className="mb-3 rounded-lg border border-bench-line bg-bench-surface">
      <div className="flex items-center justify-between gap-3 border-b border-bench-line px-4 py-2.5">
        <span className="font-mono text-[10.5px] uppercase tracking-widest text-bench-ink-faint">Export readiness</span>
        <span className={cn('text-[11px]', exportable ? 'text-bench-healthy' : 'text-bench-ink-faint')}>
          {exportable ? 'Shortlist-ready once saved' : 'Not yet exportable'}
        </span>
      </div>
      <ul className="px-4 py-2.5">
        {rows.map((r) => (
          <li key={r.label} className="flex items-center gap-2 py-1 text-[12px]">
            {r.ok ? (
              <Check size={13} className="shrink-0 text-bench-healthy" strokeWidth={2.5} />
            ) : r.pending ? (
              <CircleDashed size={13} className="shrink-0 text-bench-warning" />
            ) : (
              <X size={13} className="shrink-0 text-bench-critical" strokeWidth={2.5} />
            )}
            <span className={r.ok ? 'text-bench-ink-dim' : 'text-bench-ink'}>{r.label}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

/**
 * The candidate page of the shortlist PDF, in HTML, from the same
 * ExportCandidate the PDF renders. Nothing else is in scope here, so the
 * preview cannot show something the export would not.
 */
function ClientPage({ c, role, confirmed }: { c: ExportCandidate; role: string; confirmed: boolean }) {
  return (
    <section className="overflow-hidden rounded-lg border border-bench-line bg-bench-surface">
      <div className="flex items-center justify-between gap-3 border-b border-bench-line px-4 py-2.5">
        <span className="font-mono text-[10.5px] uppercase tracking-widest text-bench-ink-faint">What the client sees</span>
        <span className="text-[11px] text-bench-ink-faint">Ref code only</span>
      </div>
      <div className="bg-bench-surface-2 p-3">
        <div className="rounded bg-white px-6 py-5 font-sans text-[#0b0f14] shadow-lg" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
          <div className="flex items-center justify-between">
            <span className="text-[8px] font-bold tracking-[0.2em]">ZARE</span>
            <span className="text-[7.5px] tracking-[0.12em] text-[#9aa3ae]">CANDIDATE PAGE</span>
          </div>
          <div className="my-3 h-px bg-[#e5e7eb]" />
          <div className="flex items-end justify-between gap-3">
            <div>
              <div className="font-mono text-[20px] font-bold tracking-wide">{c.ref_code}</div>
              <div className="mt-1 text-[10px] text-[#4b5563]">{role}</div>
            </div>
            <div className="text-right">
              <PreviewLabel>ASSESSMENT</PreviewLabel>
              <div className="mt-0.5 text-[14px] font-bold text-[#0a8f91]">{c.assessment.overall || '—'}</div>
            </div>
          </div>
          <div className="my-3 h-px bg-[#e5e7eb]" />

          <div className="grid grid-cols-3 gap-x-3 gap-y-2.5">
            <div><PreviewLabel>EXPERIENCE</PreviewLabel><PreviewValue>{c.experience ?? '—'}</PreviewValue></div>
            <div><PreviewLabel>SENIORITY</PreviewLabel><PreviewValue>{c.seniority ?? '—'}</PreviewValue></div>
            <div><PreviewLabel>ENGLISH</PreviewLabel><PreviewValue>{c.english ?? '—'}</PreviewValue></div>
            <div><PreviewLabel>COMMUNICATION</PreviewLabel><PreviewValue>{c.assessment.communication ?? '—'}</PreviewValue></div>
            {c.assessment.technical && <div><PreviewLabel>TECHNICAL</PreviewLabel><PreviewValue>{c.assessment.technical}</PreviewValue></div>}
          </div>

          {c.stack.length > 0 && (
            <div className="mt-3">
              <PreviewLabel>STACK</PreviewLabel>
              <div className="mt-1 flex flex-wrap gap-1">
                {c.stack.map((t) => (
                  <span key={t} className="rounded-sm border border-[#e5e7eb] px-1.5 py-0.5 text-[9px] text-[#4b5563]">{t}</span>
                ))}
              </div>
            </div>
          )}

          <div className="mt-3 grid grid-cols-2 gap-3">
            <div>
              <PreviewLabel>AVAILABILITY</PreviewLabel>
              {confirmed ? (
                <>
                  <PreviewValue>Confirmed {c.availability.confirmed_on}</PreviewValue>
                  {c.availability.earliest_start && <PreviewValue>Can start {c.availability.earliest_start}</PreviewValue>}
                  {c.availability.notice_period && <PreviewValue>Notice: {c.availability.notice_period}</PreviewValue>}
                </>
              ) : (
                <PreviewValue>Not yet confirmed</PreviewValue>
              )}
            </div>
            <div>
              <PreviewLabel>WORK SETUP</PreviewLabel>
              <PreviewValue>{c.work_setup.setup_verified ? 'Home setup verified' : 'Home setup not yet verified'}</PreviewValue>
              {c.work_setup.shifts.length > 0 && <PreviewValue>Shifts: {c.work_setup.shifts.join(', ')}</PreviewValue>}
            </div>
          </div>

          <div className="my-3 h-px bg-[#e5e7eb]" />
          <PreviewLabel>STRENGTHS</PreviewLabel>
          {[0, 1].map((i) => (
            <div key={i} className="mt-1.5 flex gap-2">
              <span className="mt-[5px] h-1 w-1 shrink-0 rounded-full bg-[#0a8f91]" />
              <span className={cn('text-[11px]', !c.strengths[i] && 'italic text-[#c3c9d0]')}>{c.strengths[i] || 'Strength not written yet'}</span>
            </div>
          ))}
          <div className="mt-3">
            <PreviewLabel>CONSIDERATION</PreviewLabel>
            <div className="mt-1.5 flex gap-2">
              <span className="mt-[5px] h-1 w-1 shrink-0 rounded-full bg-[#9aa3ae]" />
              <span className={cn('text-[11px]', !c.consideration && 'italic text-[#c3c9d0]')}>{c.consideration || 'Consideration not written yet'}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* The PDF page's own type, drawn in its print colours (see
   @/bench/export/shortlist-pdf), not the portal's dark tokens. */
function PreviewLabel({ children }: { children: React.ReactNode }) {
  return <div className="text-[8px] font-bold tracking-[0.16em] text-[#9aa3ae]">{children}</div>;
}

function PreviewValue({ children }: { children: React.ReactNode }) {
  return <div className="mt-0.5 text-[11px] text-[#0b0f14]">{children}</div>;
}

/** Field-by-field comparison; arrays compare by their values. */
function sameInput(a: AssessmentInput, b: AssessmentInput): boolean {
  return (Object.keys(a) as (keyof AssessmentInput)[]).every((k) => {
    const x = a[k];
    const y = b[k];
    return Array.isArray(x) && Array.isArray(y) ? x.length === y.length && x.every((t, i) => t === y[i]) : x === y;
  });
}

function clampScore(x: number) {
  return Math.min(5, Math.max(1, Math.round(x * 10) / 10));
}
