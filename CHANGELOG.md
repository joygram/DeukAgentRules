# Changelog

All notable changes to this project will be documented in this file.

## [3.0.0] - 2026-04-25

### 🚀 Major Breakthrough: Hub-Spoke Architecture
- **Canonical Rule Hub**: Introduced `AGENTS.md` as the single source of truth for all AI agents.
- **Thin Spoke Pointers**: IDE-specific rules (Cursor, Copilot, etc.) are now lightweight pointers to the central Hub, eliminating duplication and sync errors.
- **Global CLI Proxy**: Implemented a smart entry point that automatically detects and routes execution to local workspace sources, ensuring zero-latency development.

### 🧹 Zero-Legacy & Cleanliness
- **Auto-Purge**: `init` now unconditionally deletes deprecated `.cursorrules` files.
- **Smart Backups**: Added logic to detect custom user rules and rename files to `.bak` instead of deletion.
- **Submodule Scrubbing**: Automatically cleans empty submodule directory stubs and scrubs `.gitmodules`.

### 🏗️ Branding & Infrastructure
- **Identity Overhaul**: Rebranded as a "Zero-Latency, High-Signal AI Orchestration Protocol".
- **Documentation v3**: New high-end 3D visual infographics and overhauled conceptual guides (Architecture, Principles, How-it-works).
- **Domain Agnostic**: Generalized `bundle/AGENTS.md` to support any technology stack, removing domain-specific hardcoding.

### ⚙️ CLI Enhancements
- **Proxy Routing**: `bin/deuk-agent-rule.js` performs directory traversal to find local scripts.
- **Synchronized IO**: Refactored core logic to use synchronous FS operations for rock-solid CLI stability.

---

## [2.4.0] - 2026-04-18
- add Codex CLI support (.codexrules) and apply globally
- implement ticket chaining (--chain) for automated ticket linkage
- improve submodule isolation logic
