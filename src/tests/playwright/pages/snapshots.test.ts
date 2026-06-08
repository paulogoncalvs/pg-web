import { test } from "@playwright/test";

import routesConfig from "@/config/routes";
import { BasePage } from "@/tests/playwright/utils/basePage";

test.describe("PAGES SNAPSHOTS", () => {
  test.beforeEach(async ({ page }) => {
    await page.clock.install();
    await page.clock.setFixedTime(new Date("2026-01-01T00:00:00Z"));
  });

  const seenTestNames = new Set<string>();
  let testedBlogSlug: string | null = null;

  for (const pageKey of Object.keys(routesConfig)) {
    const route = routesConfig[pageKey];
    const name = route.tests?.name;
    const lang = route.templateParameters.lang;

    if (!name || lang.includes("explicit")) {
      continue;
    }

    // Only test one blog post — all share the same BlogPost template
    if (name.startsWith("BlogPost-")) {
      const slug = name.replace("BlogPost-", "");
      if (testedBlogSlug !== null && slug !== testedBlogSlug) {
        continue;
      }
      testedBlogSlug = slug;
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
