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

export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "list"; items: string[] }
  | { type: "quote"; text: string }
  | { type: "image"; image: MediaAsset }
  | { type: "links"; title: string; items: { label: string; href: string }[] };

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
};
