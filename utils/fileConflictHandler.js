const fs = require('fs');
const path = require('path');

/**
 * Handles file conflicts by renaming existing files and creating new ones
 * @param {string} targetPath - The path where we want to create a new file
 * @returns {string} - The path that is safe to use (either original or a new one if conflict was resolved)
 */
function handleFileConflict(targetPath) {
  if (!fs.existsSync(targetPath)) {
    return targetPath; // No conflict, return original path
  }

  // Get file information
  const dirName = path.dirname(targetPath);
  const baseName = path.basename(targetPath);
  const extName = path.extname(targetPath);
  const nameWithoutExt = baseName.replace(extName, '');

  // Create new names
  const oldFileName = `${nameWithoutExt}.old${extName}`;
  const oldFilePath = path.join(dirName, oldFileName);

  console.log(`\x1b[33mFile conflict detected: ${targetPath}\x1b[0m`);
  console.log(`\x1b[33mRenaming existing file to: ${oldFilePath}\x1b[0m`);

  // Rename the existing file to .old
  fs.renameSync(targetPath, oldFilePath);
  
  return targetPath; // Return the original path which is now free to use
}

module.exports = {
  handleFileConflict
};
