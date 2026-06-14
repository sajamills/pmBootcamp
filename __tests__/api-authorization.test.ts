import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  authValue: undefined as string | undefined,
  getProgress: vi.fn(),
  saveProgress: vi.fn(),
  setCookie: vi.fn(),
  deleteCookie: vi.fn(),
}));

vi.mock("next/headers", () => ({
  cookies: async () => ({
    get: () => (mocks.authValue ? { value: mocks.authValue } : undefined),
    set: mocks.setCookie,
    delete: mocks.deleteCookie,
  }),
}));

vi.mock("@/lib/kv", () => ({
  getProgressFromKV: mocks.getProgress,
  saveProgressToKV: mocks.saveProgress,
}));

import { POST as updateProgress } from "@/app/api/progress/route";
import { POST as updateLink } from "@/app/api/links/route";
import {
  DELETE as logout,
  POST as login,
} from "@/app/api/login/route";

function jsonRequest(path: string, body: unknown) {
  return new Request(`http://localhost${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

describe("write API authorization", () => {
  beforeEach(() => {
    process.env.WRITE_SECRET = "test-secret";
    mocks.authValue = undefined;
    mocks.getProgress.mockReset();
    mocks.saveProgress.mockReset();
    mocks.setCookie.mockReset();
    mocks.deleteCookie.mockReset();
  });

  it("rejects an incorrect login secret", async () => {
    const response = await login(jsonRequest("/api/login", { secret: "wrong" }) as never);
    expect(response.status).toBe(401);
    expect(mocks.setCookie).not.toHaveBeenCalled();
  });

  it("sets an owner cookie for the correct login secret", async () => {
    const response = await login(
      jsonRequest("/api/login", { secret: "test-secret" }) as never
    );
    expect(response.status).toBe(200);
    expect(mocks.setCookie).toHaveBeenCalledWith(
      "pm_auth",
      "test-secret",
      expect.objectContaining({ httpOnly: true, sameSite: "strict", path: "/" })
    );
  });

  it("rejects unauthorized progress updates", async () => {
    const response = await updateProgress(
      jsonRequest("/api/progress", { taskId: "w1d1-t1" }) as never
    );
    expect(response.status).toBe(401);
    expect(mocks.saveProgress).not.toHaveBeenCalled();
  });

  it("allows the owner to complete a task", async () => {
    mocks.authValue = "test-secret";
    mocks.getProgress.mockResolvedValue({ completedTasks: {} });

    const response = await updateProgress(
      jsonRequest("/api/progress", { taskId: "w1d1-t1" }) as never
    );
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.isOwner).toBe(true);
    expect(body.completedTasks["w1d1-t1"]).toBeDefined();
    expect(mocks.saveProgress).toHaveBeenCalledOnce();
  });

  it("rejects unauthorized portfolio-link updates", async () => {
    const response = await updateLink(
      jsonRequest("/api/links", { week: 1, url: "https://example.com" }) as never
    );
    expect(response.status).toBe(401);
    expect(mocks.saveProgress).not.toHaveBeenCalled();
  });

  it("allows the owner to save a portfolio link", async () => {
    mocks.authValue = "test-secret";
    mocks.getProgress.mockResolvedValue({ completedTasks: {} });

    const response = await updateLink(
      jsonRequest("/api/links", {
        week: 1,
        url: "https://example.com/case-study",
      }) as never
    );
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.portfolioLinks["1"]).toBe("https://example.com/case-study");
    expect(mocks.saveProgress).toHaveBeenCalledOnce();
  });

  it("clears the owner cookie on logout", async () => {
    const response = await logout();
    expect(response.status).toBe(200);
    expect(mocks.deleteCookie).toHaveBeenCalledWith("pm_auth");
  });
});
