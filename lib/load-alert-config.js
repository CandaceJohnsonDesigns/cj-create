import fs from 'fs-extra';
import path from 'path';
import { DEFAULTS } from './config.js';

/**
 * Load the alert configuration for the given project. 
 * If no user-defined alert-config.json is found in the project root, 
 * fallback to global defaults.
 * 
 * @param {string} projectRoot - Absolute path to the project's root directory.
 * @return {Promise<{ config: Object, source: string }>} - The alert configuration and its source.
 */
export async function loadAlertConfig(projectRoot) {
  const configPath = path.join(projectRoot, 'alert-config.json');

  // Check if a user generated alert-config.json file exists in the project root
  const exists = await fs.pathExists(configPath);
  if (!exists) {
    // No alert-config.json found, fallback silently by using global alert configuration defaults
    return { 
        config: { ...DEFAULTS.alertConfig },
        source: 'default'
    };
  }

  try {
    const projectConfig = await fs.readJson(configPath);

    // Copy the global default alert configuration
    const mergedConfig = { ...DEFAULTS.alertConfig };

    // Merge project config with default config unless explicitly told otherwise
    const shouldMerge = userConfig.mergeDefaults !== false;

    if ( projectConfig.mergeDefaults ) {
      
      // Merge the user-defined alert config for file extensions with the global defaults
      if (userConfig.fileExtensions) {
        mergedConfig.fileExtensions = [
          ...new Set([...mergedConfig.fileExtensions, ...projectConfig.fileExtensions])
        ];
      }

      // Merge the user-defined alert configuration for ignored directories with the global defaults
      if (userConfig.ignoredDirectories) {
        mergedConfig.ignoredDirectories = [
          ...new Set([...mergedConfig.ignoredDirectories, ...projectConfig.ignoredDirectories])
        ];
      }
    } else {

      // Override the defaults with user-defined project config
      Object.assign(mergedConfig, projectConfig);
    }

    // Return merged alertConfig with fileExtensions, ignoredDirectories, 
    // and other future options
    return { 
        config: mergedConfig,
        source: 'custom'
    };

  } catch (error) {

    console.warn(`⚠️ Warning: Found alert-config.json in ${projectRoot}, 
      but it could not be read. Falling back to defaults.`);
    console.warn(error.message);

    // Fallback to the default global alert config
    return { 
        config: { ...DEFAULTS.alertConfig },
        source: 'default'
    };
  }
}