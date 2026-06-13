import type { Progress } from "./progress";

const KEY = "pm-bootcamp-progress";

// Module-level in-memory fallback for local dev without KV configured
const devStore = new Map<string, unknown>();

function isKVConfigured() {
  return !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
}

export async function getProgressFromKV(): Promise<Progress> {
  if (!isKVConfigured()) {
    return (devStore.get(KEY) as Progress) ?? { completedTasks: {} };
  }
  const { kv } = await import("@vercel/kv");
  const data = await kv.get<Progress>(KEY);
  return data ?? { completedTasks: {} };
}

export async function saveProgressToKV(progress: Progress): Promise<void> {
  if (!isKVConfigured()) {
    devStore.set(KEY, progress);
    return;
  }
  const { kv } = await import("@vercel/kv");
  await kv.set(KEY, progress);
}
