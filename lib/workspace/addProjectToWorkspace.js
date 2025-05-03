export const addProjectToWorkspace = async (projectMetadata) => {
    const workspacePath = path.join(__dirname, '..', 'workspace.json');
    const defaultWorkspace = { projects: [] };
  
    // Check if workspace.json exists, if not create it with default structure
    const workspace = (await fs.pathExists(workspacePath))
      ? await fs.readJson(workspacePath)
      : defaultWorkspace;
  
    // Check if the project already exists in the workspace
    const alreadyExists = workspace.projects.some(
      (p) => path.resolve(p.path) === path.resolve(projectMetadata.path)
    );
  
    // If it doesn't exist, add the project metadata to the workspace
    if (!alreadyExists) {
      workspace.projects.push(projectMetadata);
      await fs.writeJson(workspacePath, workspace, { spaces: 2 });
      console.log(`📌 Project added to workspace.json`);
    } else {
      console.log(`ℹ️  Project already exists in workspace.json`);
    }
  };
  