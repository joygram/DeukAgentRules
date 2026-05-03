---
createdAt: 2026-04-22 04:09:24
id: 050-fix-marker-nesting-agents-md-joy-nucb
priority: P2
status: closed
submodule: DeukAgentRules
summary: "Target Submodule: DeukAgentRules - scripts/merge-logic.mjs —
  findMarkerRegion, handleAgentInject, applyAgents - bundle/AGENTS.md — 번들 소스"
tags: rag, deukpack
title: Fix AGENTS.md marker nesting/stacking bug
---


# [Execution] Task: Fix AGENTS.md marker nesting | ID: 050

> **[CAUTION FOR AI AGENTS]**
> Target: DeukAgentRules CLI (`scripts/merge-logic.mjs`, `bundle/AGENTS.md`)

## 🎯 Scope Bounds
- **Target Submodule:** `DeukAgentRules`
- **Context Files:**
  - `scripts/merge-logic.mjs` — findMarkerRegion, handleAgentInject, applyAgents
  - `bundle/AGENTS.md` — 번들 소스

## 📁 Files Modified
- `scripts/merge-logic.mjs`: stripInternalMarkers() 추가, findMarkerRegion을 lastIndexOf로 변경, handleAgentInject에 스트리핑 적용
- `bundle/AGENTS.md`: 내부 중첩 마커 제거, 구버전(CR/LF) 블록 제거, 신버전만 유지

## 🔄 Phased Execution Steps

0. [Phase 0> RAG Research]
   - [x] RAG 검색 및 로컬 분석 완료
   - [x] 근본 원인: 번들 콘텐츠에 마커 포함 + indexOf 첫 매칭만 교체

1. [Phase 1> merge-logic.mjs 수정]
   - [x] `stripInternalMarkers()` 함수 추가
   - [x] `findMarkerRegion()` → lastIndexOf(end)로 최외곽 매칭
   - [x] `handleAgentInject()` → 스트리핑 적용

2. [Phase 2> bundle/AGENTS.md 정리]
   - [x] 내부 중첩 마커 제거, 단일 begin/end 쌍으로 통합
   - [x] CR/LF → LF 정규화, 구버전 블록 삭제

3. [Phase 3> Verification]
   - [x] DeukRag: init 3회 반복 → begin 1, end 1, 174줄 고정
   - [x] DeukPack: init → begin 1, end 1, State D 포함, 181줄
   - [x] DeukAgentRules: init → begin 1, end 1, 174줄
   - [x] State D + add_knowledge 규칙 포함 확인
   - [x] **Potential Issue Table**:
     | 이슈 | 심각도 | 설명 | 조치 계획 |
     |---|---|---|---|
     | OSS repo 미동기 | Low | DeukAgentRulesOSS에 변경 미반영 | sync-oss 또는 수동 복사 |

4. [Phase 4> Follow-up]
   - [ ] OSS repo 동기화는 release 시 sync-oss 스크립트로 자동 처리

## ✅ Verification / QA
- [x] `grep -c "deuk-agent-rule:begin" AGENTS.md` == 1 (모든 repo)
- [x] init 3회 반복 시 파일 크기 변화 없음 (174줄 고정)
- [x] DeukRag repo에서 init 후 State D 규칙 포함 확인
