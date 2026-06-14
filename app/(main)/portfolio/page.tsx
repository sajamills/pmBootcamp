"use client";

import Link from "next/link";
import { curriculum } from "@/data/curriculum";
import { dayZero } from "@/data/day-zero";
import { useProgress } from "@/contexts/ProgressContext";
import { absoluteUrl, siteName } from "@/lib/site";
import { weekAccent } from "@/lib/weekAccents";

export default function PortfolioPage() {
  const { progress, isOwner } = useProgress();

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

  const completed = deliverables.filter((d) => d.done);
  const upcoming = deliverables.filter((d) => !d.done);
  const completedDeliverables = completed.length;
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
        Every week ends with a portfolio-ready deliverable. Explore the completed case studies and follow the work still in progress.
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

      {/* Completed section */}
      <div className="mb-10">
        <div className="flex items-baseline gap-3 mb-4">
          <h2 className="font-display font-semibold text-lg">Completed work</h2>
          <span className="font-mono text-xs text-ink/50">
            {completedDeliverables} of {curriculum.length} complete
          </span>
        </div>
        {completed.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {completed.map(({ week, deliverableTasks, link }) => {
              const accent = weekAccent(week.week);
              return (
                <div
                  key={week.week}
                  className={`border-t-[3px] ${accent.border} ${accent.bg} rounded-lg p-4 sm:p-5 flex flex-col min-w-0`}
                >
                  <div className="flex flex-col gap-3 flex-1">
                    <div className="flex-1 min-w-0">
                      <p className={`font-mono text-[0.65rem] uppercase tracking-wider ${accent.text} mb-1`}>
                        Week {week.week.toString().padStart(2, "0")}
                      </p>
                      <h2 className="font-display font-semibold text-lg">
                        {week.portfolioDeliverable}
                      </h2>
                      <p className="text-sm text-ink/60 mt-1">From: {week.theme}</p>
                      {link && (
                        <a
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 mt-3 bg-forest text-paper font-mono text-xs px-3 py-1.5 rounded hover:bg-forest/90"
                        >
                          View deliverable ↗
                        </a>
                      )}
                    </div>
                    <div className="shrink-0 flex">
                      <span className="stamp">✓ Complete</span>
                    </div>
                  </div>
                  <Link
                    href={`/week/${week.week}#day-${deliverableTasks[0] ? week.days.find((d) => d.tasks.includes(deliverableTasks[0]))?.day : week.days[week.days.length - 1].day}`}
                    className="inline-block mt-4 pt-4 border-t border-line font-display text-sm font-semibold text-forest hover:underline"
                  >
                    {isOwner ? "Review task →" : "See how it was built →"}
                  </Link>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-ink/60">
            Deliverables ship weekly — check back soon or follow the progress above.
          </p>
        )}
      </div>

      {/* Upcoming section */}
      <div>
        <div className="flex items-baseline gap-3 mb-4">
          <h2 className="font-display font-semibold text-lg">Upcoming</h2>
          <span className="font-mono text-xs text-ink/50">
            {upcoming.length} week{upcoming.length !== 1 ? "s" : ""} remaining
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {upcoming.map(({ week }) => {
            const accent = weekAccent(week.week);
            return (
              <div
                key={week.week}
                className="opacity-60 bg-paper border border-line rounded-lg p-4 sm:p-5 flex flex-col min-w-0"
              >
                <div className="flex flex-col gap-3 flex-1">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className={`font-mono text-[0.65rem] uppercase tracking-wider ${accent.text}`}>
                        Week {week.week.toString().padStart(2, "0")}
                      </p>
                      <span className="font-mono text-[0.6rem] uppercase tracking-wider text-ink/50 border border-line rounded px-2 py-0.5">
                        Coming soon
                      </span>
                    </div>
                    <h2 className="font-display font-semibold text-lg text-ink/50">
                      {week.portfolioDeliverable}
                    </h2>
                    <p className="text-sm text-ink/40 mt-1">From: {week.theme}</p>
                  </div>
                </div>
                <p className="font-mono text-xs text-ink/30 mt-4 pt-4 border-t border-line">
                  Estimated: Week {week.week} of 10
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Skills section */}
      <div className="mt-12">
        <div className="flex items-baseline">
          <h2 className="font-display font-semibold text-lg">Skills developed</h2>
          <span className="font-mono text-xs text-ink/50 ml-3">across 10 weeks</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
          {[
            { name: "Consumer Growth", desc: "Funnel analysis, activation, retention, and conversion frameworks" },
            { name: "User Research", desc: "Discovery, synthesis, and translating insight into product decisions" },
            { name: "Product Strategy", desc: "Roadmap prioritisation, opportunity sizing, and stakeholder alignment" },
            { name: "Experimentation", desc: "Hypothesis design, A/B testing, and reading results without bias" },
            { name: "AI-Native Products", desc: "Evaluation, trust, activation, and metrics for AI-powered features" },
            { name: "Product Communication", desc: "PRDs, specs, influence without authority, and executive narratives" },
          ].map((skill) => (
            <div key={skill.name} className="border border-line rounded-lg p-4 bg-card">
              <p className="font-display font-semibold text-sm">{skill.name}</p>
              <p className="text-xs text-ink/60 mt-1 leading-relaxed">{skill.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
