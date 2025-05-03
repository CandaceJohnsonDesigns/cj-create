import path from 'path';
import fs from 'fs-extra';

// Define the path to the workspace.json file at the root of the CLI project
const workspacePath = path.join(__dirname, '..', '..', 'workspace.json');

/**
 * Removes a project from workspace.json by its name (case-insensitive).
 *
 * This function loads the workspace.json file, filters out the project with the specified name,
 * and rewrites the updated list back to the file. If no such project exists, it logs a warning.
 *
 * @param {string} name - The project name to remove.
 */
export const removeProjectFromWorkspace = async (name) => {
  // Check if workspace.json exists
  if (!(await fs.pathExists(workspacePath))) {
    console.warn('⚠️  No workspace.json file found.');
    return;
  }

  // Read the current workspace file content
  const workspace = await fs.readJson(workspacePath);
  const originalCount = workspace.projects.length;

  // Filter out the project with the specified name (case-insensitive)
  const filtered = workspace.projects.filter(
    (p) => p.name.toLowerCase() !== name.toLowerCase()
  );

  // Warn if the project name wasn't found
  if (filtered.length === originalCount) {
    console.warn(`⚠️  No project named "${name}" found in workspace.json.`);
    return;
  }

  // Save the updated workspace list
  workspace.projects = filtered;
  await fs.writeJson(workspacePath, workspace, { spaces: 2 });
  console.log(`🗑️  Removed project "${name}" from workspace.json.`);
};