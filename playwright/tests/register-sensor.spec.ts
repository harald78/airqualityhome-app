import { expect, test } from "@playwright/test";
import { logOut } from '../support/logout-helper';
import { loginAsBalu, loginAsMogli } from '../support/login-helper';
import { selectByAriaLabel } from '../support/playwright-utils';

test.describe('Register-Base Tests', () => {

  test('Check register base request works', async ({ context, page }) => {
    await logOut(page);
    await loginAsMogli(page);
    await page.waitForURL('http://localhost:4200/dashboard');
    await expect(page.locator('#settings-link')).toBeVisible();
    await page.locator('#settings-link').click();
    await expect(page.locator("#settings-container")).toBeVisible();
    await expect(page.locator("#navigate-to-base-button")).toBeVisible();
    await page.locator("#navigate-to-base-button").click();
    await page.locator('#register-base-button').click();
    await page.getByPlaceholder('sensor location...').click();
    await page.getByPlaceholder('sensor location...').fill('Test Location');
    await page.locator('#register-modal-register-button').click();
    await expect(page.locator(selectByAriaLabel('register-sensor-pending-badge'))).toBeVisible();
    await expect(page.locator(selectByAriaLabel('aq-toast'))).toBeVisible();
    await expect(page.locator(selectByAriaLabel('aq-toast'))).toContainText("Created register request successfully");
  });

  test('Check cancel base request page works', async ({ context, page }) => {
    await logOut(page);
    await loginAsBalu(page);
    await page.waitForURL('http://localhost:4200/dashboard');
    await expect(page.locator('#settings-link')).toBeVisible();
    await page.locator('#settings-link').click();
    await expect(page.locator("#settings-container")).toBeVisible();
    await expect(page.locator("#navigate-to-base-button")).toBeVisible();
    await page.locator("#navigate-to-base-button").click();
    await page.locator('#cancel-request-base-button').click();
    await expect(page.locator("#confirm-modal")).toBeVisible();
    await page.locator('#confirm-modal-button').click();
    await expect(page.locator(selectByAriaLabel('register-sensor-pending-badge'))).not.toBeVisible();
    await expect(page.locator(selectByAriaLabel('aq-toast'))).toBeVisible();
    await expect(page.locator(selectByAriaLabel('aq-toast'))).toContainText("Canceled register request successfully");
  });

  test('should navigate to register base and back again', async ({ page }) => {
    await logOut(page);
    await loginAsBalu(page);
    await page.waitForURL('http://localhost:4200/dashboard');
    await expect(page.locator('#settings-link')).toBeVisible();
    await page.locator('#settings-link').click();
    await expect(page.locator("#settings-container")).toBeVisible();
    await expect(page.locator("#navigate-to-base-button")).toBeVisible();
    await page.locator("#navigate-to-base-button").click();
    await page.waitForURL('http://localhost:4200/settings/register');
    await expect(page.locator("#back-button")).toBeVisible();
    await page.locator("#back-button").click();
    await page.waitForURL('http://localhost:4200/settings');
    await expect(page.locator("#settings-container")).toBeVisible();
  });
})



