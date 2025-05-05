import { generateId } from '../utils/initialize-identity.js';

/**
 * @function generateProjectId
 * @description Delegates to generateId('project') to get a project ID.
 *
 * @returns {Promise<{ id: string, source: string }>} An object containing the generated ID and its source.
 * @example
 * const { id, source } = await generateProjectId();
 * @since 0.1.0
 */
export const generateProjectId = async () => {
  const { id, source } = await generateId('project');
  return { id, source };
};