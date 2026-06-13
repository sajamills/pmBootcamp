import { afterEach, describe, expect, it, vi } from "vitest";
import { calculatePace, calculateStreak } from "@/lib/stats";

describe("progress statistics", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("counts a streak ending today", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-06-13T12:00:00.000Z"));

    expect(
      calculateStreak({
        a: "2026-06-11T10:00:00.000Z",
        b: "2026-06-12T10:00:00.000Z",
        c: "2026-06-13T10:00:00.000Z",
      })
    ).toBe(3);
  });

  it("keeps a streak alive when the latest completion was yesterday", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-06-13T12:00:00.000Z"));

    expect(
      calculateStreak({
        a: "2026-06-11T10:00:00.000Z",
        b: "2026-06-12T10:00:00.000Z",
      })
    ).toBe(2);
  });

  it("returns zero for an inactive streak", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-06-13T12:00:00.000Z"));

    expect(calculateStreak({ a: "2026-06-10T10:00:00.000Z" })).toBe(0);
  });

  it("calculates pace and estimated time remaining", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-06-11T00:00:00.000Z"));

    const pace = calculatePace(
      {
        startDate: "2026-06-01T00:00:00.000Z",
        completedTasks: {
          a: "2026-06-01T00:00:00.000Z",
          b: "2026-06-02T00:00:00.000Z",
          c: "2026-06-03T00:00:00.000Z",
          d: "2026-06-04T00:00:00.000Z",
          e: "2026-06-05T00:00:00.000Z",
        },
      },
      10
    );

    expect(pace?.tasksPerDay).toBe(0.5);
    expect(pace?.weeksLeft).toBe(2);
  });

  it("does not calculate pace before work starts", () => {
    expect(calculatePace({ completedTasks: {} }, 10)).toBeNull();
  });
});
