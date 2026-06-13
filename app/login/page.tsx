"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [secret, setSecret] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret }),
    });
    setLoading(false);
    if (res.ok) {
      router.push("/");
      router.refresh();
    } else {
      setError("Wrong secret.");
    }
  };

  return (
    <div className="px-5 sm:px-6 md:px-8 xl:px-12 pt-20 pb-12 md:py-16 max-w-md">
      <p className="font-mono text-xs text-terracotta tracking-[0.2em] uppercase mb-3">
        Owner access
      </p>
      <h1 className="font-display text-3xl font-bold mb-6 tracking-tight">Sign in</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="password"
          value={secret}
          onChange={(e) => setSecret(e.target.value)}
          placeholder="Enter your secret"
          autoFocus
          className="w-full border border-line rounded-md px-4 py-2.5 bg-paper font-mono text-sm focus:outline-none focus:border-forest"
        />
        {error && (
          <p className="text-terracotta text-sm font-mono">{error}</p>
        )}
        <button
          type="submit"
          disabled={loading}
          className="px-5 py-2.5 bg-forest text-paper font-display font-semibold rounded-md text-sm hover:bg-forest/90 transition-colors disabled:opacity-50"
        >
          {loading ? "Signing in…" : "Sign in →"}
        </button>
      </form>
    </div>
  );
}
