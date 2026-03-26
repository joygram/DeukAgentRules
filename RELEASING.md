# Releasing

This document applies to **this repository** (the published `deuk-agent-rule` package). If you maintain a separate **private upstream** with extra tooling (changelog automation, mirror scripts), keep those details there; they do not need to appear in public docs.

1. Update [`publish/`](publish/) templates if needed. Prefer [Conventional Commits](https://www.conventionalcommits.org/) (`feat:`, `fix:`, `docs:`, …) so automated changelog tools can classify entries.
2. Bump [`package.json`](package.json) / [`package-lock.json`](package-lock.json) and [`CHANGELOG.md`](CHANGELOG.md), and create a git tag `vX.Y.Z` that matches the package version (required when CI verifies tag pushes).
3. Push your default branch (`main` or `master`) to **this** remote (GitHub does not receive updates from a private upstream unless you push or mirror here). **Pushing a release commit** whose message starts with `chore(release):` to **`main` or `master`** triggers [`.github/workflows/release.yml`](.github/workflows/release.yml), which runs `npm pack` and creates a **GitHub Release** with the tarball. Pushing a matching **`v*.*.*` tag** also triggers the same workflow.
4. `npm pack` locally if you want to inspect the tarball (`prepack` runs `sync-bundle.mjs`).
5. `npm publish --access public` from this repo root when you are ready (registry access required). Optional: enable the commented `NPM_TOKEN` step in the workflow for automated publish.
6. GitHub **Releases** — add notes if you want beyond the auto-generated summary.
