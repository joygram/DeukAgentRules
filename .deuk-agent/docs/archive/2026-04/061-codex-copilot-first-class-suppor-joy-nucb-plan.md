---
summary: 061-codex-copilot-first-class-suppor-joy-nucb-plan
status: active
priority: P3
tags: docs, migrated
---


# Plan: Codex / Copilot first-class support

## Summary
- 목적: `DeukAgentRules`에서 `Codex`, `Copilot`을 문서상 지원 수준이 아니라 `init`, 산출물 생성, 동적 규칙 주입, 문서 설명까지 포함한 1급 대상로 승격해요.
- 범위: `scripts/cli-utils.mjs`, `scripts/cli-init-commands.mjs`, `publish/*`, `README*` 중심으로 계획해요.
- 비범위: 이번 티켓에서 다른 에이전트의 규칙 체계 전면 개편이나 티켓 포맷 변경 자체는 포함하지 않아요.

## Current Gaps
- `AGENT_TOOLS` 선택지에 `copilot`, `codex`가 없어요.
- `Codex`는 `~/.codex/AGENTS.md` 전역 포인터만 있고 repo-local spoke가 없어요.
- `Copilot`은 `.github/copilot-instructions.md` 타깃은 있으나 내용이 일반 포인터 수준이에요.
- dynamic rule assembly가 사실상 `AGENTS.md`, `gemini.md` 위주예요.
- 실행 티켓과 plan reference 연결은 존재하지만 실제 plan 문서 자동 생성/보존이 약해요.

## Design Decisions
- 티켓은 실행 정본으로 유지하고, 이 문서는 상세 설계 정본으로 유지해요.
- `Codex`는 혼합형으로 가요.
  - 전역: `~/.codex/AGENTS.md` 포인터 유지
  - 로컬: repo-local spoke 신설
- `Copilot`은 공통 포인터 재사용이 아니라 전용 축약 지침을 생성해요.
- spoke 생성은 에이전트별 분기 구조로 바꿔서, 같은 문구를 모든 에이전트에 재사용하지 않아요.
- dynamic rule assembly는 에이전트별 최소 주입을 허용하도록 확장해요.

## Implementation Plan
1. `scripts/cli-utils.mjs`
- `AGENT_TOOLS`에 `copilot`, `codex`를 추가해 init UX와 저장 설정을 맞춰요.

2. `scripts/cli-init-commands.mjs`
- `SPOKE_REGISTRY`에 Codex local spoke를 추가해요.
- `generateSpokeContent()`를 agent별 분기형으로 개편해요.
- Copilot 전용 지침에는 티켓 우선, RAG 우선, 범위 제한, 반복 오류 시 티켓 발행 규칙을 짧게 넣어요.
- Codex local spoke에는 로컬 `AGENTS.md` 우선, 최신 티켓 사용, plan reference 열람 규칙을 넣어요.

3. `publish/rules.d/*`, `publish/AGENTS.md`, `publish/gemini.md`
- 현재 target 중심 rule injection 구조를 확장해서 Copilot/Codex 산출물에도 필요한 최소 규칙을 반영할 수 있게 해요.
- `Plan Reference`를 실행 티켓에서 실제 참고 규칙으로 읽도록 문구를 명확히 해요.

4. `README.md`, `README.ko.md`
- 지원 에이전트 매트릭스를 실제 생성 동작과 일치시켜요.
- Copilot/Codex 세션 시작 방식과 생성 산출물을 구분해서 설명해요.

## Verification Plan
- `init --dry-run`으로 `copilot`, `codex` 선택 시 예상 산출물 확인
- 실제 `init` 후 아래 파일 생성/갱신 확인
  - `.github/copilot-instructions.md`
  - repo-local Codex spoke
  - `~/.codex/AGENTS.md` 포인터 유지
- 재실행 시 중복 append 없이 안정적으로 overwrite/sync 되는지 확인
- README 설명과 실제 생성 파일이 일치하는지 확인

## Risks
- 기존 사용자 환경에 이미 있는 Copilot/Codex 파일을 덮어쓸 수 있어요.
- Codex local spoke 경로는 현재 표준화가 약해서 보수적으로 잡아야 해요.
- dynamic rule injection 범위를 넓히면 문서 중복이 늘 수 있어요.

## Acceptance Criteria
- init에서 `copilot`, `codex`를 정식 선택 가능
- Copilot/Codex 산출물이 공통 포인터가 아니라 agent-specific 내용을 가짐
- README가 실제 동작을 과장 없이 설명함
- 실행 티켓이 plan reference를 실사용 가능한 링크로 가짐
