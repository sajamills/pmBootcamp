"use client";

import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from "react";
import { getProgress, toggleTask, Progress } from "@/lib/progress";

type ProgressContextValue = {
  progress: Progress;
  toggle: (taskId: string) => Promise<void>;
  setLink: (week: number, url: string) => Promise<void>;
  isOwner: boolean;
};

const ProgressContext = createContext<ProgressContextValue>({
  progress: { completedTasks: {} },
  toggle: async () => {},
  setLink: async () => {},
  isOwner: false,
});

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<Progress>({ completedTasks: {} });

  useEffect(() => {
    getProgress().then(setProgress);
  }, []);

  const toggle = useCallback(async (taskId: string) => {
    try {
      const updated = await toggleTask(taskId);
      setProgress(updated);
    } catch (e: unknown) {
      if (e instanceof Error && e.message === "unauthorized") {
        window.location.href = "/login";
      }
    }
  }, []);

  const setLink = useCallback(async (week: number, url: string) => {
    const res = await fetch("/api/links", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ week, url }),
    });
    if (res.ok) setProgress(await res.json());
  }, []);

  return (
    <ProgressContext.Provider value={{ progress, toggle, setLink, isOwner: !!progress.isOwner }}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  return useContext(ProgressContext);
}
