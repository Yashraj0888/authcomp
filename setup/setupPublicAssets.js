const fs = require('fs');
const path = require('path');

async function setupPublicAssets() {
  try {
    console.log('\x1b[36mSetting up public assets...\x1b[0m');
    
    // Create public directory if it doesn't exist
    const publicDir = path.join(process.cwd(), 'public');
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    // Copy all images from template public folder to user's public folder
    const templatePublicDir = path.join(__dirname, '..', 'src', 'templates', 'public');
    const files = fs.readdirSync(templatePublicDir);

    for (const file of files) {
      const sourcePath = path.join(templatePublicDir, file);
      const destPath = path.join(publicDir, file);
      
      fs.copyFileSync(sourcePath, destPath);
      console.log(`\x1b[32m✓ Copied ${file} to public folder\x1b[0m`);
    }

    console.log('\x1b[32m✓ Public assets setup completed!\x1b[0m');
    return true;
  } catch (error) {
    console.error('\x1b[31mError setting up public assets:\x1b[0m', error.message);
    return false;
  }
}

module.exports = {
  setupPublicAssets
}; 