import { loadAlertConfig } from '../lib/loadAlertConfig.js';

// TODO: Modify this once workspace support is complete
// Currently assumes scanning the current working directory
const projectRoot = process.cwd(); 
const { config: alertConfig, source: configSource } = await loadAlertConfig(projectRoot);

// Log based on source
if (configSource === 'custom') {
  console.log('🔧 Using custom alert-config.json settings.');
} else {
  console.log('🔧 Using fallback default alert settings.');
}

// Then also log the file extensions
console.log(`🔎 Scanning file extensions: ${alertConfig.fileExtensions.join(', ')}`);
