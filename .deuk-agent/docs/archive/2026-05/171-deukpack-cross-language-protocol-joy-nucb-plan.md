---
summary: "Policy-split analysis and verification trace for 171-deukpack-cross-language-protocol-joy-nucb-plan"
status: complete
priority: P2
tags:
  - plan
  - phase4
createdAt: "2026-05-02 04:44:14"
---

# Agent Analysis Plan

## Ticket Contract Pointer
- Linked ticket owns summary, scope, constraints, and APC.
- This planLink owns the agent's problem analysis and decision trail.
- Do not copy ticket APC or summary text into this document.

## Problem Analysis
The roundtrip matrix originally risked treating every generated protocol as if it belonged in the same clean-room path. That is unsafe for two lanes:

- `XTJson` is a schema-sensitive interop JSON lane with dedicated protocol behavior.
- `DpCsv` is a table-oriented lane that does not belong in the clean-room wire matrix.

Without an explicit policy split, generated protocol growth can create silent skips or accidental coverage gaps.

## Source Observations
- `src/protocols/DpFormatRuntime.ts` now defines `WIRE_ROUNDTRIP_POLICY_PROTOCOLS` for `XTJson` and `DpCsv`, while `WIRE_ROUNDTRIP_PROTOCOLS` excludes those lanes from the clean-room matrix.
- `src/serialization/__tests__/WireRoundtripMatrix.test.ts` adds a Phase 0 policy test that requires exact coverage across matrix + policy-only lanes.
- `scripts/bmt/protocol-contract.json` still lists all generated protocol contracts, so the runtime policy must stay explicit rather than inferred.
- `src/__tests__/BmtGeneratedRoundtripPolicy.test.ts` confirms the separate generated-language gating model used elsewhere in the repo.

## Cause Hypotheses
- Protocol coverage had been derived from the generated enum set without a separate lane policy.
- `XTJson` and `DpCsv` need different verification assumptions than the clean-room roundtrip matrix.
- The protocol list can expand faster than matrix logic, so hidden omissions were possible without a direct coverage assertion.

## Decision Rationale
- Keep the generated protocol contract untouched.
- Encode policy in source constants instead of scattering exceptions through tests.
- Treat `XTJson` and `DpCsv` as policy-only lanes, while keeping `DpYaml` in the matrix via its explicit YAML branch.
- Add a coverage test that fails if any generated protocol is neither matrix-covered nor policy-covered.

## Execution Strategy
- Derive roundtrip matrix inputs from a clean-room protocol list.
- Keep policy-only lanes centralized in `WIRE_ROUNDTRIP_POLICY_PROTOCOLS`.
- Verify exact coverage by comparing the matrix set, policy set, and generated protocol list.
- Preserve direct protocol roundtrip tests for the matrix lanes and retain the YAML-specific path.

## Verification Design
- `npx jest src/serialization/__tests__/WireRoundtripMatrix.test.ts --runInBand`
- `npm test` was attempted, but the environment is blocked later in `build:cpp` because `cmake` is not installed.
- Expected outcome: phase 0 policy coverage test passes, and the matrix still roundtrips all included protocols.

## Verification Outcome
- `npx jest src/serialization/__tests__/WireRoundtripMatrix.test.ts --runInBand` passed.
- The policy split now covers all generated protocols exactly once across matrix + policy-only lanes.
- Residual risk: broad `npm test` remains environment-dependent because of the missing `cmake` tool in this session.
