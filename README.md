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

## 📦 Current Features

✅ Modular scaffolding by project type  
✅ Per-type prompt configuration  
✅ Placeholder replacement in all files  
✅ Default vendor info stored in `config.json`  
✅ `cj-create config` command to manage settings  
✅ GitHub repo creation with `gh` CLI  
✅ Clean separation of templates and CLI logic  

---

## 🔧 Coming Soon

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

### 🛠️ Create a New Project
```bash
node index.js
```

Follow the prompts to:

- Choose a project type
- Enter name, author, license, and other metadata
- Scaffold files and replace placeholders
- Create a GitHub repo (if desired)

### ⚙️ Configure Default Vendor Info
```bash
node index.js config
```

This lets you set your default organization or author name (e.g., "Candace Johnson Designs").

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

## 🛣️ Roadmap

See the full roadmap and task tracker in TASKS.md.

## 💡 Ideas and Contributions

Have an idea for a new template or automation feature?
Please use the 🚀 Future Idea issue template.

## 🧠 Inspiration

This tool was built to streamline the repetitive aspects of solo development projects — and help me stay organized with Git, GitHub, and consistent setup patterns.

## 📝 License

MIT License (you can update this as needed)

## 🔄 What You’ll Want to Update as You Grow

| Section | When to Update |
|--------|----------------|
| **Usage** | If you add CLI flags or global support |
| **Templates** | When adding more types like React or Laravel |
| **Roadmap** | When completing key features |
| **Inspiration** | If you publish it or collaborate with others |

---