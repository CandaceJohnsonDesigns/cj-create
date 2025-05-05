import fs from 'fs-extra';
import path from 'path';
import os from 'os';

const usersDir = path.join(os.homedir(), '.cj-create', 'users');

/**
 * Loads all local user profile files from the secure directory.
 * In the future, this function can be updated to pull from a cloud or shared system.
 *
 * @returns {Promise<Array<Object>>} An array of parsed user profile objects.
 */
export const loadAllUserProfiles = async () => {
  // Get the list of files in the users directory
  const files = await fs.readdir(usersDir);
  const users = [];

  // Filter and read only JSON files
  for (const file of files) {
    if (file.endsWith('.json')) {
      const filePath = path.join(usersDir, file);
      try {
        // Read and parse the JSON file
        const data = await fs.readJson(filePath);
        // Add the parsed data to the users array
        users.push(data);
        
      } catch (err) {
        console.warn(`Could not load user file: ${filePath}`);
      }
    }
  }

  return users;
};