const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const htmlPath = 'file://' + path.resolve(__dirname, 'resume-ld.html').replace(/\\/g, '/');
  console.log('Loading:', htmlPath);

  await page.goto(htmlPath, { waitUntil: 'networkidle' });

  // Wait for fonts to render
  await page.waitForTimeout(1500);

  const outputPath = path.resolve(__dirname, 'public', 'resume-ld.pdf');

  await page.pdf({
    path: outputPath,
    format: 'A4',
    printBackground: true,
    margin: { top: '0', right: '0', bottom: '0', left: '0' },
  });

  await browser.close();
  console.log('PDF saved to:', outputPath);
})();
