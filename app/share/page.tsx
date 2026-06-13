import { curriculum, totalTasks } from "@/data/curriculum";
import { getProgressFromKV } from "@/lib/kv";
import { calculateStreak, calculatePace } from "@/lib/stats";

export const revalidate = 60; // refresh cached page every 60s

export default async function SharePage() {
  const progress = await getProgressFromKV();
  const completedCount = Object.keys(progress.completedTasks).length;
  const pct = Math.round((completedCount / totalTasks) * 100);
  const streak = calculateStreak(progress.completedTasks);
  const pace = calculatePace(progress, totalTasks);

  const deliverables = curriculum.map((week) => ({
    week,
    link: progress.portfolioLinks?.[String(week.week)] ?? "",
    done:
      week.days
        .flatMap((d) => d.tasks)
        .filter((t) => t.type === "deliverable")
        .every((t) => progress.completedTasks[t.id]) &&
      week.days.flatMap((d) => d.tasks).filter((t) => t.type === "deliverable")
        .length > 0,
  }));

  const linkedCount = deliverables.filter((d) => d.link).length;

  return (
    <div className="px-5 sm:px-6 md:px-8 xl:px-12 pt-20 pb-12 md:py-16 max-w-3xl">
      <p className="font-mono text-xs text-terracotta tracking-[0.2em] uppercase mb-3">
        Growth in Practice · Public Portfolio
      </p>
      <h1 className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">
        10 weeks. 50 days.
        <br />
        <span className="text-forest">One PM portfolio.</span>
      </h1>
      <p className="text-lg text-ink/80 leading-relaxed mb-8 max-w-xl">
        Real product thinking about consumer growth, experimentation, and
        AI-native products — built and published in public.
      </p>

      {/* Progress stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
        <div className="border border-line rounded-lg p-4 text-center">
          <p className="font-mono text-2xl font-medium text-forest">{pct}%</p>
          <p className="font-mono text-[0.65rem] uppercase tracking-wider text-ink/60 mt-1">
            Complete
          </p>
        </div>
        <div className="border border-line rounded-lg p-4 text-center">
          <p className="font-mono text-2xl font-medium text-forest">
            {completedCount}
          </p>
          <p className="font-mono text-[0.65rem] uppercase tracking-wider text-ink/60 mt-1">
            Tasks done
          </p>
        </div>
        <div className="border border-line rounded-lg p-4 text-center">
          <p className="font-mono text-2xl font-medium text-forest">
            {streak > 0 ? streak : "—"}
          </p>
          <p className="font-mono text-[0.65rem] uppercase tracking-wider text-ink/60 mt-1">
            Day streak
          </p>
        </div>
        <div className="border border-line rounded-lg p-4 text-center">
          <p className="font-mono text-2xl font-medium text-forest">
            {linkedCount}
          </p>
          <p className="font-mono text-[0.65rem] uppercase tracking-wider text-ink/60 mt-1">
            Deliverables
          </p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-10">
        <div className="flex justify-between font-mono text-xs text-ink/60 mb-1.5">
          <span>Progress</span>
          <span>
            {completedCount} / {totalTasks} tasks
          </span>
        </div>
        <div className="h-2 bg-paper rounded-full overflow-hidden border border-line">
          <div
            className="h-full bg-forest transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
        {pace && (
          <p className="font-mono text-xs text-ink/60 mt-1.5">
            ~{pace.tasksPerDay} tasks/day · ~{pace.weeksLeft} weeks remaining
          </p>
        )}
      </div>

      {/* Portfolio deliverables */}
      <h2 className="font-display font-semibold text-xl mb-4">
        Portfolio deliverables
      </h2>
      <div className="space-y-3 mb-12">
        {deliverables.map(({ week, link, done }) => (
          <div
            key={week.week}
            className={`border rounded-lg p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 ${
              done ? "border-forest bg-card" : "border-line bg-card"
            }`}
          >
            <div className="min-w-0">
              <p className="font-mono text-[0.6rem] text-terracotta uppercase tracking-wider mb-0.5">
                Week {week.week.toString().padStart(2, "0")}
              </p>
              <p className="font-display font-semibold text-sm leading-snug">
                {week.portfolioDeliverable}
              </p>
            </div>
            <div className="shrink-0">
              {link ? (
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-forest underline underline-offset-2 hover:opacity-70"
                >
                  View ↗
                </a>
              ) : done ? (
                <span className="font-mono text-xs text-forest">
                  ✓ Done
                </span>
              ) : (
                <span className="font-mono text-xs text-ink/60">
                  In progress
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* About */}
      <div className="border-t border-line pt-8">
        <h2 className="font-display font-semibold text-xl mb-3">About</h2>
        <p className="text-ink/80 leading-relaxed mb-3">
          I&apos;m a former founder with 7+ years building and running a
          consumer marketplace — owning upper-funnel discovery, growth
          experiments, strategy, and execution. I&apos;m now translating that
          end-to-end ownership into an industry product role.
        </p>
        <p className="text-ink/80 leading-relaxed">
          Growth in Practice makes that transferability visible. Every week
          pairs core PM fundamentals with a portfolio deliverable and an
          advanced challenge connecting classic skills to AI-native product
          management.
        </p>
      </div>
    </div>
  );
}
