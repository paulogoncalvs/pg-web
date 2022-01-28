import { test, expect } from '@playwright/test';

/* @todo */

test.describe('REGRESSION', () => {
    test('Home Screenshot', async ({ page }) => {
        await page.goto('http://localhost:4000/');
        await page.waitForTimeout(1500);

        expect(await page.content()).toMatchSnapshot('home.html');
    });

    test('Home Snapshot', async ({ page }) => {
        await page.goto('http://localhost:4000/');
        await page.waitForTimeout(1500);

        expect(await page.screenshot({ fullPage: true })).toMatchSnapshot('home.png');
    });
});
