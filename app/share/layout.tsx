import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Public Portfolio",
  description:
    "Follow the live progress and published deliverables from the Growth in Practice product series.",
  alternates: { canonical: "/share" },
  openGraph: {
    title: "Growth in Practice Public Portfolio",
    description:
      "Live progress and portfolio deliverables covering consumer growth, experimentation, and AI product thinking.",
    url: "/share",
  },
};

export default function ShareLayout({ children }: { children: React.ReactNode }) {
  return children;
}
