---
summary: "진행 가능한 티켓이 없을 때 최근 git log 분석을 선행하도록 Ticket Discovery fallback을 보강한다."
status: active
priority: P2
tags:
  - plan
  - phase1
createdAt: "2026-05-01 13:34:22"
---

# 티켓 없음 fallback 보강 계획

## Ticket Contract Pointer
- Linked ticket owns summary, scope, constraints, and APC.
- This planLink owns the agent's problem analysis and decision trail.
- Do not copy ticket APC or summary text into this document.

## Problem Analysis
사용자는 “득팩다음티켓” 요청 후, 진행 가능한 티켓이 없을 때 임시 티켓을 만들고 폐기하는 방식보다 기존 git log의 최근 변경 흐름을 보고 심층분석하는 것이 맞다고 정정했다.

현재 core-rules/AGENTS.md v22는 새 작업이면 즉시 티켓을 생성하고, truly unknown이면 `ticket next --path-only`를 1회 호출하도록 한다. 하지만 `ticket next`가 빈 결과를 돌려주는 경우의 fallback 분석 절차가 없다. 이 공백 때문에 실제 이어받을 작업 흐름이 git history에 남아 있어도 새 티켓 생성으로 흐를 수 있다.

## Source Observations
- `/home/joy/workspace/DeukAgentRules/core-rules/AGENTS.md` version 22를 먼저 읽었다.
- `PROJECT_RULE.md`는 Hub-Spoke 구조, 코드 생성 산출물 매핑, DC-LEGACY/DC-OSS 가드를 정의한다.
- `npx deuk-agent-rule ticket next --path-only` 결과는 `No active or open tickets found to proceed with.`였다.
- 최근 git log는 `fix(rules): keep planlink free of progress checkboxes`, `fix(rules): make planlink capture agent analysis`, `fix(rules): separate ticket and plan content`, `fix(ticket): honor project and submodule filters`, `docs(rules): clarify phase one execution semantics` 순으로 TDW Phase 1과 ticket/planLink 경계 강화 흐름을 보여준다.
- 관련 코드 표면은 `scripts/cli-ticket-commands.mjs`의 `runTicketNext` 에러 메시지와 `scripts/tests/cli-ticket-commands.test.mjs`의 next/create 테스트다.

## Cause Hypotheses
- 실제로 열린 티켓이 없어서 다음 티켓 탐색이 실패했을 가능성이 가장 높다.
- 열린 티켓 없음은 작업 없음이 아니라 최근 커밋에서 닫힌 작업의 후속 미정리 지점이 남아 있을 수 있다는 신호일 수 있다.
- 규칙이 no-ticket fallback을 정의하지 않으면 에이전트는 새 티켓을 성급하게 만들거나, 반대로 아무 후속 분석 없이 멈출 수 있다.

## Decision Rationale
다음 티켓 탐색은 이미 1-CALL RULE에 따라 1회 수행했다. 그 결과가 비었을 때의 정석 절차를 core rules에 명시한다.

새 fallback은 read-only git history 분석을 먼저 요구하고, 분석 결과로 이어받을 후속 작업이 확인될 때만 그 분석을 근거로 티켓을 생성하도록 한다. 이렇게 하면 ghost ticket을 줄이면서도 No Ticket, No Code 원칙은 유지된다.

## Execution Strategy
`core-rules/AGENTS.md`의 Ticket Discovery 표와 CLI Reference 설명에 no-ticket fallback을 추가한다.

`scripts/cli-ticket-commands.mjs`의 빈 결과 에러 메시지는 에이전트가 최근 git log 분석으로 넘어가야 함을 안내하도록 보강한다. 테스트는 에러 메시지가 fallback guidance를 포함하는지 확인한다.

한국어/영어 사용자 문서는 TDW 일상 흐름 안에 “다음 티켓 없음” 상황의 처리 원칙을 짧게 추가한다.

## Verification Design
`npx deuk-agent-rule lint:md .deuk-agent/tickets/sub/151-next-ticket-check-joy-nucb.md .deuk-agent/docs/plans/151-next-ticket-check-joy-nucb-plan.md`를 실행한다.

규칙과 CLI 변경 후 `npx deuk-agent-rule lint:md`와 `node --test scripts/tests/*.test.mjs`를 실행한다. 기대 결과는 markdown lint와 focused CLI tests 통과다.

## Verification Result
`npx deuk-agent-rule lint:md`는 6개 파일을 검사해 통과했다.

`node --test scripts/tests/*.test.mjs`는 29개 테스트가 모두 통과했다. 기존 진단 테스트 실행 중 `/bin/sh: 1: Syntax error: Unterminated quoted string` 경고가 출력되지만, 테스트 결과는 fail 없이 pass다.
