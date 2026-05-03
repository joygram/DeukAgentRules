---
createdAt: 2026-04-24 01:17:01
id: 063-force-rule-approval-gate-joy-nucb
priority: P2
project: DeukAgentRules
status: open
submodule: DeukAgentRules
summary: "Target Submodule: DeukAgentRules - DeukAgentRules/gemini.md -
  DeukAgentRules/AGENTS.md"
tags: rag, mcp, tickets, testing
title: force-rule-approval-gate
---


# [Execution] Task: force-rule-approval-gate | ID: 063-force-rule-approval-gate-joy-nucb

> **[CAUTION FOR AI AGENTS]**
> You are operating within a locked multi-module monorepo.
> 1. Restrict absolutely all analysis, file creation, and modifications to the declared **[Target Submodule]** below.
> 2. Read the files listed in **[Context Files]** before doing ANY code generation.
> 3. DO NOT leak configuration, logic, or dependencies from other submodules.

## 🎯 Scope Bounds
- **Target Submodule:** `DeukAgentRules`
- **Context Files:**
  - `DeukAgentRules/gemini.md`
  - `DeukAgentRules/AGENTS.md`
  - `DeukAgentRules/scripts/cli.mjs`
  - `DeukAgentRules/scripts/cli-init-commands.mjs`
  - `DeukAgentRules/scripts/cli-utils.mjs`
  - `DeukAgentRules/scripts/merge-logic.mjs`
  - `DeukAgentRules/scripts/cli-ticket-commands.mjs`

## 📁 Files to Modify
- `DeukAgentRules/scripts/cli-utils.mjs`: add explicit workflow/approval state and stop treating unapproved execution as implicit write permission.
- `DeukAgentRules/scripts/cli-init-commands.mjs`: gate init/merge write paths behind approval state and persist the selected workflow mode.
- `DeukAgentRules/scripts/merge-logic.mjs`: split preparation from mutation so plan mode cannot write without approval.
- `DeukAgentRules/scripts/cli.mjs`: expose approval-oriented CLI surface and help text.
- `DeukAgentRules/AGENTS.md`: align the documented workflow with the enforced approval gate.
- `DeukAgentRules/gemini.md`: align the IDE-facing workflow with the enforced approval gate.

## 🏗️ Design Decisions (Refer to Plan)
- **Plan Reference**: [063-force-rule-approval-gate-joy-nucb-plan.md](file:///home/joy/workspace/i/DeukAgentRules/.deuk-agent/docs/plans/063-force-rule-approval-gate-joy-nucb-plan.md)
- **Plan Path Rule**: `.deuk-agent/docs/plans/<ticket-id>-plan.md`
- Approval is a first-class runtime state, not a documentation convention.
- Preparation and mutation must be separate paths.
- Default behavior in unapproved plan mode must be advisory-only.
- Existing ticket and rule documents remain the source of truth for approval state.

## 🛑 Strict Constraints (Rules to never break)
- No silent fallback from plan mode to write mode.
- No destructive overwrite of ticket contents or rule documents.
- Keep CLI output deterministic and concise.
- Preserve existing ticket creation and retrieval flows.

## 🔄 Phased Execution Steps
> Agent: Do NOT attempt to do Phase 3 before Phase 1 is fully tested.

0. [Phase 0> RAG Research (MCP)]
   - [x] `mcp_deukrag_search_rules` 기반 규약 검토 완료
   - [x] `mcp_deukrag_search_tickets` 과거 유사 티켓 이력 열람 완료
   - [x] (필수 작성) 검색된 핵심 컨텍스트 요약: `DeukAgentRules`의 `gemini.md`는 Phase 1에서 티켓 생성 후 승인 대기를 요구하지만, `cli-utils.mjs`와 `merge-logic.mjs`의 현재 기본 경로는 `agentsMode=inject`라 승인 상태를 강제하지 않습니다. 따라서 plan mode와 approval boundary는 문서상 존재할 뿐 runtime gate가 없습니다.
   - [x] (RAG Miss 시 필수 작성) 로컬 검색 결과 `mcp_deukrag_add_knowledge` 도구로 즉시 주입 완료 여부 및 주입된 파일 목록: RAG Miss 아님.

0.5 [Phase 0.5> Deep Analysis (Optional)]
   - [x] 복잡한 아키텍처 변경 시 별도 분석 아티팩트 작성 및 승인 완료
   - Analysis result: approval gate must be represented as a runtime state and not only as a rule document.

1. [Phase 1> Setup / Parsing]
   - [x] Current workflow states mapped: plan, approval pending, approved execution.
   - [x] Enforcement surface identified: init, merge, shared agent merge logic, and CLI help.

2. [Phase 2> Core Logic Change]
   - [x] (CONTINUOUS RAG) 새로운 함수/클래스 수정 전 `mcp_deukrag_search_code` 및 `search_rules`로 관련 패턴 수시 검색
   - [x] Introduce explicit approval-aware workflow state in config loading and persistence.
   - [x] Split advisory preparation from write execution in `applyAgents()` and related init/merge flows.
   - [x] Add a CLI approval boundary so plan mode can complete preparation without mutating files.
   - [x] Update documentation strings so the enforced behavior matches the workflow contract.

3. [Phase 3> Cleanup / Verification]
   - [x] (VERIFY RAG) 디버깅 및 에러 발생 시 로그 덤프 전 `mcp_deukrag_search_tickets` 로 과거 해결책 우선 탐색
   - [x] **Potential Issue Table**:
     | 이슈 | 심각도 | 설명 | 조치 계획 |
     |---|---|---|---|
     | Legacy config normalization | Low | Existing config files without `workflowMode` now normalize to plan mode, so write-side commands require explicit `--workflow execute` or `--approval approved`. | Documented in `AGENTS.md`, `gemini.md`, and CLI help; keep this as an intentional enforcement boundary. |

4. [Phase 4> Follow-up Chaining (MANDATORY if issues exist)]
   - [x] 위 표에서 즉시 해결 불가능한 항목에 대해 별도 티켓 발행 완료
     > CLI Command Example: `deuk-agent-rule ticket create --topic 048-F1-fix-issue --chain --group <group>`
   - [x] (필수 작성) 발행된 후속 티켓 번호 리스트: none

## ✅ Verification / QA
- [x] **Deep Analysis Verification**: Phase 0.5에서 도출된 핵심 설계 및 구조적 결정사항이 코드에 모두 올바르게 반영되었는지 확인.
- [x] **Potential Issues Check**: approval gate misfire, config migration, CLI help drift, write-path regression.
- [x] **Strict Constraints Audit**: No silent execution fallback, no ticket mutation, no destructive overwrite.
- [x] `npm run test` 또는 관련 검증 명령 실행 결과 확인

## 📄 Attached Report
- [View Report](../../../docs/walkthroughs/063-force-rule-approval-gate-joy-nucb-report.md)
