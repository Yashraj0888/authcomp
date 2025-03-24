const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

async function createNextApp(rl) {
  try {
    console.log('\x1b[33mCreating new Next.js application...\x1b[0m');
    
    // Ask for the app name
    const appNameQuestion = () => {
      return new Promise((resolve) => {
        rl.question('Enter a name for your Next.js application: ', (name) => {
          resolve(name || 'my-next-app');
        });
      });
    };
    
    const appName = await appNameQuestion();
    
    console.log(`\x1b[33mCreating Next.js app "${appName}"...\x1b[0m`);
    
    // Create a temporary script file to execute
    const tempScriptPath = path.join(process.cwd(), 'create-next-temp.js');
    
    const scriptContent = `
      const { execSync } = require('child_process');
      
      try {
        console.log('Creating Next.js app using direct Node.js execution...');
        execSync('npx --yes create-next-app@latest ${appName}', { 
          stdio: 'inherit',
          shell: true 
        });
        console.log('Next.js app creation completed successfully');
        process.exit(0);
      } catch (error) {
        console.error('Error creating Next.js app:', error.message);
        process.exit(1);
      }
    `;
    
    fs.writeFileSync(tempScriptPath, scriptContent);
    
    try {
      execSync(`node "${tempScriptPath}"`, { 
        stdio: 'inherit',
        shell: true
      });
      
      console.log(`\x1b[32m✓ Successfully created Next.js app: ${appName}\x1b[0m`);
      
      try {
        fs.unlinkSync(tempScriptPath);
      } catch (err) {
        console.log('\x1b[33mNote: Could not remove temporary script file\x1b[0m');
      }
      
      try {
        process.chdir(appName);
        console.log(`\x1b[32m✓ Current directory: ${process.cwd()}\x1b[0m`);
      } catch (err) {
        console.log(`\x1b[31mWarning: Could not change directory to ${appName}. Continuing anyway...\x1b[0m`);
      }
      
      return true;
    } catch (error) {
      console.error('\x1b[31mError executing the Node.js script\x1b[0m');
      return await fallbackNextAppCreation(appName);
    }
  } catch (error) {
    console.error('\x1b[31mError creating Next.js application:\x1b[0m', error.message);
    return false;
  }
}

async function fallbackNextAppCreation(appName) {
  console.log('\x1b[33mFalling back to manual project creation...\x1b[0m');
  
  if (!fs.existsSync(appName)) {
    fs.mkdirSync(appName, { recursive: true });
  }
  
  process.chdir(appName);
  
  const packageJson = {
    name: appName,
    version: "0.1.0",
    private: true,
    scripts: {
      dev: "next dev",
      build: "next build",
      start: "next start"
    },
    dependencies: {
      next: "latest",
      react: "latest",
      "react-dom": "latest"
    }
  };
  
  fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));
  
  fs.mkdirSync('app', { recursive: true });
  fs.writeFileSync('app/page.jsx', `
export default function Home() {
  return (
    <main>
      <h1>Welcome to Next.js!</h1>
      <p>Get started by editing app/page.jsx</p>
    </main>
  )
}
  `);
  
  fs.writeFileSync('app/layout.jsx', `
export const metadata = {
  title: 'Next.js App',
  description: 'Created with Next.js',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
  `);
  
  console.log('\x1b[32m✓ Created basic Next.js project structure\x1b[0m');
  console.log('\x1b[33mNote: You will need to run "npm install" to install dependencies\x1b[0m');
  
  return true;
}

module.exports = {
  createNextApp
};
