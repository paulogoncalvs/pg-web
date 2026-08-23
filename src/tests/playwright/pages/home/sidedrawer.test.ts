import { test } from "@playwright/test";

import { Language } from "@/modules/language";
import { BasePage } from "@/tests/playwright/utils/basePage";

test.describe("HOMEPAGE WITH SIDEDRAWER OPEN", () => {
  test.beforeEach(async ({ page }) => {
    await page.clock.install();
    await page.clock.setFixedTime(new Date("2026-01-01T00:00:00Z"));
  });

  const langs = [Language.en, Language.pt];

  for (const lang of langs) {
    test(`Home--sidedrawer-open (${lang})`, async ({ page }, testInfo) => {
      const colorScheme = testInfo.project.name.includes("dark") ? "dark" : "light";
      const testName = `Home--sidedrawer-open (${lang})`;
      const basePage = new BasePage(testName, page);
      const url = lang === Language.pt ? `/${Language.pt}/` : "/";

      await basePage.goto(url, colorScheme);
      const viewport = page.viewportSize()!;

      await page.setViewportSize({ width: viewport.width, height: 800 });
      await page.waitForTimeout(200);
      await basePage.openSideDrawer();
      await basePage.takeScreenshot();
    });
  }
});
