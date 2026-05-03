---
summary: 티켓과 플랜 생성 언어를 사용자 프롬프트 언어 기준으로 고정
status: active
priority: P2
tags: rules, tickets, plans, language
---

# 계획: 사용자 언어 기반 티켓/플랜 생성 규칙 보강

## 목표

새 티켓과 플랜을 만들 때 저장된 `docsLanguage`, 시스템 로케일, 기존 템플릿 기본값보다 사용자의 현재 요청 언어를 우선하도록 `core-rules/AGENTS.md`에 명시합니다.

## 수정 범위

- `core-rules/AGENTS.md`
  - Tone 또는 Docs 섹션에 티켓/플랜 언어 선택 규칙 추가
  - Phase 1 설명에 티켓과 `planLink` 내용이 사용자 프롬프트 언어를 따라야 한다는 조건 추가
  - version/changelog 갱신

## 제외 범위

- 생성된 소비자 `AGENTS.md`, `.cursor/rules/` 직접 수정
- CLI의 실제 언어 감지 로직 변경
- `templates/` 구조 변경

## 실행 절차

1. 티켓을 Phase 2로 이동합니다.
2. `core-rules/AGENTS.md`를 수정합니다.
3. 필요하면 현재 티켓 체크박스를 갱신합니다.
4. `npx deuk-agent-rule lint:md`를 실행합니다.
5. `node --test scripts/tests/`를 실행합니다.
6. 결과를 기록하고 티켓을 닫습니다.

## 승인 기준

- 새 규칙이 “티켓/플랜은 사용자 프롬프트 언어 기준”을 명확히 말합니다.
- 저장된 `docsLanguage`가 있더라도 현재 사용자 언어와 충돌하면 사용자 언어가 우선임을 알 수 있습니다.
- lint와 테스트가 통과합니다.
