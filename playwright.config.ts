import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
    use: {
        baseURL: 'http://localhost:4040 ',
        browserName: 'chromium',
        headless: true,
        ignoreHTTPSErrors: true,
    },
    webServer: {
        command: 'yarn start:prod:server',
        port: 4040,
        timeout: 5000,
        reuseExistingServer: false,
    },
    outputDir: './src/tests/playwright/results',
    testDir: './src/tests/playwright/',
};

export default config;
