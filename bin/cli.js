#!/usr/bin/env node

const readline = require('readline');
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');
const { installDependencies, installPackage } = require('../utils/installUtils');
const { setupHomePage } = require('../setup/homePage');
const { setupGlobalCss } = require('../setup/globalCss');
const { setupAuth } = require('../setup/auth');
const { setupAuthTemplates } = require('../setup/authTemplates');
const { setupPublicAssets } = require('../setup/setupPublicAssets');

// Create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Function to ask a question and get user input
function askQuestion(question, defaultAnswer = 'y') {
  const defaultText = defaultAnswer ? ` (${defaultAnswer})` : '';
  return new Promise((resolve) => {
    rl.question(`${question}${defaultText}: `, (answer) => {
      const trimmedAnswer = answer.trim().toLowerCase();
      resolve(trimmedAnswer || defaultAnswer.toLowerCase());
    });
  });
}

async function installNextJs() {
  console.log('\x1b[36m%s\x1b[0m', 'Creating Next.js app...');
  try {
    // Ask for app name with default
    const appName = await askQuestion('Enter your app name', 'Aganitha app');
    const sanitizedAppName = appName.toLowerCase().replace(/\s+/g, '-');

    // Add all default presets to the create-next-app command
    execSync(`npx create-next-app@latest ${sanitizedAppName} --typescript --tailwind --eslint --app --no-src-dir --turbopack --import-alias="@/*"`, { 
      stdio: 'inherit',
      cwd: process.cwd()
    });

    // Change directory to the newly created app
    process.chdir(sanitizedAppName);
    return true;
  } catch (error) {
    console.error('\x1b[31mFailed to create Next.js app:\x1b[0m', error);
    return false;
  }
}

async function installAuthComp() {
  console.log('\x1b[36m%s\x1b[0m', 'Installing authcomp...');
  try {
    // Use installPackage from installUtils
    const success = await installPackage('@aganitha/authentication-component@latest');
    if (!success) {
      throw new Error('Failed to install authcomp');
    }
    return true;
  } catch (error) {
    console.error('\x1b[31mFailed to install authcomp:\x1b[0m', error);
    return false;
  }
}

async function main() {
  try {
    console.log('\x1b[36m%s\x1b[0m', 'Starting Next.js Authentication Component Setup...');

    // Step 1: Install Next.js
    const nextInstalled = await installNextJs();
    if (!nextInstalled) {
      console.error('\x1b[31mFailed to create Next.js application\x1b[0m');
      process.exit(1);
    }

    // Install required dependencies
    await installDependencies();

    // Step 2: Ask about authentication system
    console.log('\x1b[36m%s\x1b[0m', 'Do you want to install the authentication system?');
    console.log('This will install authcomp and set up authentication routes.');
    
    let answer = '';
    do {
      answer = await askQuestion('Install authentication? (Y/n)', 'y');
      // Convert to lowercase and trim
      answer = answer.toLowerCase().trim();
    } while (!['y', 'n', 'yes', 'no'].includes(answer));

    const installAuth = (answer === 'y' || answer === 'yes');
    
    if (installAuth) {
      // Step 2.1: Install authcomp
      console.log('\x1b[36m%s\x1b[0m', 'Installing authentication system...');
      const authInstalled = await installAuthComp();
      if (!authInstalled) {
        console.error('\x1b[31mFailed to install authentication component\x1b[0m');
        process.exit(1);
      }

      // Step 2.2: Ask about installing ldapjs
      console.log('\x1b[36m%s\x1b[0m', 'Do you want to install LDAP authentication support?');
      const ldapAnswer = await askQuestion('Install LDAP support? (Y/n)', 'y');
      const installLdap = (ldapAnswer === 'y' || ldapAnswer === 'yes');
      
      if (installLdap) {
        console.log('\x1b[36m%s\x1b[0m', 'Installing LDAP dependencies...');
        const ldapInstalled = await installPackage('ldapjs');
        if (!ldapInstalled) {
          console.error('\x1b[33mWarning: Failed to install ldapjs, but continuing with setup\x1b[0m');
        } else {
          console.log('\x1b[32m✓ LDAP dependencies installed successfully!\x1b[0m');
        }
      }

      // Step 2.3: Set up auth files and templates
      const authSetup = await setupAuth();
      if (!authSetup) {
        console.error('\x1b[31mFailed to set up authentication\x1b[0m');
        process.exit(1);
      }

      const authTemplatesSetup = await setupAuthTemplates();
      if (!authTemplatesSetup) {
        console.error('\x1b[31mFailed to set up authentication templates\x1b[0m');
        process.exit(1);
      }

      console.log('\x1b[32m%s\x1b[0m', '✓ Authentication system installed successfully!');
    } else {
      console.log('\x1b[33m%s\x1b[0m', 'Skipping authentication system installation.');
    }

    // Set up homepage and global CSS
    await setupHomePage();
    await setupGlobalCss();

    // Set up public assets
    const publicAssetsSetup = await setupPublicAssets();
    if (!publicAssetsSetup) {
      console.error('\x1b[31mFailed to set up public assets\x1b[0m');
      process.exit(1);
    }

    console.log('\x1b[32m%s\x1b[0m', '✨ Setup completed successfully!');
    
    if (installAuth) {
      console.log('Now Configure your OAuth providers in .env');

      console.log("Made with ❤️  by Yash/Rohan/Abhijeet @Aganitha");
    }

   

    rl.close();
  } catch (error) {
    console.error('\x1b[31mAn error occurred during setup:\x1b[0m', error);
    process.exit(1);
  }
}

// Ensure proper exit handling
process.on('SIGINT', () => {
  console.log('\n\x1b[33mSetup interrupted by user\x1b[0m');
  rl.close();
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n\x1b[33mSetup terminated\x1b[0m');
  rl.close();
  process.exit(0);
});

// Start the main execution
main();