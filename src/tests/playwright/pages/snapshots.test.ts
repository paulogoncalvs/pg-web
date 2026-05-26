import { type Page, expect, test } from "@playwright/test";

import routesConfig from "@/config/routes";
import { stripEmojis, stripHashes } from "@/tests/playwright/utils";

class BasePage {
  private readonly page: Page;
  private readonly pageName: string;

  constructor(pageName: string, page: Page) {
    this.page = page;
    this.pageName = pageName;
  }

  public async goto(url: string, colorScheme: "dark" | "light"): Promise<void> {
    // Clear state BEFORE navigation
    await this.page.context().clearCookies();

    // Set color theme in localStorage so the inline script adds .dark/.light class to HTML
    await this.page.addInitScript((theme) => {
      localStorage.clear();
      sessionStorage.clear();
      localStorage.setItem("color-theme", theme);
    }, colorScheme);

    await this.page.goto(url, { waitUntil: "networkidle" });

    // Wait for the app to hydrate (look for the header which is rendered by JS)
    await this.page.waitForSelector("header", { timeout: 10_000 });

    // Ensure fonts are loaded
    await this.page.evaluate(() => document.fonts.ready);

    // Reduce motion for deterministic rendering
    await this.page.emulateMedia({ reducedMotion: "reduce" });

    // Disable animations & transitions
    await this.page.addStyleTag({
      content: `*,*::before,*::after{animation-duration:0s!important;animation-delay:0s!important;transition-duration:0s!important;scroll-behavior:auto!important;}`,
    });

    // Expand viewport to full document height (NO fullPage stitching)
    const viewport = this.page.viewportSize()!;
    const height = await this.page.evaluate(() =>
      Math.max(document.documentElement.scrollHeight, document.body.scrollHeight),
    );

    await this.page.setViewportSize({ height, width: viewport.width });
    await this.page.waitForTimeout(200);
  }

  public async takeSnapshot(): Promise<void> {
    await expect(stripEmojis(stripHashes(await this.page.content()))).toMatchSnapshot(
      `${this.pageName}.snap`,
    );
  }

  public async takeScreenshot(): Promise<void> {
    await expect(this.page).toHaveScreenshot(`${this.pageName}.png`, {
      animations: "disabled",
      maxDiffPixels: 100,
    });
  }
}

test.describe("PAGES SNAPSHOTS", () => {
  test.beforeEach(async ({ page }) => {
    await page.clock.install();
    await page.clock.setFixedTime(new Date("2026-01-01T00:00:00Z"));
  });

  const seenTestNames = new Set<string>();

  for (const pageKey of Object.keys(routesConfig)) {
    const route = routesConfig[pageKey];
    const name = route.tests?.name;
    const lang = route.templateParameters.lang;

    if (!name || lang.includes("explicit")) {
      continue;
    }

    const testKey = `${name}|${lang}`;
    if (seenTestNames.has(testKey)) {
      continue;
    }
    seenTestNames.add(testKey);

    const testName = `${name} (${lang})`;

    test(testName, async ({ page }, testInfo) => {
      const basePage = new BasePage(testName, page);
      const colorScheme = testInfo.project.name.includes("dark") ? "dark" : "light";

      await basePage.goto(pageKey, colorScheme);
      await basePage.takeSnapshot();
      await basePage.takeScreenshot();
    });
  }
});
