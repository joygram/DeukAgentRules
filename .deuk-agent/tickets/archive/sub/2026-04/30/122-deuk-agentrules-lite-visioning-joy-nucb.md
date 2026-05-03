---
id: 122-deuk-agentrules-lite-visioning-joy-nucb
title: deuk-agentrules-lite-visioning
phase: 4
status: closed
docsLanguage: ko
summary: Document plugin and skill based accessibility vision for DeukAgentRules
  internal development
priority: high
tags:
  - vision
  - accessibility
  - plugin
  - skill
  - distribution
createdAt: 2026-04-30 23:55:36
planLink: .deuk-agent/docs/plans/122-deuk-agentrules-lite-visioning-joy-nucb-plan.md
---


# deuk-agentrules-lite-visioning

> Restrict all changes to the declared **Target Module**. Read **Context Files** before code generation.

## Scope & Constraints
- **Target:** `.deuk-agent/docs/plans/122-deuk-agentrules-lite-visioning-joy-nucb-plan.md`, internal ticket metadata for this task
- **Context Files:** `core-rules/AGENTS.md`, `PROJECT_RULE.md`, `README.md`, `docs/how-it-works.md`
- **Design Rationale:** 접근성 향상을 위해 DeukAgentRules를 skill/plugin 진입점이 있는 Lite 레이어와 기존 CLI 기반 Full 레이어로 분리하는 내부 방향을 문서화한다.
- **Constraints:** 코드 동작 변경 없이 내부 개발 문서와 티켓 문서만 수정한다. 생성물 규칙과 Hub-Spoke 아키텍처를 깨지 않는다.

## Agent Permission Contract (APC)

### [BOUNDARY]
- Editable modules: `.deuk-agent/tickets/sub/122-deuk-agentrules-lite-visioning-joy-nucb.md`, `.deuk-agent/docs/plans/122-deuk-agentrules-lite-visioning-joy-nucb-plan.md`
- Forbidden modules: `core-rules/AGENTS.md`, `templates/`, `scripts/`, `bin/deuk-agent-rule.js`
- Rule citation: `DC-CODEGEN`, `DC-OSS`, TDW Phase 1 plan artifact requirement

### [CONTRACT]
- Input: Karpathy-style skill/plugin 배포 방식과 DeukAgentRules의 접근성 개선 요구
- Output: 내부 비저닝 문서 1건과 그에 맞는 티켓 APC/작업 정의
- Side effects: `.deuk-agent/docs/plans/`에 신규 계획 문서 생성, 해당 ticket의 APC와 task 갱신

### [PATCH PLAN]
- plan 문서 frontmatter와 본문을 내부 비저닝 문서 형식으로 작성한다.
- ticket APC를 실제 수정 범위와 산출물 기준으로 채운다.
- markdown lint로 ticket과 plan 문서를 함께 검증한다.

## Tasks

- [x] Lite 접근성 배포 비전 문서를 작성한다.
- [x] 스킬, 플러그인, CLI의 역할 분리 원칙을 문서화한다.
- [x] ticket과 plan 문서에 대해 markdown lint를 통과시킨다.

## Done When

내부 비전 문서가 `.deuk-agent/docs/plans/122-deuk-agentrules-lite-visioning-joy-nucb-plan.md`에 존재하고, Lite/Full 분리 전략과 도입 단계가 명시되며, ticket + plan markdown lint가 통과한다.

## Verification

- [x] `npx deuk-agent-rule lint:md .deuk-agent/tickets/sub/122-deuk-agentrules-lite-visioning-joy-nucb.md .deuk-agent/docs/plans/122-deuk-agentrules-lite-visioning-joy-nucb-plan.md`

## 📄 Attached Report
- [View Report](../../../docs/walkthroughs/122-deuk-agentrules-lite-visioning-joy-nucb-report.md)
