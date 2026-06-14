type Accent = { border: string; bg: string; text: string };

const ACCENTS: Record<number, Accent> = {
  1: { border: "border-forest", bg: "bg-forest/5", text: "text-forest" },
  2: { border: "border-terracotta", bg: "bg-terracotta/5", text: "text-terracotta" },
  3: { border: "border-ink/40", bg: "bg-ink/[0.03]", text: "text-ink/70" },
  4: { border: "border-forest", bg: "bg-forest/5", text: "text-forest" },
  5: { border: "border-terracotta", bg: "bg-terracotta/5", text: "text-terracotta" },
  6: { border: "border-ink/40", bg: "bg-ink/[0.03]", text: "text-ink/70" },
  7: { border: "border-forest", bg: "bg-forest/5", text: "text-forest" },
  8: { border: "border-terracotta", bg: "bg-terracotta/5", text: "text-terracotta" },
  9: { border: "border-ink/40", bg: "bg-ink/[0.03]", text: "text-ink/70" },
  10: { border: "border-forest", bg: "bg-forest/5", text: "text-forest" },
};

export function weekAccent(week: number): Accent {
  return ACCENTS[week] ?? ACCENTS[1];
}
