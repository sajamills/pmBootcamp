"use client";

import { useState } from "react";
import Link from "next/link";
import { curriculum } from "@/data/curriculum";
import { useProgress } from "@/contexts/ProgressContext";

function LinkEditor({
  initial,
  onSave,
}: {
  initial: string;
  onSave: (url: string) => void;
}) {
  const [val, setVal] = useState(initial);
  const dirty = val !== initial;
  return (
    <div className="flex flex-col sm:flex-row gap-2 mt-3">
      <input
        type="url"
        value={val}
        onChange={(e) => setVal(e.target.value)}
        placeholder="Paste link to deliverable (Notion, Google Doc, Figma…)"
        className="w-full flex-1 text-xs font-mono border border-line rounded px-3 py-2 bg-paper focus:outline-none focus:border-forest min-w-0"
      />
      {dirty && (
        <button
          onClick={() => onSave(val)}
          className="text-xs font-mono px-3 py-2 bg-forest text-paper rounded hover:bg-forest/90 shrink-0 transition-colors"
        >
          Save
        </button>
      )}
    </div>
  );
}

export default function AdminPage() {
  const { progress, isOwner, setLink } = useProgress();

  if (!isOwner) {
    return (
      <div className="px-5 sm:px-6 md:px-8 xl:px-12 pt-20 pb-12 md:py-16 max-w-3xl">
        <h1 className="font-display font-bold text-2xl mb-4">Admin</h1>
        <p className="text-ink/70">
          This page is only accessible to the site owner.{" "}
          <Link href="/" className="text-forest underline">
            Go home
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="px-5 sm:px-6 md:px-8 xl:px-12 pt-20 pb-12 md:py-16 max-w-3xl">
      <h1 className="font-display font-bold text-2xl mb-2">Link manager</h1>
      <p className="text-ink/70 mb-8">
        Paste a public link for each deliverable. Links appear on the portfolio and share pages.
      </p>

      <div>
        {curriculum.map((week) => {
          const link = progress.portfolioLinks?.[String(week.week)] ?? "";
          return (
            <div key={week.week} className="border-b border-line py-5">
              <p className="font-mono text-xs text-terracotta uppercase tracking-wider">
                Week {week.week.toString().padStart(2, "0")}
              </p>
              <p className="font-display font-semibold mt-0.5">{week.portfolioDeliverable}</p>
              <LinkEditor
                initial={link}
                onSave={(url) => setLink(week.week, url)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
