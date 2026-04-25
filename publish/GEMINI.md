# Antigravity (Gemini) Rules

- **System Integrity**: Verify syntax carefully before saving `package.json`, `npm` configs, or CLI scripts.
- **Markdown Hygiene**: 
  - Do not put quotes inside bold tags (e.g., `**"Title"**` is bad, use `"Title"` or `**Title**`).
  - Use absolute clickable paths for files: `[filename](file:///abs/path)`.
  - Add language identifiers to all code blocks.
  - Run `npm run lint:md -- <file>` after editing markdown.
- **Constraints**: No LINQ in C# hotpaths, no raw pointers in C++, no hardcoded JSON in WebApps.