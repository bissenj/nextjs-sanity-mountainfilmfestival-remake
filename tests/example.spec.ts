import { test, expect } from '@playwright/test';


// Test Page Title.
test('has title', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Home | Mountainfilm Festival/);
});


// Test opening the site menu.
test('site menu click - open', async ({ page }) => {  
  await page.goto('http://localhost:3000/');
  
  // Click the Festival site menu button.
  await page.getByRole('button', { name: 'Festival' }).click();

  // Expects the site menu contents panel to be visible  
  await expect(page.getByTestId('site-menu-contents')).toBeInViewport();  
});


// Test that site menu stays open between menu clicks.
test('site menu click - sibling', async ({ page }) => {  
  await page.goto('http://localhost:3000/');
  
  // Click the Festival site menu button.
  await page.getByRole('button', { name: 'Festival' }).click();

  // Click the Tour site menu button.
  await page.getByRole('button', { name: 'Tour' }).click();

  // Expects the site menu contents panel to be visible  
  await expect(page.getByTestId('site-menu-contents')).toBeInViewport();
});


// Test closing the site menu.
test('site menu click - close', async ({ page }) => {  
  await page.goto('http://localhost:3000/');
  
  // Click the Festival button
  await page.getByRole('button', { name: 'Festival' }).click();

  // Click the Tour button to switch contents of the menu panel
  await page.getByRole('button', { name: 'Tour' }).click();

  // Click the Tour button again to close the site menu
  await page.getByRole('button', { name: 'Tour' }).click();

  // Expects the site menu contents panel to be visible  
  await expect(page.getByTestId('site-menu-contents')).not.toBeInViewport({ ratio: 0.9 });
});
