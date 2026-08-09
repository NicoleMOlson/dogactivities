export type Category = {
  id: string;
  name: string;
  slug: string;
  is_sample?: boolean;
};

export type Tag = {
  id: string;
  name: string;
  slug: string;
  is_sample?: boolean;
};

export type MediaAsset = {
  id: string;
  src: string;
  alt: string;
  caption: string;
  usages: { post_slug: string; placement: string }[];
};

export type InlineLink = { text: string; href: string };

export type FeaturedAmbassador = {
  name: string;
  profile_href: string;
  photo: string;
  photo_alt: string;
  caption: string;
  owner: { name: string; href: string };
  instagram_url: string;
};

export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string; level?: 2 | 3; compact?: boolean }
  | { type: "list"; items: string[] }
  | { type: "quote"; text: string }
  | { type: "image"; image: MediaAsset }
  | { type: "links"; title: string; items: { label: string; href: string; image: string; retailer: string }[] };

export type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  body: ContentBlock[];
  featured_image: string | null;
  published_at: string | null;
  status: "draft" | "published";
  category: Category;
  tags: Tag[];
  featured_image_alt?: string;
  featured_image_caption?: string;
  author?: { name: string; href: string };
  inline_links?: InlineLink[];
  highlighted_tag_slugs?: string[];
  featured_ambassador?: FeaturedAmbassador;
};
