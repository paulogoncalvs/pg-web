import { test, expect } from '@playwright/test';

/**
 * @todo
 */
test.describe('PAGES SNAPSHOT', () => {
    test('Home Screenshot + Snapshot', async ({ page }) => {
        await page.goto('/');
        await page.waitForTimeout(1500);

        expect(await page.content()).toMatchSnapshot('home.snap');
        expect(await page.screenshot({ fullPage: true })).toMatchSnapshot('home.png');
    });
});
