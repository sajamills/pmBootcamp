import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import StitchFixCaseStudyPage from "@/app/(main)/portfolio/stitchfix-onboarding/page";
import { stitchFixTicketPhases } from "@/data/stitchfix-case-study";

vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: React.ComponentProps<"a">) => (
    <a href={String(href)} {...props}>
      {children}
    </a>
  ),
}));

describe("StitchFixCaseStudyPage", () => {
  it("renders every ticket from both PRD phases", () => {
    render(<StitchFixCaseStudyPage />);

    const ticketCount = stitchFixTicketPhases.reduce(
      (total, phase) => total + phase.tickets.length,
      0
    );

    expect(
      screen.getByRole("heading", { level: 2, name: `All ${ticketCount} shipped tickets` })
    ).toBeVisible();
    expect(screen.getAllByText("Shipped")).toHaveLength(ticketCount);
  });

  it("shows the conditional activewear branch in the user flow", () => {
    render(<StitchFixCaseStudyPage />);

    expect(screen.getByText("Activewear sizes")).toBeVisible();
    expect(screen.getByText("If Active")).toBeVisible();
  });
});
