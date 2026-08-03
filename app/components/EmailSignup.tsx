"use client";

import { FormEvent, useState } from "react";
import { getSupabaseClient } from "../lib/supabase";

type SubmissionState = "idle" | "loading" | "success" | "error";

const SUCCESS_MESSAGE = "You’re in the pack. We’ll be in touch soon.";
const ERROR_MESSAGE = "We couldn’t add you just now. Please try again in a moment.";

export function EmailSignup() {
  const [submissionState, setSubmissionState] = useState<SubmissionState>("idle");
  const [errorMessage, setErrorMessage] = useState(ERROR_MESSAGE);

  function showSubmissionError(error: unknown) {
    const diagnostic = error instanceof Error
      ? error.message
      : typeof error === "object" && error !== null && "message" in error
        ? String(error.message)
        : "Unknown newsletter signup error";

    console.error("newsletter_signup failed", {
      message: diagnostic,
      code: typeof error === "object" && error !== null && "code" in error
        ? String(error.code)
        : undefined,
      details: typeof error === "object" && error !== null && "details" in error
        ? String(error.details)
        : undefined,
      hint: typeof error === "object" && error !== null && "hint" in error
        ? String(error.hint)
        : undefined,
    });

    setErrorMessage(import.meta.env.DEV ? `${ERROR_MESSAGE} (${diagnostic})` : ERROR_MESSAGE);
    setSubmissionState("error");
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (submissionState === "loading") return;

    const form = event.currentTarget;
    const email = new FormData(form).get("email");

    if (typeof email !== "string") {
      showSubmissionError(new Error("Email form value is missing."));
      return;
    }

    setSubmissionState("loading");

    try {
      const supabase = await getSupabaseClient();
      const { error } = await supabase.rpc("newsletter_signup", {
        signup_email: email,
        signup_source: "dogactivities_homepage",
      });

      if (error) {
        showSubmissionError(error);
        return;
      }

      form.reset();
      setSubmissionState("success");
    } catch (error) {
      showSubmissionError(error);
    }
  }

  const isLoading = submissionState === "loading";

  return (
    <div className="signup-card" id="newsletter">
      <span className="clip" aria-hidden="true" />
      <p className="eyebrow">Occasional trail mail</p>
      <h2>Join the pack.</h2>
      <p>Find new places to explore with your best friend and favorite humans.</p>
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
          {isLoading ? "Joining…" : "Woof"}
        </button>
      </form>
      {submissionState === "success" && (
        <p className="form-message" role="status">{SUCCESS_MESSAGE}</p>
      )}
      {submissionState === "error" && (
        <p className="form-message form-error" role="alert">{errorMessage}</p>
      )}
    </div>
  );
}
