import { generateId } from '../utils/generate-id.js';

/**
 * @function generateVendorId
 * @description Delegates to generateId('vendor') to get a vendor ID.
 *
 * @returns {Promise<{ id: string, source: string }>} An object containing the generated ID and its source.
 * @example
 * const { id, source } = await generateVendorId();
 * console.log(id); // '123e4567-e89b-12d3-a456-426614174000'
 * @since 0.1.0
 */
export const generateVendorId = async () => {
  const { id, source } = await generateId('vendor');
  return { id, source };
};