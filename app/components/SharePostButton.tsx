"use client";

import { useState } from "react";

export function SharePostButton() {
  const [message, setMessage] = useState("");

  async function copyPostLink() {
    const url = new URL(window.location.href);
    url.search = "";
    url.hash = "";

    try {
      await navigator.clipboard.writeText(url.toString());
      setMessage("Link copied—ready to share.");
    } catch {
      setMessage("We couldn’t copy it automatically. Copy the address from your browser instead.");
    }
  }

  return (
    <section className="share-post-card" aria-labelledby="share-post-heading">
      <div>
        <p className="eyebrow">Share this field note</p>
        <h2 id="share-post-heading">Know someone who would love this?</h2>
      </div>
      <button className="button button-dark" type="button" onClick={copyPostLink}>
        Pass the sniff along
      </button>
      <p className="share-post-status" aria-live="polite">{message}</p>
    </section>
  );
}
