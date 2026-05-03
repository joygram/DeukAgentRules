---
id: 144-deukpack-bmt-frontmatter-cleanup-joy-nucb
title: deukpack-bmt-frontmatter-cleanup
phase: 4
status: closed
docsLanguage: ko
summary: DeukPack BMT 하위 티켓의 parentTicket frontmatter 중복 경고를 정리합니다.
createdAt: 2026-05-01 08:03:14
priority: high
tags:
  - deukpack
  - bmt
  - ticket-cleanup
  - frontmatter
---


# deukpack-bmt-frontmatter-cleanup

> Restrict all changes to the declared **Target Module**. Read **Context Files** before code generation.

## Scope & Constraints
- **Target:** `.deuk-agent/tickets/sub/136-deukpack-bmt-language-korean-joy-nucb.md`, `.deuk-agent/tickets/sub/137-deukpack-bmt-language-python-joy-nucb.md`, `.deuk-agent/tickets/sub/138-deukpack-bmt-language-javascript-joy-nucb.md`, `.deuk-agent/tickets/sub/140-deukpack-bmt-language-go-joy-nucb.md`
- **Context Files:** `core-rules/AGENTS.md`, `PROJECT_RULE.md`, `.deuk-agent/docs/walkthroughs/142-deukpack-135-joy-nucb-report.md`
- **Design Rationale:** Phase 전환 시 YAML frontmatter parse 경고가 반복되어 다음 BMT 하위 티켓 진행을 막고 있으므로, 중복 `parentTicket` key만 제거해 티켓 파싱을 복구한다.
- **Constraints:** 티켓 본문/계획/업무 범위는 변경하지 않고 frontmatter 중복 key만 정리한다.

## Agent Permission Contract (APC)

### [BOUNDARY]
- Editable modules: 위 Target에 명시된 4개 하위 티켓 frontmatter
- Forbidden modules: 코드 생성기, 템플릿, benchmark/report 산출물, 하위 티켓 본문 업무 정의
- Rule citation: `PROJECT_RULE.md`의 `DC-CODEGEN`, AGENTS의 TDW/파일 가드

### [CONTRACT]
- Input: Phase 전환 중 표시된 `parentTicket` 중복 parse warning
- Output: 각 대상 티켓 frontmatter에 `parentTicket` key가 1회만 존재
- Side effects: 다음 하위 티켓 `140` Go를 정상적으로 활성화/진행 가능

### [PATCH PLAN]
- 대상 4개 티켓의 중복 `parentTicket` 두 번째 줄을 제거한다.
- 티켓별 본문과 계획 내용은 변경하지 않는다.
- `lint:md`로 4개 티켓과 cleanup 티켓/계획을 확인한다.

## Tasks
- [x] 136 Kotlin 티켓 frontmatter 중복 제거
- [x] 137 Python 티켓 frontmatter 중복 제거
- [x] 138 JavaScript 티켓 frontmatter 중복 제거
- [x] 140 Go 티켓 frontmatter 중복 제거

## Done When
- 대상 4개 티켓이 YAML frontmatter 중복 key 없이 parse 가능
- `lint:md`가 cleanup 티켓/계획 및 대상 4개 티켓에 대해 통과

## 📄 Attached Report
- [View Report](../../../docs/walkthroughs/144-deukpack-bmt-frontmatter-cleanup-joy-nucb-report.md)
