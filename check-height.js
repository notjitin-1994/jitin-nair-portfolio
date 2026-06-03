const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const htmlPath = 'file://' + path.resolve(__dirname, 'resume-ld.html').replace(/\\/g, '/');
  await page.goto(htmlPath, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);
  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  console.log('Content height (px):', height, '  |  A4 at 96dpi ~1123px  |  Pages ~' + (height/1123).toFixed(2));
  await browser.close();
})();
