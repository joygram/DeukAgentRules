---
summary: "티켓 없음 fallback을 최근 git log 분석 기반으로 보강한 실행 보고서"
status: done
priority: P2
tags:
  - report
  - ticket-discovery
  - workflow
---

# 티켓 없음 fallback 보강 보고서

## 변경 요약
진행 가능한 티켓이 없을 때 곧바로 신규 티켓을 만드는 흐름을 바로잡았다.

`core-rules/AGENTS.md`는 v23으로 올라갔고, `ticket next`가 active/open 티켓을 찾지 못하면 최근 git history를 read-only로 분석한 뒤 후속 티켓을 만들도록 명시했다.

CLI의 `ticket next` 빈 결과 에러 메시지도 같은 행동을 안내하도록 바꿨고, 관련 테스트를 추가했다.

## 검증
`npx deuk-agent-rule lint:md` 통과.

`node --test scripts/tests/*.test.mjs` 통과. 총 29개 테스트가 pass했다.

## 참고
테스트 중 기존 진단 테스트에서 `/bin/sh: 1: Syntax error: Unterminated quoted string` 경고가 출력되지만, 테스트 실패로 이어지지 않았다.
