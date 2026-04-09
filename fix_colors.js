const fs = require('fs');
const glob = require('glob'); // I can use simple fs if glob isn't available, or I can just target specific files

const files = [
  'app/page.tsx',
  'app/globals.css',
  'tailwind.config.ts',
  'app/components/terminal.tsx'
];

function processFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // CSS vars
  content = content.replace('--violet: #8b5cf6;', '--teal: #2dd4bf;');
  content = content.replace('--fuchsia: #d946ef;', '--teal-dark: #14b8a6;');
  
  // Tailwind classes
  content = content.replace(/purple-/g, 'teal-');
  content = content.replace(/violet-/g, 'cyan-');
  content = content.replace(/fuchsia-/g, 'cyan-');
  content = content.replace(/pink-/g, 'teal-');
  
  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`Updated colors in ${filePath}`);
}

files.forEach(processFile);
