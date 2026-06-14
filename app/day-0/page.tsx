import Link from "next/link";
import { dayZero } from "@/data/day-zero";

export default function DayZeroPage() {
  return (
    <article className="px-5 sm:px-6 md:px-8 xl:px-12 pt-20 pb-12 md:py-16 max-w-4xl">
      <p className="font-mono text-xs text-terracotta tracking-[0.2em] uppercase mb-3">
        {dayZero.label} · Portfolio foundation
      </p>
      <h1 className="font-display text-3xl md:text-5xl font-bold tracking-tight leading-tight mb-4">
        {dayZero.title}
      </h1>
      <p className="text-lg md:text-xl text-ink/80 leading-relaxed max-w-3xl">
        {dayZero.summary}
      </p>
      <p className="font-mono text-xs text-forest mt-4">
        Foundation shipped · {dayZero.completedOn}
      </p>

      <section className="border border-line bg-card rounded-lg p-5 sm:p-6 mt-10">
        <p className="font-mono text-xs text-terracotta tracking-[0.16em] uppercase mb-2">
          Today&apos;s POV
        </p>
        <h2 className="font-display font-semibold text-2xl mb-4">
          From PM bootcamp to a credible product story
        </h2>
        <div className="space-y-4 text-ink/80 leading-relaxed">
          <p>
            The site stopped feeling like a self-guided PM course and became a
            clearer expression of my product perspective. Reframing it as
            Growth in Practice created room to publish beyond coursework and
            show how I approach consumer growth, experimentation, AI-native
            products, and the transition from founder-level ownership into an
            industry product role.
          </p>
          <p>
            More than 300 applications and zero interviews exposed a translation
            problem. A resume and automated screening process could not fully
            communicate seven years of end-to-end founder experience. This
            portfolio makes that evidence visible through product decisions,
            shipped code, documented learning, and measurable progress.
          </p>
          <blockquote className="border-l-2 border-forest pl-4 text-ink font-display text-lg font-semibold">
            Growth in Practice is evidence that founder experience translates
            into disciplined product thinking.
          </blockquote>
        </div>
      </section>

      <section className="mt-10">
        <p className="font-mono text-xs text-terracotta tracking-[0.16em] uppercase mb-2">
          Codebase summary
        </p>
        <h2 className="font-display font-semibold text-2xl mb-4">
          A portfolio that also behaves like a product
        </h2>
        <p className="text-ink/80 leading-relaxed mb-5">
          Growth in Practice is a production Next.js application rather than a
          static collection of case studies. It combines a public portfolio,
          structured curriculum, owner-only publishing tools, progress storage,
          interactive visualization, SEO infrastructure, and automated quality
          checks.
        </p>
        <div className="flex flex-wrap gap-2">
          {dayZero.stack.map((item) => (
            <span
              key={item}
              className="rounded-full border border-line bg-card px-3 py-1.5 font-mono text-[0.65rem] uppercase tracking-wide text-ink/70"
            >
              {item}
            </span>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <p className="font-mono text-xs text-terracotta tracking-[0.16em] uppercase mb-2">
          Current status before Week 1
        </p>
        <h2 className="font-display font-semibold text-2xl mb-4">
          Foundation complete, learning series ready
        </h2>
        <ul className="grid sm:grid-cols-2 gap-3">
          {dayZero.status.map((item) => (
            <li
              key={item}
              className="border border-line bg-card rounded-lg p-4 text-sm text-ink/80 leading-relaxed"
            >
              <span className="font-mono text-forest mr-2" aria-hidden="true">
                ✓
              </span>
              {item}
            </li>
          ))}
        </ul>
      </section>

      <div className="border-t border-line mt-10 pt-6 flex flex-wrap gap-4">
        <Link
          href="/week/1"
          className="font-display font-semibold text-forest hover:underline"
        >
          Continue to Week 1 →
        </Link>
        <Link
          href="/portfolio"
          className="font-display font-semibold text-ink/70 hover:text-forest"
        >
          Back to portfolio
        </Link>
      </div>
    </article>
  );
}
