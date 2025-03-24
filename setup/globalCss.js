const fs = require('fs');
const path = require('path');
const { handleFileConflict } = require('../utils/fileConflictHandler');

async function setupGlobalCss() {
  try {
    const possiblePaths = [
      path.join(__dirname, '..', 'src', 'globals.css'),
      path.join(__dirname, '..', 'dist', 'globals.css'),
      path.join(__dirname, '..', 'src', 'components', 'globals.css')
    ];

    let sourcePath = findExistingPath(possiblePaths);

    if (!sourcePath) {
      console.error('\x1b[31mError: Could not find globals.css file.\x1b[0m');
      return false;
    }

    const ourGlobalCss = fs.readFileSync(sourcePath, 'utf8');
    const userGlobalCssPath = path.join(process.cwd(), 'app', 'globals.css');
    
    // If user's globals.css exists, back it up
    if (fs.existsSync(userGlobalCssPath)) {
      const backupPath = handleFileConflict(userGlobalCssPath);
      console.log('\x1b[33mBacked up existing globals.css to globals.old.css\x1b[0m');
    }

    // Make sure the app directory exists
    const appDir = path.dirname(userGlobalCssPath);
    if (!fs.existsSync(appDir)) {
      fs.mkdirSync(appDir, { recursive: true });
    }

    // Write our globals.css content
    fs.writeFileSync(userGlobalCssPath, ourGlobalCss);
    console.log('\x1b[32m✓ Updated globals.css with Aganitha styles\x1b[0m');

    updateLayoutWithCssImport();
    return true;
  } catch (error) {
    console.error('\x1b[31mError setting up global CSS:\x1b[0m', error);
    return false;
  }
}

function findExistingPath(paths) {
  for (const testPath of paths) {
    if (fs.existsSync(testPath)) {
      return testPath;
    }
  }
  return null;
}

function updateLayoutWithCssImport() {
  const layoutPath = path.join(process.cwd(), 'app', 'layout.tsx');
  if (fs.existsSync(layoutPath)) {
    let layoutContent = fs.readFileSync(layoutPath, 'utf8');
    if (!layoutContent.includes('./globals.css')) {
      layoutContent = `import './globals.css';\n${layoutContent}`;
      fs.writeFileSync(layoutPath, layoutContent);
      console.log('\x1b[32m✓ Added globals.css import to layout.tsx\x1b[0m');
    }
  }
}

module.exports = {
  setupGlobalCss
};
