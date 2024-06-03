import { expect, test } from "@playwright/test";
import { logOut } from '../support/logout-helper';
import { loginAsBalu } from '../support/login-helper';
import { selectByAriaLabel } from '../support/playwright-utils';

test.describe("Account tests", () => {

  test.beforeEach(async ({page}) => {
    await logOut(page);
    await loginAsBalu(page);
    await page.waitForURL('http://localhost:4200/dashboard');
    await expect(page.locator('#account-link')).toBeVisible();
    await page.locator('#account-link').click();
    await expect(page.locator('#change-account-container')).toBeVisible();
  });

  test.describe("Change Account", () => {

    test("Should change email correctly", async ({page}) => {
      await expect(page.locator('#changeData-button')).toBeVisible();
      await expect(page.locator('#changeData-button')).toBeVisible();
      await expect(page.locator('#saveData-button')).not.toBeVisible();
      await expect(page.locator('#change-username-input')).toBeDisabled();
      await expect(page.locator('#change-email-input')).toBeDisabled();
      await expect(page.locator('#current-password-input')).toBeDisabled();
      await page.locator('#changeData-button').click();
      await expect(page.locator('#changeData-button')).not.toBeVisible();
      await expect(page.locator('#saveData-button')).toBeVisible();
      await expect(page.locator('#saveData-button')).toBeDisabled();
      await expect(page.locator('#change-username-input')).toBeEnabled();
      await expect(page.locator('#current-password-input')).toBeEnabled();
      await expect(page.locator('#change-email-input')).toBeEnabled();
      await page.locator('#change-email-input').fill("balu@mountain.de");
      await page.locator('#current-password-input').selectText();
      await expect(page.locator('#password-required-error')).toBeVisible();
      await expect(page.locator('#password-required-error')).toContainText("Password required to change data");
      await page.locator('#current-password-input').fill("currentPassword");
      await expect(page.locator('#password-required-error')).not.toBeVisible();
      await expect(page.locator('#saveData-button')).toBeEnabled();
      await page.locator('#saveData-button').click();
      await expect(page.locator('#change-username-input')).toBeDisabled();
      await expect(page.locator('#change-email-input')).toBeDisabled();
      await expect(page.locator('#current-password-input')).toBeDisabled();
      await expect(page.locator('#change-email-input')).toHaveValue("balu@mountain.de");
      await expect(page.locator(selectByAriaLabel('aq-toast'))).toBeVisible();
      await expect(page.locator(selectByAriaLabel('aq-toast'))).toContainText("Saved changes successfully");
    });

    test("Should cancel change email correctly", async ({page}) => {
      await expect(page.locator('#changeData-button')).toBeVisible();
      await expect(page.locator('#changeData-button')).toBeVisible();
      await expect(page.locator('#saveData-button')).not.toBeVisible();
      await expect(page.locator('#change-username-input')).toBeDisabled();
      await expect(page.locator('#change-email-input')).toBeDisabled();
      await page.locator('#changeData-button').click();
      await expect(page.locator('#changeData-button')).not.toBeVisible();
      await expect(page.locator('#saveData-button')).toBeVisible();
      await expect(page.locator('#saveData-button')).toBeDisabled();
      await expect(page.locator('#change-username-input')).toBeEnabled();
      await expect(page.locator('#change-email-input')).toBeEnabled();
      await page.locator('#change-email-input').fill("balu@mountain.de");
      await page.locator('#current-password-input').fill("currentPassword");
      await expect(page.locator(selectByAriaLabel('cancel-change-button'))).toBeVisible();
      await page.locator(selectByAriaLabel('cancel-change-button')).click();
      await expect(page.locator('#change-username-input')).toBeDisabled();
      await expect(page.locator('#current-password-input')).toBeDisabled();
      await expect(page.locator('#change-email-input')).toBeDisabled();
      await expect(page.locator('#change-email-input')).toHaveValue("balu@dschungel.de");
    });

    test("Should change username and logout", async ({page}) => {
      await expect(page.locator('#changeData-button')).toBeVisible();
      await expect(page.locator('#changeData-button')).toBeVisible();
      await expect(page.locator('#saveData-button')).not.toBeVisible();
      await expect(page.locator('#change-username-input')).toBeDisabled();
      await expect(page.locator('#change-email-input')).toBeDisabled();
      await expect(page.locator('#current-password-input')).toBeDisabled();
      await page.locator('#changeData-button').click();
      await expect(page.locator('#changeData-button')).not.toBeVisible();
      await expect(page.locator('#saveData-button')).toBeVisible();
      await expect(page.locator('#saveData-button')).toBeDisabled();
      await expect(page.locator('#change-username-input')).toBeEnabled();
      await expect(page.locator('#current-password-input')).toBeEnabled();
      await expect(page.locator('#change-email-input')).toBeEnabled();
      await page.locator('#change-username-input').fill("newUsername");
      await page.locator('#current-password-input').fill("currentPassword");
      await expect(page.locator('#saveData-button')).toBeEnabled();
      await page.locator('#saveData-button').click();
      await expect(page.locator(selectByAriaLabel('aq-toast'))).toBeVisible();
      await expect(page.locator(selectByAriaLabel('aq-toast'))).toContainText("Saved changes successfully");
      await page.waitForURL('http://localhost:4200/login');
    });

  });

  test.describe("Change Password", () => {

    test("Should navigate to change password and back again", async ({page}) => {
      await expect(page.locator('#changePW-button')).toBeVisible();
      await page.locator('#changePW-button').click();
      await page.waitForURL('http://localhost:4200/account/change-pw');
      await expect(page.locator('#back-button')).toBeVisible();
      await page.locator('#back-button').click();
      await page.waitForURL('http://localhost:4200/account');
      await expect(page.locator('#change-account-container')).toBeVisible();
    });

    test("Should navigate to change password and change password", async ({page}) => {
      await expect(page.locator('#changePW-button')).toBeVisible();
      await page.locator('#changePW-button').click();
      await page.waitForURL('http://localhost:4200/account/change-pw');
      await expect(page.locator('#old-password-input')).toBeVisible();
      await expect(page.locator('#password-input')).toBeVisible();
      await expect(page.locator('#password-repeat-input')).toBeVisible();
      await expect(page.locator('#password-error')).not.toBeVisible();
      await expect(page.locator('#savePassword-button')).toBeDisabled();
      await page.locator('#old-password-input').fill("9876");
      await page.locator('#password-input').fill("1234");
      await page.locator('#password-repeat-input').fill("123");
      await expect(page.locator('#password-error')).toBeVisible();
      await page.locator('#password-repeat-input').fill("1234");
      await expect(page.locator('#password-error')).not.toBeVisible();
      await expect(page.locator('#savePassword-button')).toBeEnabled();
      await page.locator('#savePassword-button').click();
      await expect(page.locator(selectByAriaLabel('aq-toast'))).toBeVisible();
      await expect(page.locator(selectByAriaLabel('aq-toast'))).toContainText("Password changed successfully");
      await page.waitForURL('http://localhost:4200/login');
    });

    test("Should navigate to change password and fail on password change", async ({page}) => {
      await expect(page.locator('#changePW-button')).toBeVisible();
      await page.locator('#changePW-button').click();
      await page.waitForURL('http://localhost:4200/account/change-pw');
      await expect(page.locator('#old-password-input')).toBeVisible();
      await expect(page.locator('#password-input')).toBeVisible();
      await expect(page.locator('#password-repeat-input')).toBeVisible();
      await expect(page.locator('#password-error')).not.toBeVisible();
      await expect(page.locator('#savePassword-button')).toBeDisabled();
      await page.locator('#old-password-input').fill("wrong-old-password");
      await page.locator('#password-input').fill("1234");
      await page.locator('#password-repeat-input').fill("123");
      await expect(page.locator('#password-error')).toBeVisible();
      await page.locator('#password-repeat-input').fill("1234");
      await expect(page.locator('#password-error')).not.toBeVisible();
      await expect(page.locator('#savePassword-button')).toBeEnabled();
      await page.locator('#savePassword-button').click();
      await expect(page.locator(selectByAriaLabel('aq-toast'))).toBeVisible();
      await expect(page.locator(selectByAriaLabel('aq-toast'))).toContainText("Password could not be changed");
    });


  });


});
