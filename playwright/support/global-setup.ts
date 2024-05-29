// global-setup.ts
import { chromium } from '@playwright/test';
import { initGlobalRouteMocks } from './api-mock';

async function globalSetup() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:4200',  {timeout: 120000});
  await initGlobalRouteMocks(page.context());
  await browser.close();
}

export default globalSetup;
