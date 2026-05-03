---
summary: "rules-v13-optimization 티켓의 최신 v17 기준 실행 계획"
status: draft
priority: P3
tags:
  - plan
  - rules
  - optimization
  - phase1
---

# rules-v13-optimization 실행 계획

## 목표

오래된 “v12→v13 최적화” 목표를 현재 v17 정본 기준으로 재해석한다. 핵심 안전 규칙은 유지하고, 실제 실행 단계에서는 중복/장황함/placeholder 유발 문구만 줄인다.

## 현재 관찰

- `core-rules/AGENTS.md`: version 17, 약 10.3KB.
- `templates/TICKET_TEMPLATE.md`: 약 1.2KB, placeholder 항목이 남아 있어 신규 티켓 품질 저하 가능성이 있다.
- 과거 080 계획은 강한 압축을 제안하지만, 현재 v17의 TDW/가드 확장 이후 그대로 적용하면 안전 규칙 회귀 위험이 있다.
- 과거 110 계획은 `planLink`와 APC 도달성을 강화한 이력으로, 이번 작업에서도 보존해야 한다.

## 실행 후보

### 1. `core-rules/AGENTS.md` 축약 후보

- Tone/Boot/Pre-Action/Lifecycle/File Guard의 의미는 유지한다.
- 중복 설명과 장황한 경고 문구만 줄인다.
- CLI Reference는 현재 실제 명령과 맞는 항목만 유지한다.
- G6/G7/G8 같은 최신 scope-expansion guard는 삭제하지 않는다.

### 2. `templates/TICKET_TEMPLATE.md` 개선 후보

- `[module/submodule path]`, `[Task 1]`, `[Verification steps...]` 같은 빈 placeholder를 줄인다.
- Target/Context/APC/Tasks/Done When을 생성 직후 더 실행 가능한 문장으로 바꾼다.
- `planLink` 전제와 Phase 1 완료 조건이 티켓 본문에서 드러나게 한다.

### 3. 검증 후보

- `wc -c core-rules/AGENTS.md templates/TICKET_TEMPLATE.md`
- `npx deuk-agent-rule lint:md core-rules/AGENTS.md templates/TICKET_TEMPLATE.md .deuk-agent/tickets/sub/119-rules-v13-optimization-joy-nucb.md .deuk-agent/docs/plans/119-rules-v13-optimization-joy-nucb-plan.md`
- `node --test scripts/tests/*.test.mjs`
- broad regeneration은 금지한다. 필요하면 `/tmp` 워크스페이스에서 dry-run 성격으로만 확인한다.

## 승인 후 Patch Plan

1. [x] `core-rules/AGENTS.md`에서 의미 중복과 과도한 설명만 축약한다.
2. [x] `templates/TICKET_TEMPLATE.md`의 placeholder 문구를 실행 가능한 기본값으로 개선한다.
3. [x] 변경 전후 크기와 보존한 guard 목록을 티켓에 기록한다.
4. [x] lint/test를 실행한다.
5. [ ] walkthrough report 작성 후 티켓을 close/archive한다.

## 비범위

- consumer `.cursor/rules/`, consumer `AGENTS.md` 직접 수정.
- `npx deuk-agent-rule init`로 broad generated output 재생성.
- `bin/deuk-agent-rule.js` 로직 변경.
- v17 신규 guard 삭제.

## 승인 필요

이 계획은 Phase 1까지의 준비안이다. 실행하려면 사용자의 명시 승인이 필요하다.
