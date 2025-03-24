const fs = require('fs');
const path = require('path');
const { copyFile } = require('../utils/fileOperations');
const { envContent } = require('../config/constants');

async function setupAuth() {
  try {
    // Create the auth API route directory
    const routePath = path.join(process.cwd(), 'app', 'api', 'auth', '[...nextauth]');
    fs.mkdirSync(routePath, { recursive: true });

    // Create the login page directory
    const loginPath = path.join(process.cwd(), 'app', 'login');
    fs.mkdirSync(loginPath, { recursive: true });

    // Find the route file
    const possiblePaths = [
      path.join(__dirname, '..', 'src', 'templates', 'app', 'api', 'auth', '[...nextauth]', 'route.ts'),
      path.join(__dirname, '..', 'dist', 'templates', 'app', 'api', 'auth', '[...nextauth]', 'route.js'),
      path.join(__dirname, '..', 'src', 'route.ts'),
      path.join(__dirname, '..', 'dist', 'route.js')
    ];

    let sourcePath = findExistingPath(possiblePaths);

    if (!sourcePath) {
      console.error('\x1b[31mError: Could not find route file in any of the expected locations.\x1b[0m');
      console.error('\x1b[33mPlease check your package structure and try again.\x1b[0m');
      process.exit(1);
    }

    // Determine the correct destination file extension
    // If source is TypeScript, keep it as TypeScript
    const fileExtension = path.extname(sourcePath);
    const destinationPath = path.join(routePath, `route${fileExtension}`);
    
    try {
      copyFile(sourcePath, destinationPath);
      console.log(`\x1b[32m✅ Copied ${sourcePath} to ${destinationPath}\x1b[0m`);
    } catch (error) {
      console.error('\x1b[31mError copying route file:\x1b[0m', error);
      process.exit(1);
    }

    // Handle layout.tsx
    const layoutSourcePath = path.join(__dirname, '..', 'src', 'templates', 'app', 'layout.tsx');
    const layoutDistPath = path.join(__dirname, '..', 'dist', 'templates', 'app', 'layout.tsx');
    const layoutDestPath = path.join(process.cwd(), 'app', 'layout.tsx');
    
    // Check if layout.tsx already exists
    if (fs.existsSync(layoutDestPath)) {
      console.log('\x1b[33mExisting layout.tsx found, renaming to layout.old.tsx\x1b[0m');
      fs.renameSync(layoutDestPath, path.join(process.cwd(), 'app', 'layout.old.tsx'));
    }
    
    // Copy layout.tsx
    const layoutSource = fs.existsSync(layoutSourcePath) ? layoutSourcePath : layoutDistPath;
    if (fs.existsSync(layoutSource)) {
      copyFile(layoutSource, layoutDestPath);
      console.log(`\x1b[32m✅ Copied layout.tsx to ${layoutDestPath}\x1b[0m`);
    } else {
      console.error('\x1b[31mWarning: Could not find layout.tsx template.\x1b[0m');
    }
    
    // Handle login/page.tsx
    const loginPageSourcePath = path.join(__dirname, '..', 'src', 'templates', 'app', 'login', 'page.tsx');
    const loginPageDistPath = path.join(__dirname, '..', 'dist', 'templates', 'app', 'login', 'page.tsx');
    const loginPageDestPath = path.join(loginPath, 'page.tsx');
    
    // Copy login/page.tsx
    const loginPageSource = fs.existsSync(loginPageSourcePath) ? loginPageSourcePath : loginPageDistPath;
    if (fs.existsSync(loginPageSource)) {
      copyFile(loginPageSource, loginPageDestPath);
      console.log(`\x1b[32m✅ Copied login/page.tsx to ${loginPageDestPath}\x1b[0m`);
    } else {
      console.error('\x1b[31mWarning: Could not find login/page.tsx template.\x1b[0m');
    }

    // Create or update .env file
    await setupEnvFile();
    
    console.log('\x1b[32m✓ Authentication setup completed!\x1b[0m');
    return true;
  } catch (error) {
    console.error('\x1b[31mError setting up authentication:\x1b[0m', error);
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

async function setupEnvFile() {
  try {
    const envPath = path.join(process.cwd(), '.env');
    if (!fs.existsSync(envPath)) {
      fs.writeFileSync(envPath, envContent);
      console.log('\x1b[32m✓ Created .env file with default configuration\x1b[0m');
    } else {
      let existingEnv = fs.readFileSync(envPath, 'utf8');
      if (!existingEnv.includes('NEXTAUTH_SECRET')) {
        fs.appendFileSync(envPath, `\n\n${envContent}`);
        console.log('\x1b[32m✓ Updated existing .env file with authentication configuration\x1b[0m');
      } else {
        console.log('\x1b[33mAuthentication configuration already exists in .env file\x1b[0m');
      }
    }
  } catch (error) {
    console.error('\x1b[31mError setting up .env file:\x1b[0m', error);
    throw error;
  }
}

module.exports = {
  setupAuth
};
