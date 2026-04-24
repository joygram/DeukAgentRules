---
id: 064-readme-concept-structure-princip-joy-nucb
title: "readme-concept-structure-principles-docs"
language: en
createdAt: 2026-04-24 01:36:33
---

# Plan: readme-concept-structure-principles-docs

## Summary
- 목적: README에 개념 계층을 추가하고, 상세 구조 설명 문서와 원리 문서를 분리하여 문서 탐색성을 높입니다.
- 범위: `README.md`, `README.ko.md`, `docs/how-it-works.md`, `docs/how-it-works.ko.md`, `docs/principles.md`, `docs/principles.ko.md`
- 비범위: CLI behavior changes, ticket format changes, OSS mirror modifications

## Current Gaps
- README는 워크플로우 요약은 있지만, "이 도구가 무엇을 추상화하는지"에 대한 개념 지도가 약합니다.
- 상세 구조와 원리 설명이 README 본문에 흩어져 있어, 처음 보는 사용자가 흐름과 근거를 분리해서 보기 어렵습니다.
- 국문/영문 설명이 분리된 상태에서 링크 표준이 없습니다.

## Design Decisions
- README는 짧은 개념 진입점으로 유지합니다.
- 상세 구조 설명은 `docs/how-it-works*.md`로 분리합니다.
- 동작 원리와 설계 이유는 `docs/principles*.md`로 분리합니다.
- 영문과 국문 문서는 같은 정보 구조를 유지합니다.

## Implementation Plan
1. README에 concept expansion 섹션과 상세 문서 링크를 추가합니다.
2. README.ko.md에도 동일한 구조의 개념 확장과 링크를 추가합니다.
3. `docs/how-it-works.md`와 `docs/how-it-works.ko.md`를 작성합니다.
4. `docs/principles.md`와 `docs/principles.ko.md`를 작성합니다.
5. 링크 일관성과 문서 구조를 검증합니다.

## Verification Plan
- README에서 상세 문서로의 링크가 끊기지 않는지 확인합니다.
- 영문과 국문 문서가 동일한 섹션 구조를 가지는지 확인합니다.
- 문서 간 용어가 일관되는지 수동 검토합니다.

## Risks
- README가 길어지면 첫 화면 가독성이 떨어질 수 있습니다.
- 영문/국문 문서가 분기되면서 수정 누락이 생길 수 있습니다.
- 신규 docs 디렉터리가 추가되므로 링크 경로를 잘못 잡으면 탐색성이 떨어질 수 있습니다.

## Acceptance Criteria
- README 양쪽에 개념 확장 섹션이 추가됩니다.
- 구조 설명 문서와 원리 문서가 생성됩니다.
- README에서 해당 문서로 바로 이동할 수 있습니다.
- 영문/국문 문서가 같은 의미 구조를 유지합니다.
