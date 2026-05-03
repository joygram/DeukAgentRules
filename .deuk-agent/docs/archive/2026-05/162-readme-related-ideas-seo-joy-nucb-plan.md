---
summary: "README 관련 아이디어 링크와 검색 키워드 보완 계획"
status: ready
priority: P2
tags:
  - plan
  - phase1
createdAt: "2026-05-01 22:01:27"
---

# Agent Analysis Plan

## Ticket Contract Pointer
- Linked ticket owns summary, scope, constraints, and APC.
- This planLink owns the agent's problem analysis and decision trail.
- Do not copy ticket APC or summary text into this document.

## Problem Analysis
DeukAgentRules는 AI 코딩 에이전트 가드레일 포지션을 강화하고 있다. `andrej-karpathy-skills`는 Claude Code/Cursor 사용자층과 문제의식이 겹치며 큰 GitHub 관심도를 가진 관련 프로젝트다. README 하단에 무맥락 링크만 넣으면 이탈이 생길 수 있으므로, inspiration으로 배치하고 DeukAgentRules의 ticket/phase/archive 차별점을 바로 뒤에 설명해야 한다.

## Source Observations
README와 README.ko는 하단에 키워드 섹션이 있다. `oss-public/GITHUB_DESCRIPTION.md`는 GitHub About 문구와 Topics 정본 역할을 한다. 외부 링크 대상은 CLAUDE.md, Cursor rule, skills를 제공하며 LLM coding pitfalls, overengineering, surgical changes 같은 검색 키워드와 맞닿아 있다.

## Cause Hypotheses
현재 README 키워드는 DeukAgentRules 내부 표현에 치우쳐 있고, 일반 사용자가 검색할 `claude-code`, `agents-md`, `cursor-rules`, `agent-skills`, `ai-guardrails`와 같은 표면 키워드가 약하다.

## Decision Rationale
하단에 `Related Ideas & Inspiration` 섹션을 넣고, 관련 프로젝트를 대체재가 아닌 문제의식 공유 대상으로 소개한다. 바로 이어서 DeukAgentRules가 prompt-level guideline을 repository-level workflow로 확장한다는 차별점을 적고 CLI CTA를 남긴다. GitHub Topics 정본에는 검색 키워드를 추가한다.

## Execution Strategy
README.md와 README.ko.md의 키워드 위에 관련 아이디어 섹션을 추가한다. `oss-public/GITHUB_DESCRIPTION.md`의 topics 목록에 agent-skills/claude-code/agents-md/cursor-rules/ai-guardrails 등 유입 키워드를 추가한다. 기능 코드 변경은 하지 않는다.

## Verification Design
`npx deuk-agent-rule lint:md`로 문서 포맷을 검증한다.

## Execution Notes
- Added a `Related Ideas & Inspiration` section to `README.md` and `README.ko.md` before the keyword block.
- Positioned `andrej-karpathy-skills` as an adjacent guideline-first inspiration source, then clarified DeukAgentRules as the repository-level workflow and guardrail layer.
- Expanded README keyword tags with `ClaudeCode`, `ClaudeMD`, `AgentsMD`, `AgentSkills`, `CodingAgent`, and `AI-Guardrails`.
- Expanded `oss-public/GITHUB_DESCRIPTION.md` Topics with adjacent discovery terms such as `claude-code`, `agents-md`, `cursor-rules`, `agent-skills`, `ai-guardrails`, and `ticket-driven-workflow`.
- Added a positioning note to avoid `karpathy` as a topic unless explicitly needed, preventing implied affiliation while still capturing adjacent search intent.

## Verification Outcome
- `npx deuk-agent-rule lint:md README.md README.ko.md oss-public/GITHUB_DESCRIPTION.md .deuk-agent/tickets/sub/162-readme-related-ideas-seo-joy-nucb.md .deuk-agent/docs/plans/162-readme-related-ideas-seo-joy-nucb-plan.md` passed.
