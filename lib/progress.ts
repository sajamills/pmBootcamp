export type Progress = {
  completedTasks: Record<string, string>; // taskId -> ISO date completed
  startDate?: string;
  isOwner?: boolean;
};

export async function getProgress(): Promise<Progress> {
  const res = await fetch("/api/progress");
  if (!res.ok) return { completedTasks: {} };
  return res.json();
}

export async function toggleTask(taskId: string): Promise<Progress> {
  const res = await fetch("/api/progress", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ taskId }),
  });
  if (res.status === 401) throw new Error("unauthorized");
  if (!res.ok) throw new Error("error");
  return res.json();
}

export function isTaskComplete(taskId: string, progress: Progress): boolean {
  return !!progress.completedTasks[taskId];
}

export function getCompletionDate(taskId: string, progress: Progress): string | null {
  return progress.completedTasks[taskId] || null;
}
