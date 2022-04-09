import { test, expect } from '@playwright/test';

/**
 * @todo
 */

const stripHashes = (content = ''): string => {
    if (content === '') {
        return '';
    }

    return content.replace(
        /([\dA-Za-z-]*)(\.[\dA-Za-z]*)?\.([\dA-Za-z]{20})(\.(js|css|svg|jpg|jpeg|png|ico|webmanifest))/gm,
        '$1$2$4',
    );
};

test.describe('PAGES SNAPSHOT', () => {
    test('Home Screenshot + Snapshot', async ({ page }) => {
        await page.goto('/');
        await page.waitForTimeout(1500);

        expect(stripHashes(await page.content())).toMatchSnapshot('home.snap');
        expect(await page.screenshot({ fullPage: true })).toMatchSnapshot('home.png');
    });
});
