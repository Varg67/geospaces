import { firefoxExecutablePath } from "./testing/firefoxBrowser.ts";
import { defineConfig, devices } from "@playwright/test";
export default defineConfig({
  testDir: "./e2e",
  use: { baseURL: "http://127.0.0.1:5173", trace: "retain-on-failure" },
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1440, height: 900 },
      },
    },
    {
      name: "firefox",
      use: {
        ...devices["Desktop Firefox"],
        launchOptions: { executablePath: firefoxExecutablePath() },
        viewport: { width: 1440, height: 900 },
      },
    },
  ],
  webServer: {
    command: "npm run dev -- --port 5173 --strictPort",
    url: "http://127.0.0.1:5173",
    reuseExistingServer: !process.env.CI,
  },
});
