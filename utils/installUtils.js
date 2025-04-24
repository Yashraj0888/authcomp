const { execSync } = require('child_process');

// Function to install required dependencies
async function installDependencies() {
  console.log('\x1b[36mInstalling required dependencies...\x1b[0m');
  try {
    // Install core dependencies
    const dependencies = [
      'sqlite3',
      'jose',
      '@aganitha/nav-bar@latest',
      'lucide-react',
      '@aganitha/authentication-component'
    ];

    for (const dep of dependencies) {
      console.log(`\x1b[33mInstalling ${dep}...\x1b[0m`);
      execSync(`npm install ${dep}`, { stdio: 'inherit' });
      console.log(`\x1b[32m✓ Successfully installed ${dep}\x1b[0m`);
    }

    console.log('\x1b[32m✓ All dependencies installed successfully!\x1b[0m');
    return true;
  } catch (error) {
    console.error('\x1b[31mError installing dependencies:\x1b[0m', error.message);
    return false;
  }
}

async function installPackage(packageName) {
  try {
    console.log(`\x1b[33mInstalling ${packageName}...\x1b[0m`);
    execSync(`npm install ${packageName}`, { stdio: 'inherit' });
    console.log(`\x1b[32m✓ Successfully installed ${packageName}\x1b[0m`);
    return true;
  } catch (error) {
    console.error(`\x1b[31mError installing ${packageName}:\x1b[0m`, error.message);
    return false;
  }
}

module.exports = {
  installDependencies,
  installPackage
};
