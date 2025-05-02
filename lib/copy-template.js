import path from 'path';
import fs from 'fs-extra';
import { fileURLToPath } from 'url';
import { globby } from 'globby';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Replaces all [[PLACEHOLDER]] tokens in a file with given values.
 */
const replaceInFile = async (filePath, replacements) => {
  let content = await fs.readFile(filePath, 'utf8');
  for (const [placeholder, value] of Object.entries(replacements)) {
    const token = `[[${placeholder}]]`;
    content = content.replaceAll(token, value);
  }
  await fs.writeFile(filePath, content);
};

/**
 * Recursively replaces all placeholders in all files of the destination folder.
 * 
 * @param {string} destinationPath - The path to the destination folder.
 * @param {Object} replacements - An object containing placeholder replacements.
 */
const replacePlaceholdersInAllFiles = async (destinationPath, replacements) => {
    const files = await globby(['**/*'], {
      cwd: destinationPath,
      absolute: true,
      onlyFiles: true,
      gitignore: true,
    });
  
    for (const file of files) {
      const ext = path.extname(file);

        // Skip image and font files
      if (!['.png', '.jpg', '.jpeg', '.gif', '.ico', '.woff', '.woff2'].includes(ext)) {
        await replaceInFile(file, replacements);
      }
    }
  };

/**
 * Scaffolds a template to the destination path.
 *
 * @param {string} type - The type of template to scaffold.
 * @param {string} projectName - The name of the project.
 * @param {string} destinationPath - The path to scaffold the template to.
 * @param {Object} replacements - An object containing placeholder replacements.
 */
export const scaffoldTemplate = async (type, projectName, destinationPath, replacements = {}) => {
  const templatePath = path.join(__dirname, '..', 'templates', type);
  await fs.copy(templatePath, destinationPath);
  
  // The files that are expected to be created by the template
  let expectedFiles = [];

  //
  const handler = getTemplateHandler(type);
  if (handler && handler.scaffold) {
    const result = await handler.scaffold({
      projectName,
      destinationPath,
      replacements
    });

    expectedFiles = result?.expectedFiles || [];

    // If the template has a post-install task, execute it
    if (typeof result?.postInstallTasks === 'function') {
      await result.postInstallTasks({ destinationPath, projectName, replacements });
    }
  }

  await replacePlaceholdersInAllFiles(destinationPath, replacements);

  // Log confirmation of the scaffolded files
  await logScaffoldedFiles(type, destinationPath, expectedFiles);
};
