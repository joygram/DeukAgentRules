---
id: 119-rules-v13-optimization-joy-nucb
title: rules-v13-optimization
phase: 4
status: closed
docsLanguage: ko
summary: "AGENTS.md v12→v13 최적화: 8.7KB→6KB 압축, TICKET_TEMPLATE modernize, dead
  file cleanup"
createdAt: 2026-04-29 20:02:55
planLink: .deuk-agent/docs/plans/119-rules-v13-optimization-joy-nucb-plan.md
priority: P3
tags:
  - rules
  - optimization
  - planning
  - migrated
---


# rules-v13-optimization

> **[CAUTION FOR AI AGENTS]**
> 1. Restrict all analysis, file creation, and modifications to the declared **Target Module** below.
> 2. Read the files listed in **Context Files** before doing ANY code generation.
> 3. DO NOT leak configuration, logic, or dependencies from other modules.

## Target Module

- **Target:** `core-rules/AGENTS.md`, `templates/TICKET_TEMPLATE.md`, related markdown lint/tests only.
- **Context Files:** `PROJECT_RULE.md`, `.deuk-agent/docs/plans/080-agents-md-full-refactor-joy-nucb-plan.md`, `.deuk-agent/docs/plans/110-agent-degradation-remediation-joy-nucb-plan.md`

## Analysis & Constraints (Deep Review)

1. Root Cause & Architecture constraint:
   - 이 티켓은 오래된 “v12→v13 최적화” 목표를 담고 있지만 현재 정본은 v17이다.
   - v17에는 TDW, generated/report guard, baseline expansion guard 등 최신 안전 규칙이 포함되어 있어 단순 압축 삭제는 회귀 위험이 크다.
2. Risk & Edge Cases:
   - `core-rules/AGENTS.md`를 과도하게 축약하면 boot sequence, phase gate, generated artifact guard가 약화될 수 있다.
   - `templates/TICKET_TEMPLATE.md`를 바꾸면 이후 모든 신규 티켓 품질에 영향을 준다.
   - `init` 실행은 broad output regeneration이므로 실행 단계에서 별도 승인 없이는 금지한다.

## Agent Permission Contract (APC)

> ⚠️ [MANDATORY] Do NOT write or modify any code until this 4-block contract is completely filled out.

### [BOUNDARY]

- **변경 가능한 모듈:** `core-rules/AGENTS.md`, `templates/TICKET_TEMPLATE.md`, 이 티켓 문서와 plan/report 문서.
- **변경 금지 모듈:** `bin/deuk-agent-rule.js`, generated consumer spokes, `.cursor/rules/` 배포 산출물, benchmark/report/generated outputs, unrelated DeukPack files.

### [CONTRACT]

- **input:** 현재 v17 `core-rules/AGENTS.md`(약 10.3KB), `templates/TICKET_TEMPLATE.md`, 과거 080/110 계획.
- **output:** 최신 v17 안전 규칙을 유지하면서 중복/불명확/낡은 표현만 줄이는 실행 후보안과, 승인 후 적용 가능한 제한된 패치.
- **side effects:** markdown 문서 갱신, 실행 승인 후 정본/템플릿 문서 수정 가능. `init`이나 generated output 재생성은 별도 승인 전 금지.
- **Rule Citation (프로젝트 룰 인용):** `core-rules/AGENTS.md` = single source of truth; `templates/` = distributed to consumers via `init`; Consumer `.cursor/rules/` spokes and Consumer `AGENTS.md` are generated from `core-rules/AGENTS.md`/`templates/rules.d/`.

### [PATCH PLAN]

- **file:** `core-rules/AGENTS.md`
- **function:** 정본 에이전트 규칙
- **change:** v17 guard 의미를 유지하면서 중복 문장, 장황한 설명, 오래된 CLI reference 표현을 축약한다. 삭제 후보는 먼저 plan에 명시하고 실행 전 승인받는다.
- **file:** `templates/TICKET_TEMPLATE.md`
- **function:** 신규 티켓 기본 구조
- **change:** placeholder 발생을 줄이도록 Target/Context/APC/Done When 문구를 더 실행 가능한 형태로 정리한다.
- **file:** markdown lint/tests
- **function:** 검증
- **change:** `npx deuk-agent-rule lint:md`, 필요 시 `node --test scripts/tests/*.test.mjs`로 문서/CLI 회귀를 확인한다.

### [TEST IMPACT]

- **affected tests:** `npx deuk-agent-rule lint:md`, `node --test scripts/tests/*.test.mjs`, 실행 승인 시 `npx deuk-agent-rule init --dry-run` 또는 `/tmp` 기반 검증만 사용.

## Tasks

- [x] Phase 0: 현재 v17 정본과 관련 과거 계획 확인.
- [x] Phase 1: 최신 상태 기준으로 APC와 실행 계획 재작성.
- [x] Phase 2: 승인 후 정본/템플릿 최적화 후보 적용.
  - `core-rules/AGENTS.md` version을 18로 올리고 v17 guard 의미를 유지한 채 문구를 압축했다.
  - `templates/TICKET_TEMPLATE.md`의 빈 placeholder를 실행 가능한 기본 문구로 교체했다.
- [x] Phase 3: lint/test 및 생성 산출물 dry-run 검증.
  - `core-rules/AGENTS.md`: 10,320 bytes → 8,847 bytes.
  - `templates/TICKET_TEMPLATE.md`: 1,214 bytes → 1,627 bytes. placeholder 감소를 위해 구조 설명은 늘어났다.
  - `npx deuk-agent-rule lint:md core-rules/AGENTS.md templates/TICKET_TEMPLATE.md .deuk-agent/tickets/sub/119-rules-v13-optimization-joy-nucb.md .deuk-agent/docs/plans/119-rules-v13-optimization-joy-nucb-plan.md`: 통과.
  - `node --test scripts/tests/*.test.mjs`: 22개 통과.
- [x] Phase 4: 보고서 작성 후 close/archive.
  - `.deuk-agent/docs/walkthroughs/119-rules-v13-optimization-joy-nucb-report.md` 작성.

## Done When

- `core-rules/AGENTS.md`의 최신 v17 안전 규칙이 손상되지 않는다.
- 변경 전후 크기와 주요 guard 보존 여부가 기록된다.
- `templates/TICKET_TEMPLATE.md`가 placeholder 티켓 생성을 줄이는 방향으로 개선된다.
- markdown lint와 관련 테스트가 통과한다.

## 📄 Attached Report
- [View Report](../../../docs/walkthroughs/119-rules-v13-optimization-joy-nucb-report.md)
