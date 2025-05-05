import { loadAllUserProfiles } from './load-all-user-profiles.js';

/**
 * Checks if any user in the system has been assigned the global 'super-admin' role.
 * Used to determine whether to automatically assign the role to a newly created user.
 *
 * This is future-proofed to work with local or remote user storage later.
 *
 * @returns {Promise<boolean>} True if a super-admin exists, false otherwise.
 */
export const hasAnySuperAdmin = async () => {
  const allUsers = await loadAllUserProfiles();
  return allUsers.some(
    (user) => user.roles?.global?.['super-admin'] === true
  );
};