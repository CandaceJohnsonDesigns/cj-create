import path from 'path';
import fs from 'fs-extra';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const replaceInFile = async (filePath, replacements) => {
  let content = await fs.readFile(filePath, 'utf8');
  for (const [placeholder, value] of Object.entries(replacements)) {
    const token = '[[${placeholder}]]';
    content = content.replaceAll(token, value);
  }
  await fs.writeFile(filePath, content);
};

export const scaffoldTemplate = async (type, projectName, destinationPath) => {
  const templatePath = path.join(__dirname, '..', 'templates', type);
  await fs.copy(templatePath, destinationPath);

  if (type === 'wp-plugin') {
    // Plugin slug is the lowercase version of the project name with spaces replaced by hyphens
    const pluginSlug = projectName.toLowerCase().replace(/\s+/g, '-');
    
    const oldPluginFile = path.join(destinationPath, 'plugin-name.php');
    const newPluginFile = path.join(destinationPath, `${pluginSlug}.php`);

    if (await fs.pathExists(oldPluginFile)) {
      await fs.rename(oldPluginFile, newPluginFile);
      await replaceInFile(newPluginFile, {
        'PLUGIN_NAME': projectName,
        'PLUGIN_SLUG': pluginSlug,
        'AUTHOR_NAME': 'Candace Johnson',
      });
    }
  }

  console.log(`📂 Template "${type}" scaffolded to ${destinationPath}`);
};
