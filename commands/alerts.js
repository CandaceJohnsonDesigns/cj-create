import fs from 'fs';
import { globby } from 'globby';
import chalk from 'chalk';
import { ALERT_TYPES } from '../lib/alert-types.js';

// Capture CLI arguments
const args = process.argv.slice(2);

// Helper: Get the value for a given flag, e.g. --type fixme => "fixme"
const getFlagValue = (flag) => {
  const index = args.findIndex(arg => arg === `--${flag}`);
  return index !== -1 ? args[index + 1] : null;
};

// Helper: Check if a flag is present, e.g. --show-all
const hasFlag = (flag) => args.includes(`--${flag}`);

// Check if help output should be shown
const showHelp = hasFlag('help');

// Used to limit scan to only staged files (for pre-commit hooks)
const stagedOnly = hasFlag('staged');

// Show usage information if --help flag is present
if (showHelp) {
  console.log(`\nUsage: cj-create alerts [options]

Options:
  --type <value>     Filter by alert type(s) (e.g., todo, fixme, all)
                     Use comma-separated values for multiple types
  --level <value>    Filter by severity level (required, optional, all)
  --show-all         Shortcut for --level all
  --staged           Only scan staged files (used in pre-commit hooks)
  --help             Show this help message
`);
  process.exit(0);
}

// Parse type filter(s) from flags
const typeFilterRaw = getFlagValue('type') || 'all';
const typeFilters = typeFilterRaw.toLowerCase().split(',');

// Default severity level filter flag to only required alerts unless specified
const levelFilter = getFlagValue('level') || (hasFlag('show-all') ? 'all' : 'required');

// Determine which files to scan based on developer's selection: --staged or all files in the project
const getFilesToScan = async () => {
    // If --staged is used, only scan staged files from Git
  if (stagedOnly) {
    const execSync = (await import('child_process')).execSync;
    const output = execSync('git diff --cached --name-only', { encoding: 'utf8' });
    return output
      .split('\n')
      .filter((file) => file.match(/\.(js|ts|php)$/) && fs.existsSync(file));
  } 

  // Check if the current directory is not a recognized project folder
  if (!fs.existsSync('.cjproject.json')) {
    console.log(chalk.redBright('\n⚠️ Not a recognized project folder (missing .cjproject.json).\n'));
    process.exit(1);
  }

  // Otherwise scan all files in the project directory that match our patterns
  return await globby(['**/*.{js,ts,php}', '!node_modules/**', '!dist/**']);
};

// Scans requested files for developer alerts based on the specified patterns
const scanAlerts = async () => {
    // Retrieve the 
  const files = await getFilesToScan();
  const results = [];

  // Iterate through each file and each line
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

  // Group alerts by their severity level: required or optional
  const byLevel = {
    required: results.filter(r => r.level === 'required'),
    optional: results.filter(r => r.level === 'optional')
  };

  // Group alerts by their tag/label (e.g., TODO!, FIXME)
  const groupByLabel = (items) => {
    return items.reduce((acc, item) => {
      if (!acc[item.label]) acc[item.label] = [];
      acc[item.label].push(item);
      return acc;
    }, {});
  };

  console.log('\n' + chalk.cyanBright('🔎 Developer Alerts'));

  // Show required alerts (detailed view)
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

  // Show optional alerts in detail if requested, otherwise show summary
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
    // Only show a count summary of optional alerts
    const optionalGroups = groupByLabel(byLevel.optional);
    Object.entries(optionalGroups).forEach(([label, entries]) => {
      console.log(chalk.yellow(`\n🔹 ${label} (${entries.length}) View all →`));
    });
  }

  // Block commit or exit with error if required alerts still exist
  if (byLevel.required.length > 0) {
    console.log(chalk.redBright('\n🚫 Commit blocked: Resolve all required alerts before continuing.\n'));
    process.exit(1);
  }
};

// Run the alert scan
await scanAlerts();