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
  assert.match(html, /Paws Welcome/);
  assert.doesNotMatch(html, /Out &amp; About|with the dog|O\+A/);
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

test("uses Alegreya typography across the site", async () => {
  const [layout, styles] = await Promise.all([
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);
  assert.match(layout, /Alegreya, Alegreya_Sans/);
  assert.match(layout, /--font-body/);
  assert.match(layout, /--font-heading/);
  assert.match(styles, /font-family: var\(--font-heading\), sans-serif; font-weight: 900/);
  assert.match(styles, /font-family: var\(--font-body\), serif/);
  assert.match(styles, /\.post-body > p \{ margin: 0 0 1\.4em; \}/);
  assert.match(styles, /\.post-body \{ width: min\(1120px, 100%\)/);
  assert.match(styles, /\.post-header \{ width: min\(1120px, 100%\)/);
  assert.match(styles, /\.post-featured \{ width: min\(1120px, 100%\)/);
  assert.match(styles, /\.post-featured[^}]*margin: 24px auto 0/);
  assert.match(styles, /\.post-featured img \{ width: auto; max-width: 100%; height: auto; max-height: 720px/);
  assert.doesNotMatch(styles, /\.post-featured img[^}]*object-fit: cover/);
  assert.match(styles, /\.post-inline-image[^}]*margin: 2\.8em 0 3\.2em/);
  assert.match(styles, /\.product-shelf[^}]*margin: 64px 0 0/);
  assert.doesNotMatch(layout, /DM_Sans|Fraunces/);
});

test("about page shows the team profiles without the former inspector photo", async () => {
  const response = await render("/about");
  const html = await response.text();

  assert.match(html, /Natalie Tromp/);
  assert.match(html, /About this notebook/);
  assert.match(html, /Good days with your best friend\./);
  assert.match(html, /Paws Welcome helps dog owners find their new favorite/);
  assert.match(html, /Adventure doesn&#x27;t have to mean going far/);
  assert.match(html, /Nicole Olson/);
  assert.match(html, /Cook County &amp; Lake County, Illinois Ambassador/);
  assert.match(html, /Elk Grove Village, Chicago, Schaumburg/);
  assert.match(html, /Breed: Mini Bernadoodle/);
  assert.match(html, /archie-coffee\.jpeg/);
  assert.match(html, /puppy sniffing a cup of coffee/);
  assert.match(html, /Archie loves visiting new spots and making sure mama&#x27;s coffee is made just right\./);
  assert.match(html, /cross country flight from Pittsburg, PA to Chicago, IL/);
  assert.match(html, /whether it&#x27;s in his own backyard or on the trail near his home/);
  assert.match(html, /https:\/\/www\.instagram\.com\/archibald_the_bernedoodle/);
  assert.match(html, /aria-label="Follow Archie on Instagram"/);
  assert.match(html, /follow along/);
  assert.match(html, /Myszka/);
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
  assert.match(html, /Beach days to hiking trails, Bella&#x27;s got a streak for adventure\./);
  assert.match(html, /mysza-long-hike\.jpeg/);
  assert.match(html, /german shepherd dog sitting on a gravel bike path in a native grassland prarie with forest surrounding/);
  assert.match(html, /Myszka loves going on long hikes with her humans/);
  assert.match(html, /https:\/\/www\.instagram\.com\/maamaoro\//);
  assert.match(html, /aria-label="Follow Myszka on Instagram"/);
  assert.match(html, /nicole-and-mysza\.png/);
  assert.match(html, /girl with long hair and glasses sitting with german shepherd dog/);
  assert.match(html, /Myszka is never far away from her favorite people/);
  assert.doesNotMatch(html, /Chief route inspector/);
  assert.doesNotMatch(html, /A relaxed dog outside in soft sunlight/);
  assert.match(html, /class="human-profile-grid"/);
  assert.match(html, /class="dog-profile-grid"/);
  assert.ok(html.indexOf("Archie</h1>") < html.indexOf("Myszka</h1>"));
  assert.ok(html.indexOf("Myszka</h1>") < html.indexOf("Bella</h1>"));
  assert.ok(html.indexOf("archie-coffee.jpeg") < html.indexOf("Archie</h1>"));
});

test("publishes the Archie puppy-preparation post with accessible photos and shopping links", async () => {
  const response = await render("/posts/preparing-for-arrival-of-archie-mini-bernedoodle-puppy");
  assert.equal(response.status, 200);
  const html = await response.text();

  assert.match(html, /Preparing for the Arrival of Archie: My Mini Bernadoodle Puppy/);
  assert.match(html, /August 9, 2026/);
  assert.match(html, /href="\/about#natalie-tromp"/);
  assert.match(html, /archie-crate-and-bed\.jpeg/);
  assert.match(html, /dog crate inside of a home with a dog bed/);
  assert.match(html, /Archie’s Dog Toys and Dog Collar/);
  assert.match(html, /archie-puppy-toys\.jpeg/);
  assert.match(html, /Shopping at Target while Preparing to Bring Home a Puppy/);
  assert.match(html, /<h2 class="compact-heading">Creating Archie’s Puppy Space<\/h2>/);
  assert.match(html, /From research, to building, to crate training - picking the right crate can be a PROCESS!/);
  assert.match(html, /Here’s everything that went into selecting the right crate for Archie\./);
  assert.match(html, /<h3>Archie’s Crate for Puppies, Dogs, and Mid-Sized Breeds<\/h3>/);
  assert.match(html, /<h3>Shopping at Target while Preparing to Bring Home a Puppy<\/h3>/);
  assert.match(html, /archie-target-golf-collection\.jpeg/);
  assert.match(html, /Items in This Post/);
  assert.match(html, /Products in This Post/);
  assert.match(html, /class="product-rail"/);
  assert.match(html, /\/products\/dog-crate\.jpeg/);
  assert.match(html, /\/products\/country-club-polo\.jpeg/);
  assert.match(html, /target\.com\/p\/hooray-house-country-club-polo/);
  assert.doesNotMatch(html, /Keep reading more/);
  assert.ok(html.indexOf("Products in This Post") < html.indexOf("Items in This Post"));
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
