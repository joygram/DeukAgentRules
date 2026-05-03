---
summary: 후보 조사 요청의 범위 확대와 생성 산출물 오염 방지 룰 보완
status: active
priority: high
tags: [rules, scope, generated-output, guardrail]
---

# 후보 조사 요청의 범위 확대와 생성 산출물 오염 방지 룰 보완

## 목표

사용자가 “뽑아보자”, “매칭해보자”, “검토”, “후보”처럼 조사/분류를 요청했을 때, 에이전트가 공식 데이터 모델 변경이나 생성 리포트 재생성으로 확대하지 못하게 한다.

## 실행 계획

- [x] `core-rules/AGENTS.md` 버전을 v17로 올리고 changelog를 추가한다.
- [x] Pre-Action Guards에 exploration-only 요청과 generated output 재생성 제한을 추가한다.
- [x] 공식 baseline/expected competitor/테스트 매트릭스 변경은 별도 승인 없이는 금지한다고 명시한다.
- [x] Markdown lint로 규칙 문서를 검증한다.

## 검증

- `npx deuk-agent-rule lint:md core-rules/AGENTS.md .deuk-agent/tickets/sub/128-tighten-scope-generated-output-g-joy-nucb.md .deuk-agent/docs/plans/128-tighten-scope-generated-output-g-joy-nucb-plan.md`
