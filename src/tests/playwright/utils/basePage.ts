import { type Page, expect } from "@playwright/test";

import { stripEmojis, stripHashes } from "./index";

export class BasePage {
  private readonly page: Page;
  private readonly pageName: string;

  constructor(pageName: string, page: Page) {
    this.page = page;
    this.pageName = pageName;
  }

  public async goto(url: string, colorScheme: "dark" | "light"): Promise<void> {
    await this.page.context().clearCookies();

    await this.page.addInitScript((theme) => {
      localStorage.clear();
      sessionStorage.clear();
      localStorage.setItem("color-theme", theme);
    }, colorScheme);

    await this.page.goto(url, { waitUntil: "networkidle" });
    await this.page.waitForSelector("header", { timeout: 10_000 });
    await this.page.evaluate(() => document.fonts.ready);
    await this.page.emulateMedia({ reducedMotion: "reduce" });
    await this.page.addStyleTag({
      content: `*,*::before,*::after{animation-duration:0s!important;animation-delay:0s!important;transition-duration:0s!important;scroll-behavior:auto!important;}`,
    });

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

  public async openSideDrawer(): Promise<void> {
    await this.page.locator('header label[for="sd-tog"]').click();

    await this.page.evaluate(() => {
      const input = document.getElementById("sd-tog") as HTMLInputElement | null;
      if (input) {
        input.checked = true;
      }
    });
    await this.page.waitForTimeout(200);

    await this.page.evaluate(() => {
      const summary = document.querySelector("nav summary") as HTMLElement | null;
      if (summary) {
        summary.click();
      }
    });
    await this.page.waitForTimeout(200);
  }
}
