# Project Tasks

## Quick Links
[Completed](#-completed) &nbsp;&nbsp;|&nbsp;&nbsp; 
[In Progress](#-in-progress)  &nbsp;&nbsp;|&nbsp;&nbsp; 
[Planned](#-planned)  &nbsp;&nbsp;|&nbsp;&nbsp; 
[Future Ideas](#-future-ideas)  </br></br>

## ✅ Completed

- [x] **Modular Scaffolding System by Project Type**  </br>
      Implemented a system that allows scaffolding of projects based on specific templates, such as `wp-plugin`.

- [x] **Per-Type Dynamic Prompt Configuration**  </br>
      Developed a configuration system that presents prompts tailored 
      to the selected project type during scaffolding.

- [x] **Placeholder Replacement across All Files**  </br>
      Integrated functionality to replace placeholders within template files 
      with user-provided data.

- [x] **Shared Configuration for Organization-Wide Consistency**  </br>
      Established a shared `config.js` file to maintain consistent settings 
      across different projects.

- [x] **Git Initialization with Commit and Branch Creation**  </br>
      Automated the initialization of a Git repository, creation of an 
      initial commit, and establishment of a default branch for new projects.

- [x] **Clean Separation of Templates and CLI Logic**  </br>
      Organized the codebase to clearly separate template files from the 
      command-line interface logic.

- [x] **Corrected `package.json` Version to `0.1.0`**  </br>
      Updated the version in `package.json` to reflect the project's initial development stage.

- [x] **Initialized Changelog with `standard-version`**  </br>
      Generated the initial `CHANGELOG.md` and Git tag using `standard-version`

- [x] **User Profile System with Role-Based Access Control** </br>
      - Securely generates a local user profile at `~/.cj-create/users/`.
      - Automatically assigns super-admin to the first user.
      - Includes utilities to load user profiles and check for existing admins.
      
--- 

## 🔄 In Progress

- [ ] **Implement of `.cjproject.json`**  </br>
      Developing an auto-generated `.cjproject.json` file for each project to 
      enhance identity and portability.
      
- [ ] **Develop of `alert-config.json`**  </br>
      Creating an optional `alert-config.json` for project-specific alert settings,
      including file types, ignores, and custom alerts.
      
- [ ] **Create of `workspace.json`**  </br>
      Establishing a global tracker (`workspace.json`) to manage active 
      projects within the workspace.
      
- [ ] **Develop Alerts Command**  </br>
      Building a command to scan for alerts by type, level, staged-only, 
      or across the entire workspace.
      
- [ ] **Integrate of Husky Pre-Commit Hook**  </br>
      Setting up a Husky pre-commit hook to prevent commits that contain 
      unresolved required alerts.

---

## 🔜 Planned
- [ ] **PHP Class Autoloading System**  </br>
      Designing a system for automatic loading of PHP classes to streamline development.
      
- [ ] **Git Tag-Based Version Bumping**  </br>
      Implementing a mechanism to bump project versions based on Git tags.
      
- [ ] **GitHub Issue Template Generation**  </br>
      Creating templates for GitHub issues to standardize reporting and tracking.
      
- [ ] **Project Board Setup**  </br>
      Establishing project boards for enhanced project management and visualization.
      
- [ ] **Optional VS Code Workspace File Generation**  </br>
      Providing an option to generate VS Code workspace files for project consistency.
      
- [ ] **Template Presets (e.g., Minimal vs. Full)**  </br>
      Offering different template presets to cater to varying project requirements.
      
- [ ] **Migrate to `changesets` for Versioning and Changelog Management**  </br>
  - [ ] Transition from `standard-version` to `changesets` to leverage modern tooling 
          and best practices.  </br>
  - [ ] Update documentation to reflect the new workflow.  </br>
  - [ ] Ensure compatibility with existing CI/CD pipelines and release processes.  </br>
  
- [ ] **Enforcement of Conventional Commits**  </br>
      Implementing tools or hooks to ensure all commit messages adhere to the 
      Conventional Commits standard, facilitating automated changelog generation 
      and versioning.

- [ ] **User Role Escalation and Management** </br>
      Add ability for existing super-admins to promote or manage users.

---

## 💡 Future Ideas
- [ ] **Add support for non-WordPress projects** (e.g. static sites, Laravel, Astro)  </br>

- [ ] **Add optional README scaffolding based on user input**  </br>

- [ ] **Add post-scaffold tasks** (e.g., npm install, setup complete message)  </br>

