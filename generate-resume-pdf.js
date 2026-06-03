const { chromium } = require('playwright');
const path = require('path');

async function generate(htmlFile, pdfFile) {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const htmlPath = 'file://' + path.resolve(__dirname, htmlFile).replace(/\\/g, '/');
  console.log('Loading:', htmlPath);
  await page.goto(htmlPath, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);
  const outputPath = path.resolve(__dirname, 'public', pdfFile);
  await page.pdf({ path: outputPath, format: 'A4', printBackground: true, margin: { top: '0', right: '0', bottom: '0', left: '0' } });
  await browser.close();
  console.log('PDF saved to:', outputPath);
}

const args = process.argv.slice(2);
if (args[0] === 'ai') {
  generate('resume-ai.html', 'resume-ai.pdf');
} else {
  generate('resume-ld.html', 'resume-ld.pdf');
}
