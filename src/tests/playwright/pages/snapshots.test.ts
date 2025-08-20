import { type Page, expect, test } from '@playwright/test';
import routesConfig from '@/config/routes/index.js';
import { stripEmojis, stripHashes } from '@/tests/playwright/utils/index';

class BasePage {
    private readonly page: Page;
    private readonly pageName: string;
    private readonly isMobile: boolean | undefined;

    constructor(pageName: string, page: Page, isMobile: boolean | undefined) {
        this.page = page;
        this.pageName = pageName;
        this.isMobile = isMobile;
    }

    public async goto(url: string): Promise<void> {
        await this.page.goto(url);
        await this.page.context().clearCookies();
        await this.page.evaluate(() => localStorage.clear());
        await this.page.evaluate(() => document.fonts.ready);
        await this.page.addStyleTag({
            content: `*, *::before, *::after { animation-duration: 0s !important; animation-delay: 0s !important; transition-duration: 0s !important; scroll-behavior: auto !important; }`,
        });
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
            fullPage: true,
            maxDiffPixels: 100,
        });
    }

    public async ajustContent(): Promise<void> {
        await this.page.locator('#root > footer p + p').evaluate((el) => {
            el.textContent = 'paulogoncalves.dev © 2021';
        });
    }

    public async close(): Promise<void> {
        await this.page.close();
    }
}

test.describe('PAGES SNAPSHOTS', () => {
    for (const pageKey of Object.keys(routesConfig)) {
        const name = routesConfig[pageKey].tests?.name;

        if (name) {
            test(name, async ({ page, isMobile }) => {
                const Page = new BasePage(name, page, isMobile);
                await Page.goto(pageKey);
                await Page.ajustContent();
                await Page.takeSnapshot();
                await Page.takeScreenshot();
                await Page.close();
            });
        }
    }
});
