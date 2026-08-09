import type { Metadata } from "next";
import Link from "next/link";
import { PostCard } from "../../components/PostCard";
import { getPostsByAmbassador } from "../../data/posts";

export const metadata: Metadata = {
  title: "Archie | Ambassador",
  description: "Meet Archie and browse his field notes, favorite finds, and social adventures.",
};

export default function ArchieProfilePage() {
  const posts = getPostsByAmbassador("archie");
  const products = Array.from(new Map(
    posts
      .flatMap((post) => post.body)
      .filter((block) => block.type === "links")
      .flatMap((block) => block.items)
      .map((item) => [item.href, item]),
  ).values());

  return (
    <main className="page-shell ambassador-page">
      <Link className="back-link" href="/about#archie">← Back to the pack</Link>

      <section className="paper-card ambassador-profile-hero">
        <figure className="ambassador-profile-photo">
          <img src="/archie-coffee.jpeg" alt="puppy sniffing a cup of coffee" />
          <figcaption>Archie loves visiting new spots and making sure mama&apos;s coffee is made just right.</figcaption>
        </figure>
        <div className="ambassador-profile-copy">
          <p className="eyebrow">Paws Welcome Ambassador</p>
          <h1>Archie</h1>
          <p className="ambassador-role">Cook County &amp; Lake County, Illinois</p>
          <p>Archie is the youngest member of the pack and a playful Mini Bernadoodle who has been an adventurer since day one. Follow his training, favorite finds, and excursions around Chicagoland.</p>
          <div className="ambassador-socials" aria-label="Archie on social media">
            <a className="profile-social-link" href="https://www.instagram.com/archibald_the_bernedoodle" target="_blank" rel="noreferrer">
              <span className="instagram-mark" aria-hidden="true" />
              <span>follow Archie on Instagram</span>
            </a>
            <span className="profile-social-link ambassador-future-link" aria-label="Archie’s TikTok link coming soon">
              <span className="paw-mark" aria-hidden="true"><i /><i /><i /><i /></span>
              <span>TikTok link coming soon</span>
            </span>
          </div>
        </div>
      </section>

      <section className="ambassador-posts" aria-labelledby="archie-posts-heading">
        <div className="section-heading paper-strip">
          <div>
            <p className="eyebrow">Archie was here</p>
            <h2 id="archie-posts-heading">Field notes featuring Archie</h2>
          </div>
          <p>Every adventure, training note, and favorite find Archie appears in.</p>
        </div>
        <div className="post-grid">
          {posts.map((post, index) => <PostCard post={post} index={index} key={post.id} />)}
        </div>
      </section>

      {products.length > 0 && (
        <section className="product-shelf ambassador-products" aria-labelledby="archie-products-heading">
          <p className="eyebrow ambassador-flag">Archie approved</p>
          <h2 id="archie-products-heading">Things We&apos;ve Sunk Our Teeth Into</h2>
          <p>Every product mentioned in a field note featuring Archie.</p>
          <div className="product-rail">
            {products.map((item) => (
              <a className="product-card" href={item.href} target="_blank" rel="noreferrer" key={item.href}>
                <img src={item.image} alt="" />
                <span className="product-retailer">{item.retailer}</span>
                <strong>{item.label}</strong>
                <span className="product-link">View product <span aria-hidden="true">↗</span></span>
              </a>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
