import Link from "next/link";
import type { Post } from "../data/types";

const formatDate = (value: string | null) => value
  ? new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(new Date(value))
  : "Draft";

export function PostCard({ post, index = 0 }: { post: Post; index?: number }) {
  return (
    <article className={`post-card card-tilt-${(index % 3) + 1}`}>
      <Link className="post-image" href={`/posts/${post.slug}`}>
        <img src={post.featured_image ?? ""} alt={post.featured_image_alt ?? ""} />
      </Link>
      <div className="post-card-body">
        <div className="card-meta">
          <div className="post-labels">
            <Link className="category-label" href={`/categories/${post.category.slug}`}>{post.category.name}</Link>
            {post.tags
              .filter((item) => post.highlighted_tag_slugs?.includes(item.slug))
              .map((item) => <Link className="category-label" href={`/tags/${item.slug}`} key={item.id}>{item.name}</Link>)}
          </div>
          <time dateTime={post.published_at ?? undefined}>{formatDate(post.published_at)}</time>
        </div>
        <h3><Link href={`/posts/${post.slug}`}>{post.title}</Link></h3>
        <p>{post.excerpt}</p>
        <div className="tag-row" aria-label="Post tags">
          {post.tags.map((item) => <Link href={`/tags/${item.slug}`} key={item.id}>#{item.name}</Link>)}
        </div>
        <Link className="text-link" href={`/posts/${post.slug}`}>Read field note →</Link>
      </div>
    </article>
  );
}
