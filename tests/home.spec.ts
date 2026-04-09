import { test, expect } from '@playwright/test';

test.describe('Jitin Nair Portfolio Home Page', () => {
  test('has title', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Jitin Nair/);
  });

  test('terminal renders and processes commands', async ({ page }) => {
    await page.goto('/');
    
    // The terminal should render "jitin@nexus:~$"
    const terminal = page.locator('text=jitin@nexus:~$').first();
    await expect(terminal).toBeVisible({ timeout: 15000 });
  });

  test('projects section is visible', async ({ page }) => {
    await page.goto('/#projects');
    
    // Predator Nexus project should be visible
    const projectTitle = page.locator('h3:has-text("Predator Nexus V4.0")').first();
    await expect(projectTitle).toBeVisible();
  });

  test('contact options are present', async ({ page }) => {
    await page.goto('/#contact');
    
    // Check for contact links
    const emailLink = page.locator('a[href^="mailto:not.jitin@gmail.com"]').first();
    await expect(emailLink).toBeVisible();
  });
});
