import Link from "next/link";
import { PostCard } from "./PostCard";
import type { Post } from "../data/types";

export function ArchivePage({ type, name, posts }: { type: "Category" | "Tag"; name: string; posts: Post[] }) {
  return (
    <main className="page-shell archive-page">
      <header className="archive-header paper-card">
        <p className="eyebrow">{type} archive · sample taxonomy</p>
        <h1>{type === "Tag" ? "#" : ""}{name}</h1>
        <p>{posts.length} published {posts.length === 1 ? "field note" : "field notes"} in this collection.</p>
        <Link className="text-link" href="/">← All field notes</Link>
      </header>
      <div className="post-grid archive-grid">
        {posts.map((post, index) => <PostCard post={post} index={index} key={post.id} />)}
      </div>
    </main>
  );
}
