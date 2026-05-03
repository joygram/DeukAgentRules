---
summary: DeukPack BMT 매트릭스의 데이터 정합성 오류 원인을 분석하고, 지원성/구현성 분리된 표 설계와 재배치 정책을 수립한다
status: in_progress
priority: high
tags:
  - deukpack
  - bmt
  - matrix
  - compatibility
  - documentation
---

# Plan: DeukPack BMT 매트릭스 재설계

## 목표
- 현재 BMT 리포트 매트릭스의 “표 배치 오류”, “누락 구현” 항목이 혼재된 상태를 분리한다.
- 구현 미스 및 테스트 누락이 표에서 즉시 확인되도록 정합 규칙을 고정한다.

## 현행 데이터 기준 정의(샘플 명칭)
- 대상 비교 대상: `DeukPack`, `pb`, `thrift`
- 언어군: Java, Kotlin, Go, Rust, TypeScript, Python, .NET
- 핵심 기능군(예시):
  - Schema evolution
  - Streaming
  - Error model
  - Compression
  - Backward/Forward compatibility
  - Tooling (IDL lint, codegen, plugin)

## 구현 방향 요약(요건 확정)
- 매트릭스는 **두 표(지원성/구현성)**를 분리한다.
- 지원성(`support_level`)은 기능 존재 여부/호환 범위를 보여준다.
- 구현성(`implementation_state`)은 실제 구현·테스트 상태를 보여준다.
- 테스트 미스 항목은 지원성이 높아도 `구현성`에서 경고 처리한다.

## 범위
- DeukPack 관련 BMT/호환성 표의 표시 로직과 데이터 해석 규칙 수립
- 구현 상태(`implementation_state`)와 지원 상태(`support_level`) 분리 설계
- 경쟁 프로토콜 비교(기존 pb/thrift 및 타 언어 대비) 표시 방식 정비

## 비범위(Out of scope)
- DeukPack 코드 생성기 자체 리팩터링(필요 시 별도 티켓)
- 새 경쟁사/프로토콜 공식 카탈로그 승인 확정(기존 규칙상 별도 승인 필요)

## 실행 단계

1. 입력 데이터 감사
- [ ] DeukPack BMT 소스 후보(.md/.json/.ts)를 최소 3개 이상 추려 소유 모듈/최초 생성 경로를 매핑한다.
- [ ] 렌더 템플릿(마크다운/HTML/리포트 생성기)을 식별해 행/열 축 매핑 로직이 결정되는 지점을 확정한다.
- [ ] 현재 데이터 키(`protocol/language/feature/state`)를 추출해 정규화 맵을 만든다.
  - 공통 키: `protoId`, `lang`, `capability`, `status`, `verifiedAt`
- [ ] 구현 미스 판단 규칙을 기존 소스에서 추출한다.
  - 예: `implemented_but_unstable`, `not_implemented`, `test_missing`, `deprecated`
- [ ] 실패 케이스 최소 5개를 기록한다.
  - 행/열 뒤바뀜, 셀 렌더 누락, 지원성/구현성 혼재, 비교군 누락, 상태값 혼합

2. 데이터 스키마 정합화
- [ ] 표준 스키마(지원성/구현성/검증성/근거)를 문서로 확정한다.
- [ ] 스키마를 JSON-Schema 형태로 작성해 타입/필수항목/허용값을 고정한다.

### 스키마 예시(JSON)

```json
{
  "itemId": "dp-kotlin-streaming-v2",
  "protocol": "deukpack-v2",
  "language": "Kotlin",
  "feature": "streaming",
  "support_level": "full",
  "implementation_state": "partial",
  "evidence": {
    "test_id": "bmt-streaming-kotlin-20260501",
    "last_verified": "2026-05-01",
    "pass_rate": 0.72
  },
  "notes": "양방향 스트리밍 지원, 안정성 테스트 일부 미완료"
}
```

- [ ] 상태 값 enum을 강제한다.
  - `support_level: ["full", "partial", "blocked", "not_applicable"]`
  - `implementation_state: ["implemented", "partial", "missing", "blocked"]`
- [ ] 정합 규칙 추가
  - `support_level=blocked`이면 구현성은 `blocked|missing`만 허용
  - `implementation_state=missing`이면 경고 집계에 자동 포함
  - `last_verified`는 ISO8601 필수

3. 표시 규칙 설계
- [ ] 셀 아이콘/색상/텍스트 우선순위를 고정한다.

```txt
full + implemented = "✅ 지원"
partial + partial = "◐ 제한지원"
blocked + missing = "❌ 미지원(차단)"
full + missing = "⚠️ 지원되나 미구현"
partial + missing = "⚠️ 제한지원 미구현"
not_applicable = "-"
```

- [ ] `⚠️` 경고는 지원성 표시와 분리된 구현성 패널에서 우선 표시한다.
- [ ] `지원성`과 `구현성` 표를 분리 배치한다.
- [ ] 경쟁사 비교 표는 별도 섹션으로 분리한다.

4. 레이아웃/정렬 정책
- [ ] 정렬 기준 고정: 1차 언어, 2차 기능군, 3차 지원 수치(내림차순)
- [ ] 스티키 헤더 + 컬럼 고정 + 툴팁 노트 적용
- [ ] 모바일 대체 레이아웃은 카드 뷰/세그먼트 탭 구조로 전환
- [ ] 마크다운/HTML 파이프 이스케이프 유효성 점검 규칙을 정의한다.

5. 정합성 검증 룰
- [ ] 지원성=full이고 구현성=missing이면 상단 요약에 `서비스 권고 제외` 배지 표시
- [ ] 테스트 미스 항목 누락 없이 집계: 총 항목 수, 미검증 비율
- [ ] 임시 출력 결과로 5개 케이스 샘플 검증

### 검증 사례(필수 5개)
- 사례 A: 프로토콜 2개 × 언어 3개 표 병렬 비교(배치 일관성)
- 사례 B: `support_level=full` + `implementation_state=missing` 경고 표시
- 사례 C: `blocked` 상태가 지원성/구현성에서 양쪽 모두 일관되게 표시
- 사례 D: 마크다운 `|` 문자 이스케이프 처리 후 파싱 오류 없음
- 사례 E: 비교군 누락 항목이 `not_applicable`로 처리

6. 산출물 확정
- [ ] 표 설계 문안, 데이터 스키마, 렌더 규칙, 검증 규칙 정리
- [ ] 변경 영향 범위를 티켓/워크로그와 함께 정리한 최종 보고 초안 작성
- [ ] 구현 대상 파일, 입력 예시, 확인 포인트를 포함해 실행 체크리스트 완료

## 산출물 샘플 형식(열 배치)

### 표 1: 지원성(Protocol × Language)

| Protocol | Language | Schema evolution | Streaming | Error model | Compression | Tooling |
|---|---|---|---|---|---|---|
| deukpack-v2 | Java | ✅ | ◐ | ✅ | ✅ | ✅ |
| deukpack-v2 | Kotlin | ✅ | ✅ | ✅ | ⚠️(테스트 미스) | ✅ |
| deukpack-v2 | Go | ✅ | ✅ | ◐ | ✅ | ✅ |

### 표 2: 구현성(Protocol × Language)

| Protocol | Language | Schema evolution | Streaming | Error model | Compression | Tooling |
|---|---|---|---|---|---|---|
| deukpack-v2 | Java | implemented | implemented | implemented | implemented | implemented |
| deukpack-v2 | Kotlin | implemented | ⚠️ 미검증 | implemented | ⚠️ 회귀 불일치 | implemented |
| deukpack-v2 | Go | implemented | implemented | partial | implemented | implemented |

## 완료 기준
- [ ] 동일 데이터 소스에서 지원성/구현성이 항상 분리 출력
- [ ] 표 배치 기준(행/열/정렬) 재현성 확보
- [ ] 테스트 미스가 셀 단위로 누락 없이 표시
- [ ] 필수 검증 사례 5개 통과

## Immediate Execution Scope (Current Session)

- [x] Remove `.NET` raw benchmark and raw appendix blocks from `benchmarks/reports/BMT_MASTER_REPORT.md`.
- [x] Keep `BMT_MASTER_REPORT.md` as conclusion-only with links only.
- [x] Ensure proof table remains only in `benchmarks/reports/BMT_PROTOCOL_MATRIX.md`.
- [x] Ensure verification table remains only in `benchmarks/reports/DEUKPACK_TEST_MATRIX.md`.

## Current Session Result

- Master Report now explicitly states that raw benchmark values, protocol-wide rows, and individual test rows are out of scope for the Master document.
- Performance and collection evidence are fixed to `BMT_PROTOCOL_MATRIX.md`.
- Implementation and verification state are fixed to `DEUKPACK_TEST_MATRIX.md`.
- Existing Master content was already conclusion-oriented; this session tightened the role boundary rather than promoting any new baseline or regenerating report artifacts.
