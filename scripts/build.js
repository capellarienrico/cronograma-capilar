const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const outDir = path.join(rootDir, 'www');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const filesToCopy = [
  'index.html',
  'releases.html',
  'app.js',
  'styles.css',
  'manifest.json',
  'sw.js',
  'icon.svg'
];

for (const file of filesToCopy) {
  const src = path.join(rootDir, file);
  const dest = path.join(outDir, file);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log(`Copied ${file} -> www/`);
  }
}

console.log('Build complete: Web assets synchronized to www/');
