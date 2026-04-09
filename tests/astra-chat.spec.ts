import { test, expect } from '@playwright/test';

test.describe('Astra Chat Component', () => {
  test('should open and close the chat window', async ({ page }) => {
    await page.goto('/');
    
    // Find the message bubble button
    const toggleButton = page.locator('button:has(svg)').last();
    await toggleButton.click();
    
    const chatWindow = page.locator('text=Digital Chief of Staff');
    await expect(chatWindow).toBeVisible();
    
    await toggleButton.click();
    await expect(chatWindow).not.toBeVisible();
  });

  test('should show welcome message', async ({ page }) => {
    await page.goto('/');
    await page.locator('button:has(svg)').last().click();
    await expect(page.locator('text=Greetings. I am Astra')).toBeVisible();
  });

  test('should show suggested questions', async ({ page }) => {
    await page.goto('/');
    await page.locator('button:has(svg)').last().click();
    await expect(page.locator('text=What is Jitin\'s most impressive build?')).toBeVisible();
  });
});
