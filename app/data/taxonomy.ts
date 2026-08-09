import type { Category, Tag } from "./types";

// Sample taxonomy: rename or replace these records when the editorial direction is final.
export const categories: Category[] = [
  { id: "cat-outings", name: "Day Trips", slug: "day-trips", is_sample: true },
  { id: "cat-howto", name: "Good Dog Logistics", slug: "good-dog-logistics", is_sample: true },
  { id: "cat-home", name: "Back at Home", slug: "back-at-home", is_sample: true },
  { id: "cat-supplies", name: "Supplies", slug: "supplies" },
];

export const tags: Tag[] = [
  { id: "tag-trails", name: "Trails", slug: "trails", is_sample: true },
  { id: "tag-weekend", name: "Weekend Plans", slug: "weekend-plans", is_sample: true },
  { id: "tag-senior", name: "Senior Dogs", slug: "senior-dogs", is_sample: true },
  { id: "tag-gear", name: "What We Pack", slug: "what-we-pack", is_sample: true },
  { id: "tag-enrichment", name: "Enrichment", slug: "enrichment", is_sample: true },
  { id: "tag-target", name: "Target", slug: "target" },
  { id: "tag-home-goods", name: "Home Goods", slug: "home-goods" },
  { id: "tag-amazon", name: "Amazon", slug: "amazon" },
  { id: "tag-dog-toys", name: "Dog Toys", slug: "dog-toys" },
  { id: "tag-organization", name: "Organization", slug: "organization" },
  { id: "tag-pet-crate", name: "Pet Crate", slug: "pet-crate" },
  { id: "tag-dog-bed", name: "Dog Bed", slug: "dog-bed" },
  { id: "tag-puppy", name: "Puppy", slug: "puppy" },
  { id: "tag-mid-size-dog-breed", name: "Mid-Size Dog Breed", slug: "mid-size-dog-breed" },
];
