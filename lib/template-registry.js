// templateRegistry.js
import { scaffoldWpPlugin } from './scaffold-wp-plugin.js';
// future: import { scaffoldReactApp } from './scaffold-react-app.js';

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
