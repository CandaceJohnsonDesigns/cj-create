import path from 'path';
import fs from 'fs-extra';
import { config } from '../../../config.js';
import { formatPhpNamespace } from '../../../utils/formatters.js';

export const scaffoldWpPlugin = async ({ projectName, destinationPath, replacements }) => {
    const pluginSlug = replacements.PLUGIN_SLUG || projectName.toLowerCase().replace(/\s+/g, '-');
    const pluginName = replacements.PLUGIN_NAME || projectName;
    const packageName = formatPhpNamespace(config.vendorName, pluginName);
  
    const oldPluginFile = path.join(destinationPath, 'plugin-name.php');
    const newPluginFile = path.join(destinationPath, `${pluginSlug}.php`);
  
    if (await fs.pathExists(oldPluginFile)) {
      await fs.rename(oldPluginFile, newPluginFile);
    }
  
    // Mutating the passed-in replacements object with plugin-specific values
    replacements.PLUGIN_NAMESPACE = packageName;
    replacements.PLUGIN_SLUG = pluginSlug;
    replacements.DATE_CREATED = new Date().toISOString().split('T')[0];

  
    return {
      expectedFiles: [
        'alert-config.json',
        '.cjproject.json',
        `${pluginSlug}.php`,
        'README.md'
      ],
      postInstallTasks: null // Add if needed later
    };
  };
  