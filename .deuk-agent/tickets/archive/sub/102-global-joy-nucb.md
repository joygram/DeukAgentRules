---
id: 102-global-joy-nucb
title: "enforce unidirectional AGENTS.md single source of truth"
---
# enforce unidirectional AGENTS.md single source of truth

## Analysis & Constraints (Deep Review)

### Root Cause
`core-workflow.md`의 frontmatter에 `inject_target: ["AGENTS.md", "GEMINI.md"]`가 선언되어 있으나, `cli-init-commands.mjs`의 `syncGeminiRules` 함수는 `compileDynamicRules`를 호출하지 않는다. 결과적으로:

1. GEMINI.md에 rule module이 주입되지 않지만, 과거 수동으로 추가된 TDW 워크플로우 내용이 레거시로 잔존.
2. `syncGeminiRules`가 `writeFileSync`로 템플릿을 덮어쓰지만, 이전에 에이전트가 직접 수정한 내용은 init 재실행 전까지 유지됨.
3. AGENTS.md와 GEMINI.md 사이 규칙이 파편화되어 어느 쪽이 정합(canonical)인지 모호해짐.

### Architecture Constraint
- 모든 규칙의 단일 소스(Single Source of Truth)는 `AGENTS.md`여야 한다.
- 에이전트별 파일(GEMINI.md, CLAUDE.md, .cursor/rules/deuk-agent.mdc 등)은 `AGENTS.md`를 참조하는 포인터(spoke)로만 기능해야 한다.
- rule module의 `inject_target`은 `["AGENTS.md"]`만 허용해야 한다.

## Strict Rules Check
- TDW: Phase 1 계획. 사용자 승인 후 실행.
- 단방향 원칙: AGENTS.md -> Spokes. 역방향 규칙 주입 금지.

## Scope (In / Out)

### In
1. `templates/rules.d/core-workflow.md`: `inject_target`에서 `"GEMINI.md"` 제거. `["AGENTS.md"]`만 남김.
2. `templates/AGENTS.md`: `[MANDATORY]` 아티팩트 언어 규칙 추가.
3. `scripts/cli-init-commands.mjs`: `syncGeminiRules`가 spoke 포인터 컨텐츠만 생성하도록 확인. (현재 이미 올바르게 동작하지만, `inject_target` 정리 후 무결성 확인.)
4. `scripts/cli-rule-compiler.mjs`: `inject_target` 검증 로직에 spoke 파일에 대한 주입 시도를 경고하는 guard 추가 (선택적).
5. 기존 워크스페이스(DeukAgentContext, DeukPack 등)에 `npx deuk-agent-rule init --workflow execute` 재실행으로 레거시 정리.

### Out
- merge-logic.mjs 리팩토링 (현재 동작에 문제 없음).
- 새로운 spoke 타입 추가.
- 에이전트별 규칙 커스터마이징 프레임워크 신설.

## Tasks
- [ ] `templates/rules.d/core-workflow.md`: `inject_target`에서 `"GEMINI.md"` 제거
- [ ] `templates/AGENTS.md`: `[MANDATORY]` 아티팩트 언어 규칙 추가
- [ ] `templates/rules.d/core-workflow.md`에 Tone 규칙이 AGENTS.md에만 주입되도록 확인
- [ ] DeukAgentContext 워크스페이스에 init 재실행하여 GEMINI.md 레거시 제거 확인
- [ ] DeukPack 워크스페이스에 init 재실행하여 동일 확인
- [ ] lint:md 통과 확인

## Done When
- `core-workflow.md`의 `inject_target`이 `["AGENTS.md"]`만 포함.
- `npx deuk-agent-rule init`을 실행하면 GEMINI.md가 AGENTS.md 포인터로만 생성됨.
- 기존 워크스페이스의 GEMINI.md에서 TDW 워크플로우 등 중복 내용이 제거됨.
- lint:md 통과.
