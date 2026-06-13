import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio Case Studies",
  description:
    "Explore product-management case studies covering consumer growth, research, strategy, experimentation, and AI-native products.",
  alternates: { canonical: "/portfolio" },
  openGraph: {
    title: "Portfolio Case Studies | Growth in Practice",
    description:
      "Product case studies built in public across consumer growth, experimentation, and AI-native product work.",
    url: "/portfolio",
  },
};

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return children;
}
