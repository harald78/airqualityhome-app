import { expect, Page } from '@playwright/test';
import { selectByAriaLabel } from './playwright-utils';

export async function loginAsBalu(page: Page) {
  await page.goto('http://localhost:4200/login');
  await expect(page.locator(selectByAriaLabel("aq-login-button"))).toBeVisible();
  await page.locator("#aq-username-input").fill("balu");
  await page.locator("#aq-password-input").fill("s3cret!");
  return page.locator(selectByAriaLabel("aq-login-button")).click();
}

export async function loginAsMogli(page: Page) {
  await page.goto('http://localhost:4200/login');
  await expect(page.locator(selectByAriaLabel("aq-login-button"))).toBeVisible();
  await page.locator("#aq-username-input").fill("mogli");
  await page.locator("#aq-password-input").fill("s3cret!");
  return page.locator(selectByAriaLabel("aq-login-button")).click();
}
