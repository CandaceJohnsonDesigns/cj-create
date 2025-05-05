import { v4 as uuidv4 } from 'uuid';

/**
 * @function generateId
 * @description Asynchronously generates a UUID for the given entity type.
 * This utility centralizes ID generation and is designed to support future
 * integration with cloud-based ID services without breaking legacy behavior.
 *
 * @param {'user' | 'project' | 'workspace' | 'vendor'} type - The type of entity the ID is for.
 * @returns {Promise<{ id: string, source: string, type: string }>} An object containing the ID, its source, and type.
 * @example
 * const { id, source, type } = await generateId('user');
 * console.log(id); // e.g., '123e4567-e89b-12d3-a456-426614174000'
 * @since 0.2.0
 */
export const generateId = async (type) => {
  return {
    id: uuidv4(),
    source: 'local',
    type
  };
};

/**
 * @function generateRoles
 * @description Generates a role map assigning the owner to the "admin" role,
 * and includes additional roles passed in. This is used to initialize permission structures
 * for new resources such as users, projects, vendors, or workspaces.
 *
 * It does not assume default roles beyond "admin" to support entity-specific role structures.
 *
 * @param {string} ownerId - The ID to assign as the administrator.
 * @param {string[]} additionalRoles - Array of additional role names (e.g., ['editor', 'viewer']).
 * @returns {Object} A roles object with the owner assigned to 'admin' and other roles initialized as empty arrays.
 * @example
 * const roles = generateRoles('user_local_abc', ['editor', 'reviewer']);
 * // => { admin: ['user_local_abc'], editor: [], reviewer: [] }
 * @since 0.3.1
 */
export const generateRoles = (ownerId, additionalRoles = []) => {
    const roles = {
      admin: [ownerId]
    };
  
    additionalRoles.forEach(role => {
      if (!roles[role]) roles[role] = [];
    });
  
    return roles;
  };  