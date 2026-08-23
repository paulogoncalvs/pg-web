import mdx from "@mdx-js/rollup";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [
    mdx({
      providerImportSource: "@mdx-js/preact",
      jsxImportSource: "preact",
    }),
  ],
  test: {
    silent: false,
    environment: "jsdom",
    globals: true,
    testTimeout: 30000,
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
      thresholds: {
        statements: 70,
        branches: 60,
        functions: 65,
        lines: 70,
      },
    },
  },
  resolve: {
    alias: {
      "@": import.meta.dirname + "/src",
    },
  },
  optimizeDeps: {
    exclude: [],
  },
});
