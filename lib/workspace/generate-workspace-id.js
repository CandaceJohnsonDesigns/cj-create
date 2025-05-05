import { generateId } from '../utils/initialize-identity.js';

/**
 * @function generateWorkspaceId
 * @description Delegates to generateId('workspace') to get a workspace ID.
 *
 * @returns {Promise<{ id: string, source: string }>} An object containing the generated ID and its source.
 * @example
 * const { id, source } = await generateWorkspaceId();
 * @since 0.1.0
 */
export const generateWorkspaceId = async () => {
  const { id, source } = await generateId('workspace');
  return { id, source };
};
