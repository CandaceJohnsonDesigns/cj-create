import prompts from 'prompts';
import { getVendorConfig, saveVendorConfig } from './config.js';

export const configureCli = async () => {
  const current = await getVendorConfig();

  const responses = await prompts([
    {
      type: 'text',
      name: 'vendorName',
      message: 
            chalk.bold(`What is your vendor name?\n`) +
            chalk.dim(
                `A vendor name can be an organization or an individual's name such as the author.
                This will be used to establish ownership as well as the namespace for your project.`
            ),
      initial: current.vendorName || 'Your Vendor Name',
    },
    // Add more config fields here in the future
  ]);

  await saveVendorConfig(responses);
};
