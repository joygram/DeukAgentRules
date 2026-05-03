---
summary: "Karpathy skills와 DeukAgentRules/DeukAgentContext 비교 포지셔닝 리서치 계획"
status: ready
priority: P1
tags:
  - plan
  - phase1
createdAt: "2026-05-01 22:05:45"
---

# Agent Analysis Plan

## Ticket Contract Pointer
- Linked ticket owns summary, scope, constraints, and APC.
- This planLink owns the agent's problem analysis and decision trail.
- Do not copy ticket APC or summary text into this document.

## Problem Analysis
Karpathy skills 계열은 Claude Code 사용자의 즉시 체감 문제를 건드린다. 모델이 과하게 구현하고, 지시를 잊고, 좁은 변경을 못 지키는 문제를 `CLAUDE.md`/skill 형식으로 줄인다. DeukAgentRules는 같은 문제를 더 넓은 계층에서 다룬다. 즉, 특정 클라이언트의 프롬프트 보강이 아니라 레포 단위 ticket, phase, scope, verification, archive, DeukAgentContext memory를 연결한다. 이 차이를 명확히 하지 않으면 DeukAgentRules가 "또 하나의 rule pack"으로 오해될 수 있다.

## Source Observations
- `docs/product-positioning-research.ko.md`는 DeukAgentRules를 "AI coding agent guardrails"로 포지셔닝한다.
- `docs/organic-growth-plan.ko.md`는 VS Code/Open VSX, instruction hub, skill registry를 유입 루프로 제안한다.
- `docs/vision-agent-guardrails.ko.md`는 "bring your own agent", "No Ticket, No Code", "Archive as project memory"를 핵심 원칙으로 둔다.
- README 하단에는 `andrej-karpathy-skills`가 관련 아이디어로 이미 연결되어 있다.
- Claude Code 공식 문서는 skills를 절차/체크리스트를 필요할 때 로드하는 확장 표면으로 설명한다.
- GitHub Copilot 공식 문서는 `AGENTS.md`, `CLAUDE.md`, `GEMINI.md`, repository/path-specific instructions를 지원한다.
- Codex 소개 자료는 `AGENTS.md`와 테스트/로그 증거를 강조한다.
- 2026년 연구들은 agent skills가 유망하지만 검색/선택/품질/권한 문제에서 취약하다고 본다.

## Cause Hypotheses
- 시장은 skill/guideline 레이어를 빠르게 받아들이지만, 팀 단위 운영자는 누가 어떤 skill을 언제 적용했는지, 결과가 검증됐는지, 기록이 남는지를 더 필요로 한다.
- DeukAgentRules의 기회는 skill 자체를 대체하는 것이 아니라 skill을 ticketed execution과 memory loop 안에 넣는 것이다.
- DeukAgentContext는 단순 RAG가 아니라 "닫힌 작업에서 증류된 엔지니어링 메모리"로 포지셔닝해야 차별성이 선명해진다.

## Decision Rationale
별도 문서 `docs/karpathy-skills-vs-deukagent-positioning.ko.md`를 작성한다. 기존 세 문서에 흩어진 내용을 무리하게 합치면 읽기 흐름이 흐려지므로, 비교 축을 중심으로 새 문서를 만들고 README 문서 목록에 연결한다.

## Execution Strategy
문서는 2026년 트렌드, 제품 비교표, 포지셔닝 문장, 개발 방향성, 로드맵, 오가닉 유입 메시지, 리스크를 포함한다. 외부 자료는 링크로 근거를 남기고, 길게 인용하지 않는다. README/README.ko의 상세 문서 표에 새 문서를 추가한다.

## Verification Design
`npx deuk-agent-rule lint:md`로 새 문서와 README 문서 포맷을 검증한다. 리서치 문서이므로 기능 테스트는 없다. 잔여 리스크는 외부 생태계가 빠르게 변한다는 점이며, 문서에는 작성일과 트렌드 판단 시점을 명시한다.

## Execution Notes
- Added `docs/karpathy-skills-vs-deukagent-positioning.ko.md`.
- Compared Karpathy-style skills, DeukAgentRules, and DeukAgentContext across product layer, user, lifecycle, strengths, failure modes, and combination strategy.
- Framed Karpathy skills as behavior playbooks, DeukAgentRules as workflow/permission control, and DeukAgentContext as ticketed engineering memory.
- Added development direction: first-party skill packs, `skill expose`, ticket creation recall, VS Code visible control surface, and public content loop.
- Linked the new document from `README.md` and `README.ko.md`.

## Verification Outcome
- `npx deuk-agent-rule lint:md docs/karpathy-skills-vs-deukagent-positioning.ko.md README.md README.ko.md .deuk-agent/tickets/sub/163-karpathy-skills-vs-deukagent-pos-joy-nucb.md .deuk-agent/docs/plans/163-karpathy-skills-vs-deukagent-pos-joy-nucb-plan.md` passed.
