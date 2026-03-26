# Releasing

1. Update [`publish/`](publish/) templates if needed. Use [Conventional Commits](https://www.conventionalcommits.org/) for history (`feat:`, `fix:`, `docs:`, `perf:`, `refactor:` …). `npm run bump:*` runs [commit-and-tag-version](https://github.com/conventional-changelog/commit-and-tag-version), which **updates [`CHANGELOG.md`](CHANGELOG.md) from those commits** (hand-edit only when you need extra narrative).
2. Bump version **and create the git tag** in one step (`prebump` runs `npm run sync`, then the tool writes `CHANGELOG.md`, bumps `package.json` / `package-lock.json`, commits, and tags):
   - `npm run bump:patch` — or `bump:minor` / `bump:major` — or `npm run bump` to infer **major / minor / patch** from commit messages
   - Creates tag `vX.Y.Z` matching [`package.json`](package.json) (required by CI).
3. Push commit and tags: `git push && git push --tags`
4. In the monorepo mirror workflow: from this package root, `npm run sync:oss`, then commit and push `DeukAgentRulesOSS/` (or your public clone).
5. Run `npm pack` and confirm `bundle/` if you want a local tarball check (`prepack` runs `sync-bundle.mjs`).
6. `npm publish --access public` (ensure registry access for the package name).
7. GitHub **Releases** — pushing `vX.Y.Z` triggers the workflow that attaches the npm tarball; add notes if you want.
