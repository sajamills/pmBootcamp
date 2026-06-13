import { afterEach, describe, expect, it, vi } from "vitest";
import {
  getCompletionDate,
  getProgress,
  isTaskComplete,
  toggleTask,
} from "@/lib/progress";

describe("progress client", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("falls back to empty progress when the API request fails", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false }));
    await expect(getProgress()).resolves.toEqual({ completedTasks: {} });
  });

  it("returns progress from the API", async () => {
    const progress = { completedTasks: { task: "2026-06-13T00:00:00.000Z" } };
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: true, json: async () => progress })
    );
    await expect(getProgress()).resolves.toEqual(progress);
  });

  it("reports unauthorized task updates distinctly", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ status: 401, ok: false }));
    await expect(toggleTask("task")).rejects.toThrow("unauthorized");
  });

  it("reads task completion state and date", () => {
    const progress = { completedTasks: { task: "2026-06-13T00:00:00.000Z" } };
    expect(isTaskComplete("task", progress)).toBe(true);
    expect(isTaskComplete("missing", progress)).toBe(false);
    expect(getCompletionDate("task", progress)).toBe("2026-06-13T00:00:00.000Z");
    expect(getCompletionDate("missing", progress)).toBeNull();
  });
});
