# ⚙️ CJ-Create

> A modular, prompt-driven CLI tool for scaffolding custom project templates with built-in Git and GitHub automation.

---

## 🚀 What It Does

CJ-Create simplifies your project startup workflow by:

- Generating projects from custom templates (WordPress plugins, React apps, themes, etc.)
- Prompting for project-specific metadata
- Replacing placeholders like `[[PLUGIN_NAME]]` and `[[AUTHOR_NAME]]` across all files
- Automatically initializing Git and pushing to GitHub
- Managing shared config like vendor/organization info
- Providing a clean base for versioning, changelogs, and automation

---

## Features

### Current Features

✅ Modular scaffolding by project type  
✅ Per-type prompt configuration  
✅ Placeholder replacement in all files  
✅ Git initialization with commit and branch creation
✅ Shared configuration for organization-wide consistency
✅ Clean separation of templates and CLI logic
✅ User Profile System
✅ Secure Local User Storage
✅ Automatic Super-Admin Assignment for First User  

#### Current Scaffolding Templates

- `wp-plugin` (IN PROGRESS: Model template for procedure design)

---

### Features in Development

| Feature               | Description                                                                 |
|-----------------------|-----------------------------------------------------------------------------|
| `.cjproject.json`     | Auto-generated per project for identity and portability                     |
| `alert-config.json`   | Optional project-specific alert settings (file types, ignores, custom alerts)|
| `workspace.json`      | Global tracker of active projects                                           |
| Alerts Command        | Scan for alerts by type, level, staged-only, or workspace-wide              |
| Husky Pre-commit Hook | Prevent committing unresolved required alerts                               |

---

### Planned Features

- PHP class autoloading system
- Git tag-based version bumping
- GitHub Issue template generation
- Project board setup
- Optional VS Code workspace file generation
- Template presets (e.g., minimal vs. full)

---

## 📁 Usage

### ⚙️ Setup
```bash
git clone https://github.com/YOUR_USERNAME/cj-create.git
cd cj-create
npm install
```

### 🛠️ User Profile Management
- User profiles are securely stored in `~/.cj-create/users/`.
- The first user is automatically assigned the `super-admin` role.
- Profiles are protected with OS-level permissions (chmod 600).
- Includes the following utilities:
  - `generateUserProfile()` - Creates a new user profile with unique ID.
  - `loadUserProfile(userId)` - Loads a specific user profile.
  - `hasAnySuperAdmin()` - Checks if any user is a super-admin.

#### 📋 Common Commands
User profiles are stored securely under:
`~/.cj-create/users/`

The first user created is automatically assigned the super-admin role.
Example: Create a new user profile
```bash
node index.js create-user
```

Example: Load a user profile by ID
```bash
node index.js load-user <userId>
```

### ⚙️ Configure Default Vendor Info
```bash
node index.js config
```

This lets you set your default organization or author name (e.g., "Candace Johnson Designs").

### 🛠️ Create a New Project
```bash
node index.js
```

Follow the prompts to:

- Choose a project type
- Enter name, author, license, and other metadata
- Scaffold files and replace placeholders
- Create a GitHub repo (if desired)

### ⚡ Alert Scanning
Alert scanning helps you catch development markers like `TODO`, `FIXME`, or custom flags before code is committed.

By default:
- Only **staged files** are scanned before each commit.
- Commits are **blocked** if any unresolved **required alerts** are found.

You can also manually scan:
- The entire project
- All projects registered in the workspace

To customize scanning behavior for a specific project, include an `alert-config.json` file. This allows you to **add to** or **completely override** the default file types and ignored directories.

#### 📋 Common Commands

Project-wide scan:
```bash
cj-create alerts
```

Staged-only scan (default for pre-commit):
```bash
cj-create alerts --staged
```

Workspace-wide scan (multiple projects):
```bash
cj-create alerts --workspace
```
#### 📄 `alert-config.json` Overview
The `alert-config.json` file allows you to customize how alerts are scanned for each project. This file can be scaffolded into the root of your project folder, but is optional. If no file is present, global default settings will be used.

| Key                | Type                 | Default       | Description |
| :----------------- | :------------------- | :------------ | :---------- |
| `mergeDefaults`    | `boolean`             | `true`        | If `true`, your settings merge with built-in defaults. If `false`, your settings replace them entirely. |
| `fileExtensions`   | `array of strings`    | varies        | List of file extensions to scan (e.g., `.js`, `.php`, `.jsx`). |
| `ignoredDirectories` | `array of strings`  | varies        | List of folders to exclude from scanning (e.g., `node_modules`, `vendor`). |

##### 🔧 How `mergeDefaults` Works:
- If `mergeDefaults` is `true` (default behavior):
  - Your customized project `fileExtensions` and `ignoredDirectories` are **added to** the global default values.
- If `mergeDefaults` is `false`:
  - Only the values you specify are used. Defaults are **completely ignored**.

##### ✨ Examples:
###### Merging Defaults (Recommended for most projects):
```json
{
  "mergeDefaults": true,
  "fileExtensions": [".js"]
}
```

###### Overriding Defaults (for unique setups):
```json
{
  "mergeDefaults": false,
  "fileExtensions": [".py", ".ipynb"],
  "ignoredDirectories": ["__pycache__", ".venv"]
}
```

### Workspace for multi-project management

Workspace management:
```bash
cj-create workspace add <path>
cj-create workspace remove <path>
cj-create workspace list
```

## 📁 Templates Directory

All project templates are stored in:
```arduino
templates/
├── wp-plugin/
│   ├── plugin-name.php
│   └── config.js (defines project-specific prompts)
└── react/
    └── ...
```

## File Structure Overview

```arduino
cj-create/
├── commands/
├── lib/
├── templates/
│   └── wp-plugin/  ← model template
│       ├── .cjproject.json
│       ├── alert-config.json
├── scripts/
├── .husky/
│   └── pre-commit
└── workspace.json (global)
```

## 🛣️ Roadmap

See the full roadmap and task tracker in [TASKS.md](TASKS.md).

## 💡 Ideas and Contributions

Have an idea for a new template or automation feature?
Please use the [🚀 Future Idea](.github/ISSUE_TEMPLATE/future_idea.yml) issue template.

## 🧠 Inspiration

This tool was built to streamline the repetitive aspects of solo development projects — and help me stay organized with Git, GitHub, and consistent setup patterns.

## 📝 License

This project is licensed under the MIT License. See the LICENSE file for details.
