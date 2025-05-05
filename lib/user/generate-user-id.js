import { generateId } from '../utils/generate-id.js';

/**
 * @function generateUserId
 * @description Delegates to generateId('user') to get a user ID.
 *
 * @returns {Promise<{ id: string, source: string }>} An object containing the generated ID and its source.
 * @example
 * const { id, source } = await generateUserId();
 * console.log(id); // '123e4567-e89b-12d3-a456-426614174000'
 * @since 0.1.0
 */
export const generateUserId = async () => {
  const { id, source } = await generateId('user');
  return { id, source };
};