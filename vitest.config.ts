import { resolve } from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    silent: false,
    environment: "jsdom",
    globals: true,
    testTimeout: 10000,
    setupFiles: [
      "src/tests/vitest/setupPreact.ts",
      "src/tests/vitest/setupTests.ts",
      "src/tests/vitest/__mocks__/matchMediaMock.ts",
    ],
    exclude: ["**/tests/playwright/**", "**/node_modules/**"],
    coverage: {
      provider: "v8",
      include: ["src/**"],
      exclude: ["src/tests/**"],
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  optimizeDeps: {
    exclude: [],
  },
});
