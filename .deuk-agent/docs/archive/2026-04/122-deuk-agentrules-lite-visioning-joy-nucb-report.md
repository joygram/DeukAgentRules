---
summary: "DeukAgentRules Lite/Full 접근성 비전 문서 완료 보고서"
status: complete
priority: high
tags:
  - report
  - vision
  - accessibility
  - plugin
  - skill
---

# DeukAgentRules Lite/Full 비전 문서 완료 보고서

## 산출물

- `.deuk-agent/docs/plans/122-deuk-agentrules-lite-visioning-joy-nucb-plan.md`

## 내용 요약

- DeukAgentRules를 접근성 중심의 Lite 레이어와 강제 운영 중심의 Full 레이어로 나누는 내부 방향을 정리했다.
- Lite는 `SKILL.md`와 plugin metadata 기반의 빠른 진입점으로 정의했다.
- Full은 기존 CLI, TDW, APC, lint, archive를 포함한 운영 체계로 유지한다고 명시했다.
- 후속 구현 후보로 Lite plugin metadata skeleton, Lite `SKILL.md`, README 온보딩, generator/sync check, examples 문서를 제안했다.

## 검증

- `npx deuk-agent-rule lint:md .deuk-agent/tickets/sub/122-deuk-agentrules-lite-visioning-joy-nucb.md .deuk-agent/docs/plans/122-deuk-agentrules-lite-visioning-joy-nucb-plan.md`: 통과.

## 비범위 준수

- 코드 동작은 변경하지 않았다.
- `core-rules/AGENTS.md`, `templates/`, `scripts/`, `bin/deuk-agent-rule.js`는 이 티켓에서 수정하지 않았다.
- consumer generated spokes 또는 broad regeneration은 실행하지 않았다.
