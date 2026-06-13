"use client";

import Link from "next/link";
import { curriculum, totalDays, totalTasks } from "@/data/curriculum";
import { useProgress } from "@/contexts/ProgressContext";
import { calculateStreak, calculatePace } from "@/lib/stats";

export default function Home() {
  const { progress, isOwner } = useProgress();

  const completedCount = Object.keys(progress.completedTasks).length;
  const pct = Math.round((completedCount / totalTasks) * 100);
  const streak = calculateStreak(progress.completedTasks);
  const pace = calculatePace(progress, totalTasks);

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
    <div className="px-5 sm:px-6 md:px-8 xl:px-12 pt-20 pb-12 md:py-16 max-w-4xl">
      {/* Hero */}
      <div className="mb-10">
        <p className="font-mono text-xs text-terracotta tracking-[0.2em] uppercase mb-3">
          Growth in Practice · Building in public
        </p>
        <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tight leading-[1.05] mb-4">
          Real product thinking.
          <br />
          <span className="text-forest">Built in public.</span>
        </h1>
        <p className="text-lg md:text-xl text-ink/80 max-w-xl leading-relaxed">
          Practical analysis of consumer growth, experimentation, and AI-native
          products — grounded in real operating experience.
        </p>
        <p className="text-sm text-ink/60 max-w-xl mt-3 leading-relaxed">
          I&apos;m a former marketplace founder translating 7+ years of
          end-to-end ownership into the language and evidence industry product
          teams recognize. The current series documents that work in public.
        </p>
        <div className="flex flex-wrap gap-3 mt-6">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-forest text-paper font-display font-semibold text-sm hover:bg-forest/90 transition-colors"
          >
            See my latest work →
          </Link>
          <Link
            href="#roadmap"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md border border-line text-ink/70 font-display font-semibold text-sm hover:border-forest hover:text-forest transition-colors"
          >
            Explore the current series ↓
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center px-2 py-2 text-ink/60 font-display font-semibold text-sm hover:text-forest transition-colors"
          >
            Why I built this →
          </Link>
        </div>
      </div>

      {/* Visitor orientation */}
      <section className="border border-line bg-card rounded-lg p-6 mb-8 notebook-margin pl-8">
        <p className="font-mono text-xs text-terracotta tracking-[0.16em] uppercase mb-2">
          The current series
        </p>
        <h2 className="font-display font-semibold text-xl mb-2">
          A 10-week product sprint from learning to published work.
        </h2>
        <p className="text-ink/75 leading-relaxed max-w-2xl">
          Growth in Practice turns product thinking into visible work. Each
          week combines focused learning, hands-on analysis, and a substantial
          portfolio deliverable that connects founder experience to industry
          product roles.
        </p>
        <div className="grid sm:grid-cols-3 gap-4 mt-5">
          {[
            ["01 · Learn", "Daily lessons and hands-on PM exercises."],
            ["02 · Build", "One portfolio-ready deliverable each week."],
            ["03 · Publish", "Progress and completed work shared publicly."],
          ].map(([title, description]) => (
            <div key={title} className="border-t border-line pt-3">
              <h3 className="font-display font-semibold text-sm text-forest">{title}</h3>
              <p className="text-sm text-ink/65 mt-1 leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Progress card */}
      <div className="bg-card border border-line rounded-lg p-6 mb-10 notebook-margin pl-8">
        <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
          <h2 className="font-display font-semibold text-lg">
            {isOwner ? "Your Series Progress" : "Current Series Progress"}
          </h2>
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
            {isOwner
              ? "You haven't logged a task yet. Start with Day 1."
              : "The current series begins with Week 1, Day 1."}
          </p>
        ) : (
          <div className="space-y-2">
            <p className="text-ink/70">
              {isOwner
                ? `${pct}% through the series. Pick up where you left off:`
                : `${pct}% through the series. See what I'm working on now:`}
            </p>
            <div className="flex flex-wrap gap-4 pt-1">
              {streak > 0 && (
                <span className="font-mono text-xs text-terracotta">
                  🔥 {streak}-day streak
                </span>
              )}
              {pace && (
                <span className="font-mono text-xs text-ink/60">
                  ~{pace.tasksPerDay} tasks/day · finish in ~{pace.weeksLeft} week{pace.weeksLeft !== 1 ? "s" : ""}
                </span>
              )}
            </div>
          </div>
        )}
        <Link
          href={`/week/${nextWeek.week}#day-${nextDay.day}`}
          className="inline-flex items-center gap-2 mt-3 font-display font-semibold text-forest hover:gap-3 transition-all"
        >
          {isOwner ? "Continue" : "Current focus"}: Week {nextWeek.week}, Day {nextDay.day} →
        </Link>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-12">
        <div className="border border-line rounded-lg p-3 sm:p-4 text-center">
          <p className="font-mono text-2xl font-medium text-forest">{curriculum.length}</p>
          <p className="font-mono text-[0.65rem] uppercase tracking-wider text-ink/60 mt-1">Weeks</p>
        </div>
        <div className="border border-line rounded-lg p-3 sm:p-4 text-center">
          <p className="font-mono text-2xl font-medium text-forest">{totalDays}</p>
          <p className="font-mono text-[0.65rem] uppercase tracking-wider text-ink/60 mt-1">Days</p>
        </div>
        <div className="border border-line rounded-lg p-3 sm:p-4 text-center">
          <p className="font-mono text-2xl font-medium text-forest">{totalTasks}</p>
          <p className="font-mono text-[0.65rem] uppercase tracking-wider text-ink/60 mt-1">Tasks</p>
        </div>
      </div>

      {/* Week overview */}
      <h2 id="roadmap" className="font-display font-semibold text-2xl mb-4 scroll-mt-8">
        Explore the current series
      </h2>
      <div className="space-y-3 mb-12">
        {curriculum.map((week) => {
          const weekTaskIds = week.days.flatMap((d) => d.tasks.map((t) => t.id));
          const weekDone = weekTaskIds.filter((id) => progress.completedTasks[id]).length;

          return (
            <Link
              key={week.week}
              href={`/week/${week.week}`}
              className="block border border-line bg-paper rounded-lg p-4 hover:border-forest hover:bg-card transition-colors group"
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
                  <p className="text-xs text-ink/60 mt-2 font-mono">
                    📦 {week.portfolioDeliverable}
                  </p>
                </div>
                <span className="font-mono text-xs text-ink/60 shrink-0">
                  {weekDone}/{weekTaskIds.length}
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* How to use */}
      <div className="border-t border-line pt-8">
        <h2 className="font-display font-semibold text-xl mb-3">
          {isOwner ? "How to manage the series" : "How to explore Growth in Practice"}
        </h2>
        <ul className="space-y-2 text-ink/80 leading-relaxed">
          {isOwner ? (
            <>
              <li>Spend 1–2 hours working through each day&apos;s lessons and tasks.</li>
              <li>Sign in to check off tasks and update the public progress shown here.</li>
              <li>Add a public link when each weekly portfolio deliverable is ready.</li>
            </>
          ) : (
            <>
              <li>Open any week to see the lessons, exercises, and advanced challenges.</li>
              <li>Use the current-focus link above to follow the work in progress.</li>
              <li>Visit the <Link href="/portfolio" className="text-forest underline">portfolio</Link> to review completed deliverables.</li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}
