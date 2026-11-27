-- ============================================================================
-- Zare Bench — 0008 candidate links
--
-- Two optional links on a candidate, internal like LinkedIn and never
-- exported: a GitHub profile, and a Google Drive link to an audio recording.
-- Additive: nothing from 0001–0007 is edited. The checks mirror
-- validateContact() in src/bench/data/logic.ts and are added NOT VALID,
-- the same as linkedin_is_https in 0007.
--
-- candidates_view and the views built on it select c.* and so keep the
-- column list they were created with: they do not show the two links until
-- they are next rebuilt. The portal reads through the landing API, not these
-- views, so nothing depends on that today.
-- ============================================================================

alter table public.candidates
  add column github_url text,
  add column audio_url  text;

comment on column public.candidates.github_url is
  'GitHub profile link. Optional, internal only.';
comment on column public.candidates.audio_url is
  'Google Drive link to an audio recording of the candidate. Optional, internal only.';

alter table public.candidates
  add constraint github_is_https check (
    github_url is null or github_url ~* '^https://(www\.)?github\.com/\S+$') not valid,
  add constraint audio_is_google_drive check (
    audio_url is null or audio_url ~* '^https://(drive|docs)\.google\.com/\S+$') not valid;

-- archive_candidate() as in 0004, with the two new links stripped on
-- do_not_contact along with every other way of reaching the person.
create or replace function public.archive_candidate(
  p_candidate_id uuid,
  p_reason       text,
  p_note         text default null
)
returns void
language plpgsql
security invoker
as $$
begin
  if p_reason not in ('took_other_job', 'not_interested', 'left_country', 'do_not_contact') then
    raise exception 'Unknown archive reason: %', p_reason;
  end if;

  -- The call that produced this decision is still part of the audit trail.
  -- For do_not_contact the note is dropped: it could describe the person.
  insert into public.call_logs (candidate_id, called_by, outcome, note)
  values (
    p_candidate_id,
    auth.uid(),
    'archived',
    case when p_reason = 'do_not_contact' then 'do_not_contact'
         else coalesce(p_note, p_reason) end
  );

  if p_reason = 'do_not_contact' then
    -- Strip everything that identifies or reaches the person. Assessment
    -- scores stay: they are about a ref code now, they cannot contact anyone,
    -- and removing them would corrupt historical shortlists.
    --
    -- The CV file itself lives in Storage and is NOT reachable from SQL. The
    -- caller must delete the object as part of this action — see
    -- archiveCandidate() in the app layer.
    update public.candidates
       set full_name       = null,
           phone           = null,
           email           = null,
           linkedin_url    = null,
           github_url      = null,
           audio_url       = null,
           location        = null,
           notes           = null,
           cv_url          = null,
           archived_reason = 'do_not_contact',
           recall_at       = null,
           deleted_at      = now()
     where id = p_candidate_id;
    return;
  end if;

  update public.candidates
     set archived_reason = p_reason,
         recall_at = case p_reason
                       when 'took_other_job'  then (current_date + interval '6 months')::date
                       when 'not_interested'  then (current_date + interval '12 months')::date
                       else null
                     end
   where id = p_candidate_id;
end;
$$;
