import { devices, defineConfig } from "@playwright/test";

const baseUse = {
  baseURL: "http://localhost:4040",
  browserName: "chromium" as const,
  headless: true,
  ignoreHTTPSErrors: true,
  actionTimeout: 0,
  trace: "on-first-retry" as const,
  reducedMotion: "reduce" as const,
};

export default defineConfig({
  use: baseUse,

  webServer: {
    command: "pnpm vite preview --port 4040 --no-open",
    port: 4040,
    reuseExistingServer: true,
    timeout: 10_000,
  },

  outputDir: "./src/tests/playwright/results",
  testDir: "./src/tests/playwright/",
  timeout: 10_000,
  fullyParallel: true,
  forbidOnly: Boolean(true),
  retries: 2,
  workers: 4,

  reporter: [["html", { open: "never", outputFolder: "./src/tests/playwright/report" }]],

  projects: [
    {
      name: "desktop-chromium-dark",
      use: {
        ...baseUse,
        ...{
          viewport: devices["Desktop Chrome"].viewport,
          userAgent: devices["Desktop Chrome"].userAgent,
        },
        colorScheme: "dark",
      },
    },
    {
      name: "desktop-chromium-light",
      use: {
        ...baseUse,
        ...{
          viewport: devices["Desktop Chrome"].viewport,
          userAgent: devices["Desktop Chrome"].userAgent,
        },
        colorScheme: "light",
      },
    },
    {
      name: "mobile-pixel5-dark",
      use: {
        ...baseUse,
        ...{
          viewport: devices["Pixel 5"].viewport,
          userAgent: devices["Pixel 5"].userAgent,
          deviceScaleFactor: devices["Pixel 5"].deviceScaleFactor,
          isMobile: devices["Pixel 5"].isMobile,
          hasTouch: devices["Pixel 5"].hasTouch,
        },
        colorScheme: "dark",
      },
    },
    {
      name: "mobile-pixel5-light",
      use: {
        ...baseUse,
        ...{
          viewport: devices["Pixel 5"].viewport,
          userAgent: devices["Pixel 5"].userAgent,
          deviceScaleFactor: devices["Pixel 5"].deviceScaleFactor,
          isMobile: devices["Pixel 5"].isMobile,
          hasTouch: devices["Pixel 5"].hasTouch,
        },
        colorScheme: "light",
      },
    },
  ],
});
