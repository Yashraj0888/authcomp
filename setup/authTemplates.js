const fs = require('fs');
const path = require('path');
const { copyFile } = require('../utils/fileOperations');
const { installPackage } = require('../utils/installUtils');

async function setupAuthTemplates() {
  try {
    const templateFiles = [
      {
        src: path.join(__dirname, '..', 'src', 'templates', 'middleware.ts'),
        dest: path.join(process.cwd(), 'middleware.ts')
      },
      {
        src: path.join(__dirname, '..', 'src', 'templates', 'utils', 'auth.ts'),
        dest: path.join(process.cwd(), 'utils', 'auth.ts')
      },
      {
        src: path.join(__dirname, '..', 'src', 'templates', 'utils', 'db.ts'),
        dest: path.join(process.cwd(), 'utils', 'db.ts')
      },
      {
        src: path.join(__dirname, '..', 'src', 'templates', 'utils', 'email.ts'),
        dest: path.join(process.cwd(), 'utils', 'email.ts')
      },
      {
        src: path.join(__dirname, '..', 'src', 'templates', 'types', 'next-auth.d.ts'),
        dest: path.join(process.cwd(), 'types', 'next-auth.d.ts')
      },
      {
        src: path.join(__dirname, '..', 'src', 'templates', 'app', 'api', 'auth', 'request-otp', 'route.ts'),
        dest: path.join(process.cwd(), 'app', 'api', 'auth', 'request-otp', 'route.ts')
      },
      
      
    ];

    // Create necessary directories and copy files
    for (const file of templateFiles) {
      // Create directory if it doesn't exist
      const destDir = path.dirname(file.dest);
      if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true });
      }
      
      // Copy file - the copyFile function now handles file conflicts internally
      copyFile(file.src, file.dest);
      console.log(`\x1b[32m✓ Created ${path.relative(process.cwd(), file.dest)}\x1b[0m`);
    }

    // Update package.json to add nodemailer dependency if not present
    const packageJsonPath = path.join(process.cwd(), 'package.json');
    if (fs.existsSync(packageJsonPath)) {
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
      if (!packageJson.dependencies?.nodemailer) {
        await installPackage('nodemailer @types/nodemailer');
      }
    }

    console.log('\x1b[32m✓ Auth templates setup completed!\x1b[0m');
    return true;
  } catch (error) {
    console.error('\x1b[31mError setting up auth templates:\x1b[0m', error);
    return false;
  }
}

module.exports = {
  setupAuthTemplates
};
