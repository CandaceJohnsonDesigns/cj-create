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

### Current

✅ Modular scaffolding by project type  
✅ Per-type prompt configuration  
✅ Placeholder replacement in all files  
✅ Git initialization with commit and branch creation
✅ Shared configuration for organization-wide consistency
✅ Clean separation of templates and CLI logic  

---

#### Templatess

- `wp-plugin` (IN PROGRESS: Model template for procedure design)

---

### In Development

| Feature               | Description                                                                 |
|-----------------------|-----------------------------------------------------------------------------|
| `.cjproject.json`     | Auto-generated per project for identity and portability                     |
| `alert-config.json`   | Optional project-specific alert settings (file types, ignores, custom alerts)|
| `workspace.json`      | Global tracker of active projects                                           |
| Alerts Command        | Scan for alerts by type, level, staged-only, or workspace-wide              |
| Husky Pre-commit Hook | Prevent committing unresolved required alerts                               |

---

### 🔧 Planned

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

### Scan for development flags (pre-commit, per project, or full workspace)

Project-wide scan:
```
cj-create alerts
```

Staged-only for commits:
```
cj-create alerts --staged
```

Workspace-wide scan:
```
cj-create alerts --workspace
```

### Workspace for multi-project management

Workspace management:
```
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

## 🛣️ Roadmap

See the full roadmap and task tracker in [TASKS.md](TASKS.md).

## 💡 Ideas and Contributions

Have an idea for a new template or automation feature?
Please use the [🚀 Future Idea](.github/ISSUE_TEMPLATE/future_idea.yml) issue template.

## 🧠 Inspiration

This tool was built to streamline the repetitive aspects of solo development projects — and help me stay organized with Git, GitHub, and consistent setup patterns.

## 📝 License

This project is licensed under the MIT License. See the LICENSE file for details.
