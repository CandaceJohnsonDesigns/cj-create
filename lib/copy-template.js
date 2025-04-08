import path from 'path';
import fs from 'fs-extra';
import { fileURLToPath } from 'url';
import { globby } from 'globby';
import { formatPhpNamespace } from './formatters';
import { config } from 'process';

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

  if (type === 'wp-plugin') {
    const pluginSlug = replacements.PLUGIN_SLUG || projectName.toLowerCase().replace(/\s+/g, '-');

    const pluginName = replacements.PLUGIN_NAME || projectName;
    const packageName = formatPhpNamespace(config.vendorName, pluginName);

    const oldPluginFile = path.join(destinationPath, 'plugin-name.php');
    const newPluginFile = path.join(destinationPath, `${pluginSlug}.php`);

    if (await fs.pathExists(oldPluginFile)) {
      await fs.rename(oldPluginFile, newPluginFile);
    }

    // Update replacements
    replacements.PLUGIN_NAMESPACE = packageName;
    replacements.PLUGIN_SLUG = pluginSlug;
  }

  await replacePlaceholdersInAllFiles(destinationPath, replacements);

  console.log(`Template "${type}" scaffolded to ${destinationPath}`);
};
