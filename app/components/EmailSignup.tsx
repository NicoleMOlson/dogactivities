"use client";

import { FormEvent, useState } from "react";

export function EmailSignup() {
  const [message, setMessage] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("You’re on the practice list! Email delivery will be connected before launch.");
    event.currentTarget.reset();
  }

  return (
    <div className="signup-card" id="newsletter">
      <span className="clip" aria-hidden="true" />
      <p className="eyebrow">Occasional trail mail</p>
      <h2>New notes, no barking inbox.</h2>
      <p>Get fresh outings and useful ideas when there’s something worth sharing.</p>
      <form onSubmit={submit}>
        <label className="sr-only" htmlFor="email">Email address</label>
        <input id="email" type="email" name="email" placeholder="you@example.com" required />
        <button type="submit">Join the list</button>
      </form>
      {message && <p className="form-message" role="status">{message}</p>}
      <small>Preview only—no subscriber database is connected.</small>
    </div>
  );
}
