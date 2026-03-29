const fs   = require('fs');
const path = require('path');

const DIRS_TO_CLEAN = ['test-results', 'Downloads'];

DIRS_TO_CLEAN.forEach(dir => {
  const fullPath = path.join(process.cwd(), dir);
  if (fs.existsSync(fullPath)) {
    fs.rmSync(fullPath, { recursive: true, force: true });
    console.log(`🗑️  Cleaned: ${dir}/`);
  }
  fs.mkdirSync(fullPath, { recursive: true });
  console.log(`📁 Created: ${dir}/`);
});

console.log('[OK] Pre-run cleanup complete\n');
