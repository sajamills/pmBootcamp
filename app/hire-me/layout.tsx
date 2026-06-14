import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hire Me",
  description:
    "A recruiter-focused overview of target product roles, strongest evidence, and the founder experience behind Growth in Practice.",
  alternates: { canonical: "/hire-me" },
  openGraph: {
    title: "Hire Me | Growth in Practice",
    description:
      "Former marketplace founder pursuing consumer growth and AI-native product roles.",
    url: "/hire-me",
  },
};

export default function HireMeLayout({ children }: { children: React.ReactNode }) {
  return children;
}
