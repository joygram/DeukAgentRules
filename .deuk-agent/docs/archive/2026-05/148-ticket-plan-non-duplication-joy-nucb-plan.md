---
summary: "ticket/planLink 비중복 역할 분리 실행 근거"
status: draft
priority: P2
tags:
  - plan
  - phase1
createdAt: "2026-05-01 13:14:10"
---

# Planning Evidence

## Ticket Contract Pointer
- 경계, 금지 영역, 산출 계약은 linked ticket의 APC가 소유한다.
- 이 문서는 같은 내용을 반복하지 않고 근거, 구현 순서, 검증 증거만 기록한다.

## Evidence
- 현재 티켓 템플릿은 Scope/APC/Tasks를 생성하고, planLink 초안은 Goal/Steps/Verification을 생성한다.
- CLI의 planLink 초안은 티켓 summary를 frontmatter와 Goal에 반복한다.
- 사용자는 티켓과 기획문서 사이에 중복 내용이 없어야 한다고 명시했다.

## Steps
- [x] `core-rules/AGENTS.md`에 티켓/planLink 소유권 분리를 명시한다.
- [x] `templates/TICKET_TEMPLATE.md`에서 상세 실행 절차가 planLink로 넘어가도록 문구를 정리한다.
- [x] `scripts/cli-ticket-commands.mjs`의 planLink 초안 생성 내용을 비중복 구조로 바꾼다.
- [x] 사용자 문서에서 planLink의 역할을 “반복 계획”이 아니라 “근거/실행/검증 기록”으로 설명한다.

## Verification
- [x] `npx deuk-agent-rule lint:md core-rules/AGENTS.md templates/TICKET_TEMPLATE.md docs/principles.ko.md docs/principles.md docs/usage-guide.ko.md docs/how-it-works.ko.md docs/how-it-works.md .deuk-agent/tickets/sub/148-ticket-plan-non-duplication-joy-nucb.md .deuk-agent/docs/plans/148-ticket-plan-non-duplication-joy-nucb-plan.md`
- [x] `node --test scripts/tests/*.test.mjs`

## Expected Outcomes
- 티켓은 identity/scope/APC만 보유한다.
- planLink는 evidence/steps/verification만 보유한다.
- 같은 문장이나 같은 단계 목록을 양쪽에 복사하지 않는다.
