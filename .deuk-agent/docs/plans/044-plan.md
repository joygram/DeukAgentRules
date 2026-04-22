# [Goal] Hardening DeukAgentRules: Recursive Consistency and Index Normalization

Stabilize the `DeukAgentRules` CLI and rule system by resolving data integrity issues in `INDEX.json` and ensuring full recursive initialization across all submodules.

## User Review Required

> [!IMPORTANT]
> The `init` command will now perform a deep scan and update `INDEX.json` paths. This is a non-destructive but significant metadata change.
> Submodules will now receive full `AGENTS.md` and Hub Rules deployment by default if `init` is run at the root.

## Proposed Changes

### [CLI Logic & Normalization]

#### [MODIFY] [cli-ticket-logic.mjs](file:///home/joy/workspace/i/DeukAgentRules/scripts/cli-ticket-logic.mjs)
- Implement `normalizeTicketPaths(cwd)`:
  - Reads `INDEX.json`.
  - Scans the actual file system in `.deuk-agent/tickets`.
  - Updates each entry's `path` to match reality.
  - Removes entries whose files no longer exist.
- Update `syncActiveTicketId` to call normalization if significant path changes are detected.

### [Recursive Initialization Expansion]

#### [MODIFY] [cli-init-commands.mjs](file:///home/joy/workspace/i/DeukAgentRules/scripts/cli-init-commands.mjs)
- Refactor `runInit` to move `applyAgents`, `applyRules`, and `syncTemplates` INTO the submodule loop.
- Ensure each submodule gets a standalone `AGENTS.md` and a fully populated `.deuk-agent/rules` folder.
- Add a final `writeTicketListFile(subCwd, index.entries, { render: true })` call for each submodule to ensure documentation is fresh.

### [Verification & Cleanup]

#### [MODIFY] [cli-init-logic.mjs](file:///home/joy/workspace/i/DeukAgentRules/scripts/cli-init-logic.mjs)
- Add verification step to ensure `.deuk-agent/docs/plans` and `walkthroughs` are created with correct permissions.

## Verification Plan

### Automated Tests
- `node scripts/cli.mjs init --cwd tmp/test-recursive --non-interactive`
- Check if `tmp/test-recursive/submoduleA/AGENTS.md` exists and is updated.
- Check if `tmp/test-recursive/submoduleA/.deuk-agent/tickets/INDEX.json` has normalized paths.

### Manual Verification
- Run `init` in `workspace/i` and check `DeukPack` index state.
- Verify `TICKET_LIST.md` in `DeukPack` is updated.
