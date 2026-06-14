import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("publishes LinkedIn-compatible Open Graph metadata", async ({ page }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });

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

test("growth system exposes interactive, accessible portfolio topics", async ({
  page,
}, testInfo) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });

  await expect(
    page.getByRole("heading", { name: "The Growth System" })
  ).toBeVisible();

  if (testInfo.project.name === "mobile") {
    await expect(
      page.getByRole("link", { name: "02 AI-Native Product" })
    ).toHaveAttribute("href", "/week/8");
    return;
  }

  await page.getByRole("button", { name: "AI-Native Product" }).click();
  await expect(
    page.getByText(
      "Product systems where AI changes the workflow, metrics, and user behavior."
    )
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "Explore →" })).toHaveAttribute(
    "href",
    "/week/8"
  );
});

test("portfolio exposes case-study structured data and responsive cards", async ({
  page,
}) => {
  await page.goto("/portfolio", { waitUntil: "domcontentloaded" });

  await expect(
    page.getByRole("heading", { level: 1, name: "Portfolio case studies" })
  ).toBeVisible();
  const structuredData = await page
    .locator('script[type="application/ld+json"]')
    .textContent();
  expect(structuredData).toContain("CollectionPage");
  await expect(page.getByText("Week 01")).toBeVisible();
});

test("recruiter landing page exposes scheduling and contact paths", async ({ page }) => {
  await page.goto("/hire-me", { waitUntil: "domcontentloaded" });

  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Former founder. Industry product leader next.",
    })
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Schedule a conversation →" })
  ).toBeVisible();
  await expect(page.getByRole("button", { name: "Email me →" })).toBeVisible();
});

test("primary pages have no automatically detectable accessibility violations", async ({
  page,
}) => {
  for (const path of ["/", "/about", "/day-0", "/hire-me", "/portfolio", "/week/1"]) {
    await page.goto(path, { waitUntil: "domcontentloaded" });
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

  await page.goto("/login", { waitUntil: "domcontentloaded" });
  await page.getByPlaceholder("Enter your secret").fill("e2e-secret");
  await page.getByRole("button", { name: "Sign in →" }).click();
  await expect(page).toHaveURL("/");

  await page.getByRole("link", { name: "W1 PM Foundations" }).click();
  await expect(page).toHaveURL("/week/1");
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

  await page.goto("/portfolio", { waitUntil: "domcontentloaded" });
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

  await page.goto("/", { waitUntil: "domcontentloaded" });
  await page.getByRole("button", { name: "Open navigation" }).click();
  await expect(page.getByRole("button", { name: "Close navigation" })).toBeVisible();
  await expect(page.locator("body")).toHaveCSS("overflow", "hidden");
  await expect(page.locator(".mobile-theme-toggle")).toBeHidden();
  const menuWidth = await page.locator("#site-navigation").evaluate(
    (element) => element.getBoundingClientRect().width
  );
  expect(menuWidth).toBe(page.viewportSize()?.width);
  await page.keyboard.press("Escape");
  await expect(page.getByRole("button", { name: "Open navigation" })).toBeVisible();
  await expect(page.locator(".mobile-theme-toggle")).toBeVisible();
  await page.getByRole("button", { name: "Open navigation" }).click();
  await page.getByRole("link", { name: "Portfolio →" }).click();
  await expect(page).toHaveURL("/portfolio");
});
