import Link from "next/link";
import ContactForm from "@/components/ContactForm";

const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL ?? "#contact";

const evidence = [
  {
    title: "Seven years of end-to-end ownership",
    description:
      "Built and operated a consumer marketplace across strategy, discovery, growth, operations, and execution.",
  },
  {
    title: "Growth and experimentation judgment",
    description:
      "Owned upper-funnel discovery and conversion, designed experiments, and worked from user behavior to measurable outcomes.",
  },
  {
    title: "Technical product fluency",
    description:
      "Built this production Next.js portfolio with authentication, persistence, Three.js, SEO, CI, accessibility, and browser testing.",
  },
  {
    title: "AI-native product perspective",
    description:
      "Focused on how AI changes workflows, activation, trust, evaluation, and product metrics beyond adding a chatbot.",
  },
];

const translation = [
  ["Founder ownership", "Product strategy, prioritization, and accountable execution"],
  ["Marketplace operations", "Cross-functional systems thinking and stakeholder alignment"],
  ["Customer acquisition", "Consumer growth, funnel analysis, activation, and conversion"],
  ["Building through ambiguity", "Discovery, rapid learning, and pragmatic roadmap decisions"],
  ["Shipping the portfolio", "Technical collaboration, QA judgment, and production ownership"],
];

export default function HireMePage() {
  return (
    <div className="px-5 sm:px-6 md:px-8 xl:px-12 pt-20 pb-12 md:py-16 max-w-5xl">
      <p className="font-mono text-xs text-terracotta tracking-[0.2em] uppercase mb-3">
        Recruiter overview
      </p>
      <div className="grid lg:grid-cols-[minmax(0,1.2fr)_minmax(18rem,0.8fr)] gap-8 items-start">
        <div>
          <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tight leading-[1.05]">
            Former founder.
            <br />
            <span className="text-forest">Industry product leader next.</span>
          </h1>
          <p className="text-lg md:text-xl text-ink/80 leading-relaxed mt-5 max-w-3xl">
            I&apos;m pursuing consumer growth and AI-native product roles where
            end-to-end ownership, marketplace judgment, and comfort with
            ambiguity are advantages.
          </p>
          <div className="flex flex-wrap gap-3 mt-6">
            <a
              href={calendlyUrl}
              target={calendlyUrl.startsWith("http") ? "_blank" : undefined}
              rel={calendlyUrl.startsWith("http") ? "noopener noreferrer" : undefined}
              className="rounded-md bg-forest px-5 py-2.5 font-display text-sm font-semibold text-paper hover:bg-forest/90 transition-colors"
            >
              Schedule a conversation →
            </a>
            <Link
              href="/portfolio"
              className="rounded-md border border-line px-5 py-2.5 font-display text-sm font-semibold text-ink/75 hover:border-forest hover:text-forest transition-colors"
            >
              Review portfolio
            </Link>
          </div>
        </div>
        <aside className="border border-forest bg-card rounded-lg p-5">
          <p className="font-mono text-[0.65rem] text-terracotta uppercase tracking-wider">
            Target roles
          </p>
          <ul className="mt-3 space-y-2 font-display font-semibold">
            <li>Consumer Growth Product Manager</li>
            <li>AI-Native Product Manager</li>
            <li>Marketplace Product Manager</li>
            <li>Zero-to-One Product Lead</li>
          </ul>
          <p className="text-sm text-ink/65 mt-4 leading-relaxed">
            Best fit: teams that value ownership, customer closeness, rapid
            experimentation, and practical technical fluency.
          </p>
        </aside>
      </div>

      <section className="mt-14">
        <p className="font-mono text-xs text-terracotta tracking-[0.16em] uppercase mb-2">
          Strongest evidence
        </p>
        <h2 className="font-display text-2xl font-semibold mb-5">
          What I would bring to the team
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {evidence.map((item) => (
            <div key={item.title} className="border border-line bg-card rounded-lg p-5">
              <h3 className="font-display font-semibold text-lg text-forest">
                {item.title}
              </h3>
              <p className="text-sm text-ink/75 mt-2 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-14">
        <p className="font-mono text-xs text-terracotta tracking-[0.16em] uppercase mb-2">
          Founder-skill translation
        </p>
        <h2 className="font-display text-2xl font-semibold mb-5">
          The work maps directly to product leadership
        </h2>
        <div className="border border-line rounded-lg overflow-hidden">
          {translation.map(([founder, product]) => (
            <div
              key={founder}
              className="grid md:grid-cols-[0.8fr_1.2fr] gap-2 md:gap-6 border-b last:border-b-0 border-line bg-card p-4"
            >
              <p className="font-display font-semibold">{founder}</p>
              <p className="text-sm text-ink/75">{product}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="mt-14 border border-line bg-card rounded-lg p-5 sm:p-7 scroll-mt-8">
        <p className="font-mono text-xs text-terracotta tracking-[0.16em] uppercase mb-2">
          Start a conversation
        </p>
        <h2 className="font-display text-2xl font-semibold mb-2">Email me</h2>
        <p className="text-ink/70 mb-6 max-w-2xl">
          Share the role, team, or product challenge you have in mind. I&apos;ll
          reply with the most relevant experience and portfolio evidence.
        </p>
        <ContactForm />
      </section>
    </div>
  );
}
