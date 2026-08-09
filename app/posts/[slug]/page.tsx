import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EmailSignup } from "../../components/EmailSignup";
import { getPostBySlug, publishedPosts } from "../../data/posts";
import type { ContentBlock, FeaturedAmbassador, InlineLink } from "../../data/types";

export function generateStaticParams() { return publishedPosts.map((post) => ({ slug: post.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const post = getPostBySlug((await params).slug);
  return post ? { title: post.title, description: post.excerpt } : {};
}

function LinkedText({ text, links }: { text: string; links: InlineLink[] }) {
  if (!links.length) return text;
  const escaped = links
    .map((link) => link.text)
    .sort((a, b) => b.length - a.length)
    .map((value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const pieces = text.split(new RegExp(`(${escaped.join("|")})`, "gi"));
  return pieces.map((piece, index) => {
    const link = links.find((item) => item.text.toLocaleLowerCase() === piece.toLocaleLowerCase());
    return link
      ? <a className="inline-retailer-link" href={link.href} target="_blank" rel="noreferrer" key={`${piece}-${index}`}>{piece}</a>
      : piece;
  });
}

function Block({ block, links, ambassador }: { block: ContentBlock; links: InlineLink[]; ambassador?: FeaturedAmbassador }) {
  if (block.type === "heading") return block.level === 3
    ? <h3><LinkedText text={block.text} links={links} /></h3>
    : <h2 className={block.compact ? "compact-heading" : undefined}><LinkedText text={block.text} links={links} /></h2>;
  if (block.type === "quote") return <blockquote><LinkedText text={block.text} links={links} /></blockquote>;
  if (block.type === "list") return <ul>{block.items.map((item) => <li key={item}><LinkedText text={item} links={links} /></li>)}</ul>;
  if (block.type === "image") return (
    <figure className="post-inline-image">
      <img src={block.image.src} alt={block.image.alt} />
      <figcaption><LinkedText text={block.image.caption} links={links} /></figcaption>
    </figure>
  );
  if (block.type === "links") return (
    <>
      <section className="product-shelf" aria-labelledby="products-in-post">
        <div className="product-shelf-heading">
          <p className="eyebrow">Shop the field note</p>
          <h2 id="products-in-post">Things We’ve Sunk Our Teeth Into</h2>
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
      <div className="post-extras-row">
        <aside className="post-shopping" aria-labelledby="items-in-post">
          <h2 id="items-in-post">{block.title}</h2>
          <ul>{block.items.map((item) => <li key={item.href}><a href={item.href} target="_blank" rel="noreferrer">{item.label}<span aria-hidden="true"> ↗</span></a></li>)}</ul>
        </aside>
        {ambassador && (
          <aside className="featured-ambassador" aria-labelledby="featured-ambassador-name">
            <p className="eyebrow">Featured Ambassador</p>
            <img src={ambassador.photo} alt={ambassador.photo_alt} />
            <h2 id="featured-ambassador-name">{ambassador.name}</h2>
            <p>
              {ambassador.caption.split(ambassador.owner.name)[0]}
              <Link href={ambassador.owner.href}>{ambassador.owner.name}</Link>
              {ambassador.caption.split(ambassador.owner.name)[1]}
            </p>
            <div className="ambassador-links">
              <a className="profile-social-link" href={ambassador.instagram_url} target="_blank" rel="noreferrer" aria-label={`Follow ${ambassador.name} on Instagram`}>
                <span className="instagram-mark" aria-hidden="true" />
                <span>follow along on Instagram</span>
              </a>
              <span className="profile-social-link ambassador-future-link" aria-label={`Read more about ${ambassador.name}; coming soon`}>
                <span className="paw-mark" aria-hidden="true"><i /><i /><i /><i /></span>
                <span>read more about {ambassador.name}</span>
              </span>
            </div>
          </aside>
        )}
      </div>
    </>
  );
  return <p><LinkedText text={block.text} links={links} /></p>;
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
            <div className="post-labels">
              <Link className="category-label" href={`/categories/${post.category.slug}`}>{post.category.name}</Link>
              {post.tags
                .filter((item) => post.highlighted_tag_slugs?.includes(item.slug))
                .map((item) => <Link className="category-label" href={`/tags/${item.slug}`} key={item.id}>{item.name}</Link>)}
            </div>
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
          {post.featured_image_caption && <figcaption className="polaroid-caption"><LinkedText text={post.featured_image_caption} links={post.inline_links ?? []} /></figcaption>}
        </figure>
        <div className="post-body paper-card">
          {post.body.map((block, index) => <Block block={block} links={post.inline_links ?? []} ambassador={post.featured_ambassador} key={`${block.type}-${index}`} />)}
        </div>
      </article>
      <EmailSignup />
    </main>
  );
}
