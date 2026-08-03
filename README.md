# Out & About

A public dog-activity blog with reusable post, category, and tag data. This repository is independent from the Nicole Olson board project and does not share its hosting, authentication, database, subscribers, credentials, or content.

## Local development

```bash
npm install
npm run dev
```

## Content architecture

- `app/data/types.ts` defines the portable content contracts.
- `app/data/taxonomy.ts` contains clearly marked sample categories and tags.
- `app/data/posts.ts` contains sample post records and query helpers.
- Public routes render only posts with `status: "published"`; the sample draft demonstrates the future workflow without appearing publicly.
- Components consume typed records rather than importing layout-specific content.

This separation allows the static query helpers to be replaced later by a Supabase-backed content repository. A future private `/admin` can add Supabase Authentication, Storage, and tables for posts, categories, tags, and their relationships without restructuring the public pages.

The newsletter form calls the secured `newsletter_signup` RPC in the dog blog's separate Supabase project. Browser code uses only the public project URL and publishable key; subscriber records remain protected by table privileges and Row Level Security.
