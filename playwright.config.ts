import { type PlaywrightTestConfig, devices } from '@playwright/test';

const config: PlaywrightTestConfig = {
    use: {
        /* Base URL to use in actions like `await page.goto('/')`. */
        baseURL: 'http://localhost:4040 ',
        browserName: 'chromium',
        headless: true,
        ignoreHTTPSErrors: true,
        /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
        actionTimeout: 0,
        /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
        trace: 'on-first-retry',
    },
    webServer: {
        command: './node_modules/http-server/bin/http-server dist -p 4040',
        port: 4040,
        timeout: 10000,
        reuseExistingServer: false,
    },
    outputDir: './src/tests/playwright/results',
    testDir: './src/tests/playwright/',
    /* Maximum time one test can run for. */
    timeout: 10 * 1000,
    /* Run tests in files in parallel */
    fullyParallel: true,
    /* Fail the build on CI if you accidentally left test.only in the source code. */
    forbidOnly: !!process.env.CI,
    /* Retry on CI only */
    retries: process.env.CI ? 2 : 0,
    /* Opt out of parallel tests on CI. */
    workers: process.env.CI ? 1 : undefined,
    /* Reporter to use. See https://playwright.dev/docs/test-reporters */
    reporter: [['html', { open: 'never', outputFolder: './src/tests/playwright/report' }]],
    projects: [
        {
            name: 'desktop-chromium-dark',
            use: {
                ...devices['Desktop Chrome'],
                colorScheme: 'dark',
            },
        },
        {
            name: 'desktop-chromium-light',
            use: {
                ...devices['Desktop Chrome'],
                colorScheme: 'light',
            },
        },
        {
            name: 'mobile-pixel5-dark',
            use: {
                ...devices['Pixel 5'],
                colorScheme: 'dark',
            },
        },
        {
            name: 'mobile-pixel5-light',
            use: {
                ...devices['Pixel 5'],
                colorScheme: 'light',
            },
        },
    ],
};

export default config;
