# 🛠 CJ-Create Project Tasks

## ✅ Completed
- Modular Scaffolding System by Project Type:
  - Implemented a system that allows scaffolding of projects based on 
    specific templates, such as wp-plugin.
- Per-Type Dynamic Prompt Configuration:
  - Developed a configuration system that presents prompts tailored 
    to the selected project type during scaffolding.
- Placeholder Replacement across All Files:
  - Integrated functionality to replace placeholders within template files 
    with user-provided data.
- Shared Configuration for Organization-Wide Consistency:
  - Established a shared config.js file to maintain consistent settings 
    across different projects.
- Git Initialization with Commit and Branch Creation:
  - Automated the initialization of a Git repository, creation of an 
    initial commit, and establishment of a default branch for new projects.
- Clean Separation of Templates and CLI Logic:
  - Organized the codebase to clearly separate template files from the 
    command-line interface logic.

---

## 🔄 In Progress
- [ ] Implementation of .cjproject.json:
  - Developing an auto-generated .cjproject.json file for each project to 
    enhance identity and portability.
- [ ] Development of alert-config.json:
  - Creating an optional alert-config.json for project-specific alert settings,
    including file types, ignores, and custom alerts.
- [ ] Creation of workspace.json:
  - Establishing a global tracker (workspace.json) to manage active 
    projects within the workspace.
- [ ] Alerts Command Development:
  - Building a command to scan for alerts by type, level, staged-only, 
    or across the entire workspace.
- [ ] Integration of Husky Pre-Commit Hook:
  - Setting up a Husky pre-commit hook to prevent commits that contain 
    unresolved required alerts.
- [ ] TODO Fallback Support
  - Add TODO fallback support in scaffolded templates (e.g., a plugin URI will be required, but may not be known on project creation -> TODO)
- [ ] Adopt Conventional Commits for version tracking

---

## 🔜 Planned
- [ ] PHP Class Autoloading System:
  - Designing a system for automatic loading of PHP classes to streamline development.
- [ ] Git Tag-Based Version Bumping:
  - Implementing a mechanism to bump project versions based on Git tags.
- [ ] GitHub Issue Template Generation:
  - Creating templates for GitHub issues to standardize reporting and tracking.
- [ ] Project Board Setup:
  - Establishing project boards for enhanced project management and visualization.
- [ ] Optional VS Code Workspace File Generation:
  - Providing an option to generate VS Code workspace files for project consistency.
- [ ] Template Presets (e.g., Minimal vs. Full):
  - Offering different template presets to cater to varying project requirements.
- [ ] Migrate to `changesets` for Versioning and Changelog Management:
  - [ ] Transition from `standard-version` to `changesets` to leverage modern tooling 
        and best practices.
  - [ ] Update documentation to reflect the new workflow.
  - [ ] Ensure compatibility with existing CI/CD pipelines and release processes.
- [ ] Enforcement of Conventional Commits:
  - Implementing tools or hooks to ensure all commit messages adhere to the 
    Conventional Commits standard, facilitating automated changelog generation 
    and versioning.


---

## 💡 Future Ideas
- [ ] Add support for non-WordPress projects (e.g. static sites, Laravel, Astro)
- [ ] Add optional README scaffolding based on user input
- [ ] Add post-scaffold tasks (e.g., npm install, setup complete message)
