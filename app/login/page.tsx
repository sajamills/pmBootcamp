"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useProgress } from "@/contexts/ProgressContext";

export default function LoginPage() {
  const [secret, setSecret] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { refreshProgress } = useProgress();

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
      await refreshProgress();
      router.replace("/");
    } else if (res.status === 429) {
      setError("Too many attempts. Try again in 15 minutes.");
    } else if (res.status === 401 || res.status === 403) {
      setError("Wrong secret.");
    } else {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-ink/5">
      <div className="w-full max-w-[400px] bg-card border border-line rounded-xl shadow-md p-8">
        <div className="mb-6">
          <h1 className="font-display font-bold text-xl">Growth in Practice</h1>
          <p className="font-mono text-xs text-terracotta uppercase tracking-widest mt-1">
            Owner access
          </p>
        </div>
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
            <p className="text-terracotta text-sm">{error}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full px-5 py-2.5 bg-forest text-paper font-display font-semibold rounded-md text-sm hover:bg-forest/90 transition-colors disabled:opacity-50"
          >
            {loading ? "Signing in…" : "Sign in →"}
          </button>
        </form>
      </div>
    </div>
  );
}
