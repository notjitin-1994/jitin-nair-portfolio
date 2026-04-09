# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: home.spec.ts >> Jitin Nair Portfolio Home Page >> contact options are present
- Location: tests/home.spec.ts:25:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('a[href^="mailto:not.jitin@gmail.com"]').first()
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('a[href^="mailto:not.jitin@gmail.com"]').first()

```

# Page snapshot

```yaml
- generic [ref=e2]: "{\"message\":\"Route GET:/ not found\",\"error\":\"Not Found\",\"statusCode\":404}"
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('Jitin Nair Portfolio Home Page', () => {
  4  |   test('has title', async ({ page }) => {
  5  |     await page.goto('/');
  6  |     await expect(page).toHaveTitle(/Jitin Nair/);
  7  |   });
  8  | 
  9  |   test('terminal renders and processes commands', async ({ page }) => {
  10 |     await page.goto('/');
  11 |     
  12 |     // The terminal should render "jitin@nexus:~$"
  13 |     const terminal = page.locator('text=jitin@nexus:~$').first();
  14 |     await expect(terminal).toBeVisible({ timeout: 15000 });
  15 |   });
  16 | 
  17 |   test('projects section is visible', async ({ page }) => {
  18 |     await page.goto('/#projects');
  19 |     
  20 |     // Predator Nexus project should be visible
  21 |     const projectTitle = page.locator('h3:has-text("Predator Nexus V4.0")').first();
  22 |     await expect(projectTitle).toBeVisible();
  23 |   });
  24 | 
  25 |   test('contact options are present', async ({ page }) => {
  26 |     await page.goto('/#contact');
  27 |     
  28 |     // Check for contact links
  29 |     const emailLink = page.locator('a[href^="mailto:not.jitin@gmail.com"]').first();
> 30 |     await expect(emailLink).toBeVisible();
     |                             ^ Error: expect(locator).toBeVisible() failed
  31 |   });
  32 | });
  33 | 
```