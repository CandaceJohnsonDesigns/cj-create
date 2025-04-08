#!/usr/bin/env node

import prompts from 'prompts';
import chalk from 'chalk';
import simpleGit from 'simple-git';
import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import { scaffoldTemplate } from './lib/copy-template.js';

console.log(chalk.blueBright('\n🚀 CJ Project Starter\n'));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

// Scaffold files from the chosen template
await scaffoldTemplate(type, projectName, projectDir);

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