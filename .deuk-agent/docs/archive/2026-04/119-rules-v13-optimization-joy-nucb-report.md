---
summary: "rules-v13-optimization 실행 보고서"
status: complete
priority: P3
tags:
  - report
  - rules
  - optimization
---

# rules-v13-optimization 실행 보고서

## 변경 요약

- `core-rules/AGENTS.md`를 version 18로 올렸다.
- v17에서 추가된 G6/G7/G8, generated output guard, TDW phase gate는 유지했다.
- 장황한 guard 설명과 shell mutation clause를 압축했다.
- `templates/TICKET_TEMPLATE.md`의 빈 placeholder 문구를 실행 가능한 기본 문장으로 바꿨다.

## 크기 변화

- `core-rules/AGENTS.md`: 10,320 bytes → 8,847 bytes.
- `templates/TICKET_TEMPLATE.md`: 1,214 bytes → 1,627 bytes.
- 템플릿은 placeholder를 줄이기 위해 설명이 늘었지만 신규 티켓 품질을 우선했다.

## 검증

- `npx deuk-agent-rule lint:md core-rules/AGENTS.md templates/TICKET_TEMPLATE.md .deuk-agent/tickets/sub/119-rules-v13-optimization-joy-nucb.md .deuk-agent/docs/plans/119-rules-v13-optimization-joy-nucb-plan.md`: 통과.
- `node --test scripts/tests/*.test.mjs`: 22개 통과.

## 참고

- 전체 테스트 출력에 기존 shell quoting 경고 한 줄이 표시되지만 TAP 결과는 모두 pass였다.
- broad regeneration인 `npx deuk-agent-rule init`은 실행하지 않았다.
