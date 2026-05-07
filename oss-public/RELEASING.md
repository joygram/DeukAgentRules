# Releasing

Maintainer steps for Deuk Agent Flow npm packages:

1. Update [`publish/`](publish/) templates as needed. Prefer [Conventional Commits](https://www.conventionalcommits.org/) (`feat:`, `fix:`, `docs:`, …).
2. Bump [`package.json`](package.json), [`package-lock.json`](package-lock.json), and [`CHANGELOG.md`](CHANGELOG.md). Create a git tag `vX.Y.Z` that matches the package version (CI verifies this on tag builds).
3. Push the default branch (`main` or `master`). A commit whose message starts with `chore(release):` on either branch triggers [`.github/workflows/release.yml`](.github/workflows/release.yml) (`npm pack` and a GitHub Release with the tarball). Pushing a matching `v*.*.*` tag triggers the same workflow.
4. Run `npm pack` locally to inspect the tarball (`prepack` runs `sync-bundle.mjs`).
5. Run `npm run publish:dry` to verify both npm packages without registry writes.
6. Run `npm run publish` when ready. This publishes `deuk-agent-rule` first, then the `deuk-agent-flow` package. Registry credentials are required.
7. If the canonical `deuk-agent-rule` version is already published and you only need to introduce the wrapper package once, run `npm run publish:bootstrap:dry` and then `npm run publish:bootstrap`.
8. Optionally extend GitHub Release notes beyond the auto-generated summary.
