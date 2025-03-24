const fs = require('fs');
const path = require('path');
const { copyFile } = require('../utils/fileOperations');

async function setupHomePage() {
  try {
    const possiblePaths = [
      path.join(__dirname, '..', 'src', 'page.tsx'),
      path.join(__dirname, '..', 'dist', 'page.js'),
      path.join(__dirname, '..', 'dist', 'page.tsx'),
      path.join(__dirname, '..', 'src', 'components', 'page.tsx')
    ];

    const possibleGlobalCssPaths = [
      path.join(__dirname, '..', 'src', 'globals.css'),
      path.join(__dirname, '..', 'dist', 'globals.css'),
      path.join(__dirname, '..', 'src', 'components', 'globals.css')
    ];

    let sourcePath = findExistingPath(possiblePaths);

    if (!sourcePath) {
      console.error('\x1b[31mError: Could not find page.tsx file in any of the expected locations.\x1b[0m');
      console.error('\x1b[33mPlease check your package structure and try again.\x1b[0m');
      return false;
    }

    const destinationPath = path.join(process.cwd(), 'app', 'page.tsx');
    
    // The copyFile function now handles file conflicts internally
    copyFile(sourcePath, destinationPath);
    
    if (path.extname(sourcePath) === '.js' && !destinationPath.endsWith('.tsx')) {
      fs.renameSync(destinationPath, path.join(path.dirname(destinationPath), 'page.tsx'));
      console.log(`\x1b[32m✅ Renamed ${destinationPath} to ${path.join(path.dirname(destinationPath), 'page.tsx')}\x1b[0m`);
    }

    let globalCssPath = findExistingPath(possibleGlobalCssPaths);

    if (globalCssPath) {
      const globalCssDestPath = path.join(process.cwd(), 'app', 'globals.css');
      copyFile(globalCssPath, globalCssDestPath);

      updateLayoutWithCssImport();
      console.log('\x1b[32m✓ Global CSS setup completed!\x1b[0m');
    } else {
      console.log('\x1b[33mWarning: Could not find globals.css file. Skipping global CSS setup.\x1b[0m');
    }
    
    console.log('\x1b[32m%s\x1b[0m', '✓ Homepage successfully updated!');
    return true;
  } catch (error) {
    console.error('\x1b[31mError setting up homepage:\x1b[0m', error);
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
  const layoutPath = path.join(process.cwd(), 'app', 'layout.jsx');
  if (fs.existsSync(layoutPath)) {
    let layoutContent = fs.readFileSync(layoutPath, 'utf8');
    if (!layoutContent.includes('./globals.css')) {
      layoutContent = `import './globals.css';\n${layoutContent}`;
      fs.writeFileSync(layoutPath, layoutContent);
      console.log('\x1b[32m✓ Added globals.css import to layout.jsx\x1b[0m');
    }
  }
}

module.exports = {
  setupHomePage
};
