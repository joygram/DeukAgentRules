---
summary: "검증 데이터 기반 문서 품질 누락 결함을 템플릿과 출력 규칙에서 수정"
status: draft
priority: P2
tags:
  - plan
  - docs-quality
  - lint
  - report
---

# Agent Analysis Plan

## Ticket Contract Pointer
- 티켓은 이번 수정의 범위와 APC 경계를 관리한다.
- 이 문서는 walkthrough/report 문서의 누락 결함을 막는 lint 규칙과 검증 결과 보강만 다룬다.
- 보고서의 검증 결과 누락을 다음 작업부터 자동으로 잡는 것이 목표다.

## Problem Analysis
- 현재 report 문서는 Summary/Verification만 있고, 결과를 명시하는 섹션이 빠진 경우가 많다.
- 이 때문에 검증 데이터는 있어도 문서가 무엇을 증명했는지 한눈에 읽히지 않는다.
- 기존 lint는 frontmatter와 링크 무결성만 보므로, 결과 섹션 누락은 통과한다.

## Source Observations
- `scripts/lint-md.mjs`는 모든 markdown에 대해 frontmatter와 링크만 검사한다.
- `scripts/cli-ticket-commands.mjs`는 report attach 시 파일을 복사하지만 report 내용 구조는 검사하지 않는다.
- 기존 walkthrough report들 중 상당수는 `Verification Outcome` 또는 `검증 결과` 섹션이 없다.
- 새로 만든 report 초안도 검증은 적어도 결과를 따로 적지 않으면 품질 분석에 불리하다.

## Cause Hypotheses
- 문서 품질 결함은 작성자 실수만이 아니라, output rule의 부재로 반복된다.
- report를 ticket/plan처럼 구조화된 산출물로 다루지 않아서 outcome 누락이 감지되지 않는다.
- 기존 문서가 통과해 온 이유는 lint가 구조적 완성도를 검사하지 않았기 때문이다.

## Decision Rationale
- report 문서를 바꾸는 대신, report 파일에만 적용되는 lint 규칙을 추가한다.
- 이렇게 하면 기존 티켓/플랜 규칙과 충돌하지 않고, 앞으로 작성되는 report의 누락만 막을 수 있다.
- 현재 존재하는 report 초안에는 outcome 섹션을 보강해 규칙을 충족시킨다.

## Execution Strategy
- `scripts/lint-md.mjs`에 walkthrough report 전용 섹션 검사를 추가한다.
- report 파일은 `Summary/요약`, `Verification/검증`, `Verification Outcome/검증 결과` 중 최소 결과 섹션을 요구한다.
- 관련 테스트를 추가해 report 구조 누락이 lint 실패로 이어지는지 확인한다.
- 현재 생성된 보고서 초안도 결과 섹션을 채운다.

## Verification Design
- `node --test scripts/tests/*.test.mjs`로 lint와 report 관련 회귀를 확인한다.
- `npx deuk-agent-rule lint:md`로 현재 변경 문서가 새 규칙을 통과하는지 확인한다.
- 변경된 report 문서에 `Verification Outcome`이 포함되는지 확인한다.

## Verification Outcome
- `scripts/lint-md.mjs`에 walkthrough report 전용 Summary/Verification/Outcome 검사가 추가됐다.
- `scripts/tests/lint-md.test.mjs`와 `scripts/tests/cli-ticket-commands.test.mjs`가 새 규칙을 통과했다.
- `node --test scripts/tests/*.test.mjs`와 `npx deuk-agent-rule lint:md`가 모두 통과했다.
