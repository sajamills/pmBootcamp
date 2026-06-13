import { describe, expect, it } from "vitest";
import { curriculum, totalDays, totalTasks } from "@/data/curriculum";

describe("curriculum integrity", () => {
  it("contains ten sequential weeks and fifty sequential days", () => {
    expect(curriculum.map((week) => week.week)).toEqual(
      Array.from({ length: 10 }, (_, index) => index + 1)
    );
    expect(totalDays).toBe(50);
    expect(curriculum.flatMap((week) => week.days).map((day) => day.day)).toEqual(
      Array.from({ length: 50 }, (_, index) => index + 1)
    );
  });

  it("has unique task ids and one or more deliverables per week", () => {
    const tasks = curriculum.flatMap((week) =>
      week.days.flatMap((day) => day.tasks)
    );
    expect(new Set(tasks.map((task) => task.id)).size).toBe(totalTasks);

    for (const week of curriculum) {
      expect(
        week.days.flatMap((day) => day.tasks).some((task) => task.type === "deliverable")
      ).toBe(true);
    }
  });

  it("does not contain removed mySet discovery-assistant claims", () => {
    const copy = JSON.stringify(curriculum).toLowerCase();
    expect(copy).not.toContain("myset");
    expect(copy).not.toContain("claude-based discovery assistant");
  });
});
