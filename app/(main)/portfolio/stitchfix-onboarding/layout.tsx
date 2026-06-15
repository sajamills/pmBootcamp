import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "StitchFix Onboarding Reimagined",
  description:
    "A product case study covering an adaptive style-profile flow, interactive 3D avatar, user journey, and complete PRD ticket ledger.",
  alternates: { canonical: "/portfolio/stitchfix-onboarding" },
  openGraph: {
    title: "StitchFix Onboarding Reimagined | Growth in Practice",
    description:
      "An adaptive, animated apparel onboarding flow with a persistent interactive 3D avatar.",
    url: "/portfolio/stitchfix-onboarding",
  },
};

export default function StitchFixCaseStudyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

