---
summary: "Agent problem analysis and decision trace for 194-deukpack-context-truth-archive-d-joy-nucb-plan"
status: draft
priority: P2
tags:
  - plan
  - phase1
createdAt: "2026-05-02 22:06:02"
---

# Agent Analysis Plan

## Ticket Contract Pointer
- Linked ticket owns summary, scope, constraints, and APC.
- This planLink owns the agent's problem analysis and decision trail.
- Do not copy ticket APC or summary text into this document.

## Problem Analysis
DeukPack's MCP/context story already explains intent and identity, but it does not yet state the operating hierarchy clearly enough for agents and contributors.

- The journal article explains why structure alone is not enough for AI context.
- The distribution/source guide explains when source should be used, but it does not explicitly separate current truth, advisory context, and long-term archive.
- Without that distinction, a reader can incorrectly treat cached context or archived notes as if they were the current source of truth.

## Source Observations
- `deukpack.app/docs/journal/ai-control-plane-design.md` already frames MCP as access plus intent, with `Identity Card` semantics for AI agents.
- `deukpack.app/docs/journal/ai-control-plane-design.ko.md` mirrors the same argument in Korean, so the update should stay bilingual and structurally aligned.
- `deukpack.app/docs/tutorial/distribution-vs-source.md` and `.ko.md` already distinguish distribution from source, which is a good nearby reference for a truth-layer note.
- `deukpack.app/docs/products/mcp-hub.md` presents MCP as a bridge/hub, not as the authoritative storage layer.

## Cause Hypotheses
- The documentation emphasizes how to reach data and how to model identity, but not which layer is authoritative when they disagree.
- Archive and context terminology are used informally across docs, so the practical hierarchy is left implicit.

## Decision Rationale
- Add a short truth-layer section to the journal article rather than inventing a new standalone doc.
- Keep the message close to the MCP/context discussion so the "source is truth, context is advisory, archive is durable history" rule lands where the confusion starts.
- Use the Korean and English article pair to avoid asymmetric guidance.

## Execution Strategy
- Insert a concise section before the conclusion in both journal variants.
- Describe three layers explicitly: source/SSOT, online context, and archive.
- Keep the wording descriptive rather than policy-heavy so the article still reads like a product essay.

## Execution Notes

- Added a new truth-layer section to `deukpack.app/docs/journal/ai-control-plane-design.md`.
- Added the same guidance in Korean to `deukpack.app/docs/journal/ai-control-plane-design.ko.md`.
- Kept the change local to the journal pair instead of spreading the same idea into multiple docs at once.

## Verification Design
- Review the edited docs for heading consistency and translation parity.
- Run markdown lint on the touched files if available in the repo.
- Confirm the new section does not change product semantics beyond the intended clarification.

Residual risk:
- If this note proves too narrow, a follow-up update may still be needed in the distribution/source guide to reinforce the same hierarchy from another angle.

## Verification Notes

- `git -C /home/joy/workspace/deukpack.app diff --check -- docs/journal/ai-control-plane-design.md docs/journal/ai-control-plane-design.ko.md`
- Manual review confirmed the inserted section reads consistently in English and Korean.

Observed outcome:
- The DeukPack article now states the operating hierarchy explicitly: source is the SSOT, context is advisory, archive is durable history.
- The Korean article mirrors the same hierarchy and preserves the original narrative tone.
