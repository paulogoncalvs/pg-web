import { type Page, expect, test } from '@playwright/test';
import routesConfig from '@/config/routes/index.js';
// @ts-ignore
import { stripEmojis, stripHashes } from '@/tests/playwright/utils/index.ts';

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
        await this.page.waitForTimeout(2000);
    }

    public async takeScreenshot(): Promise<boolean | void> {
        return (
            !this.isMobile &&
            expect(stripEmojis(stripHashes(await this.page.content()))).toMatchSnapshot(`${this.pageName}.snap`)
        );
    }

    public async takeSnapshot(): Promise<void> {
        return expect(await this.page.screenshot({ fullPage: true })).toMatchSnapshot(`${this.pageName}.png`);
    }
}

test.describe('PAGES SNAPSHOTS', () => {
    for (const pageKey of Object.keys(routesConfig)) {
        const name = routesConfig[pageKey].tests?.name;

        name &&
            test(name, async ({ page, isMobile }) => {
                const Page = new BasePage(name, page, isMobile);
                await Page.goto(pageKey);
                await Page.takeScreenshot();
                await Page.takeSnapshot();
            });
    }
});
