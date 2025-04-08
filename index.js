#!/usr/bin/env node

import prompts from 'prompts';
import chalk from 'chalk';
import simpleGit from 'simple-git';
import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

import { configureCli } from './lib/configure-cli.js';
import { getVendorConfig } from './lib/config.js';
import { scaffoldTemplate } from './lib/copy-template.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const args = process.argv.slice(2);

// Handle `cj-create config`
if (args.includes('config')) {
  await configureCli();
  process.exit(0);
}

console.log(chalk.blueBright('\n🚀 CJ Project Starter\n'));

const response = await prompts([
  { type: 'text', name: 'projectName', message: 'Project name:' },
  {
    type: 'select',
    name: 'type',
    message: 'Project type:',
    choices: [
      { title: 'WordPress Plugin', value: 'wp-plugin' },
      { title: 'Block Theme', value: 'wp-theme' },
      { title: 'React App', value: 'react' },
      { title: 'Static Site', value: 'static' },
      { title: 'Game', value: 'game' },
    ],
  },
  {
    type: 'toggle',
    name: 'private',
    message: 'Private GitHub repo?',
    initial: true,
    active: 'yes',
    inactive: 'no',
  },
]);

const { projectName, type, private: isPrivate } = response;
const projectDir = path.resolve(__dirname, '..', projectName);

const vendorConfig = await getVendorConfig();

// Load type-specific prompts
const typePromptModules = {
  'wp-plugin': './templates/wp-plugin/config.js',
  // Add other types here
};

let typeAnswers = {};
try {
  const modulePath = typePromptModules[type];
  if (modulePath) {
    const { questions } = await import(modulePath);
    typeAnswers = await prompts(questions);
  }
} catch (err) {
  console.warn(`⚠️ No custom prompts found for project type "${type}"`);
}

// Merge all inputs
const replacements = {
  PROJECT_NAME: projectName,
  ...typeAnswers,
  VENDOR_NAME: vendorConfig.vendorName,
};

// Scaffold files from the chosen template
await scaffoldTemplate(type, projectName, projectDir, replacements);

// Initialize Git
const git = simpleGit();
await git.init();
await git.add('.');
await git.commit('Initial commit');

// Create GitHub repository and push
execSync(`gh repo create ${projectName} --${isPrivate ? 'private' : 'public'} --source=. --push`, {
  stdio: 'inherit',
});

console.log(chalk.greenBright(`\n✅ ${projectName} initialized and pushed to GitHub.\n`));