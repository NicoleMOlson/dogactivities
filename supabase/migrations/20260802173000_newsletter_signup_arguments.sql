begin;

revoke all on function public.newsletter_signup(text) from public, anon, authenticated;
drop function public.newsletter_signup(text);

create function public.newsletter_signup(
  signup_email text,
  signup_source text
)
returns jsonb
language plpgsql
security definer
set search_path = pg_catalog, public
as $$
declare
  normalized_email text;
begin
  normalized_email := lower(btrim(signup_email));

  if signup_source is distinct from 'dogactivities_homepage' then
    raise exception using
      errcode = '22023',
      message = 'Invalid signup source';
  end if;

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
    signup_source,
    'subscribed'
  )
  on conflict (email) do nothing;

  return jsonb_build_object(
    'success', true,
    'message', 'You’re in the pack. We’ll be in touch soon.'
  );
end;
$$;

revoke all on function public.newsletter_signup(text, text) from public;
grant execute on function public.newsletter_signup(text, text) to anon, authenticated;

commit;
