---
summary: i 및 workspace 전체 .deuk-agent 디렉토리 구조 정합화
status: verified
priority: P2
tags:
  - deukagent
  - workspace-hygiene
  - deukpack
---
# 201-deukagent-workspace-layout-unification-plan

## 문제 정의
기존 `i`와 기타 저장소의 `.deuk-agent` 하위가 과도하게 분산되어 보이며, 과거 구조 흔적과 현재 구조가 혼합되어 있어 정합성 점검이 어렵다.

## 현상 관측
- `i`는 `docs/`, `tickets/`, `config.json` 중심의 구조만 유지되며, `knowledge/`는 존재하지 않음
- `/home/joy/workspace` 전체에서도 저장소별로 `init` 실행 이력/구조 정리 편차가 누적되어 있을 수 있음
- `init` 실행 시점마다 환경별 `npx` 가용성(예: `i`) 차이로 정규화가 일부 경로에서 반복 필요

## 원인 가설
- 모듈별 init의 실행 경로/버전 편차
- 오래된 경로(`legacy`, 루트 `ticket`, 보고서/티켓 폴더의 분산)이 스크립트 실행 사이클에서 완전 동기화되지 못함
- `docs`/`tickets`/`knowledge` 경계는 규칙상 존재하나, 실제 운영자는 “불필요 분리”로 인지하기 쉬운 깊은 하위 경로 혼재

## 결정/전략
1. 우선 `i`만 직접 재정규화 실행하여 즉시 체감 개선
2. 이어서 `/home/joy/workspace` 내 모든 `.deuk-agent`에 대해 동일 정합화 명령을 재실행
3. 충돌/예외(`npx` 미결정) 항목은 Node 직접 실행 경로로 보정
4. 재실행 결과에서 추가 조치가 필요한 과도 분리만 별도 보고

## 실행 설계
- `i`: `node /home/joy/workspace/DeukAgentRules/bin/deuk-agent-rule.js init --approval approved`
- workspace 전체: 각 `.deuk-agent` 디렉토리에서 보정 명령 반복 실행
  - 기본 경로는 `npx deuk-agent-rule init --approval approved`
  - 실패 시 동일한 Node 직접 실행으로 보정

## 검증 설계
- `i/.deuk-agent`와 전체 `.deuk-agent`에서 주요 디렉토리 목록을 재출력
- 핵심 규칙 충돌(legacy/misplaced directory) 재발생 여부 확인
- 결과 요약을 사용자가 바로 승인 가능한 형태로 리포트
