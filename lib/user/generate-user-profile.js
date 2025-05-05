import { generateId } from '../utils/initialize-identity.js';
import { hasAnySuperAdmin } from './utils/has-any-super-admin.js';
import fs from 'fs-extra';
import path from 'path';
import os from 'os';

const usersDir = path.join(os.homedir(), '.cj-create', 'users');

/**
 * @function generateUserProfile
 * @description Generates a secure local user profile with a unique ID.
 * If no super-admin exists in the system, this user is promoted to super-admin.
 *
 * Future versions can replace or extend this logic with cloud authentication and remote role assignment.
 *
 * @param {string} username - The user's system-wide username (used for CLI context).
 * @param {string} fullName - The user's full name.
 * @returns {Promise<Object>} The created user profile object.
 */
export const generateUserProfile = async (username, fullName) => {
  // Generate a unique user ID
  const { id: userId } = await generateId('user');

  const roles = {
    global: {}
  };

  // Check if any super-admin exists before assigning the role
  if (!(await hasAnySuperAdmin())) {
    roles.global['super-admin'] = true;
  }

  // Create the user profile object
  const userProfile = {
    userId,
    username,
    fullName,
    roles,
    createdAt: new Date().toISOString()
  };

  // Build the user file path
  const userPath = path.join(usersDir, `${userId}.json`);

  // Ensure the directory exists and write the user profile to a file
  await fs.ensureDir(usersDir);
  await fs.writeJson(userPath, userProfile, { spaces: 2 });

  // Set the file permissions to be secure
  await fs.chmod(userPath, 0o600); // Read and write permissions for the user only

  return userProfile;
};