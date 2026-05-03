---
id: 066-canonical-rule-normalization-joy-nucb
title: 066-canonical-rule-normalization
language: ko
createdAt: 2026-04-24 09:51:39
summary: 066-canonical-rule-normalization
status: active
priority: P3
tags: docs, migrated
---


# Plan: 066-canonical-rule-normalization

## Summary
- 목적: `DeukAgentRules` 정본의 룰을 범용화하고 오류(경로 오타 등)를 수정하여 workspace 전체에 신뢰할 수 있는 규칙 전파.
- 범위: `bundle/AGENTS.md` 수정, `bundle/rules.d/deukpack-codec.md` 신규 생성.
- 비범위: CLI 바이너리 수정, 신규 MCP 도구 추가.

## Current Gaps
- **경로 오류**: `AGENTS.md`에서 템플릿 경로를 `.deuk-agent-templates/`로 잘못 참조함 (실제는 `.deuk-agent/templates/`).
- **도메인 강결합**: 전역 룰인 `AGENTS.md`에 `DeukPack` 전용 코덱 규칙이 포함되어 있어 범용성이 떨어짐.
- **표기 불일치**: Identity 섹션의 일부 하드룰이 한글로만 되어 있어 글로벌 대응이 부족함.

## Design Decisions
- **DeukPack 규칙 분리**: `DeukPack Codec & IDL Strict Rules` 섹션을 `bundle/rules.d/deukpack-codec.md`로 이동.
- **경로 표준화**: 모든 문서 내 템플릿 경로를 실제 디렉토리 구조인 `.deuk-agent/templates/`로 통일.

## Implementation Plan
1. `bundle/rules.d/deukpack-codec.md` 파일을 생성하고 `DeukPack` 관련 규칙 이동.
2. `bundle/AGENTS.md`에서 해당 섹션 삭제 및 템플릿 경로 오타 수정.
3. Identity 섹션의 한글 규칙을 영어와 병기하도록 수정.
4. `npx deuk-agent-rule merge` 명령을 통해 `DeukRag` 및 `DeukPack` 저장소에 변경사항 전파 및 검증.

## Verification Plan
- 수정 후 `merge` 명령이 정상적으로 룰을 배포하는지 확인.
- 배포된 각 저장소의 `AGENTS.md`에서 수정된 경로와 분리된 모듈이 올바르게 적용되었는지 `grep`으로 검증.

## Risks
- 경로 수정 시 기존 자동화 스크립트가 해당 경로를 하드코딩하여 사용 중일 경우 오작동 가능성 -> `grep`으로 workspace 전수 조사 필요.

## Acceptance Criteria
- `AGENTS.md` 내 템플릿 경로가 `.deuk-agent/templates/`로 수정됨.
- `DeukPack` 규칙이 `AGENTS.md`에서 제거되고 모듈화됨.
- 전체 workspace에 `merge`를 통한 룰 전파가 성공함.
