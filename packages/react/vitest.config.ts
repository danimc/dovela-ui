import tailwindcss from "@tailwindcss/vite";
import { playwright } from "@vitest/browser-playwright";
import { defineConfig } from "vitest/config";

/**
 * Two projects on purpose.
 *
 * `unit` runs in jsdom: fast, fine for rendering, props and wiring.
 *
 * `browser` runs in real Chromium, because jsdom cannot verify what this
 * library actually claims. There is no layout and no cascade in jsdom, so
 * axe's colour-contrast rule is inert, focus is approximated, and a dialog
 * that fails to trap focus still passes. Accessibility and keyboard contracts
 * belong here.
 */
export default defineConfig({
  plugins: [tailwindcss()],
  test: {
    projects: [
      {
        extends: true,
        test: {
          name: "unit",
          environment: "jsdom",
          globals: true,
          setupFiles: ["./vitest.setup.ts"],
          include: ["src/**/*.test.tsx"],
          // `*.browser.test.tsx` matches the glob above; it must not run here.
          exclude: ["src/**/*.browser.test.tsx"],
        },
      },
      {
        extends: true,
        test: {
          name: "browser",
          globals: true,
          setupFiles: ["./vitest.setup.browser.ts"],
          include: ["src/**/*.browser.test.tsx"],
          browser: {
            enabled: true,
            provider: playwright(),
            headless: true,
            instances: [{ browser: "chromium" }],
          },
        },
      },
    ],
  },
});
