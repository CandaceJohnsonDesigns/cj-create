import chalk  from "chalk";
import { buildValidatedPrompt } from "../../lib/prompt-utils";

export const questions = [
    buildValidatedPrompt({
        name: 'PLUGIN_NAME',
        message: 
            chalk.bold(`What is the plugin name?\n`) +
            chalk.dim(
                `The name of your plugin, which will be displayed 
                in the Plugins list in the WordPress Admin.`
            ),
        type: 'text',
    }),
    buildValidatedPrompt({
        name: 'PLUGIN_URI',
        message: 
            chalk.bold(`What is the plugin URI?\n`) +
            chalk.dim(
                `The home page of the plugin, which should be a unique URL, 
                preferably on your own website. This must be unique to your plugin. 
                You cannot use a WordPress.org URL here.`
            ),
        type: 'text',
        initial: answers => `https://example.com/${answers.PLUGIN_NAME.toLowerCase().replace(/\s+/g, '-')}`,
        validate: value => value.startsWith('http') || 'Must be a valid URL.',
    }),
    buildValidatedPrompt({
        name: 'PLUGIN_DESCRIPTION',
        message: 
            chalk.bold(`What is the plugin description?\n`) +
            chalk.dim(
                `A short description of the plugin, as displayed in the Plugins section 
                in the WordPress Admin. Keep this description to fewer than 140 characters.`
            ),
        type: 'text',
        validate: value => value.length <= 140 || 'Description must be fewer than 140 characters.',
    }),
    buildValidatedPrompt({ 
        name: 'PLUGIN_SLUG',
        message: 
            chalk.bold(`Plugin slug (e.g., "cool-plugin")?\n`) + 
            chalk.dim(
               `Must be:
               - lowercase letters or numbers
               - hyphen-separated`
            ),
        type: 'text',
        pattern: /^[a-z0-9\-]+$/,
        error: 'Only lowercase letters, numbers, and hyphens allowed.',
        initial: answers => answers.PLUGIN_NAME.toLowerCase().replace(/\s+/g, '-'),
    }),
    buildValidatedPrompt({
        name: 'PLUGIN_VERSION',
        message: 
            chalk.bold(`What is the plugin version?\n`) +
            chalk.dim(
                `The version of your plugin. This should be in the format X.X.X, 
                where X is a number.`
            ),
        type: 'text',
        initial: '1.0.0',
        pattern: /^\d+\.\d+\.\d+$/,
        error: 'Version must be in the format X.X.X.',
    }),
    buildValidatedPrompt({
        name: 'MIN_WORDPRESS_VERSION',
        message: 
            chalk.bold(`What is the minimum WordPress version?\n`) +
            chalk.dim(
                `The minimum version of WordPress required to run your plugin. 
                This should be in the format X.X.X, where X is a number.`
            ),
        type: 'text',
        pattern: /^\d+\.\d+\.\d+$/,
        error: 'Version must be in the format X.X.X.',
    }),
    buildValidatedPrompt({
        name: 'MIN_PHP_VERSION',
        message: 
            chalk.bold(`What is the minimum PHP version?\n`) +
            chalk.dim(
                `The minimum version of PHP required to run your plugin. 
                This should be in the format X.X.X, where X is a number.`
            ),
        type: 'text',
        pattern: /^\d+\.\d+\.\d+$/,
        error: 'Version must be in the format X.X.X.',
    }),
    buildValidatedPrompt({
        name: 'AUTHOR_NAMES',
        message: 'The name of the plugin author. Multiple authors may be listed using commas.',
        type: 'text',
        initial: 'Candace Johnson'
    }),
    buildValidatedPrompt({
        name: 'AUTHOR_URI',
        message: 
            chalk.bold(`What is the author URI?\n`) +
            chalk.dim(
                `The author\’s website or profile on another website, such as WordPress.org.`
            ),
        type: 'text',
        initial: answers => `https://author.example.com/`,
        validate: value => value.startsWith('http') || 'Must be a valid URL.',
    }),
    buildValidatedPrompt({
        name: 'CUSTOMIZE_LICENSE',
        message: 
            chalk.bold(`Would you like to customize the license?\n`) +
            chalk.dim(
                `The default license is GPL v2 or later. 
                If you choose not to customize the license, the default will be used.`
            ),
        type: 'toggle',
        initial: false,
        active: 'yes',
        inactive: 'no',
    }),
    buildValidatedPrompt({
        name: 'PLUGIN_LICENSE',
        message: 
            chalk.bold(`What is the plugin license?\n`) +
            chalk.dim(
                `The short name (slug) of the plugin\’s license (e.g. GPLv2). 
                More information about licensing can be found in the WordPress.org guidelines.`
            ),
        type: 'text',
        initial: 'GPL v2 or later',
    }),
    buildValidatedPrompt({
        name: 'PLUGIN_LICENSE_URI',
        message: 
            chalk.bold(`What is the plugin license URI?\n`) +
            chalk.dim(
                `A link to the full text of the license 
                (e.g. https://www.gnu.org/licenses/gpl-2.0.html)`
            ),
        type: 'text',
        initial: 'https://www.gnu.org/licenses/gpl-2.0.html',
        validate: value => value.startsWith('http') || 'Must be a valid URL.',
    }),
  ];
  