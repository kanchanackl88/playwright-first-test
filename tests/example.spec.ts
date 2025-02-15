import { test, expect } from '@playwright/test';

//test.use({ browserName: 'firefox', channel: 'firefox' });

test('User can login and logout successfully on Sauce Demo', async ({ page }) => {
  // Go to the Sauce Demo login page
  await page.waitForLoadState('networkidle');
  await page.goto('https://www.saucedemo.com/');

  // Enter username
  const usernameInput = page.locator('[data-test="username"]');
  await usernameInput.click();
  await usernameInput.fill('standard_user');

  // Enter password
  const passwordInput = page.locator('[data-test="password"]');
  await passwordInput.click();
  await passwordInput.fill('secret_sauce');

  // Click on the login button
  await page.locator('[data-test="login-button"]').click();

  // Verify login by checking if the Products title appears
  await expect(page.locator('.title')).toHaveText('Products');

  // Open the menu and click on the logout link
  await page.getByRole('button', { name: 'Open Menu' }).click();
  await page.locator('[data-test="logout-sidebar-link"]').click();

  // Verify logout by checking if the login button is visible again
  await expect(page.locator('[data-test="login-button"]')).toBeVisible();
});
