import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Day 0: Building Growth in Practice",
  description:
    "How Growth in Practice evolved from a PM tracker into a public product portfolio, including its codebase, product decisions, and launch status.",
  alternates: { canonical: "/day-0" },
  openGraph: {
    title: "Day 0: Building Growth in Practice",
    description:
      "The product, codebase, and positioning work behind the Growth in Practice portfolio.",
    url: "/day-0",
  },
};

export default function DayZeroLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
