#!/usr/bin/env node

import prompts from 'prompts';
import chalk from 'chalk';
import simpleGit from 'simple-git';
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

console.log(chalk.blueBright('\n🚀 CJ Project Starter\n'));

// Needed to get __dirname in ESM
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

// Create and move into new project folder
fs.mkdirSync(projectDir);
process.chdir(projectDir);

// Write default files
fs.writeFileSync('README.md', `# ${projectName}\n\nStarter project (${type})`);
fs.writeFileSync('.gitignore', 'node_modules/\ndist/\n.env\n');

const git = simpleGit();
await git.init();
await git.add('.');
await git.commit('Initial commit');

execSync(`gh repo create ${projectName} --${isPrivate ? 'private' : 'public'} --source=. --push`, {
  stdio: 'inherit',
});

console.log(chalk.greenBright(`\n✅ ${projectName} initialized and pushed to GitHub.\n`));