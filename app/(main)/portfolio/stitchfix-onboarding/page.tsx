import Link from "next/link";
import {
  stitchFixCaseStudy,
  stitchFixFlow,
  stitchFixTicketPhases,
} from "@/data/stitchfix-case-study";

export default function StitchFixCaseStudyPage() {
  const ticketCount = stitchFixTicketPhases.reduce(
    (total, phase) => total + phase.tickets.length,
    0
  );

  return (
    <article className="px-5 sm:px-6 md:px-8 xl:px-12 pt-20 pb-12 md:py-16 max-w-6xl">
      <Link
        href="/portfolio"
        className="font-mono text-xs text-ink/55 hover:text-forest transition-colors"
      >
        ← Back to portfolio
      </Link>

      <header className="mt-8 max-w-4xl">
        <p className="font-mono text-xs text-terracotta tracking-[0.2em] uppercase mb-3">
          {stitchFixCaseStudy.eyebrow}
        </p>
        <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tight leading-[1.05]">
          {stitchFixCaseStudy.title}
        </h1>
        <p className="text-lg md:text-xl text-ink/80 leading-relaxed mt-5 max-w-3xl">
          {stitchFixCaseStudy.summary}
        </p>
        <div className="flex flex-wrap gap-3 mt-7">
          <a
            href={stitchFixCaseStudy.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-md bg-forest px-4 py-2.5 font-display font-semibold text-sm text-paper hover:bg-forest/90 transition-colors"
          >
            Explore live product ↗
          </a>
          <a
            href={stitchFixCaseStudy.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-md border border-line bg-card px-4 py-2.5 font-display font-semibold text-sm text-ink hover:border-forest hover:text-forest transition-colors"
          >
            View GitHub repository ↗
          </a>
        </div>
      </header>

      <section className="grid sm:grid-cols-3 gap-3 mt-10">
        {[
          ["Status", `Shipped ${stitchFixCaseStudy.shippedOn}`],
          ["Scope", `${ticketCount} completed PRD tickets`],
          ["Role", stitchFixCaseStudy.role],
        ].map(([label, value]) => (
          <div key={label} className="border border-line bg-card rounded-lg p-4">
            <p className="font-mono text-[0.65rem] uppercase tracking-wider text-terracotta">
              {label}
            </p>
            <p className="font-display font-semibold text-sm mt-2">{value}</p>
          </div>
        ))}
      </section>

      <section className="mt-14 grid lg:grid-cols-[1.15fr_0.85fr] gap-8">
        <div>
          <p className="font-mono text-xs text-terracotta tracking-[0.16em] uppercase mb-2">
            Product summary
          </p>
          <h2 className="font-display font-semibold text-3xl">
            Make a long questionnaire feel like progress
          </h2>
          <div className="space-y-4 text-ink/80 leading-relaxed mt-5">
            <p>
              Apparel onboarding asks users for a surprising amount of personal
              detail before delivering value. The product challenge was to make
              that effort feel purposeful: break the work into approachable
              decisions, explain progress, adapt when an answer creates a new
              need, and show the profile becoming more useful after every step.
            </p>
            <p>
              The experience uses motion and visual feedback to sustain momentum,
              local persistence to protect effort, and a conditional activewear
              branch to avoid irrelevant questions. On desktop, an interactive
              avatar turns abstract profile inputs into something visible and
              playful without interrupting the core task.
            </p>
          </div>
        </div>
        <div className="border-t-[3px] border-forest bg-forest/5 rounded-lg p-5">
          <p className="font-mono text-xs uppercase tracking-wider text-forest mb-3">
            Shipped outcomes
          </p>
          <ul className="space-y-3">
            {stitchFixCaseStudy.outcomes.map((outcome) => (
              <li key={outcome} className="flex gap-3 text-sm leading-relaxed">
                <span className="font-mono text-forest" aria-hidden="true">
                  ✓
                </span>
                <span>{outcome}</span>
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-2 mt-6 pt-5 border-t border-line">
            {stitchFixCaseStudy.stack.map((item) => (
              <span
                key={item}
                className="rounded-full border border-line bg-paper px-3 py-1.5 font-mono text-[0.6rem] uppercase tracking-wide text-ink/70"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-16" aria-labelledby="user-flow-title">
        <p className="font-mono text-xs text-terracotta tracking-[0.16em] uppercase mb-2">
          User flow
        </p>
        <h2 id="user-flow-title" className="font-display font-semibold text-3xl">
          One guided path, with one relevant branch
        </h2>
        <p className="text-ink/70 leading-relaxed mt-3 max-w-3xl">
          The journey stays linear until clothing intent creates a reason to ask
          a follow-up. Users who select Active see Step 7B; everyone else moves
          directly into visual style inspiration.
        </p>

        <ol className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-7">
          {stitchFixFlow.map((item, index) => (
            <li
              key={item.step}
              className={`relative rounded-lg border p-4 ${
                item.conditional
                  ? "border-terracotta bg-terracotta/5"
                  : "border-line bg-card"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <span
                  className={`font-mono text-xs ${
                    item.conditional ? "text-terracotta" : "text-forest"
                  }`}
                >
                  {item.step}
                </span>
                {item.conditional && (
                  <span className="font-mono text-[0.55rem] uppercase tracking-wider text-terracotta border border-terracotta/40 rounded px-2 py-0.5">
                    If Active
                  </span>
                )}
              </div>
              <h3 className="font-display font-semibold text-lg mt-4">
                {item.title}
              </h3>
              <p className="text-sm text-ink/65 leading-relaxed mt-1">
                {item.detail}
              </p>
              {index < stitchFixFlow.length - 1 && (
                <span
                  className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 font-mono text-forest bg-paper rounded-full px-1"
                  aria-hidden="true"
                >
                  →
                </span>
              )}
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-16" aria-labelledby="prd-title">
        <p className="font-mono text-xs text-terracotta tracking-[0.16em] uppercase mb-2">
          PRD ticket ledger
        </p>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
          <div>
            <h2 id="prd-title" className="font-display font-semibold text-3xl">
              All {ticketCount} shipped tickets
            </h2>
            <p className="text-ink/70 leading-relaxed mt-3 max-w-3xl">
              The product was delivered in two deliberate phases: first prove
              the complete adaptive onboarding journey, then layer in the
              persistent 3D visualization and summary improvements.
            </p>
          </div>
          <span className="stamp shrink-0 self-start md:self-auto">✓ Complete</span>
        </div>

        <div className="space-y-10 mt-9">
          {stitchFixTicketPhases.map((phase) => (
            <div key={phase.name}>
              <div className="border-l-2 border-forest pl-4 mb-4">
                <h3 className="font-display font-semibold text-xl">
                  {phase.name}
                </h3>
                <p className="text-sm text-ink/65 mt-1">{phase.summary}</p>
              </div>
              <ol className="grid md:grid-cols-2 gap-3">
                {phase.tickets.map((ticket) => (
                  <li
                    key={ticket.id}
                    className="border border-line bg-card rounded-lg p-4"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-mono text-[0.65rem] uppercase tracking-wider text-forest">
                        {ticket.id}
                      </span>
                      <span className="font-mono text-[0.55rem] uppercase tracking-wider text-forest">
                        Shipped
                      </span>
                    </div>
                    <h4 className="font-display font-semibold text-base mt-3">
                      {ticket.title}
                    </h4>
                    <p className="text-sm text-ink/65 leading-relaxed mt-1.5">
                      {ticket.description}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </section>

      <div className="border-t border-line mt-14 pt-6 flex flex-wrap gap-4">
        <a
          href={stitchFixCaseStudy.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-display font-semibold text-forest hover:underline"
        >
          Explore the live experience ↗
        </a>
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

