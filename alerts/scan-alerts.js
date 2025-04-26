import fs from 'fs';
import { globby } from 'globby';
import chalk from 'chalk';
import { execSync } from 'child_process';
import { loadAlertConfig } from '../lib/load-alert-config.js';
import { ALERT_TYPES } from '../lib/alert-types.js';

/**
 * Scans the current project for developer alerts (TODO, FIXME, etc.)
 * Accepts CLI options to modify behavior (staged only, filters, etc.)
 *
 * @param {Object} options - CLI flags passed from Commander
 */
export async function scanProjectForAlerts(options = {}) {
  const {
    staged = false,
    workspace = false, // Future
    type = 'all',
    level = 'required',
    showAll = false,
  } = options;

  const projectRoot = process.cwd(); // TODO: Replace once workspace scanning is wired
  const { config: alertConfig, source: configSource } = await loadAlertConfig(projectRoot);

  // Log which config is being used
  if (configSource === 'custom') {
    console.log('🔧 Using custom alert-config.json settings.');
  } else {
    console.log('🔧 Using fallback default alert settings.');
  }
  console.log(`🔎 Scanning file extensions: ${alertConfig.fileExtensions.join(', ')}`);

  // Choose how to select files
  const filesToScan = staged
    ? await getStagedFiles(alertConfig.fileExtensions)
    : await getProjectFiles(alertConfig.fileExtensions, alertConfig.ignoredDirectories);

  if (filesToScan.length === 0) {
    console.log(chalk.yellow('No matching files to scan.'));
    return;
  }

  // Perform scan
  const results = [];

  for (const file of filesToScan) {
    const lines = fs.readFileSync(file, 'utf8').split('\n');
    lines.forEach((line, index) => {
      ALERT_TYPES.forEach(({ label, pattern, level: alertLevel }) => {
        const matches = pattern.exec(line);
        if (matches) {
          results.push({
            file,
            line: index + 1,
            text: line.trim(),
            label,
            level: alertLevel,
          });
        }
      });
    });
  }

  if (results.length === 0) {
    console.log(chalk.green('\n✅ No developer alerts found.'));
    return;
  }

  displayAlerts(results, { level, type, showAll });

  // If staged-only mode and required alerts exist, block commit
  if (staged) {
    const requiredAlerts = results.filter(r => r.level === 'required');
    if (requiredAlerts.length > 0) {
      console.log(chalk.redBright('\n🚫 Commit blocked: Resolve all required alerts before continuing.\n'));
      process.exit(1);
    }
  }
}

// Helper: Get staged files for scanning
async function getStagedFiles(fileExtensions) {
  const output = execSync('git diff --cached --name-only', { encoding: 'utf8' });
  return output
    .split('\n')
    .filter((file) =>
      fileExtensions.some((ext) => file.endsWith(ext)) && fs.existsSync(file)
    );
}

// Helper: Get all project files
async function getProjectFiles(fileExtensions, ignoredDirectories) {
  if (!fs.existsSync('.cjproject.json')) {
    console.log(chalk.redBright('\n⚠️ Not a recognized project folder (missing .cjproject.json).\n'));
    process.exit(1);
  }

  const patterns = [
    `**/*.{${fileExtensions.map(ext => ext.replace('.', '')).join(',')}}`,
    ...ignoredDirectories.map((dir) => `!${dir}/**`)
  ];

  return await globby(patterns);
}

// Helper: Display alerts based on filters
function displayAlerts(results, { level, type, showAll }) {
  const byLevel = {
    required: results.filter(r => r.level === 'required'),
    optional: results.filter(r => r.level === 'optional')
  };

  const groupByLabel = (items) => {
    return items.reduce((acc, item) => {
      if (!acc[item.label]) acc[item.label] = [];
      acc[item.label].push(item);
      return acc;
    }, {});
  };

  console.log('\n' + chalk.cyanBright('🔎 Developer Alerts'));

  // Always show required alerts (if applicable)
  if (level === 'required' || level === 'all' || showAll) {
    const requiredGroups = groupByLabel(byLevel.required);
    Object.entries(requiredGroups).forEach(([label, entries]) => {
      console.log(chalk.red(`\n🔹 ${label} (${entries.length})`));
      entries.forEach(({ file, line, text }) => {
        console.log(`  ${chalk.bold(file)}:${line} → ${text}`);
      });
    });
  }

  // Show optional alerts if requested
  if (level === 'optional' || level === 'all' || showAll) {
    const optionalGroups = groupByLabel(byLevel.optional);
    const typeFilters = type.toLowerCase().split(',');

    const filteredLabels = typeFilters.includes('all')
      ? Object.keys(optionalGroups)
      : Object.keys(optionalGroups).filter(label =>
          typeFilters.some(filter => label.toLowerCase().startsWith(filter))
        );

    if (filteredLabels.length === 0) {
      console.log(chalk.green('\n✅ No optional alerts shown.'));
      return;
    }

    filteredLabels.forEach((label) => {
      const entries = optionalGroups[label];
      console.log(chalk.yellow(`\n🔹 ${label} (${entries.length})`));
      entries.forEach(({ file, line, text }) => {
        console.log(`  ${chalk.bold(file)}:${line} → ${text}`);
      });
    });
  }
}
