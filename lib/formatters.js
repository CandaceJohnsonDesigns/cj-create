/**
 * Converts a human-readable name into a valid PHP package/class namespace format.
 *
 * Examples:
 *   "Cool Plugin"       => "Cool_Plugin"
 *   "My SEO Tool!"      => "My_SEO_Tool"
 *   "Plugin-Generator!" => "PluginGenerator"
 */
export function formatPhpPackageName(name = '') {
    return name
      .trim()
      .replace(/[^a-zA-Z0-9\s]/g, '') // remove symbols (e.g. !@#)
      .replace(/\s+/g, '_');          // replace spaces with underscores
}

/**
 * Converts a human-readable vendor and plugin name into a valid PHP namespace format.
 * 
 * Example:    
 *   "Cool Vendor", "Cool Plugin"       => "CoolVendor\CoolPlugin"
 * 
 * @param {string} vendor - The vendor name who owns the plugin.
 * @param {string} pluginName - The plugin name.
 */

export function formatPhpNamespace(vendor = '', pluginName = '') {
    const sanitize = str =>
      str
        .trim()
        .replace(/[^a-zA-Z0-9\s]/g, '')
        .split(/\s+/)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join('');
  
    return `${sanitize(vendor)}\\${sanitize(pluginName)}`;
  }