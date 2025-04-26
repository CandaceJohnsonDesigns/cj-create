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
    // No alert-config.json found, fallback silently by using global defaults
    return { 
        config: { ...DEFAULTS.alertConfig },
        source: 'default'
    };
  }

  try {
    const projectConfig = await fs.readJson(configPath);

    return { 
        config: {
            ...DEFAULTS.alertConfig, // fallback to global defaults
            ...projectConfig         // user-defined project overrides
        },
        source: 'custom'
    };
  } catch (error) {
    console.warn(`⚠️ Warning: Found alert-config.json in ${projectRoot}, but it could not be read. Falling back to defaults.`);
    console.warn(error.message);
    return { 
        config: { ...DEFAULTS.alertConfig },
        source: 'default'
    };
  }
}