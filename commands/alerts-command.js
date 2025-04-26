import { program } from 'commander';
import { scanProjectForAlerts } from '../alerts/scan-alerts.js'; // Updated import for the new file structure

/**
 * Defines the "alerts" CLI command.
 * Supports scanning for TODOs, FIXMEs, and custom developer alerts.
 * Allows options to scan staged files, entire projects, or workspaces.
 */
program
  .command('alerts')
  .description('Scan project files for TODOs, FIXMEs, and custom developer alerts')
  .option('--staged', 'Scan only staged files (for pre-commit use)')
  .option('--workspace', 'Scan all projects listed in workspace.json')
  .option('--type <types>', 'Filter by alert type(s) (e.g., todo, fixme, all)', 'all')
  .option('--level <level>', 'Filter by severity level (required, optional, all)', 'required')
  .option('--show-all', 'Shortcut to show all alerts (required + optional)')
  .action(async (options) => {
    await scanProjectForAlerts(options);
  });