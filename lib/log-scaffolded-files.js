import path from 'path';
import fs from 'fs-extra';

/**
 * Logs creation confirmation for specified files if they exist.
 *
 * @param {string} type - The type of template scaffolded.
 * @param {string} destinationPath - The root path of the scaffolded project.
 * @param {string[]} files - The filenames to check and confirm.
 */
export const logScaffoldedFiles = async (type, destinationPath, files) => {
    console.log(`Template "${type}" scaffolded to ${destinationPath}`);
    console.log(`✔️  Files successfully created:`);
    for (const file of files) {
    const filePath = path.join(destinationPath, file);
    if (await fs.pathExists(filePath)) {
      console.log(`✔️  ${file} created`);
    } else {
      console.warn(`⚠️  ${file} was expected but not found`);
    }
  }
};
