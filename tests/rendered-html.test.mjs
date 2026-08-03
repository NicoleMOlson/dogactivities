import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${path}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the dogactivities homepage and newsletter form", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /Out &amp; About/);
  assert.match(html, /name="email"/);
  assert.match(html, /type="email"/);
  assert.match(html, /Join the list/);
  assert.doesNotMatch(html, /service[_-]?role/i);
});

test("newsletter component uses the RPC and safe user-facing states", async () => {
  const component = await readFile(new URL("../app/components/EmailSignup.tsx", import.meta.url), "utf8");

  assert.match(component, /\.rpc\("newsletter_signup"/);
  assert.match(component, /signup_email:\s*email/);
  assert.match(component, /signup_source:\s*"dogactivities_homepage"/);
  assert.match(component, /submissionState === "loading"/);
  assert.match(component, /disabled=\{isLoading\}/);
  assert.match(component, /You’re in the pack\. We’ll be in touch soon\./);
  assert.match(component, /role="alert"/);
  assert.match(component, /console\.error\("newsletter_signup failed"/);
  assert.match(component, /import\.meta\.env\.DEV/);
  assert.doesNotMatch(component, /service[_-]?role/i);
  assert.doesNotMatch(component, /practice list|preview only|no subscriber database/i);
});

test("Supabase client uses Cloudflare-compatible Vite environment variables", async () => {
  const [client, viteConfig] = await Promise.all([
    readFile(new URL("../app/lib/supabase.ts", import.meta.url), "utf8"),
    readFile(new URL("../vite.config.ts", import.meta.url), "utf8"),
  ]);

  assert.match(client, /import\.meta\.env\.NEXT_PUBLIC_SUPABASE_URL/);
  assert.match(client, /import\.meta\.env\.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY/);
  assert.match(viteConfig, /envPrefix:\s*\["VITE_", "NEXT_PUBLIC_"\]/);
  assert.doesNotMatch(client, /service[_-]?role/i);
});

test("migration exposes only the newsletter RPC to anonymous visitors", async () => {
  const migration = await readFile(
    new URL("../supabase/migrations/20260802170000_newsletter_subscribers.sql", import.meta.url),
    "utf8",
  );

  assert.match(migration, /enable row level security/i);
  assert.match(migration, /revoke all on table public\.newsletter_subscribers from anon, authenticated/i);
  assert.match(migration, /security definer/i);
  assert.match(migration, /grant execute on function public\.newsletter_signup\(text\) to anon, authenticated/i);
  assert.match(migration, /lower\(btrim\(p_email\)\)/i);
  assert.match(migration, /on conflict \(email\) do nothing/i);
  assert.match(migration, /dogactivities_homepage/);
  assert.doesNotMatch(migration, /create policy/i);
});

test("additive RPC migration accepts the explicit email and source arguments", async () => {
  const migration = await readFile(
    new URL("../supabase/migrations/20260802173000_newsletter_signup_arguments.sql", import.meta.url),
    "utf8",
  );

  assert.match(migration, /signup_email text/);
  assert.match(migration, /signup_source text/);
  assert.match(migration, /lower\(btrim\(signup_email\)\)/i);
  assert.match(migration, /signup_source is distinct from 'dogactivities_homepage'/i);
  assert.match(migration, /security definer/i);
  assert.match(migration, /grant execute on function public\.newsletter_signup\(text, text\) to anon, authenticated/i);
  assert.match(migration, /on conflict \(email\) do nothing/i);
  assert.doesNotMatch(migration, /grant (select|insert|update|delete).*newsletter_subscribers/i);
});

test("example environment file contains blank public placeholders only", async () => {
  const envExample = await readFile(new URL("../.env.example", import.meta.url), "utf8");
  assert.equal(
    envExample,
    "NEXT_PUBLIC_SUPABASE_URL=\nNEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=\n",
  );
  assert.doesNotMatch(envExample, /https?:\/\/|eyJ|service[_-]?role/i);
});
