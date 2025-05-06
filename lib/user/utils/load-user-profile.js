import fs from 'fs-extra';
import path from 'path';
import os from 'os';

const usersDir = path.join(os.homedir(), '.cj-create', 'users');

/**
 * @function loadUserProfile
 * @description Loads a single user profile by user ID from the secure local profile directory.
 * This wrapper ensures future flexibility (e.g., switching to remote fetch or permission filtering).
 *
 * @param {string} userId - The ID of the user to load (e.g., 'user_local_abc123').
 * @returns {Promise<Object>} The parsed user profile object.
 * @throws Will throw if the file is not found or unreadable.
 *
 * @example
 * const user = await loadUserProfile('user_local_abc123');
 */
export const loadUserProfile = async (userId) => {
  const filePath = path.join(usersDir, `${userId}.json`);

  try {
    return await fs.readJson(filePath);
  } catch (err) {
    throw new Error(`Failed to load user profile for '${userId}': ${err.message}`);
  }
};