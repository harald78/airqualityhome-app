import type { PlaywrightTestConfig } from '@playwright/test';
import { devices } from '@playwright/test';


/**
 * See https://playwright.dev/docs/test-configuration.
 */
const config: PlaywrightTestConfig = {
  testDir: './playwright/tests',
  /* Maximum time one test can run for. */
  timeout: 60 * 1500,
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: process.env['CI'] ? 10000 : 5000
  },
  forbidOnly: !!process.env['CI'],
  /* Retry on CI only */
  retries: process.env['CI'] ? 3 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env['CI'] ? 2 : 1,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'list',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */

  use: {
    /* Use headless mode */
    headless: true,
    /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
    actionTimeout: 0,

    /* Screenshots only on failure in CI environment */
    screenshot: process.env['CI'] ? 'only-on-failure' : 'off'
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  /* Folder for test artifacts such as screenshots, videos, traces, etc. */
  outputDir: 'test-results/',

  /* Run your local dev server before starting the tests */
  webServer: {
    command: 'npm run start:standalone',
    url: 'http://localhost:4200/',
    reuseExistingServer: !process.env['CI'],
    timeout: 180000,
  },

  globalSetup: require.resolve('./playwright/support/global-setup'),
};

export default config;
