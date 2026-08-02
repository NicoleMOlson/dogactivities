import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EmailSignup } from "../../components/EmailSignup";
import { getPostBySlug, publishedPosts } from "../../data/posts";
import type { ContentBlock } from "../../data/types";

export function generateStaticParams() { return publishedPosts.map((post) => ({ slug: post.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const post = getPostBySlug((await params).slug);
  return post ? { title: post.title, description: post.excerpt } : {};
}

function Block({ block }: { block: ContentBlock }) {
  if (block.type === "heading") return <h2>{block.text}</h2>;
  if (block.type === "quote") return <blockquote>{block.text}</blockquote>;
  if (block.type === "list") return <ul>{block.items.map((item) => <li key={item}>{item}</li>)}</ul>;
  return <p>{block.text}</p>;
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const post = getPostBySlug((await params).slug);
  if (!post) notFound();
  const date = new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric" }).format(new Date(post.published_at!));

  return (
    <main className="page-shell post-page">
      <Link className="back-link" href="/">← Back to field notes</Link>
      <article>
        <header className="post-header paper-card">
          <div className="card-meta post-meta">
            <Link className="category-label" href={`/categories/${post.category.slug}`}>{post.category.name}</Link>
            <time dateTime={post.published_at!}>{date}</time>
          </div>
          <h1>{post.title}</h1>
          <p>{post.excerpt}</p>
          <div className="tag-row">
            {post.tags.map((item) => <Link href={`/tags/${item.slug}`} key={item.id}>#{item.name}</Link>)}
          </div>
        </header>
        <figure className="post-featured polaroid"><img src={post.featured_image ?? ""} alt="" /></figure>
        <div className="post-body paper-card">
          {post.body.map((block, index) => <Block block={block} key={`${block.type}-${index}`} />)}
        </div>
      </article>
      <EmailSignup />
    </main>
  );
}
