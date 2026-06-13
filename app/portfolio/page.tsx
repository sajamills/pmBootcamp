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
    <div className="flex gap-2 mt-3">
      <input
        type="url"
        value={val}
        onChange={(e) => setVal(e.target.value)}
        placeholder="Paste link to deliverable (Notion, Google Doc, Figma…)"
        className="flex-1 text-xs font-mono border border-line rounded px-3 py-1.5 bg-paper focus:outline-none focus:border-forest min-w-0"
      />
      {dirty && (
        <button
          onClick={() => onSave(val)}
          className="text-xs font-mono px-3 py-1.5 bg-forest text-paper rounded hover:bg-forest/90 shrink-0 transition-colors"
        >
          Save
        </button>
      )}
    </div>
  );
}

export default function PortfolioPage() {
  const { progress, isOwner, setLink } = useProgress();

  const deliverables = curriculum.map((week) => {
    const deliverableTasks = week.days
      .flatMap((d) => d.tasks)
      .filter((t) => t.type === "deliverable");
    const done =
      deliverableTasks.every((t) => progress.completedTasks[t.id]) &&
      deliverableTasks.length > 0;
    const link = progress.portfolioLinks?.[String(week.week)] ?? "";
    return { week, done, deliverableTasks, link };
  });

  const completedDeliverables = deliverables.filter((d) => d.done).length;
  const linkedDeliverables = deliverables.filter((d) => d.link).length;

  return (
    <div className="px-6 md:px-12 py-12 md:py-16 max-w-4xl">
      <p className="font-mono text-xs text-terracotta tracking-[0.2em] uppercase mb-2">
        Portfolio
      </p>
      <div className="flex items-start justify-between gap-4 mb-3">
        <h1 className="font-display text-3xl md:text-5xl font-bold tracking-tight">
          Your case studies
        </h1>
        <Link
          href="/share"
          className="shrink-0 mt-2 inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-forest text-paper font-display font-semibold text-sm hover:bg-forest/90 transition-colors"
        >
          Share with recruiters →
        </Link>
      </div>
      <p className="text-lg text-ink/80 max-w-2xl leading-relaxed mb-2">
        Every week ends with a portfolio-ready deliverable. Paste a public link
        for each one — that&apos;s what recruiters see on your share page.
      </p>
      <p className="font-mono text-sm text-forest mb-10">
        {completedDeliverables} / {curriculum.length} complete ·{" "}
        {linkedDeliverables} / {curriculum.length} linked
      </p>

      <div className="space-y-4">
        {deliverables.map(({ week, done, deliverableTasks, link }) => (
          <div
            key={week.week}
            className={`border rounded-lg p-5 ${done ? "border-forest bg-forest/5" : "border-line bg-card"}`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <p className="font-mono text-[0.65rem] uppercase tracking-wider text-terracotta mb-1">
                  Week {week.week.toString().padStart(2, "0")}
                </p>
                <h2 className="font-display font-semibold text-lg">
                  {week.portfolioDeliverable}
                </h2>
                <p className="text-sm text-ink/70 mt-1">From: {week.theme}</p>

                {/* Link display / editor */}
                {isOwner ? (
                  <LinkEditor
                    initial={link}
                    onSave={(url) => setLink(week.week, url)}
                  />
                ) : link ? (
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 mt-3 text-xs font-mono text-forest underline underline-offset-2 hover:opacity-70"
                  >
                    View deliverable ↗
                  </a>
                ) : null}
              </div>
              <div className="shrink-0 flex flex-col items-end gap-2">
                {done ? (
                  <span className="stamp">✓ Logged</span>
                ) : (
                  <span className="font-mono text-[0.65rem] uppercase tracking-wider text-ink/40">
                    Not started
                  </span>
                )}
              </div>
            </div>
            <Link
              href={`/week/${week.week}#day-${deliverableTasks[0] ? week.days.find((d) => d.tasks.includes(deliverableTasks[0]))?.day : week.days[week.days.length - 1].day}`}
              className="inline-block mt-3 font-display text-sm font-semibold text-forest hover:underline"
            >
              {done ? "Review task →" : "Go to task →"}
            </Link>
          </div>
        ))}
      </div>

      <div className="border-t border-line pt-8 mt-10">
        <h2 className="font-display font-semibold text-xl mb-3">
          Publishing tips
        </h2>
        <ul className="space-y-2 text-ink/80 leading-relaxed">
          <li>
            Use Notion or a Google Doc per deliverable, then share the public
            link.
          </li>
          <li>
            For UX audits and Figma work, embed a Figma share link or export
            screenshots.
          </li>
          <li>
            Group all 10 links into one master &ldquo;PM Bootcamp
            Portfolio&rdquo; doc to share with recruiters.
          </li>
          <li>
            Reference these in your resume Projects section and in outreach
            messages (Week 10).
          </li>
        </ul>
      </div>
    </div>
  );
}
