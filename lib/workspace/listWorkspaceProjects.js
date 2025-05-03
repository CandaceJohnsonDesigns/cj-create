import path from 'path';
import fs from 'fs-extra';

// Define the path to the workspace.json file at the root of the CLI project
const workspacePath = path.join(__dirname, '..', '..', 'workspace.json');

/**
 * Lists all registered projects in workspace.json.
 *
 * This function checks for the existence of the workspace file, reads the contents,
 * and logs all registered projects with their name, type, and file path.
 * If the file does not exist or no projects are registered, it logs a helpful message.
 */
export const listWorkspaceProjects = async () => {
  // Ensure workspace.json exists
  if (!(await fs.pathExists(workspacePath))) {
    console.warn('⚠️  No workspace.json file found.');
    return;
  }

  // Read workspace content
  const workspace = await fs.readJson(workspacePath);
  const projects = workspace.projects || [];

  // Handle empty workspace
  if (projects.length === 0) {
    console.log('📭 No projects registered in workspace.json.');
    return;
  }

  // Log the list of registered projects
  console.log('📂 Registered Projects in Workspace:');
  for (const project of projects) {
    console.log(`• ${project.name} (${project.type}) — ${project.path}`);
  }
};