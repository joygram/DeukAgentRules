---
summary: RAG 사용 누락과 데이터 미수집의 원인을 코드와 로그 기준으로 분해하는 분석 계획
status: draft
priority: high
tags:
  - rag
  - telemetry
  - root-cause
  - usage-gap
---

# RAG Usage Gap Root Cause Plan

## 문제 분석

현재 상태는 두 층이 분리돼 있다. 한쪽에는 티켓/plan/report/archive로 계속 쌓이는 코드·문서 산출물이 있고, 다른 한쪽에는 실제 RAG 사용 흔적을 증명하는 telemetry 데이터가 거의 없다. 이 분리 때문에 "문서는 늘어나는데 에이전트는 그걸 쓰지 않는다"는 비정상 감각이 생긴다.

실제 로그를 읽어보면 `.deuk-agent/telemetry.jsonl`의 기존 10개 로그에는 `ragResult`, `localFallback`, `knowledgeAction`, `tokenQuality`, `savedTokens`가 없다. 즉, 현재 telemetry는 RAG 사용을 증명하지 못한다. 반면 archive 흐름은 `scripts/cli-ticket-commands.mjs`의 `distillKnowledge()`를 통해 knowledge JSON을 계속 생성하지만, 그 결과가 실제 RAG 검색 품질이나 사용 증거로 이어진다는 연결은 아직 보이지 않는다.

## Source Observations

- `scripts/cli-telemetry-commands.mjs`는 `telemetry log|sync|summary`만 제공하고, RAG 호출 지점에 자동으로 연결되는 훅은 없다.
- `scripts/cli-args.mjs`는 `--rag-result`, `--local-fallback`, `--knowledge-action`, `--token-quality`, `--saved-tokens`를 파싱하지만, 이것은 수동 입력용 옵션일 뿐이다.
- `.deuk-agent/telemetry.jsonl`의 기존 로그는 모두 legacy 형식이며 RAG 필드가 없다.
- `scripts/cli-ticket-commands.mjs`의 `distillKnowledge()`는 archive 시 knowledge JSON을 생성하지만, 이 지식이 실제 RAG 인덱싱 범위에 들어간다는 증거는 별도다.
- 이전 분석 노트에서는 `distillKnowledge`의 sections가 planLink 분석을 충분히 담지 못하거나, knowledge 디렉토리가 검색 대상 밖일 수 있다는 지적이 이미 있었다.

## Cause Hypotheses

1. RAG 사용 데이터가 자동으로 수집되지 않는다.
`telemetry`는 CLI 명령일 뿐이고, RAG 수행 시 자동 로깅 경로가 보이지 않는다. 그래서 실제 사용이 있어도 증거가 남지 않을 수 있다.

2. knowledge/문서 축적과 RAG 관측이 분리돼 있다.
`archive`는 knowledge JSON을 만들지만, 그 데이터가 검색/랭킹 경로에서 실사용되는지 확인하는 계측이 없다. 결과적으로 코드와 문서만 쌓이고 사용 데이터는 비어 보인다.

3. 수동 telemetry만 있어서 운영자가 직접 찍지 않으면 데이터가 없다.
필드가 존재해도 세션마다 누가 `telemetry log`를 호출하지 않으면 `ragResult`는 계속 0이다.

4. 현재 보고 체계가 "존재"와 "사용"을 혼동한다.
인덱스나 knowledge 파일 생성은 증거가 아니고, 실제 조회 로그와 토큰 절감 로그가 있어야 사용 증거가 된다.

## Decision Rationale

이번 티켓의 목표는 기능 추가보다 원인 분해다. 그래서 먼저 "왜 데이터가 없는가"를 분해하고, 그 다음 "어디에 강제 계측을 넣어야 하는가"를 후속 티켓으로 나눈다. 즉, 이번 작업에서 바로 RAG 서버나 generated artifacts를 건드리기보다, DeukAgentRules 쪽에서 관측 가능성을 복원하는 게 우선이다.

## Execution Strategy

1. telemetry 로그를 기준으로 RAG 사용 증거의 현재 부재를 명시한다.
2. `cli-telemetry-commands.mjs`와 `cli-ticket-commands.mjs`의 분리된 책임을 문서화한다.
3. archive knowledge 생성과 RAG 사용 증거 수집이 연결되지 않는 지점을 정리한다.
4. 후속 티켓에서 자동 계측 또는 canary 로그를 넣을지 결정한다.

## Verification Design

이 티켓에서는 읽기 전용 검사와 문서 증명만 수행한다.

- `.deuk-agent/telemetry.jsonl`에 RAG 필드가 실제로 없는지 확인한다.
- archive knowledge는 생성되더라도 RAG 사용 증거가 아님을 명시한다.
- 문서 lint로 계획/보고서 구조를 검증한다.

## Execution Notes

- `telemetry.jsonl` inspection 결과: total 10 logs, `ragResult=0`, `localFallback=0`, `knowledgeAction=0`.
- `scripts/cli-telemetry-commands.mjs`에는 수동 로그/요약만 있고 자동 RAG hook은 없다.
- `scripts/cli-ticket-commands.mjs`에는 archive knowledge distillation이 있으나, 이것만으로 실사용 증거가 생기지 않는다.
- archive knowledge distillation now appends a telemetry event, so knowledge generation is observable even before true RAG hooks exist.

## Verification Outcome

- RAG 사용 증거는 현재 telemetry 로그에서 확인되지 않았다.
- 코드/문서 산출물은 쌓이지만 관측 데이터는 비어 있어, "사용됨"이 아니라 "미증명"이 정확한 판정이다.
- `node --test scripts/tests/cli-ticket-commands.test.mjs`: passed, 21 tests.
- `npx deuk-agent-rule lint:md .deuk-agent/tickets/sub/176-rag-usage-gap-root-cause-joy-nucb.md .deuk-agent/docs/plans/176-rag-usage-gap-root-cause-joy-nucb-plan.md .deuk-agent/docs/walkthroughs/176-rag-usage-gap-root-cause-joy-nucb-report.md`: passed.
