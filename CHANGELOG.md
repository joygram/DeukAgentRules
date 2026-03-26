# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.11] - 2026-03-26


### Added

- **ci:** GitHub Release on main for chore(release); simplify public RELEASING

## [1.0.10] - 2026-03-26


### Added

- **deuk-agent-rule:** keep a changelog templates without commit links

## [1.0.9] - 2026-03-27

### Added

- **deuk-agent-rule:** automated changelog and release tooling
- **deuk-agent-rule:** handoff gitignore, pre-work handoff scan, AGENTS inject newline

### Changed

- **agents:** DeukAgentRules/handoff/LATEST.md handoff path for consumer repos

## [1.0.8] - 2026-03-27

### Added

- This changelog and npm `files` entry so releases are traceable.

## [1.0.7] - 2026-03-27

### Added

- `init`: create `.deuk-agent-handoff/` and append `.gitignore` rules for local handoffs.
- CLI: pre-work handoff scan; `publish/AGENTS.md` and `multi-ai-workflow.mdc` updates.

### Fixed

- AGENTS tagged-region merge: trailing newline after injected blocks.

## [1.0.5] - 2026-03-26

### Changed

- README and package metadata (Deuk Family tagline, npm keywords, GitHub Topics note).

## [1.0.4] - 2026-03-26

### Changed

- Release packaging includes `package-lock.json` for reproducible installs.
- README: absolute links for the npm package page.
