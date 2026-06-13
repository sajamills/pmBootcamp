"use client";

import Link from "next/link";
import { curriculum, totalDays, totalTasks } from "@/data/curriculum";
import { useProgress } from "@/contexts/ProgressContext";

export default function Home() {
  const { progress } = useProgress();

  const completedCount = Object.keys(progress.completedTasks).length;
  const pct = Math.round((completedCount / totalTasks) * 100);

  // Find the first incomplete day to suggest as "today"
  let nextWeek = curriculum[0];
  let nextDay = curriculum[0].days[0];
  outer: for (const week of curriculum) {
    for (const day of week.days) {
      const allDone = day.tasks.every((t) => progress.completedTasks[t.id]);
      if (!allDone) {
        nextWeek = week;
        nextDay = day;
        break outer;
      }
    }
  }

  return (
    <div className="px-6 md:px-12 py-12 md:py-16 max-w-4xl">
      {/* Hero */}
      <div className="mb-12">
        <p className="font-mono text-xs text-terracotta tracking-[0.2em] uppercase mb-3">
          Entry 001 — Field Notebook
        </p>
        <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tight leading-[1.05] mb-4">
          10 weeks.
          <br />
          50 days.
          <br />
          <span className="text-forest">One PM portfolio.</span>
        </h1>
        <p className="text-lg md:text-xl text-ink/80 max-w-xl leading-relaxed">
          A self-directed bootcamp for breaking into Consumer & Growth product
          management — research, product sense, design audits, metrics, and
          roadmapping, documented daily.
        </p>
        <p className="text-sm text-ink/60 max-w-xl mt-3 leading-relaxed">
          7+ years running a consumer marketplace, 300+ applications, zero
          interviews. So I built this instead — public proof of how I think,
          with an AI-native lens baked into every week.
        </p>
        <div className="flex flex-wrap gap-3 mt-6">
          <Link
            href="/about"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md border border-forest text-forest font-display font-semibold text-sm hover:bg-forest hover:text-paper transition-colors"
          >
            The story →
          </Link>
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md border border-line text-ink/70 font-display font-semibold text-sm hover:border-forest hover:text-forest transition-colors"
          >
            View portfolio →
          </Link>
        </div>
      </div>

      {/* Progress card */}
      <div className="bg-card border border-line rounded-lg p-6 mb-10 notebook-margin pl-8">
        <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
          <h2 className="font-display font-semibold text-lg">Your Progress</h2>
          <span className="font-mono text-sm text-forest">
            {completedCount} / {totalTasks} tasks
          </span>
        </div>
        <div className="h-3 bg-paper rounded-full overflow-hidden border border-line mb-4">
          <div
            className="h-full bg-forest transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
        {completedCount === 0 ? (
          <p className="text-ink/70">
            Haven&apos;t logged a task yet. Start with Day 1 below.
          </p>
        ) : (
          <p className="text-ink/70">
            {pct}% through the bootcamp. Pick up where you left off:
          </p>
        )}
        <Link
          href={`/week/${nextWeek.week}#day-${nextDay.day}`}
          className="inline-flex items-center gap-2 mt-3 font-display font-semibold text-forest hover:gap-3 transition-all"
        >
          Continue: Week {nextWeek.week}, Day {nextDay.day} →
        </Link>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4 mb-12">
        <div className="border border-line rounded-lg p-4 text-center">
          <p className="font-mono text-2xl font-medium text-forest">{curriculum.length}</p>
          <p className="font-mono text-[0.65rem] uppercase tracking-wider text-ink/60 mt-1">Weeks</p>
        </div>
        <div className="border border-line rounded-lg p-4 text-center">
          <p className="font-mono text-2xl font-medium text-forest">{totalDays}</p>
          <p className="font-mono text-[0.65rem] uppercase tracking-wider text-ink/60 mt-1">Days</p>
        </div>
        <div className="border border-line rounded-lg p-4 text-center">
          <p className="font-mono text-2xl font-medium text-forest">{totalTasks}</p>
          <p className="font-mono text-[0.65rem] uppercase tracking-wider text-ink/60 mt-1">Tasks</p>
        </div>
      </div>

      {/* Week overview */}
      <h2 className="font-display font-semibold text-2xl mb-4">The Roadmap</h2>
      <div className="space-y-3 mb-12">
        {curriculum.map((week) => {
          const weekTaskIds = week.days.flatMap((d) => d.tasks.map((t) => t.id));
          const weekDone = weekTaskIds.filter((id) => progress.completedTasks[id]).length;

          return (
            <Link
              key={week.week}
              href={`/week/${week.week}`}
              className="block border border-line rounded-lg p-4 hover:border-forest hover:bg-card/50 transition-colors group"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-xs text-terracotta tracking-wider mb-1">
                    WEEK {week.week.toString().padStart(2, "0")} · DAYS {week.days[0].day}–{week.days[week.days.length - 1].day}
                  </p>
                  <h3 className="font-display font-semibold text-lg group-hover:text-forest transition-colors">
                    {week.theme}
                  </h3>
                  <p className="text-sm text-ink/70 mt-1">{week.goal}</p>
                  <p className="text-xs text-ink/50 mt-2 font-mono">
                    📦 {week.portfolioDeliverable}
                  </p>
                </div>
                <span className="font-mono text-xs text-ink/50 shrink-0">
                  {weekDone}/{weekTaskIds.length}
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* How to use */}
      <div className="border-t border-line pt-8">
        <h2 className="font-display font-semibold text-xl mb-3">How this works</h2>
        <ul className="space-y-2 text-ink/80 leading-relaxed">
          <li>Spend 1–2 hours/day working through that day&apos;s lessons and tasks.</li>
          <li>Check off each task as you complete it — your progress saves locally in this browser.</li>
          <li>Each task includes a draft social post prompt. Tweak it and post daily on LinkedIn/TikTok.</li>
          <li>End-of-week deliverables get added to your <Link href="/portfolio" className="text-forest underline">Portfolio</Link> page to show employers.</li>
        </ul>
      </div>
    </div>
  );
}
