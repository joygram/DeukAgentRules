---
id: 067-oss-path-migration-sync-joy-nucb
title: oss-path-migration-sync
language: ko
createdAt: 2026-04-24 21:26:33
summary: oss-path-migration-sync
status: active
priority: P3
tags: docs, migrated
---


# 계획: oss-path-migration-sync

## 요약
- 목적: DeukAgentRules와 DeukPack의 OSS 동기화 진입 명령을 `sync:oss` 계열로 맞추고, 티켓 계획을 현재 운영 기준에 맞게 정리한다.
- 범위: DeukPack npm scripts 정리, OSS 미러 정리 로직 보완, 티켓/플랜 문서 갱신.
- 비범위: 실제 OSS 저장소 생성, 공개 저장소 푸시, DeukPackStarterKit 관련 작업.

## 현재 격차
- DeukAgentRules는 이미 `sync:oss` 기반으로 동작한다.
- DeukPack 문서들은 `sync:oss`를 기준으로 설명하지만 실제 `package.json`은 `mirror:oss`만 제공한다.
- 계획 문서는 아직 “OSS 폴더 이동 작업”을 전제로 적혀 있어 현재 운영 의도와 맞지 않는다.

## 설계 결정
- DeukPack의 실제 구현 파일명 `mirror-to-oss.js`는 유지하고, 사용자 진입 script 명만 `sync:oss`로 표준화한다.
- 기존 `mirror:oss`, `mirror:oss:apply`는 하위 호환을 위해 alias로 유지한다.
- 공개 OSS 미러 package.json에서는 `sync:oss*`, `mirror:oss*` 모두 제거한다.

## 구현 계획
1. DeukPack `package.json`에 `sync:oss`, `sync:oss:apply`를 추가하고 기존 `mirror:oss*`를 alias로 변경한다.
2. `scripts/mirror-to-oss.js`에서 공개 미러 산출물 정리 시 `sync:oss*`도 제거하도록 맞춘다.
3. 티켓과 플랜 문서를 “이동 절차” 대신 “명령 표준화 및 경로 검증” 기준으로 갱신한다.

## 검증 계획
- `npm run sync:oss -- --help`로 DeukPack 명령 노출이 정상인지 확인한다.
- `npm run sync:oss` dry-run으로 실제 대상 경로 해석이 예상대로 동작하는지 확인한다.

## 검증 결과
- `npm run sync:oss -- --help`가 표준 진입 명령과 기본 경로 `../../OSS/DeukPackOSS`를 정상 출력했다.
- `npm run sync:oss` dry-run이 `/home/joy/workspace/OSS/DeukPackOSS` 대상으로 파일 목록을 출력했다.

## 리스크
- dry-run은 대상 경로 없이도 목록 출력이 가능하므로, 실제 준비 검증은 `sync:oss:apply` 직전에 다시 필요하다.
- 외부 자동화가 `mirror:oss*`를 직접 호출 중일 수 있어 alias 제거는 금지한다.

## 수용 기준
- DeukPack에서 `npm run sync:oss`와 `npm run sync:oss:apply`가 호출 가능하다.
- 공개 미러용 package.json에는 내부 동기화 스크립트가 남지 않는다.
- 티켓/플랜 문서가 `sync:oss` 기준으로 정리되어 있다.
