import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Why a former marketplace founder created Growth in Practice to translate end-to-end ownership into visible product work.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Growth in Practice",
    description:
      "The story behind a former founder's public transition into an industry product role.",
    url: "/about",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
