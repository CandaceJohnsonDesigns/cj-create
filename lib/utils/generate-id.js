import { v4 as uuidv4 } from 'uuid';

/**
 * @function generateId
 * @description Asynchronously generates a UUID for the given entity type.
 * This utility centralizes ID generation and is designed to support future
 * integration with cloud-based ID services without breaking legacy behavior.
 *
 * @param {'user' | 'project' | 'workspace'} type - The type of entity the ID is for.
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