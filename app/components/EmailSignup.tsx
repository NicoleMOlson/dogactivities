"use client";

import { FormEvent, useState } from "react";
import { getSupabaseClient } from "../lib/supabase";

type SubmissionState = "idle" | "loading" | "success" | "error";

const SUCCESS_MESSAGE = "You’re in the pack. We’ll be in touch soon.";
const ERROR_MESSAGE = "We couldn’t add you just now. Please try again in a moment.";

export function EmailSignup() {
  const [submissionState, setSubmissionState] = useState<SubmissionState>("idle");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (submissionState === "loading") return;

    const form = event.currentTarget;
    const email = new FormData(form).get("email");

    if (typeof email !== "string") {
      setSubmissionState("error");
      return;
    }

    setSubmissionState("loading");

    try {
      const { error } = await getSupabaseClient().rpc("newsletter_signup", {
        signup_email: email,
        signup_source: "dogactivities_homepage",
      });

      if (error) {
        setSubmissionState("error");
        return;
      }

      form.reset();
      setSubmissionState("success");
    } catch {
      setSubmissionState("error");
    }
  }

  const isLoading = submissionState === "loading";

  return (
    <div className="signup-card" id="newsletter">
      <span className="clip" aria-hidden="true" />
      <p className="eyebrow">Occasional trail mail</p>
      <h2>New notes, no barking inbox.</h2>
      <p>Get fresh outings and useful ideas when there’s something worth sharing.</p>
      <form onSubmit={submit} aria-busy={isLoading}>
        <label className="sr-only" htmlFor="email">Email address</label>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="you@example.com"
          autoComplete="email"
          required
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Joining…" : "Join the list"}
        </button>
      </form>
      {submissionState === "success" && (
        <p className="form-message" role="status">{SUCCESS_MESSAGE}</p>
      )}
      {submissionState === "error" && (
        <p className="form-message form-error" role="alert">{ERROR_MESSAGE}</p>
      )}
    </div>
  );
}
