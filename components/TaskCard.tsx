"use client";

import { useState } from "react";
import { Task } from "@/data/curriculum";
import { useProgress } from "@/contexts/ProgressContext";

const typeLabels: Record<Task["type"], { label: string; color: string }> = {
  lesson: { label: "Lesson", color: "text-forest" },
  task: { label: "Task", color: "text-terracotta" },
  deliverable: { label: "Deliverable", color: "text-ink" },
  challenge: { label: "Advanced Challenge", color: "text-terracotta" },
};

export default function TaskCard({ task }: { task: Task }) {
  const { progress, toggle, isOwner } = useProgress();
  const [justCompleted, setJustCompleted] = useState(false);

  const done = !!progress.completedTasks[task.id];
  const meta = typeLabels[task.type];
  const isChallenge = task.type === "challenge";
  const completionDate = progress.completedTasks[task.id];
  const formattedCompletionDate = completionDate
    ? new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        timeZone: "UTC",
      }).format(new Date(completionDate))
    : null;

  const handleToggle = async () => {
    await toggle(task.id);
    if (!done) {
      setJustCompleted(true);
      setTimeout(() => setJustCompleted(false), 400);
    }
  };

  return (
    <div
      className={`border rounded-lg p-4 sm:p-5 transition-colors ${
        done
          ? "border-forest bg-card"
          : isChallenge
            ? "border-terracotta bg-card"
            : "border-line bg-card"
      }`}
    >
      <div className="flex items-start gap-3">
        {isOwner && (
          <button
            onClick={handleToggle}
            aria-pressed={done}
            aria-label={done ? `Mark "${task.title}" as not done` : `Mark "${task.title}" as done`}
            className={`mt-0.5 shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
              done ? "bg-forest border-forest text-paper" : "border-ink/30 hover:border-forest"
            }`}
          >
            {done && <span className="text-xs leading-none">✓</span>}
          </button>
        )}
        {!isOwner && done && (
          <span className="mt-0.5 shrink-0 w-5 h-5 rounded border-2 bg-forest border-forest text-paper flex items-center justify-center">
            <span className="text-xs leading-none">✓</span>
          </span>
        )}

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className={`font-mono text-[0.65rem] uppercase tracking-wider ${meta.color}`}>
              {meta.label}
            </span>
            {done && (
              <span className={`stamp ${justCompleted ? "stamp-animate" : ""}`}>
                ✓ Logged
              </span>
            )}
            {formattedCompletionDate && (
              <span className="font-mono text-[0.6rem] text-ink/60">
                {formattedCompletionDate}
              </span>
            )}
          </div>
          <h3 className="font-display font-semibold text-base leading-snug">
            {task.title}
          </h3>
          <p className="text-sm text-ink/75 mt-1.5 leading-relaxed">{task.description}</p>

          {task.resources && task.resources.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {task.resources.map((r) => (
                <a
                  key={r.url}
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono text-forest underline underline-offset-2 hover:text-forest-light"
                >
                  {r.label} ↗
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
