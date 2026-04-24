---
id: 065-doc-lint-after-document-write-ru-joy-nucb
title: "doc-lint-after-document-write-rule"
status: open
submodule: DeukAgentRules
project: DeukAgentRules
createdAt: 2026-04-24 01:45:16
---

# [Execution] Task: doc-lint-after-document-write-rule | ID: 065-doc-lint-after-document-write-ru-joy-nucb

> **[CAUTION FOR AI AGENTS]**
> You are operating within a locked multi-module monorepo.
> 1. Restrict absolutely all analysis, file creation, and modifications to the declared **[Target Submodule]** below.
> 2. Read the files listed in **[Context Files]** before doing ANY code generation.
> 3. DO NOT leak configuration, logic, or dependencies from other submodules.

## 🎯 Scope Bounds
- **Target Submodule:** `DeukAgentRules`
- **Context Files:**
  - `AGENTS.md`
  - `gemini.md`
  - `publish/AGENTS.md`
  - `publish/gemini.md`
  - `bundle/AGENTS.md`
  - `bundle/gemini.md`
  - `README.md`
  - `README.ko.md`
  - `package.json`
  - `scripts/cli.mjs`
  - `scripts/lint-md.mjs`

## 📁 Files to Modify
- `AGENTS.md`: add a hard rule that markdown documents must be linted after any write.
- `gemini.md`: mirror the lint-after-save rule and keep the current markdown hygiene policy.
- `publish/AGENTS.md`: align the published project rule set with the new lint policy.
- `publish/gemini.md`: align the published Gemini rule set with the new lint policy.
- `bundle/AGENTS.md`: keep the bundled runtime rule copy in sync.
- `bundle/gemini.md`: keep the bundled Gemini copy in sync.
- `package.json`: add a `lint:md` script entry for the post-write check.
- `scripts/lint-md.mjs`: add a lightweight markdown validator for generated docs and rule files.
- `README.md`: note the documentation lint policy in the usage guidance.
- `README.ko.md`: mirror the documentation lint policy in Korean.

## 🏗️ Design Decisions (Refer to Plan)
- **Plan Reference**: [065-doc-lint-after-document-write-ru-joy-nucb-plan.md](file:///home/joy/workspace/i/DeukAgentRules/.deuk-agent/docs/plans/065-doc-lint-after-document-write-ru-joy-nucb-plan.md)
- **Plan Path Rule**: `.deuk-agent/docs/plans/<ticket-id>-plan.md`
- The rule should be explicit in agent-facing docs, not hidden in implementation only.
- The validator should be lightweight and repository-local so it can run without new external tooling.
- The same policy should be mirrored in root, publish, and bundle copies to avoid drift.

## 🛑 Strict Constraints (Rules to never break)
- Do not introduce a heavy dependency tree just for markdown linting.
- Keep the validator conservative: report broken docs, do not rewrite content automatically.
- Preserve the current tone and structure of the existing agent rule files.

## 🔄 Phased Execution Steps
> Agent: Do NOT attempt to do Phase 3 before Phase 1 is fully tested.

0. [Phase 0> RAG Research (MCP)]
   - [x] `mcp_deukrag_search_rules` 기반 규약 검토 완료
   - [x] `mcp_deukrag_search_tickets` 과거 유사 티켓 이력 열람 완료
   - [x] (필수 작성) 검색된 핵심 컨텍스트 요약:
     - `gemini.md` already contains a lint-before-save rule, but `AGENTS.md` and the mirrored bundle/publish copies should carry the same policy.
     - The repository has no existing `lint:md` script, so an explicit local validator is needed for the rule to be actionable.
     - Documentation files are already treated as first-class workflow artifacts in `.deuk-agent/docs/` and ticket reports, so post-write lint fits the existing workflow model.
   - [x] (RAG Miss 시 필수 작성) 로컬 검색 결과 `mcp_deukrag_add_knowledge` 도구로 즉시 주입 완료 여부 및 주입된 파일 목록:
     - Not needed. Relevant local rule files and scripts were found directly.

0.5 [Phase 0.5> Deep Analysis (Optional)]
   - [ ] 복잡한 아키텍처 변경 시 별도 분석 아티팩트 작성 및 승인 완료

1. [Phase 1> Setup / Parsing]
   - [x] lint policy scope confirmed
   - [x] validator behavior defined

2. [Phase 2> Core Logic Change]
   - [x] (CONTINUOUS RAG) rule files updated with lint-after-save guidance
   - [x] `lint:md` script added and wired to local markdown validation

3. [Phase 3> Cleanup / Verification]
   - [x] `npm run lint:md -- <touched markdown files>` succeeds on the modified markdown set
   - [x] published and bundled rule copies remain in sync
   - [x] **Potential Issue Table**:
     | 이슈 | 심각도 | 설명 | 조치 계획 |
     |---|---|---|---|
     | 없음 | 낮음 | 문서 lint 규칙과 실제 스크립트가 일치함 | 후속 조치 없음 |

4. [Phase 4> Follow-up Chaining (MANDATORY if issues exist)]
   - [x] 위 표에서 즉시 해결 불가능한 항목에 대해 별도 티켓 발행 완료
     > CLI Command Example: `deuk-agent-rule ticket create --topic 048-F1-fix-issue --chain --group <group>`
   - [x] (필수 작성) 발행된 후속 티켓 번호 리스트:
     - 없음

## ✅ Verification / QA
- [x] **Deep Analysis Verification**: rule files and validator behavior stay aligned with the existing documentation workflow.
- [x] **Potential Issues Check**: [Identify side effects, edge cases, or performance impacts]
- [x] **Strict Constraints Audit**: [No heavy external dependency adoption, keep markdown policy conservative]
- [x] `npm run lint:md -- <touched markdown files>` 실행 결과 확인

## 📄 Attached Report
- [View Report](../../../docs/walkthroughs/065-doc-lint-after-document-write-ru-joy-nucb-report.md)
