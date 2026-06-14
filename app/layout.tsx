import type { Metadata } from "next";
import { IBM_Plex_Mono, Source_Serif_4, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import ThemeToggle from "@/components/ThemeToggle";
import { ProgressProvider } from "@/contexts/ProgressContext";
import { siteDescription, siteName, siteUrl } from "@/lib/site";

const displayFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display-family",
});

const bodyFont = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-body-family",
});

const monoFont = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono-family",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} — Consumer Growth & AI Product Thinking`,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  alternates: { canonical: "/" },
  openGraph: {
    title: `${siteName} — Consumer Growth & AI Product Thinking`,
    description: siteDescription,
    url: "/",
    siteName,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} — Consumer Growth & AI Product Thinking`,
    description: siteDescription,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.getItem("pm-field-log-theme") === "light") {
                  document.documentElement.classList.remove("dark");
                }
              } catch {}
            `,
          }}
        />
      </head>
      <body
        className={`${displayFont.variable} ${bodyFont.variable} ${monoFont.variable} antialiased`}
      >
        <ProgressProvider>
          <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1 min-w-0">{children}</main>
          </div>
          <div className="mobile-theme-toggle lg:hidden fixed top-4 right-4 z-50 w-28">
            <ThemeToggle />
          </div>
        </ProgressProvider>
      </body>
    </html>
  );
}
