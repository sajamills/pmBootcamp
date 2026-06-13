import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import { ProgressProvider } from "@/contexts/ProgressContext";

export const metadata: Metadata = {
  title: "PM Field Log — 10-Week Self Bootcamp",
  description: "A self-directed product management bootcamp tracker and portfolio builder.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ProgressProvider>
          <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1 min-w-0">{children}</main>
          </div>
        </ProgressProvider>
      </body>
    </html>
  );
}
