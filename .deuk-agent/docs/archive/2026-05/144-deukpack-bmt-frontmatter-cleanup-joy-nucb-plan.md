---
summary: DeukPack BMT 하위 티켓의 parentTicket frontmatter 중복 경고 정리 계획
status: in_progress
priority: high
tags:
  - deukpack
  - bmt
  - ticket-cleanup
  - frontmatter
---

# Plan: DeukPack BMT 하위 티켓 frontmatter 정리

## 목표
- `136`, `137`, `138`, `140` 하위 티켓에서 반복되는 `parentTicket` 중복 key 경고를 제거한다.
- 다음 실행 대상인 `140-deukpack-bmt-language-go-joy-nucb`를 정상적으로 활성화할 수 있게 한다.

## 범위
- 대상: `.deuk-agent/tickets/sub/136-deukpack-bmt-language-korean-joy-nucb.md`, `.deuk-agent/tickets/sub/137-deukpack-bmt-language-python-joy-nucb.md`, `.deuk-agent/tickets/sub/138-deukpack-bmt-language-javascript-joy-nucb.md`, `.deuk-agent/tickets/sub/140-deukpack-bmt-language-go-joy-nucb.md`
- 비대상: 하위 티켓 본문 업무 정의, 각 언어별 BMT 보강 계획, 코드 생성기, benchmark/report 산출물

## 실행 항목
1. [x] 136 Kotlin 티켓의 중복 `parentTicket` 한 줄 제거
2. [x] 137 Python 티켓의 중복 `parentTicket` 한 줄 제거
3. [x] 138 JavaScript 티켓의 중복 `parentTicket` 한 줄 제거
4. [x] 140 Go 티켓의 중복 `parentTicket` 한 줄 제거
5. [x] cleanup 티켓과 대상 4개 티켓 `lint:md` 통과

## 완료 기준
- 대상 티켓 frontmatter에서 `parentTicket` key는 각 1회만 남는다.
- Phase 전환 시 중복 key parse warning이 재발하지 않는다.
- 다음 실행 대상은 `140-deukpack-bmt-language-go-joy-nucb`로 유지한다.
