import Link from "next/link";
import { EmailSignup } from "./components/EmailSignup";
import { PostCard } from "./components/PostCard";
import { publishedPosts } from "./data/posts";

export default function Home() {
  const [leadPost, ...morePosts] = publishedPosts;

  return (
    <main>
      <section className="hero page-shell">
        <div className="hero-copy paper-card taped-card">
          <p className="eyebrow">Field notes for better days outside</p>
          <h1>More sniffing.<br />Better weekends.</h1>
          <p className="hero-deck">
            Trail-tested outings, low-stress adventures, and honest notes on
            making the most of life with a dog in tow.
          </p>
          <Link className="button button-dark" href={`/posts/${leadPost.slug}`}>
            Read the latest field note <span aria-hidden="true">→</span>
          </Link>
        </div>

        <Link className="hero-photo polaroid" href={`/posts/${leadPost.slug}`}>
          <img src={leadPost.featured_image ?? ""} alt={leadPost.featured_image_alt ?? "Featured field note"} />
          <span className="polaroid-caption">{leadPost.title}</span>
        </Link>

        <div className="route-marker" aria-hidden="true">
          <span>START HERE</span>
          <strong>GO!</strong>
        </div>
      </section>

      <section className="page-shell latest-section" aria-labelledby="latest-heading">
        <div className="section-heading paper-strip">
          <div>
            <p className="eyebrow">Fresh from the field</p>
            <h2 id="latest-heading">Recent notes</h2>
          </div>
          <p>Practical ideas, small discoveries, and muddy-paw debriefs.</p>
        </div>

        <div className="post-grid">
          {morePosts.map((post, index) => (
            <PostCard key={post.id} post={post} index={index} />
          ))}
        </div>
      </section>

      <section className="page-shell intro-grid">
        <div className="about-note paper-card">
          <p className="eyebrow">THE HUMANS BEHIND THE LEASH</p>
          <h2>Hi! Join us, we have treats.</h2>
          <p>
            We&apos;ve taken our pups all over to find the best places to spend
            time traveling with your furry friend. From walking trails right
            in your neighborhood to your new favorite patio, we&apos;ve made the
            plans so you don&apos;t have to stress.
          </p>
          <Link className="text-link" href="/about">A little more about us →</Link>
        </div>
        <EmailSignup />
      </section>
    </main>
  );
}
