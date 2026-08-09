import Link from "next/link";
import { PostCard } from "./PostCard";
import type { Post } from "../data/types";

export function ArchivePage({ type, name, posts }: { type: "Category" | "Tag"; name: string; posts: Post[] }) {
  const isTag = type === "Tag";

  return (
    <main className="page-shell archive-page">
      <header className="archive-header paper-card">
        <p className="eyebrow">{isTag ? "Super tag" : "Category"}</p>
        <h1>{isTag ? `More ${name} blogs` : name}</h1>
        <p>{posts.length} published {posts.length === 1 ? "blog" : "blogs"} {isTag ? `with the ${name} tag` : "in this category"}.</p>
        <Link className="text-link" href="/">← All blogs</Link>
      </header>
      <div className="post-grid archive-grid">
        {posts.map((post, index) => <PostCard post={post} index={index} key={post.id} />)}
      </div>
    </main>
  );
}
