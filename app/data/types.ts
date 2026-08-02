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

export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "list"; items: string[] }
  | { type: "quote"; text: string };

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
};
