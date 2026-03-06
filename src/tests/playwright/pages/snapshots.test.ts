import { type Page, expect, test } from '@playwright/test';
import routesConfig from '@/config/routes/index.js';
import { stripEmojis, stripHashes } from '@/tests/playwright/utils/index';

class BasePage {
    private readonly page: Page;
    private readonly pageName: string;
    private readonly isMobile?: boolean;

    constructor(pageName: string, page: Page, isMobile?: boolean) {
        this.page = page;
        this.pageName = pageName;
        this.isMobile = isMobile;
    }

    public async goto(url: string): Promise<void> {
        // Clear state BEFORE navigation
        await this.page.context().clearCookies();

        await this.page.addInitScript(() => {
            localStorage.clear();
            sessionStorage.clear();
        });

        await this.page.goto(url, { waitUntil: 'networkidle' });

        // Ensure fonts are loaded
        await this.page.evaluate(() => document.fonts.ready);

        // Reduce motion for deterministic rendering
        await this.page.emulateMedia({ reducedMotion: 'reduce' });

        // Disable animations & transitions
        await this.page.addStyleTag({
            content: `*, *::before, *::after {
          animation-duration: 0s !important;
          animation-delay: 0s !important;
          transition-duration: 0s !important;
          scroll-behavior: auto !important;
        }`,
        });

        // Expand viewport to full document height (NO fullPage stitching)
        const viewport = this.page.viewportSize()!;
        const height = await this.page.evaluate(() =>
            Math.max(document.documentElement.scrollHeight, document.body.scrollHeight),
        );

        await this.page.setViewportSize({ width: viewport.width, height });
    }

    public async takeSnapshot(): Promise<boolean | void> {
        return (
            !this.isMobile &&
            expect(stripEmojis(stripHashes(await this.page.content()))).toMatchSnapshot(`${this.pageName}.snap`)
        );
    }

    public async takeScreenshot(): Promise<void> {
        await expect(this.page).toHaveScreenshot(`${this.pageName}.png`, {
            animations: 'disabled',
            maxDiffPixels: 100,
        });
    }
}

test.describe('PAGES SNAPSHOTS', () => {
    test.beforeEach(async ({ page }) => {
        await page.clock.install();
        await page.clock.setFixedTime(new Date('2026-01-01T00:00:00Z'));
    });

    for (const pageKey of Object.keys(routesConfig)) {
        const name = routesConfig[pageKey].tests?.name;

        if (!name) continue;
        test(name, async ({ page, isMobile }) => {
            const Page = new BasePage(name, page, isMobile);

            await Page.goto(pageKey);
            await Page.takeSnapshot();
            await Page.takeScreenshot();
        });
    }
});
