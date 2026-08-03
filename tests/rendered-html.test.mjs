import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render(path = "/", env = {}) {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${path}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }),
    {
      ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) },
      ...env,
    },
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
  assert.match(html, /Join the pack\./);
  assert.match(html, /Find new places to explore with your best friend and favorite humans\./);
  assert.match(html, />Woof</);
  assert.match(html, /THE HUMANS BEHIND THE LEASH/);
  assert.match(html, /Hi! Join us, we have treats\./);
  assert.match(html, /We&#x27;ve taken our pups all over/);
  assert.doesNotMatch(html, /service[_-]?role/i);
});

test("about page shows the team profiles without the former inspector photo", async () => {
  const response = await render("/about");
  const html = await response.text();

  assert.match(html, /Natalie Tromp/);
  assert.match(html, /Nicole Olson/);
  assert.match(html, /Cook County &amp; Lake County, Illinois Ambassador/);
  assert.match(html, /Elk Grove Village, Chicago, Schaumburg/);
  assert.match(html, /Breed: Mini Bernadoodle/);
  assert.match(html, /Mysza/);
  assert.match(html, /Fox Valley, Kendall County, &amp; Kane County Illinois Ambassador/);
  assert.match(html, /Aurora, Yorkville, Oswego, Montgomery, Plano/);
  assert.match(html, /Breed: German Shepherd/);
  assert.match(html, /Bella/);
  assert.match(html, /Kenosha County, Wisconsin/);
  assert.match(html, /every scenic stop in between/);
  assert.match(html, /Breed: Yorkshire Terrier/);
  assert.match(html, /natalie-archie-gotcha-day\.jpeg/);
  assert.match(html, /girl in sunglasses holding up a white, gray, tan puppy inside of a car/);
  assert.match(html, /Archie&#x27;s Gotcha Day in Pittsburgh, PA/);
  assert.match(html, /bella-walk\.jpeg/);
  assert.match(html, /yorkie dog on a pink leash walking in the grassy on a windy day/);
  assert.match(html, /Bella loves walks with her humans\./);
  assert.match(html, /mysza-long-hike\.jpeg/);
  assert.match(html, /german shepherd dog sitting on a gravel bike path in a native grassland prarie with forest surrounding/);
  assert.match(html, /Mysza loves going on long hikes with her humans/);
  assert.match(html, /nicole-and-mysza\.png/);
  assert.match(html, /girl with long hair and glasses sitting with german shepherd dog/);
  assert.match(html, /Mysza is never far away from her favorite people/);
  assert.doesNotMatch(html, /Chief route inspector/);
  assert.doesNotMatch(html, /A relaxed dog outside in soft sunlight/);
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

test("Supabase client loads public configuration from Worker runtime bindings", async () => {
  const [client, worker] = await Promise.all([
    readFile(new URL("../app/lib/supabase.ts", import.meta.url), "utf8"),
    readFile(new URL("../worker/index.ts", import.meta.url), "utf8"),
  ]);

  assert.match(client, /fetch\("\/api\/public-config"/);
  assert.match(worker, /env\.NEXT_PUBLIC_SUPABASE_URL/);
  assert.match(worker, /env\.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY/);
  assert.match(worker, /supabasePublishableKey/);
  assert.doesNotMatch(client, /import\.meta\.env\.NEXT_PUBLIC_SUPABASE/);
  assert.doesNotMatch(client, /service[_-]?role/i);
});

test("public configuration endpoint returns Worker runtime values", async () => {
  const response = await render("/api/public-config", {
    NEXT_PUBLIC_SUPABASE_URL: "https://example.supabase.co",
    NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: "sb_publishable_test",
  });

  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), {
    supabaseUrl: "https://example.supabase.co",
    supabasePublishableKey: "sb_publishable_test",
  });
});

test("generated Wrangler deployment configuration preserves dashboard variables", async () => {
  const wranglerConfig = JSON.parse(await readFile(
    new URL("../dist/server/wrangler.json", import.meta.url),
    "utf8",
  ));

  assert.equal(wranglerConfig.keep_vars, true);
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
