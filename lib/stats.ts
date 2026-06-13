import type { Progress } from "./progress";

export function calculateStreak(completedTasks: Record<string, string>): number {
  const dates = new Set(
    Object.values(completedTasks).map((iso) => iso.slice(0, 10))
  );
  if (dates.size === 0) return 0;

  const today = new Date().toISOString().slice(0, 10);
  const yesterday = new Date(Date.now() - 86_400_000).toISOString().slice(0, 10);

  if (!dates.has(today) && !dates.has(yesterday)) return 0;

  let streak = 0;
  let check = dates.has(today) ? today : yesterday;
  while (dates.has(check)) {
    streak++;
    const d = new Date(check);
    d.setDate(d.getDate() - 1);
    check = d.toISOString().slice(0, 10);
  }
  return streak;
}

export function calculatePace(
  progress: Progress,
  totalTasks: number
): { tasksPerDay: number; weeksLeft: number; finishDate: Date } | null {
  const { startDate, completedTasks } = progress;
  const completedCount = Object.keys(completedTasks).length;
  if (!startDate || completedCount === 0) return null;

  const msPerDay = 86_400_000;
  const daysElapsed = Math.max(1, (Date.now() - new Date(startDate).getTime()) / msPerDay);
  const tasksPerDay = completedCount / daysElapsed;
  const remaining = totalTasks - completedCount;
  const daysLeft = remaining / tasksPerDay;
  const finishDate = new Date(Date.now() + daysLeft * msPerDay);

  return {
    tasksPerDay: Math.round(tasksPerDay * 10) / 10,
    weeksLeft: Math.ceil(daysLeft / 7),
    finishDate,
  };
}
