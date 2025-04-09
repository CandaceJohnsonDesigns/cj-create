import fs from 'fs';
import path from 'path';
import { globby } from 'globby';
import chalk from 'chalk';
import { ALERT_TYPES } from '../lib/alert-types.js';

// Parse CLI flags passed in the command line
const args = process.argv.slice(2);

// Helper to get value from a flag (e.g. --type todo)
const getFlagValue = (flag) => {
  const index = args.findIndex(arg => arg === `--${flag}`);
  return index !== -1 ? args[index + 1] : null;
};

// Helper to check if a flag exists (boolean flags like --show-all)
const hasFlag = (flag) => args.includes(`--${flag}`);
const showHelp = hasFlag('help');

// Show help menu if --help is passed
if (showHelp) {
  console.log(`\nUsage: cj-create alerts [options]

Options:
  --type <value>     Filter by alert type(s) (e.g., todo, fixme, all)
                     Use comma-separated values for multiple types
  --level <value>    Filter by severity level (required, optional, all)
  --show-all         Shortcut for --level all
  --help             Show this help message
`);
  process.exit(0);
}

// Get type filter from flags (default to 'all') and split for multiple types
const typeFilterRaw = getFlagValue('type') || 'all';
const typeFilters = typeFilterRaw.toLowerCase().split(',');

// Get level filter from flags (default to 'required')
const levelFilter = getFlagValue('level') || (hasFlag('show-all') ? 'all' : 'required');

const scanAlerts = async () => {
  // Scan all relevant files (JS, TS, PHP), excluding node_modules and dist
  const files = await globby(['**/*.{js,ts,php}', '!node_modules/**', '!dist/**']);
  const results = [];

  // Check each file for alert pattern matches
  for (const file of files) {
    const lines = fs.readFileSync(file, 'utf8').split('\n');
    lines.forEach((line, index) => {
      ALERT_TYPES.forEach(({ label, pattern, level }) => {
        const matches = pattern.exec(line);
        if (matches) {
          results.push({
            file,
            line: index + 1,
            text: line.trim(),
            label,
            level,
          });
        }
      });
    });
  }

  // Separate alerts by severity level
  const byLevel = {
    required: results.filter(r => r.level === 'required'),
    optional: results.filter(r => r.level === 'optional')
  };

  // Helper to group results by their label (e.g. TODO, FIXME)
  const groupByLabel = (items) => {
    return items.reduce((acc, item) => {
      if (!acc[item.label]) acc[item.label] = [];
      acc[item.label].push(item);
      return acc;
    }, {});
  };

  console.log('\n' + chalk.cyanBright('🔎 Developer Alerts'));

  // Render required alerts fully if applicable
  if (levelFilter === 'required' || levelFilter === 'all') {
    const requiredGroups = groupByLabel(byLevel.required);
    Object.entries(requiredGroups).forEach(([label, entries]) => {
      console.log(chalk.red(`\n🔹 ${label} (${entries.length})`));
      entries.forEach(({ file, line, text }) => {
        console.log(`  ${chalk.bold(file)}:${line} → ${text}`);
      });
    });
  } else {
    console.log(chalk.green('\n✅ No required alerts shown.'));
  }

  // Render optional alerts based on filter
  if (levelFilter === 'optional' || levelFilter === 'all') {
    const optionalGroups = groupByLabel(byLevel.optional);
    const filteredOptionalLabels = typeFilters.includes('all')
      ? Object.keys(optionalGroups)
      : Object.keys(optionalGroups).filter(label =>
          typeFilters.some(type => label.toLowerCase().startsWith(type))
        );

    // Show optional alerts fully if they match filters
    filteredOptionalLabels.forEach((label) => {
      const entries = optionalGroups[label];
      console.log(chalk.yellow(`\n🔹 ${label} (${entries.length})`));
      entries.forEach(({ file, line, text }) => {
        console.log(`  ${chalk.bold(file)}:${line} → ${text}`);
      });
    });
  } else {
    // Otherwise, summarize optional alerts by label and count only
    const optionalGroups = groupByLabel(byLevel.optional);
    Object.entries(optionalGroups).forEach(([label, entries]) => {
      console.log(chalk.yellow(`\n🔹 ${label} (${entries.length}) View all →`));
    });
  }

  // Block commit if required alerts still exist
  if (byLevel.required.length > 0) {
    console.log(chalk.redBright('\n🚫 Commit blocked: Resolve all required alerts before continuing.\n'));
    process.exit(1);
  }
};

// Run the scan
await scanAlerts();
