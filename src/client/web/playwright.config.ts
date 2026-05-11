import { defineConfig, devices } from "@playwright/test";

const e2eHost = "127.0.0.1";
const e2ePort = 3100;
const e2eBaseUrl = `http://${e2eHost}:${e2ePort}`;

export default defineConfig({
  testDir: "./tests/e2e",
  timeout: 30_000,
  expect: {
    timeout: 5_000,
  },
  use: {
    baseURL: e2eBaseUrl,
    trace: "on-first-retry",
  },
  webServer: {
    command: `FIREFLY_MENU_API_BASE_URL= npm run dev -- --hostname ${e2eHost} --port ${e2ePort}`,
    url: `${e2eBaseUrl}/menu`,
    reuseExistingServer: false,
    timeout: 120_000,
  },
  projects: [
    {
      name: "desktop",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "mobile",
      use: { ...devices["Pixel 7"] },
    },
  ],
});
