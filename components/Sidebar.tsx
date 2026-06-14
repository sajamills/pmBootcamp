"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { curriculum, totalTasks } from "@/data/curriculum";
import { useProgress } from "@/contexts/ProgressContext";
import ThemeToggle from "@/components/ThemeToggle";

export default function Sidebar() {
  const pathname = usePathname();
  const { progress, isOwner } = useProgress();
  const [open, setOpen] = useState(false);

  const completedCount = Object.keys(progress.completedTasks).length;
  const pct = Math.round((completedCount / totalTasks) * 100);

  useEffect(() => {
    document.body.classList.toggle("mobile-menu-open", open);
    document.body.style.overflow = open ? "hidden" : "";

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.classList.remove("mobile-menu-open");
      document.body.style.overflow = "";
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setOpen(!open)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-ink text-paper rounded px-3 py-2 font-mono text-xs tracking-widest"
        aria-label={open ? "Close navigation" : "Open navigation"}
        aria-expanded={open}
        aria-controls="site-navigation"
      >
        {open ? "CLOSE" : "MENU"}
      </button>

      <aside
        id="site-navigation"
        className={`
          fixed lg:sticky top-0 h-dvh w-full lg:h-screen lg:w-72 shrink-0 bg-card lg:border-r border-line
          flex flex-col z-40 transition-transform duration-200
          ${open ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0
        `}
      >
        <div className="px-6 pb-6 pt-20 lg:p-6 border-b border-line">
          <Link href="/" className="block" onClick={() => setOpen(false)}>
            <h1 className="font-display font-bold text-xl tracking-tight leading-tight">
              Growth in Practice
            </h1>
            <p className="font-mono text-[0.65rem] text-forest mt-1 tracking-wider uppercase">
              Consumer Growth · AI · Product
            </p>
          </Link>

          <div className="mt-4">
            <div className="flex justify-between font-mono text-[0.65rem] text-ink/60 mb-1">
              <span>{isOwner ? "YOUR PROGRESS" : "SAM'S PROGRESS"}</span>
              <span>{completedCount}/{totalTasks} ({pct}%)</span>
            </div>
            <div className="h-2 bg-paper rounded-full overflow-hidden border border-line">
              <div
                className="h-full bg-forest transition-all duration-300"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>

          <Link
            href="/portfolio"
            onClick={() => setOpen(false)}
            className={`mt-4 block text-center font-mono text-xs tracking-widest uppercase py-2 rounded border transition-colors ${
              pathname === "/portfolio"
                ? "bg-forest text-paper border-forest"
                : "border-forest text-forest hover:bg-forest hover:text-paper"
            }`}
          >
            Portfolio →
          </Link>

          <Link
            href="/hire-me"
            onClick={() => setOpen(false)}
            className={`mt-2 block text-center font-mono text-xs tracking-widest uppercase py-2 rounded border transition-colors ${
              pathname === "/hire-me"
                ? "bg-terracotta text-paper border-terracotta"
                : "border-terracotta text-terracotta hover:bg-terracotta hover:text-paper"
            }`}
          >
            Hire me →
          </Link>

          <Link
            href="/about"
            onClick={() => setOpen(false)}
            className={`mt-2 block text-center font-mono text-xs tracking-widest uppercase py-2 rounded border transition-colors ${
              pathname === "/about"
                ? "bg-ink text-paper border-ink"
                : "border-line text-ink/60 hover:border-ink hover:text-ink"
            }`}
          >
            About
          </Link>
        </div>

        <nav className="flex-1 overflow-y-auto sidebar-scroll px-3 py-4">
          <Link
            href="/day-0"
            onClick={() => setOpen(false)}
            className={`mb-3 flex items-center justify-between px-3 py-2 rounded font-display text-sm font-medium transition-colors ${
              pathname === "/day-0"
                ? "bg-forest text-paper"
                : "border border-line hover:border-forest hover:bg-paper text-ink"
            }`}
          >
            <span className="flex items-center gap-2">
              <span className="font-mono text-xs">D0</span>
              Foundation
            </span>
            <span aria-hidden="true">✓</span>
          </Link>
          {curriculum.map((week) => {
            const weekTaskIds = week.days.flatMap((d) => d.tasks.map((t) => t.id));
            const weekDone = weekTaskIds.filter((id) => progress.completedTasks[id]).length;
            const weekComplete = weekDone === weekTaskIds.length;

            return (
              <div key={week.week} className="mb-2">
                <Link
                  href={`/week/${week.week}`}
                  onClick={() => setOpen(false)}
                  className={`flex items-center justify-between px-3 py-2 rounded font-display text-sm font-medium transition-colors ${
                    pathname?.startsWith(`/week/${week.week}`)
                      ? "bg-forest text-paper"
                      : "hover:bg-paper text-ink"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="font-mono text-xs">W{week.week}</span>
                    {week.theme}
                  </span>
                  {weekComplete && <span aria-hidden="true">✓</span>}
                </Link>
                <span className="sr-only">
                  {weekComplete ? "Week complete" : `${weekDone} of ${weekTaskIds.length} tasks complete`}
                </span>
              </div>
            );
          })}
        </nav>

        <div className="p-4 border-t border-line space-y-3">
          <ThemeToggle />
          {isOwner ? (
            <button
              onClick={async () => {
                await fetch("/api/login", { method: "DELETE" });
                window.location.reload();
              }}
              className="font-mono text-[0.6rem] text-ink/60 hover:text-terracotta transition-colors"
            >
              Sign out
            </button>
          ) : (
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="font-mono text-[0.6rem] text-ink/60 hover:text-forest transition-colors"
            >
              Admin
            </Link>
          )}
        </div>
      </aside>

    </>
  );
}
