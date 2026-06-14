"use client";

import { useState } from "react";

type SubmitState = "idle" | "sending" | "sent" | "error";

export default function ContactForm() {
  const [state, setState] = useState<SubmitState>("idle");
  const [message, setMessage] = useState("");
  const [startedAt] = useState(() => Date.now());

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setState("sending");
    setMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          company: formData.get("company"),
          message: formData.get("message"),
          website: formData.get("website"),
          startedAt,
        }),
      });

      const body = await response.json();
      if (response.ok) {
        form.reset();
        setState("sent");
        setMessage("Thanks. Your note is in my inbox, and I’ll reply soon.");
        return;
      }
      setState("error");
      setMessage(body.error ?? "Something went wrong. Please try again.");
    } catch {
      setState("error");
      setMessage("The message could not be sent. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" aria-describedby="contact-status">
      <div className="grid sm:grid-cols-2 gap-4">
        <label className="font-display text-sm font-semibold">
          Name
          <input
            required
            name="name"
            autoComplete="name"
            maxLength={100}
            className="mt-1.5 w-full rounded-md border border-line bg-paper px-3 py-2.5 font-body font-normal focus:outline-none focus:border-forest"
          />
        </label>
        <label className="font-display text-sm font-semibold">
          Work email
          <input
            required
            type="email"
            name="email"
            autoComplete="email"
            maxLength={200}
            className="mt-1.5 w-full rounded-md border border-line bg-paper px-3 py-2.5 font-body font-normal focus:outline-none focus:border-forest"
          />
        </label>
      </div>
      <label className="block font-display text-sm font-semibold">
        Company or team
        <input
          name="company"
          autoComplete="organization"
          maxLength={150}
          className="mt-1.5 w-full rounded-md border border-line bg-paper px-3 py-2.5 font-body font-normal focus:outline-none focus:border-forest"
        />
      </label>
      <label className="block font-display text-sm font-semibold">
        What would you like to discuss?
        <textarea
          required
          name="message"
          rows={5}
          minLength={20}
          maxLength={3000}
          className="mt-1.5 w-full resize-y rounded-md border border-line bg-paper px-3 py-2.5 font-body font-normal focus:outline-none focus:border-forest"
        />
      </label>
      <label className="absolute -left-[9999px]" aria-hidden="true">
        Website
        <input name="website" tabIndex={-1} autoComplete="off" />
      </label>
      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={state === "sending"}
          className="rounded-md bg-forest px-5 py-2.5 font-display text-sm font-semibold text-paper transition-colors hover:bg-forest/90 disabled:opacity-60"
        >
          {state === "sending" ? "Sending…" : "Email me →"}
        </button>
        <p
          id="contact-status"
          aria-live="polite"
          className={`text-sm ${
            state === "error" ? "text-terracotta" : "text-forest"
          }`}
        >
          {message}
        </p>
      </div>
    </form>
  );
}
