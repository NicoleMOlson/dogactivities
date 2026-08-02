import type { Category, Tag } from "./types";

// Sample taxonomy: rename or replace these records when the editorial direction is final.
export const categories: Category[] = [
  { id: "cat-outings", name: "Day Trips", slug: "day-trips", is_sample: true },
  { id: "cat-howto", name: "Good Dog Logistics", slug: "good-dog-logistics", is_sample: true },
  { id: "cat-home", name: "Back at Home", slug: "back-at-home", is_sample: true },
];

export const tags: Tag[] = [
  { id: "tag-trails", name: "Trails", slug: "trails", is_sample: true },
  { id: "tag-weekend", name: "Weekend Plans", slug: "weekend-plans", is_sample: true },
  { id: "tag-senior", name: "Senior Dogs", slug: "senior-dogs", is_sample: true },
  { id: "tag-gear", name: "What We Pack", slug: "what-we-pack", is_sample: true },
  { id: "tag-enrichment", name: "Enrichment", slug: "enrichment", is_sample: true },
];
