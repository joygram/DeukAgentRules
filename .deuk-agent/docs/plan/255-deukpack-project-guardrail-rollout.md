---
summary: DeukPack current-state guardrail rollout for low-capability agent containment and BMT protocol stabilization
status: draft
priority: P2
tags: [deukpack, guardrails, bmt, low-capability, stabilization]
---

# DeukPack Project Guardrail Rollout

## Current Special Situation

DeukPack is not in a stable baseline state. The worktree currently has in-flight project rule, ticket/index, and Java BMT adapter changes. Active Java tickets separate supported-family `verify_failed` rows from unsupported-family `unimplemented` rows:

- Supported-family lane: `DpPack`, `DpJson` remain Java `verify_failed`.
- Unsupported-family lane: `XTBinary`, `XTCompact`, `XTJson`, `XPb`, `DpYaml`, `DpZero` remain `unimplemented`.
- These categories must not be collapsed, hidden, or promoted to pass by local workaround.

## Project-Level Defense

Add a DeukPack-local rule section under `PROJECT_RULE.md` or `.deuk-agent/domain-rules/` with these guards:

- Current-State Quarantine: snapshot dirty worktree and active ticket before code changes.
- BMT Status Discipline: preserve `passed`, `verify_failed`, `unimplemented`, and `blocked` as distinct states.
- Low-Capability Containment: stop/split/escalate if the agent cannot state rule source, affected module set, parity surface, and verification bundle.
- Anti-Bypass: forbid local patches that skip metadata/registry/provider parity, generated/source boundaries, or required matrix checks.
- Ticket Velocity: repeated symptom tickets in one failure family convert to a stabilization ticket.

## Static Gates To Add In DeukPack

- Protocol provider parity test across codegen-time languages.
- Language metadata completeness check for protocol method spellings.
- EJS Dumb View static check that rejects protocol/type branching in templates.
- Codegen plugin lint gate for `as any` and unsafe protocol shortcuts.
- BMT guard that fails if unsupported rows are hidden, relabeled as pass, or merged into generic failure.
- Cross-language generated roundtrip or compile/roundtrip capability gate, with unsupported lanes explicit.

## Java BMT Stabilization Lane

- Keep Java `DpPack`/`DpJson` verification separate from unsupported protocol-family work.
- Do not broaden Java unsupported protocols into this lane until a provider/runtime implementation ticket exists.
- Do not broad-regenerate official BMT reports unless the active stabilization ticket authorizes it.
- Close only when the Java lane records the exact harness failure, the fix path, and the smallest verification command bundle.

## Completion Criteria

- DeukPack has a local project rule update for current-state quarantine, anti-bypass, low-capability containment, and BMT status discipline.
- DeukPack has machine-returnable static/CI checks for the highest-risk bypass patterns.
- Future low-capability-agent work on BMT/protocol surfaces stops at diagnostics unless it can prove parity impact and run the required guard bundle.
