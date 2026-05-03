---
summary: "DeukAgentRules 제품 포지셔닝과 오가닉 유입 문서화 계획"
status: ready
priority: P2
tags:
  - plan
  - phase1
createdAt: "2026-05-01 21:49:42"
---

# Agent Analysis Plan

## Ticket Contract Pointer
- Linked ticket owns summary, scope, constraints, and APC.
- This planLink owns the agent's problem analysis and decision trail.
- Do not copy ticket APC or summary text into this document.

## Problem Analysis
현재 DeukAgentRules는 npm CLI와 규칙/티켓 워크플로우 중심으로 설명되어 있다. 일반 AI 코딩 에이전트 사용자를 유입시키려면 npm 패키지 설명만으로는 부족하고, VS Code/Cursor/Copilot/Codex/Claude 생태계에서 사용자가 이미 이해하는 표면과 연결된 제품 포지셔닝, 비전, 오가닉 유입 계획이 필요하다.

## Source Observations
기존 README는 Sovereign Workflow Control Plane, Hub-Spoke, TDW, APC를 강조한다. 공식 문서 리서치 결과 VS Code는 Views, Walkthroughs, Commands, Marketplace publishing을 확장 유입 표면으로 제공한다. GitHub Copilot은 `.github/copilot-instructions.md`, `.github/instructions`, `AGENTS.md`/`CLAUDE.md`/`GEMINI.md` 계열 agent instructions를 문서화한다. Cursor는 `.cursor/rules`를 코드베이스 스코프의 버전 관리 규칙으로 다룬다. Claude Code는 `CLAUDE.md`, custom slash commands, skills를 공식 확장 표면으로 둔다. Codex CLI는 AGENTS.md 문서를 공식 저장소에 제공한다.

## Cause Hypotheses
유입 병목은 기능 부재보다 제품 메시지와 채널 패키징의 부재다. DeukAgentRules가 “규칙 생성기”처럼 보이면 검색/마켓플레이스에서 약하고, “AI coding agent guardrails”로 보이면 사용자가 겪는 문제와 직접 연결된다.

## Decision Rationale
문서는 세 갈래로 나눈다. 첫째, 근거 중심 리서치 문서는 외부 생태계 표면과 시사점을 기록한다. 둘째, 비전 문서는 DeukAgentRules의 장기 포지션을 agent guardrail/control plane으로 재정의한다. 셋째, 오가닉 유입 계획은 npm CLI에서 VS Code/Open VSX/agent instruction hub/skill registry/badge/report loop로 확장하는 실행 순서를 제시한다.

## Execution Strategy
`docs/` 아래에 한국어 문서 3개를 추가한다. 공식 자료 링크는 각 문서의 Sources 또는 Evidence 섹션에 넣고, 외부 링크는 신뢰 근거로 쓰되 CTA와 전환 경로는 DeukAgentRules 내부 액션으로 설계한다. 기존 README는 이번 티켓에서 대폭 수정하지 않고 새 문서를 참조 가능한 독립 산출물로 둔다.

## Verification Design
문서 작성 후 `npx deuk-agent-rule lint:md`를 실행한다. 필요하면 문서 목록과 링크를 점검한다.

## Verification Outcome
`npx deuk-agent-rule lint:md docs/product-positioning-research.ko.md docs/vision-agent-guardrails.ko.md docs/organic-growth-plan.ko.md` 통과. README 문서 목록 연결 후 `npx deuk-agent-rule lint:md` 전체 통과. 코드 변경이 없는 문서 작업이므로 테스트 실행은 생략했다.
