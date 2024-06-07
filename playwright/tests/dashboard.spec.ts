import { test, expect } from '@playwright/test';
import { selectByAriaLabel } from '../support/playwright-utils';

test.describe("Dashboard Test", () => {

  test("should render dashboard component with sensor measurements", async ({page}) => {
    await page.goto(`http://localhost:4200`);
    await page.waitForURL('http://localhost:4200/dashboard');
    await expect(page.locator('#dashboard-filter-button')).toBeVisible();
    await expect(page.locator('#measurement-tile-5')).toBeVisible();
  });

  test("should render dashboard component and filter measurements", async ({page}) => {
    await page.goto(`http://localhost:4200`);
    await page.waitForURL('http://localhost:4200/dashboard');
    await expect(page.locator('#dashboard-filter-button')).toBeVisible();
    await expect(page.locator('#measurement-tile-5')).toBeVisible();

    await page.getByRole('button', { name: 'Filter' }).click();
    await page.locator('div').filter({ hasText: /^LOCATIONWOHNZIMMERSCHLAFZIMMER$/ }).locator('#filter-checkbox-0').check();
    await page.getByRole('button', { name: 'Close' }).click();
    await expect(page.locator('#offcanvas-component')).not.toBeVisible();
    await expect(page.locator('#measurement-tile-5')).not.toBeVisible();
  });

});
