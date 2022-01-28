import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
    use: {
        baseURL: 'http://localhost:4000',
        browserName: 'chromium',
        headless: true,
        ignoreHTTPSErrors: true,
    },

    outputDir: './src/tests/results/',
    testDir: './src/tests/regression/',
};

export default config;
