import { scaffoldWpPlugin } from './templates/wp-plugin.js';
// future: import { scaffoldReactApp } from './templates/react-app.js';

/**
 * Maps project types to their scaffolding handlers and metadata.
 * Used during initial project generation only.
 */

export const templateRegistry = {
  'wp-plugin': {
    scaffold: scaffoldWpPlugin,
    displayName: 'WordPress Plugin',
  },
  // Example future template:
  // 'react-app': {
  //   scaffold: scaffoldReactApp,
  //   displayName: 'React Application',
  // },
};

/**
 * Gets the template definition by type
 * @param {string} type
 * @returns {Object|null}
 */
export const getTemplateHandler = (type) => {
  return templateRegistry[type] || null;
};
