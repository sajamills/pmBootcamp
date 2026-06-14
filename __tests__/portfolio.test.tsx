import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import PortfolioPage from "@/app/(main)/portfolio/page";
import { curriculum } from "@/data/curriculum";

vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: React.ComponentProps<"a">) => (
    <a href={String(href)} {...props}>
      {children}
    </a>
  ),
}));

vi.mock("@/contexts/ProgressContext", () => ({
  useProgress: () => ({
    progress: { completedTasks: {} },
    isOwner: false,
    setLink: vi.fn(),
  }),
}));

describe("PortfolioPage", () => {
  it("renders every weekly case study in a responsive 1/2/3-column grid", () => {
    const { container } = render(<PortfolioPage />);
    const grid = container.querySelector(".grid.grid-cols-1");

    expect(grid).toHaveClass("md:grid-cols-2", "xl:grid-cols-3");
    expect(screen.getAllByText(/Week \d{2}/)).toHaveLength(curriculum.length);
  });

  it("uses visitor-facing portfolio language", () => {
    render(<PortfolioPage />);
    expect(
      screen.getByRole("heading", { level: 1, name: "Portfolio case studies" })
    ).toBeVisible();
    expect(screen.queryByText("Share with recruiters →")).not.toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: "Building Growth in Practice" })
    ).toBeVisible();
  });
});
