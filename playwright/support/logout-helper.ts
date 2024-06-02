import { Page } from '@playwright/test';

export async function logOut(page: Page) {
    // 1. Navigate to start url
    await page.goto('http://localhost:4200/');

    // 2. Delete local state
    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
    await page.context().clearCookies();

    // 3. Reload side
    await page.reload();
}
