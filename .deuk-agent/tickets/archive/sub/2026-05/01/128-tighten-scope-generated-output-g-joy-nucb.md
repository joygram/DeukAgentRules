---
id: 128-tighten-scope-generated-output-g-joy-nucb
title: tighten-scope-generated-output-guard
phase: 4
status: closed
docsLanguage: ko
summary: 후보 조사 요청을 공식 데이터 모델 변경이나 생성 리포트 재생성으로 확대하지 못하도록 에이전트룰을 보완한다.
priority: high
tags:
  - rules
  - scope
  - generated-output
  - guardrail
createdAt: 2026-05-01 02:10:57
planLink: .deuk-agent/docs/plans/128-tighten-scope-generated-output-g-joy-nucb-plan.md
---


# tighten-scope-generated-output-guard

> Restrict all changes to the declared **Target Module**. Read **Context Files** before code generation.

## Scope & Constraints
- **Target:** `core-rules/AGENTS.md`
- **Context Files:** `PROJECT_RULE.md`, `core-rules/AGENTS.md`
- **Design Rationale:** 조사/후보/매칭 요청을 구현 요청으로 과해석하거나 생성 리포트를 재생성하는 사고를 룰로 차단한다.
- **Constraints:** consumer 생성물(`.cursor/rules/`, consumer `AGENTS.md`)은 직접 수정하지 않는다.

## Agent Permission Contract (APC)

### [BOUNDARY]
- Editable modules: `core-rules/AGENTS.md`, `.deuk-agent/docs/plans/`
- Forbidden modules: generated consumer spokes, unrelated CLI logic
- Rule citation: `PROJECT_RULE.md` `DC-CODEGEN`, `DC-LEGACY`, `DC-OSS`

### [CONTRACT]
- Input: 후보 조사 요청이 공식 코드/생성 산출물 변경으로 확대된 사고.
- Output: 후보/조사 요청, generated report, expected baseline 변경을 명시적으로 통제하는 룰.
- Side effects: `lint:md` 검증.

### [PATCH PLAN]
- `core-rules/AGENTS.md` 버전과 changelog를 갱신한다.
- Pre-Action Guards에 exploration-only, generated output, baseline expansion guard를 추가한다.
- Ticket Lifecycle/Docs 섹션에 승인 없는 리포트 재생성 금지를 보강한다.

## Tasks
- [x] 사고 유형을 막는 룰 문구 추가
- [x] version/changelog 갱신
- [x] markdown lint 검증

## Done When
> `npx deuk-agent-rule lint:md core-rules/AGENTS.md .deuk-agent/tickets/sub/128-tighten-scope-generated-output-g-joy-nucb.md .deuk-agent/docs/plans/128-tighten-scope-generated-output-g-joy-nucb-plan.md`가 통과한다.
