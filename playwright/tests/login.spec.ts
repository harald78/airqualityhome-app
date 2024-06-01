import { test, expect } from '@playwright/test';
import { selectByAriaLabel } from '../support/playwright-utils';

test.describe('Login', () => {

  test.afterEach(async ({ page }) => {
    // 1. Navigation zur Startseite oder einer definierten Seite
    await page.goto('http://localhost:4200/');

    // 2. Löschen von Cookies und lokalem Speicher
    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
    await page.context().clearCookies();

    // 3. Optional: Neuladen der Seite
    await page.reload();
  });

  test('Check app opens and show login screen', async ({ page }) => {
    await page.goto('http://localhost:4200');

    await expect(page).toHaveTitle("AirqualityhomeApp");
    await expect(page.locator(selectByAriaLabel("aq-login-form"))).toBeVisible();
  });

  test('Should try to login and get error', async ({ page }) => {
    await page.goto('http://localhost:4200');

    await expect(page).toHaveTitle("AirqualityhomeApp");
    await expect(page.locator(selectByAriaLabel("aq-username-input"))).toBeVisible();
    await expect(page.locator(selectByAriaLabel("aq-password-input"))).toBeVisible();
    await expect(page.locator(selectByAriaLabel("aq-login-button"))).toBeVisible();
    await page.locator(selectByAriaLabel("aq-username-input")).fill("default");
    await page.locator(selectByAriaLabel("aq-password-input")).fill("default");
    await page.locator(selectByAriaLabel("aq-login-button")).click();

    await expect(page.locator(selectByAriaLabel("aq-toast"))).toBeVisible();
    await expect(page.locator(selectByAriaLabel("aq-toast"))).toContainText("Username or Password not correct");
  });

  test('Should try to login and navigate to dashboard', async ({ page }) => {
    await page.goto('http://localhost:4200');

    await expect(page).toHaveTitle("AirqualityhomeApp");
    await expect(page.locator(selectByAriaLabel("aq-username-input"))).toBeVisible();
    await expect(page.locator(selectByAriaLabel("aq-password-input"))).toBeVisible();
    await expect(page.locator(selectByAriaLabel("aq-login-button"))).toBeVisible();
    await page.locator(selectByAriaLabel("aq-username-input")).fill("balu");
    await page.locator(selectByAriaLabel("aq-password-input")).fill("s3cret!");
    await page.locator(selectByAriaLabel("aq-login-button")).click();

    await page.waitForURL('**/dashboard');
  });
});


