"use client";

import { useState } from "react";
import Link from "next/link";
import { curriculum } from "@/data/curriculum";
import { dayZero } from "@/data/day-zero";
import { useProgress } from "@/contexts/ProgressContext";
import { absoluteUrl, siteName } from "@/lib/site";

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
  const portfolioJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${siteName} Portfolio Case Studies`,
    description:
      "Product case studies covering consumer growth, research, strategy, experimentation, and AI-native product work.",
    url: absoluteUrl("/portfolio"),
    hasPart: [
      {
        "@type": "CreativeWork",
        name: dayZero.title,
        description: dayZero.summary,
        url: absoluteUrl(dayZero.href),
        position: 0,
      },
      ...deliverables.map(({ week, link }) => ({
        "@type": "CreativeWork",
        name: week.portfolioDeliverable,
        description: week.goal,
        url: link || absoluteUrl(`/week/${week.week}`),
        position: week.week,
      })),
    ],
  };

  return (
    <div className="px-5 sm:px-6 md:px-8 xl:px-12 pt-20 pb-12 md:py-16 max-w-6xl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(portfolioJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <p className="font-mono text-xs text-terracotta tracking-[0.2em] uppercase mb-2">
        Portfolio
      </p>
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-3">
        <h1 className="font-display text-3xl md:text-5xl font-bold tracking-tight">
          {isOwner ? "Your case studies" : "Portfolio case studies"}
        </h1>
        {isOwner && (
          <Link
            href="/share"
            className="self-start shrink-0 sm:mt-2 inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-forest text-paper font-display font-semibold text-sm hover:bg-forest/90 transition-colors"
          >
            Share with recruiters →
          </Link>
        )}
      </div>
      <p className="text-lg text-ink/80 max-w-2xl leading-relaxed mb-2">
        {isOwner
          ? "Every week ends with a portfolio-ready deliverable. Paste a public link for each one — that's what recruiters see on your share page."
          : "Every week ends with a portfolio-ready deliverable. Explore the completed case studies and follow the work still in progress."}
      </p>
      <p className="font-mono text-sm text-forest mb-10">
        {completedDeliverables} / {curriculum.length} complete ·{" "}
        {linkedDeliverables} / {curriculum.length} {isOwner ? "linked" : "published"}
      </p>

      <Link
        href={dayZero.href}
        className="group block border border-forest bg-card rounded-lg p-5 sm:p-6 mb-6 hover:bg-paper transition-colors"
      >
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="max-w-3xl">
            <p className="font-mono text-[0.65rem] uppercase tracking-wider text-terracotta mb-1">
              {dayZero.label} · Foundation case study
            </p>
            <h2 className="font-display font-semibold text-xl group-hover:text-forest transition-colors">
              {dayZero.title}
            </h2>
            <p className="text-sm text-ink/70 mt-2 leading-relaxed">
              {dayZero.summary}
            </p>
          </div>
          <span className="stamp shrink-0">✓ Shipped</span>
        </div>
        <p className="font-display text-sm font-semibold text-forest mt-5 pt-4 border-t border-line">
          Read the foundation case study →
        </p>
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {deliverables.map(({ week, done, deliverableTasks, link }) => (
          <div
            key={week.week}
            className={`border rounded-lg p-4 sm:p-5 flex flex-col min-w-0 ${done ? "border-forest bg-card" : "border-line bg-card"}`}
          >
            <div className="flex flex-col gap-3 flex-1">
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
              <div className="shrink-0 flex">
                {done ? (
                  <span className="stamp">✓ Complete</span>
                ) : (
                  <span className="font-mono text-[0.65rem] uppercase tracking-wider text-ink/60">
                    Not started
                  </span>
                )}
              </div>
            </div>
            <Link
              href={`/week/${week.week}#day-${deliverableTasks[0] ? week.days.find((d) => d.tasks.includes(deliverableTasks[0]))?.day : week.days[week.days.length - 1].day}`}
              className="inline-block mt-4 pt-4 border-t border-line font-display text-sm font-semibold text-forest hover:underline"
            >
              {isOwner
                ? done
                  ? "Review task →"
                  : "Go to task →"
                : done
                  ? "See how it was built →"
                  : "Explore the curriculum →"}
            </Link>
          </div>
        ))}
      </div>

      <div className="border-t border-line pt-8 mt-10">
        <h2 className="font-display font-semibold text-xl mb-3">
          {isOwner ? "Publishing tips" : "How the portfolio is built"}
        </h2>
        <ul className="space-y-2 text-ink/80 leading-relaxed">
          {isOwner ? (
            <>
              <li>Use Notion or a Google Doc per deliverable, then share the public link.</li>
              <li>For UX audits and Figma work, embed a Figma share link or export screenshots.</li>
              <li>Group all 10 links into one master &ldquo;Growth in Practice Portfolio&rdquo; doc to share with recruiters.</li>
              <li>Reference these in your resume Projects section and in outreach messages (Week 10).</li>
            </>
          ) : (
            <>
              <li>Each week focuses on a different core product-management skill.</li>
              <li>Daily lessons and exercises build toward one substantial weekly deliverable.</li>
              <li>Completed deliverables are linked here as they are published.</li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}
