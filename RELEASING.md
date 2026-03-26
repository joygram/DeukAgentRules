# Releasing

1. Update [`publish/`](publish/) templates if needed.
2. Bump `version` in [`package.json`](package.json).
3. Run `npm pack` and confirm `bundle/` contents (`prepack` runs `sync-bundle.mjs`).
4. `npm publish --access public` (ensure registry access for the package name).
5. Optional: GitHub **Releases** — tag `vX.Y.Z`, add release notes.
