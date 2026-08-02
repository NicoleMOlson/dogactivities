import { categories, tags } from "./taxonomy";
import type { Post } from "./types";

const category = (slug: string) => categories.find((item) => item.slug === slug)!;
const tag = (slug: string) => tags.find((item) => item.slug === slug)!;

// Static sample records share the same shape intended for a future Supabase post repository.
export const posts: Post[] = [
  {
    id: "post-001",
    title: "The unhurried guide to a first trail day",
    slug: "unhurried-first-trail-day",
    excerpt: "A simple plan for picking the route, packing light, and letting your dog set the pace.",
    body: [
      { type: "paragraph", text: "The best first trail day is not the most ambitious one. It is the one where everyone gets home pleasantly tired, with enough energy left to eat dinner." },
      { type: "heading", text: "Choose for the dog you have today" },
      { type: "paragraph", text: "Start with a short route that has shade, reliable footing, and an easy turnaround. Weather, age, confidence, and recent activity matter more than the mileage on paper." },
      { type: "list", items: ["Water for both of you", "A six-foot leash", "High-value treats", "Waste bags plus one extra", "A small towel for the car"] },
      { type: "quote", text: "A good outing leaves room for sniffing. That is not lost time; that is the point." },
      { type: "heading", text: "End while it is still fun" },
      { type: "paragraph", text: "Pause often and watch for lagging, heavy panting, or a sudden lack of interest. Turning around early is excellent trip planning, not a failed adventure." },
    ],
    featured_image: "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=1400&q=85",
    published_at: "2026-07-28T09:00:00-05:00",
    status: "published",
    category: category("day-trips"),
    tags: [tag("trails"), tag("weekend-plans"), tag("what-we-pack")],
  },
  {
    id: "post-002",
    title: "What actually earns a place in our day-trip bag",
    slug: "what-is-in-our-day-trip-bag",
    excerpt: "The small, useful kit that comes along—and the things we stopped hauling around.",
    body: [
      { type: "paragraph", text: "Our dog bag used to be prepared for every theoretical emergency and impossible to carry. Now it is small enough to grab without negotiation." },
      { type: "heading", text: "The always list" },
      { type: "list", items: ["Collapsible bowl and fresh water", "Treat pouch", "Waste bags", "Leash and backup slip lead", "Towel and a few pet-safe wipes"] },
      { type: "paragraph", text: "Seasonal extras live beside the bag, not inside it. That keeps the default kit light and makes it obvious when sunscreen, a cooling layer, or a warm blanket should come along." },
    ],
    featured_image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=1400&q=85",
    published_at: "2026-07-20T09:00:00-05:00",
    status: "published",
    category: category("good-dog-logistics"),
    tags: [tag("what-we-pack"), tag("weekend-plans")],
  },
  {
    id: "post-003",
    title: "A rainy afternoon that still counts as an adventure",
    slug: "rainy-afternoon-enrichment",
    excerpt: "Three low-fuss indoor activities for weather that refuses to cooperate.",
    body: [
      { type: "paragraph", text: "Rain changes the venue, not the need to explore. A little novelty can do more than an elaborate setup that never makes it out of the closet." },
      { type: "heading", text: "Use what is already in the house" },
      { type: "list", items: ["Hide treats in a loosely folded towel", "Scatter part of dinner through a cardboard box full of paper", "Practice a familiar cue in an unfamiliar room"] },
      { type: "paragraph", text: "Supervise anything involving fabric or cardboard, and choose activities that suit how your dog likes to play. Ten focused minutes can be plenty." },
    ],
    featured_image: "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=1400&q=85",
    published_at: "2026-07-12T09:00:00-05:00",
    status: "published",
    category: category("back-at-home"),
    tags: [tag("enrichment"), tag("senior-dogs")],
  },
  {
    id: "post-004",
    title: "A quiet-park checklist for older dogs",
    slug: "quiet-park-checklist-older-dogs",
    excerpt: "A draft field note reserved for a future publishing workflow.",
    body: [{ type: "paragraph", text: "Draft sample content." }],
    featured_image: null,
    published_at: null,
    status: "draft",
    category: category("day-trips"),
    tags: [tag("senior-dogs")],
  },
];

export const publishedPosts = posts
  .filter((post) => post.status === "published")
  .sort((a, b) => (b.published_at ?? "").localeCompare(a.published_at ?? ""));

export const getPostBySlug = (slug: string) => publishedPosts.find((post) => post.slug === slug);
export const getPostsByCategory = (slug: string) => publishedPosts.filter((post) => post.category.slug === slug);
export const getPostsByTag = (slug: string) => publishedPosts.filter((post) => post.tags.some((item) => item.slug === slug));
