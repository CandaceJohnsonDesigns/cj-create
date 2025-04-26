import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const configPath = path.join(__dirname, '..', 'config.json');

const defaults = {
  vendorName: 'Your Vendor Name',
  alertConfig: {
    fileExtensions: ['.js', '.php', '.html', '.css'],
  },
};

export const getVendorConfig = async () => {
  try {
    const config = await fs.readJson(configPath);
    return { ...defaults, ...config };
  } catch {
    return defaults;
  }
};

/// Function to save the vendor configuration
export const saveVendorConfig = async (data) => {
  const config = { ...defaults, ...data };
  await fs.writeJson(configPath, config, { spaces: 2 });
  console.log('✅ Config saved to config.json');
};

