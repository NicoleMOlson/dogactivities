import type { Metadata } from "next";
import Link from "next/link";
import { EmailSignup } from "../components/EmailSignup";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <main className="page-shell about-page">
      <section className="about-hero">
        <div className="paper-card about-copy">
          <p className="eyebrow">About this notebook</p>
          <h1>Good days don’t need a complicated itinerary.</h1>
          <p className="large-copy">Out &amp; About is a place for realistic dog adventures: a nearby trail, a quieter park, a rainy-day idea, or a better-packed bag.</p>
          <p>The advice here comes from paying attention, changing the plan when needed, and treating the dog’s experience as part of the destination.</p>
          <Link className="button button-dark" href="/">Browse the field notes</Link>
        </div>
        <figure className="polaroid about-photo">
          <img src="https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=1200&q=85" alt="A relaxed dog outside in soft sunlight" />
          <figcaption>Chief route inspector</figcaption>
        </figure>
      </section>
      <section className="values-row">
        <div><span>01</span><h2>Useful over perfect</h2><p>Plans that work in real life, including the muddy and slightly late parts.</p></div>
        <div><span>02</span><h2>Dog-paced</h2><p>Comfort, curiosity, age, and energy get a vote in every outing.</p></div>
        <div><span>03</span><h2>Room to wander</h2><p>Enough preparation to relax, with enough flexibility to follow a good sniff.</p></div>
      </section>
      <EmailSignup />
    </main>
  );
}
