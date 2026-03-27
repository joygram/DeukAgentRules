# Releasing

Maintainer steps for the `deuk-agent-rule` package:

1. Update [`publish/`](publish/) templates as needed. Prefer [Conventional Commits](https://www.conventionalcommits.org/) (`feat:`, `fix:`, `docs:`, …).
2. Bump [`package.json`](package.json), [`package-lock.json`](package-lock.json), and [`CHANGELOG.md`](CHANGELOG.md). Create a git tag `vX.Y.Z` that matches the package version (CI verifies this on tag builds).
3. Push the default branch (`main` or `master`). A commit whose message starts with `chore(release):` on either branch triggers [`.github/workflows/release.yml`](.github/workflows/release.yml) (`npm pack` and a GitHub Release with the tarball). Pushing a matching `v*.*.*` tag triggers the same workflow.
4. Run `npm pack` locally to inspect the tarball (`prepack` runs `sync-bundle.mjs`).
5. Run `npm publish --access public` when ready (registry credentials required). Optional: add an `NPM_TOKEN` repository secret and uncomment the publish step in the workflow.
6. Optionally extend GitHub Release notes beyond the auto-generated summary.
