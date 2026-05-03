---
summary: "ticket next 경로 재계산 하드닝 완료 보고서"
status: complete
priority: P2
tags:
  - report
  - tickets
  - cli
  - hardening
---

# ticket next 경로 재계산 하드닝 보고서

## 변경 요약

- `computeTicketPath()`가 `group: "tickets"`인 레거시 루트 티켓을 `.deuk-agent/tickets/<topic>.md`로 계산하도록 수정했다.
- `processTicketFile()`이 실제 markdown 파일명을 `fileName`으로 보존하도록 수정했다.
- `computeTicketPath()` 회귀 테스트에 루트 레거시 티켓과 파일명 기반 경로 케이스를 추가했다.

## 검증

- `node --test scripts/tests/cli-utils.test.mjs`: 16개 통과.
- `node --test scripts/tests/*.test.mjs`: 22개 통과.
- `npx deuk-agent-rule ticket next --path-only`: `/home/joy/workspace/DeukAgentRules/.deuk-agent/tickets/044-deukagentrules-hardening-joy-nucb.md` 출력 확인.
- `npx deuk-agent-rule lint:md .deuk-agent/tickets/044-deukagentrules-hardening-joy-nucb.md .deuk-agent/docs/plans/001-044-deukagentrules-hardening-joy-nucb-plan.md`: 통과.

## 참고

- 전체 테스트 출력에 기존 shell quoting 경고 한 줄이 표시되지만 TAP 결과는 모두 pass였다.
- 작업 중 이미 존재하던 다른 티켓 파일 삭제 상태는 이번 범위가 아니어서 변경하지 않았다.
