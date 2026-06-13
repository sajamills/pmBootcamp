import { curriculum } from "@/data/curriculum";
import { notFound } from "next/navigation";
import Link from "next/link";
import TaskCard from "@/components/TaskCard";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ week: string }>;
}): Promise<Metadata> {
  const { week: weekParam } = await params;
  const week = curriculum.find((item) => item.week === Number(weekParam));

  if (!week) return {};

  return {
    title: `Week ${week.week}: ${week.theme}`,
    description: week.goal,
    alternates: { canonical: `/week/${week.week}` },
    openGraph: {
      title: `Week ${week.week}: ${week.theme} | Growth in Practice`,
      description: week.goal,
      url: `/week/${week.week}`,
    },
  };
}

export function generateStaticParams() {
  return curriculum.map((w) => ({ week: w.week.toString() }));
}

export default async function WeekPage({
  params,
}: {
  params: Promise<{ week: string }>;
}) {
  const { week: weekParam } = await params;
  const weekNum = parseInt(weekParam, 10);
  const week = curriculum.find((w) => w.week === weekNum);

  if (!week) notFound();

  const prevWeek = curriculum.find((w) => w.week === weekNum - 1);
  const nextWeek = curriculum.find((w) => w.week === weekNum + 1);

  return (
    <div className="px-5 sm:px-6 md:px-8 xl:px-12 pt-20 pb-12 md:py-16 max-w-4xl">
      <p className="font-mono text-xs text-terracotta tracking-[0.2em] uppercase mb-2">
        Week {week.week.toString().padStart(2, "0")} · Days {week.days[0].day}–{week.days[week.days.length - 1].day}
      </p>
      <h1 className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-3">
        {week.theme}
      </h1>
      <p className="text-lg text-ink/80 max-w-2xl leading-relaxed mb-2">{week.goal}</p>
      <p className="text-sm font-mono text-forest mb-10">
        📦 Portfolio deliverable: {week.portfolioDeliverable}
      </p>

      <div className="space-y-10">
        {week.days.map((day) => (
          <section key={day.day} id={`day-${day.day}`} className="scroll-mt-20">
            <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 mb-4">
              <span className="font-mono text-sm text-forest font-medium">
                DAY {day.day.toString().padStart(2, "0")}
              </span>
              <h2 className="font-display font-semibold text-xl">{day.title}</h2>
            </div>
            <div className="space-y-3">
              {day.tasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          </section>
        ))}
      </div>

      <nav className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-12 pt-6 border-t border-line">
        {prevWeek ? (
          <Link href={`/week/${prevWeek.week}`} className="font-display font-medium text-forest hover:underline">
            ← Week {prevWeek.week}: {prevWeek.theme}
          </Link>
        ) : (
          <Link href="/" className="font-display font-medium text-forest hover:underline">
            ← Back home
          </Link>
        )}
        {nextWeek ? (
          <Link href={`/week/${nextWeek.week}`} className="font-display font-medium text-forest hover:underline text-right">
            Week {nextWeek.week}: {nextWeek.theme} →
          </Link>
        ) : (
          <Link href="/portfolio" className="font-display font-medium text-forest hover:underline text-right">
            View Portfolio →
          </Link>
        )}
      </nav>
    </div>
  );
}
