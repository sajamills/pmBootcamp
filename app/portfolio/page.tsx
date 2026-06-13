"use client";

import Link from "next/link";
import { curriculum } from "@/data/curriculum";
import { useProgress } from "@/contexts/ProgressContext";

export default function PortfolioPage() {
  const { progress } = useProgress();

  const deliverables = curriculum.map((week) => {
    const deliverableTasks = week.days
      .flatMap((d) => d.tasks)
      .filter((t) => t.type === "deliverable");
    const done = deliverableTasks.every((t) => progress.completedTasks[t.id]) && deliverableTasks.length > 0;
    return { week, done, deliverableTasks };
  });

  const completedDeliverables = deliverables.filter((d) => d.done).length;

  return (
    <div className="px-6 md:px-12 py-12 md:py-16 max-w-4xl">
      <p className="font-mono text-xs text-terracotta tracking-[0.2em] uppercase mb-2">
        Portfolio
      </p>
      <h1 className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-3">
        Your case studies
      </h1>
      <p className="text-lg text-ink/80 max-w-2xl leading-relaxed mb-2">
        Every week ends with a portfolio-ready deliverable. Use this page as your
        checklist — then publish the real documents (Notion, Google Docs, or a
        personal site) and link them here.
      </p>
      <p className="font-mono text-sm text-forest mb-10">
        {completedDeliverables} / {curriculum.length} deliverables complete
      </p>

      <div className="space-y-4">
        {deliverables.map(({ week, done, deliverableTasks }) => (
          <div
            key={week.week}
            className={`border rounded-lg p-5 ${done ? "border-forest bg-forest/5" : "border-line bg-card"}`}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-[0.65rem] uppercase tracking-wider text-terracotta mb-1">
                  Week {week.week.toString().padStart(2, "0")}
                </p>
                <h2 className="font-display font-semibold text-lg">
                  {week.portfolioDeliverable}
                </h2>
                <p className="text-sm text-ink/70 mt-1">
                  From: {week.theme}
                </p>
              </div>
              {done ? (
                <span className="stamp shrink-0">✓ Logged</span>
              ) : (
                <span className="font-mono text-[0.65rem] uppercase tracking-wider text-ink/40 shrink-0">
                  Not started
                </span>
              )}
            </div>
            <Link
              href={`/week/${week.week}#day-${deliverableTasks[0] ? week.days.find(d => d.tasks.includes(deliverableTasks[0]))?.day : week.days[week.days.length-1].day}`}
              className="inline-block mt-3 font-display text-sm font-semibold text-forest hover:underline"
            >
              {done ? "Review task →" : "Go to task →"}
            </Link>
          </div>
        ))}
      </div>

      <div className="border-t border-line pt-8 mt-10">
        <h2 className="font-display font-semibold text-xl mb-3">Publishing tips</h2>
        <ul className="space-y-2 text-ink/80 leading-relaxed">
          <li>Use Notion or a Google Doc per deliverable, then share the public link.</li>
          <li>For UX audits and Figma work, embed a Figma share link or export screenshots.</li>
          <li>Group all 10 links into one master &ldquo;PM Bootcamp Portfolio&rdquo; doc to share with recruiters.</li>
          <li>Reference these in your resume Projects section and in outreach messages (Week 10).</li>
        </ul>
      </div>
    </div>
  );
}
