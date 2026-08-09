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
  if (block.type === "heading") return block.level === 3 ? <h3>{block.text}</h3> : <h2>{block.text}</h2>;
  if (block.type === "quote") return <blockquote>{block.text}</blockquote>;
  if (block.type === "list") return <ul>{block.items.map((item) => <li key={item}>{item}</li>)}</ul>;
  if (block.type === "image") return (
    <figure className="post-inline-image">
      <img src={block.image.src} alt={block.image.alt} />
      <figcaption>{block.image.caption}</figcaption>
    </figure>
  );
  if (block.type === "links") return (
    <>
      <section className="product-shelf" aria-labelledby="products-in-post">
        <div className="product-shelf-heading">
          <p className="eyebrow">Shop the field note</p>
          <h2 id="products-in-post">Products in This Post</h2>
          <p>Scroll to browse every product mentioned above.</p>
        </div>
        <div className="product-rail">
          {block.items.map((item) => (
            <a className="product-card" href={item.href} target="_blank" rel="noreferrer" key={`product-${item.href}`}>
              <img src={item.image} alt="" />
              <span className="product-retailer">{item.retailer}</span>
              <strong>{item.label}</strong>
              <span className="product-link">View product <span aria-hidden="true">↗</span></span>
            </a>
          ))}
        </div>
      </section>
      <aside className="post-shopping" aria-labelledby="items-in-post">
        <h2 id="items-in-post">{block.title}</h2>
        <ul>{block.items.map((item) => <li key={item.href}><a href={item.href} target="_blank" rel="noreferrer">{item.label}<span aria-hidden="true"> ↗</span></a></li>)}</ul>
      </aside>
    </>
  );
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
          {post.author && <p className="post-author">By <Link href={post.author.href}>{post.author.name}</Link></p>}
          <div className="tag-row">
            {post.tags.map((item) => <Link href={`/tags/${item.slug}`} key={item.id}>#{item.name}</Link>)}
          </div>
        </header>
        <figure className="post-featured polaroid">
          <img src={post.featured_image ?? ""} alt={post.featured_image_alt ?? ""} />
          {post.featured_image_caption && <figcaption className="polaroid-caption">{post.featured_image_caption}</figcaption>}
        </figure>
        <div className="post-body paper-card">
          {post.body.map((block, index) => <Block block={block} key={`${block.type}-${index}`} />)}
        </div>
      </article>
      <EmailSignup />
    </main>
  );
}
