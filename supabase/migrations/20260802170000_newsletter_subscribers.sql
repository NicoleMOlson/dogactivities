begin;

create extension if not exists pgcrypto;

create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  source text not null default 'dogactivities_homepage',
  status text not null default 'subscribed',
  created_at timestamptz not null default now(),
  constraint newsletter_subscribers_email_normalized
    check (email = lower(btrim(email))),
  constraint newsletter_subscribers_email_length
    check (char_length(email) between 3 and 320),
  constraint newsletter_subscribers_source_allowed
    check (source = 'dogactivities_homepage'),
  constraint newsletter_subscribers_status_allowed
    check (status in ('subscribed', 'unsubscribed'))
);

alter table public.newsletter_subscribers enable row level security;

revoke all on table public.newsletter_subscribers from anon, authenticated;

create or replace function public.newsletter_signup(p_email text)
returns jsonb
language plpgsql
security definer
set search_path = pg_catalog, public
as $$
declare
  normalized_email text;
begin
  normalized_email := lower(btrim(p_email));

  if normalized_email is null
    or char_length(normalized_email) not between 3 and 320
    or normalized_email !~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$'
  then
    raise exception using
      errcode = '22023',
      message = 'Invalid email address';
  end if;

  insert into public.newsletter_subscribers (
    email,
    source,
    status
  )
  values (
    normalized_email,
    'dogactivities_homepage',
    'subscribed'
  )
  on conflict (email) do nothing;

  return jsonb_build_object(
    'success', true,
    'message', 'You’re in the pack. We’ll be in touch soon.'
  );
end;
$$;

revoke all on function public.newsletter_signup(text) from public;
grant execute on function public.newsletter_signup(text) to anon, authenticated;

commit;
