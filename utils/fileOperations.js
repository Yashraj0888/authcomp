const fs = require('fs');
const path = require('path');
const { handleFileConflict } = require('./fileConflictHandler');

// Function to copy a file from source to destination
function copyFile(src, dest) {
  // Handle file conflicts before copying
  dest = handleFileConflict(dest);
  
  // Ensure the destination directory exists
  const destDir = path.dirname(dest);
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }
  
  // Copy the file
  fs.copyFileSync(src, dest);
  console.log(`\x1b[32m✅ Successfully copied ${src} to ${dest}\x1b[0m`);
}

module.exports = {
  copyFile
};
