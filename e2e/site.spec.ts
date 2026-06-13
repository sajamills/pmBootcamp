import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("publishes LinkedIn-compatible Open Graph metadata", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle(/Growth in Practice/);
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
    "content",
    /Growth in Practice/
  );
  await expect(page.locator('meta[property="og:description"]')).toHaveAttribute(
    "content",
    /consumer growth/i
  );
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
    "content",
    /opengraph-image/
  );
  await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
    "content",
    "summary_large_image"
  );
});

test("portfolio exposes case-study structured data and responsive cards", async ({
  page,
}) => {
  await page.goto("/portfolio");

  await expect(
    page.getByRole("heading", { level: 1, name: "Portfolio case studies" })
  ).toBeVisible();
  const structuredData = await page
    .locator('script[type="application/ld+json"]')
    .textContent();
  expect(structuredData).toContain("CollectionPage");
  await expect(page.getByText("Week 01")).toBeVisible();
});

test("primary pages have no automatically detectable accessibility violations", async ({
  page,
}) => {
  for (const path of ["/", "/about", "/portfolio", "/week/1"]) {
    await page.goto(path);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa"])
      .analyze();
    expect(results.violations, `${path}: ${JSON.stringify(results.violations)}`).toEqual([]);
  }
});

test("owner can sign in, update progress, and publish a portfolio link", async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "Shared owner workflow runs once");

  await page.goto("/login");
  await page.getByPlaceholder("Enter your secret").fill("e2e-secret");
  await page.getByRole("button", { name: "Sign in →" }).click();
  await expect(page).toHaveURL("/");

  await page.goto("/week/1");
  const progressBeforeToggle = await page.request.get("/api/progress");
  const wasCompleted = Boolean(
    (await progressBeforeToggle.json()).completedTasks["w1d1-t1"]
  );
  const taskButton = page.getByRole("button", {
    name: /Mark "Lesson: The PM role across company stages" as (done|not done)/,
  });
  await taskButton.click();
  await expect
    .poll(async () => {
      const response = await page.request.get("/api/progress");
      return Boolean((await response.json()).completedTasks["w1d1-t1"]);
    })
    .toBe(!wasCompleted);

  await page.goto("/portfolio");
  const portfolioUrl = `https://example.com/case-study-${Date.now()}`;
  const linkInput = page.getByPlaceholder(
    "Paste link to deliverable (Notion, Google Doc, Figma…)"
  ).first();
  await linkInput.fill(portfolioUrl);
  await page.getByRole("button", { name: "Save" }).first().click();

  await expect
    .poll(async () => {
      const response = await page.request.get("/api/progress");
      const progress = await response.json();
      return progress.portfolioLinks?.["1"];
    })
    .toBe(portfolioUrl);
});

test("mobile navigation opens and reaches the portfolio", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile", "Mobile-only navigation check");

  await page.goto("/");
  await page.getByRole("button", { name: "Toggle navigation" }).click();
  await page.getByRole("link", { name: "Portfolio →" }).click();
  await expect(page).toHaveURL("/portfolio");
});
