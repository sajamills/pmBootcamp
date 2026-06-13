import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import TaskCard from "@/components/TaskCard";

const useProgress = vi.fn();

vi.mock("@/contexts/ProgressContext", () => ({
  useProgress: () => useProgress(),
}));

const task = {
  id: "test-task",
  title: "Test the product idea",
  type: "task" as const,
  description: "Describe the test and expected outcome.",
};

describe("TaskCard", () => {
  beforeEach(() => {
    useProgress.mockReset();
  });

  it("does not show completion controls to public visitors", () => {
    useProgress.mockReturnValue({
      progress: { completedTasks: {} },
      toggle: vi.fn(),
      isOwner: false,
    });

    render(<TaskCard task={task} />);
    expect(screen.queryByRole("button", { name: /mark/i })).not.toBeInTheDocument();
    expect(screen.getByText(task.title)).toBeVisible();
  });

  it("shows completion controls to the owner", () => {
    useProgress.mockReturnValue({
      progress: { completedTasks: {} },
      toggle: vi.fn(),
      isOwner: true,
    });

    render(<TaskCard task={task} />);
    expect(screen.getByRole("button", { name: `Mark "${task.title}" as done` })).toBeVisible();
  });

  it("shows logged state and completion date for completed work", () => {
    useProgress.mockReturnValue({
      progress: { completedTasks: { [task.id]: "2026-06-13T00:00:00.000Z" } },
      toggle: vi.fn(),
      isOwner: false,
    });

    render(<TaskCard task={task} />);
    expect(screen.getByText("✓ Logged")).toBeVisible();
    expect(screen.getByText("Jun 13, 2026")).toBeVisible();
  });
});
