# 065-doc-lint-after-document-write-rule Report

## Summary
- Added a documentation writeback rule that requires linting touched markdown files after edits.
- Added a local `lint:md` validator script for markdown structure, frontmatter, relative links, and code fence balance.
- Updated agent-facing rule files, README guidance, and mirrored publish/bundle copies to match the new policy.

## Verification
- `node --check scripts/lint-md.mjs`
- `npm run lint:md -- AGENTS.md gemini.md publish/AGENTS.md publish/gemini.md bundle/AGENTS.md bundle/gemini.md README.md README.ko.md docs/how-it-works.md docs/how-it-works.ko.md docs/principles.md docs/principles.ko.md .deuk-agent/docs/plans/065-doc-lint-after-document-write-ru-joy-nucb-plan.md .deuk-agent/tickets/sub/065-doc-lint-after-document-write-ru-joy-nucb.md`

## Notes
- The repository already contains unrelated dirty markdown files. The new validator is intended to run on the touched markdown set for the active task.
- No follow-up ticket was needed.
