# Changelog

All notable changes to this project will be documented in this file.

This project follows [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) and [Semantic Versioning](https://semver.org/).

---

## [Unreleased]

### Documentation
- Reorganized `README.md` to clarify feature status
- Grouped features under:
  - Current Features
  - Features in Development
  - Planned Features

---

## [0.1.0] - 2025-04-09

### Added
- Initial CLI framework
- Modular scaffolding system based on project type
- `wp-plugin` template (model template for procedure design)
- Prompt-driven metadata collection for scaffolding
- Placeholder replacement system across all template files and filenames
- Git initialization with first commit and branch creation
- Optional GitHub repository creation with push
- Shared `config.js` for CLI-wide settings (vendor/org)
- Clean separation of CLI logic vs. templates

### Project Organization
- Established file structure for templates, commands, scripts, lib, and hooks
- Created README.md with usage instructions, project purpose, and tasks/roadmap section
