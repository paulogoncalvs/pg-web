import { test } from "@playwright/test";

import { BasePage } from "@/tests/playwright/utils/basePage";

test.describe("HOMEPAGE WITH SIDEDRAWER OPEN", () => {
  test.beforeEach(async ({ page }) => {
    await page.clock.install();
    await page.clock.setFixedTime(new Date("2026-01-01T00:00:00Z"));
  });

  const langs = ["en", "pt"];

  for (const lang of langs) {
    test(`Home--sidedrawer-open (${lang})`, async ({ page }, testInfo) => {
      const colorScheme = testInfo.project.name.includes("dark") ? "dark" : "light";
      const testName = `Home--sidedrawer-open (${lang})`;
      const basePage = new BasePage(testName, page);
      const url = lang === "pt" ? "/pt/" : "/";

      await basePage.goto(url, colorScheme);
      await basePage.openSideDrawer();
      await basePage.takeScreenshot();
    });
  }
});
