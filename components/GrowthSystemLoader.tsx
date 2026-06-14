"use client";

import Link from "next/link";
import { useEffect, useState, type ComponentType } from "react";

type GrowthSystemProps = {
  completedTasks: Record<string, string>;
  weekTaskIds: Record<number, string[]>;
};

const topics = [
  ["Consumer Growth", "/week/6"],
  ["AI-Native Product", "/week/8"],
  ["Experimentation", "/week/6"],
  ["Product Strategy", "/week/3"],
  ["Founder Experience", "/about"],
  ["User Research", "/week/2"],
];

function FastTopicMap() {
  return (
    <section
      aria-labelledby="growth-system-title"
      className="min-h-[24rem] lg:min-h-[30rem] rounded-xl border border-line bg-card p-4 flex flex-col"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-[0.6rem] text-terracotta uppercase tracking-[0.18em]">
            Interactive portfolio map
          </p>
          <h2 id="growth-system-title" className="font-display text-sm font-semibold mt-1">
            The Growth System
          </h2>
        </div>
        <span className="font-mono text-[0.55rem] text-ink/60 uppercase tracking-wider">
          Tap to explore
        </span>
      </div>
      <div className="grid grid-cols-2 gap-2 my-auto pt-8">
        {topics.map(([label, href], index) => (
          <Link
            key={label}
            href={href}
            className={`rounded-lg border p-3 font-display text-xs font-semibold transition-colors hover:border-forest hover:text-forest ${
              index === topics.length - 1
                ? "border-forest bg-paper text-forest"
                : "border-line bg-paper/60"
            }`}
          >
            <span className="block font-mono text-[0.55rem] text-terracotta mb-1">
              0{index + 1}
            </span>
            {label}
          </Link>
        ))}
      </div>
      <p className="text-xs text-ink/60 leading-relaxed">
        Six connected themes organize the work across the portfolio.
      </p>
    </section>
  );
}

export default function GrowthSystemLoader(props: GrowthSystemProps) {
  const [GrowthSystem, setGrowthSystem] =
    useState<ComponentType<GrowthSystemProps> | null>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const load = () => {
      void import("@/components/GrowthSystem3D").then((module) => {
        setGrowthSystem(() => module.default);
      });
    };

    if ("requestIdleCallback" in window) {
      const idleId = window.requestIdleCallback(load, { timeout: 1500 });
      return () => window.cancelIdleCallback(idleId);
    }

    const timeoutId = globalThis.setTimeout(load, 500);
    return () => globalThis.clearTimeout(timeoutId);
  }, []);

  return GrowthSystem ? <GrowthSystem {...props} /> : <FastTopicMap />;
}
