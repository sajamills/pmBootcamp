import Link from "next/link";
import { curriculum, totalDays, totalTasks } from "@/data/curriculum";

export default function AboutPage() {
  return (
    <div className="px-6 md:px-12 py-12 md:py-16 max-w-3xl">
      <p className="font-mono text-xs text-terracotta tracking-[0.2em] uppercase mb-2">
        About this project
      </p>
      <h1 className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-6 leading-tight">
        300+ applications. Zero interviews. Time to change the approach.
      </h1>

      <div className="space-y-5 text-lg leading-relaxed text-ink/85">
        <p>
          I&apos;ve spent 7+ years building and running a consumer marketplace
          — owning the upper-funnel discovery and conversion experience,
          running A/B experiments, and shipping an LLM-powered conversational
          assistant that helped users navigate decisions in real time. I know
          this work. But after 300+ applications for PM roles, I haven&apos;t
          landed a single interview.
        </p>
        <p>
          So instead of sending application #301 into the void, I built this:
          a self-directed, {curriculum.length}-week bootcamp that sharpens the
          exact skills hiring teams are screening for — and produces real,
          public proof of how I think. No certificate. No cohort. Just{" "}
          {totalDays} days, {totalTasks}+ lessons and tasks, documented
          publicly on LinkedIn and TikTok as I go.
        </p>
        <p>
          There&apos;s also a deliberate pivot here. AI is reshaping what
          product management looks like — and I&apos;ve already been living
          that shift, not just reading about it. This bootcamp doubles down on
          AI-native PM skills: designing LLM-powered features, building
          evaluation frameworks, auditing AI UX patterns, and roadmapping for
          systems that don&apos;t behave deterministically. Every week
          includes an advanced challenge that connects classic PM fundamentals
          to this AI-native lens.
        </p>
        <p>
          The goal isn&apos;t just to &quot;practice.&quot; It&apos;s to give
          the product world a way to see how I work — and to find the team
          that&apos;s looking for exactly this combination of marketplace
          experience and AI-native product thinking.
        </p>
      </div>

      <div className="border-t border-line mt-10 pt-8">
        <h2 className="font-display font-semibold text-xl mb-4">The structure</h2>
        <p className="text-ink/70 mb-4 text-sm">
          Each week pairs core PM fundamentals with an{" "}
          <span className="text-terracotta font-medium">advanced challenge</span>{" "}
          that pushes into AI-native product management.
        </p>
        <div className="space-y-2">
          {curriculum.map((week) => (
            <div key={week.week} className="flex gap-3 text-sm">
              <span className="font-mono text-forest shrink-0 w-16">
                Week {week.week.toString().padStart(2, "0")}
              </span>
              <span className="text-ink/80">{week.theme}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-line mt-10 pt-8 flex flex-wrap gap-4">
        <Link
          href="/"
          className="font-display font-semibold text-forest hover:underline"
        >
          ← Start the bootcamp
        </Link>
        <Link
          href="/portfolio"
          className="font-display font-semibold text-forest hover:underline"
        >
          View portfolio →
        </Link>
      </div>
    </div>
  );
}
