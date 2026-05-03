 - - - i d : 1 3 3 - d e k p a c k - b m t - m a t r i x - j o y - n u c b t i t l e : D E K P A C K - B M T - M A T R I X p h a s e : 4 s t a t u s : c l o s e d d o c s L a n g u a g e : k o s u m m a r y : B M T M a s t e r / P r o t o c o l / T e s t 문 서 역 할 분 리 및 r a w 성 능 표 정 리 p r i o r i t y : h i g h t a g s : d e u k p a c k , b m t , m a t r i x , c o m p a t i b i l i t y c r e a t e d A t : 2 0 2 6 - 0 5 - 0 1 0 5 : 0 4 : 0 9 - - - # D E K P A C K - B M T - M A T R I X > R e s t r i c t a l l c h a n g e s t o t h e d e c l a r e d * * T a r g e t M o d u l e * * . R e a d * * C o n t e x t F i l e s * * b e f o r e c o d e g e n e r a t i o n . # # S c o p e & C o n s t r a i n t s - * * T a r g e t : * * l e g a c y p l a n d o c . d e u k - a g e n t / d o c s / 내 B M T 매 트 릭 스 설 계 / 정 책 문 서 , b e n c h m a r k s / r e p o r t s / B M T _ M A S T E R _ R E P O R T . m d , b e n c h m a r k s / r e p o r t s / B M T _ P R O T O C O L _ M A T R I X . m d , b e n c h m a r k s / r e p o r t s / D E U K P A C K _ T E S T _ M A T R I X . m d , 필 요 시 관 련 규 칙 문 서 - * * D e s i g n R a t i o n a l e : * * 현 재 D e u k P a c k B M T 리 포 트 는 지 원 성 , 구 현 성 , 검 증 을 분 리 하 지 못 하 고 M a s t e r 에 r a w 성 능 표 가 남 아 문 서 역 할 이 혼 재 됨 - * * C o n s t r a i n t s : * * 공 식 b a s e l i n e / 경 쟁 비 교 카 탈 로 그 확 장 은 G 8 승 인 없 이 확 정 하 지 않 음 , 생 성 산 출 물 직 접 수 정 대 신 원 본 설 계 / 정 책 문 서 우 선 , P h a s e 2 범 위 는 문 서 화 및 설 계 확 정 중 심 으 로 제 한 # # A g e n t P e r m i s s i o n C o n t r a c t ( A P C ) # # # [ B O U N D A R Y ] - E d i t a b l e m o d u l e s : l e g a c y p l a n d o c . d e u k - a g e n t / d o c s / , . d e u k - a g e n t / t i c k e t s / s u b / 1 3 3 - d e k p a c k - b m t - m a t r i x - j o y - n u c b . m d , b e n c h m a r k s / r e p o r t s / B M T _ M A S T E R _ R E P O R T . m d , b e n c h m a r k s / r e p o r t s / B M T _ P R O T O C O L _ M A T R I X . m d , b e n c h m a r k s / r e p o r t s / D E U K P A C K _ T E S T _ M A T R I X . m d - F o r b i d d e n m o d u l e s : b i n / d e u k - a g e n t - r u l e . j s , O S S 배 포 산 출 물 , 생 성 결 과 물 , 미 승 인 공 식 경 쟁 사 / 프 로 토 콜 카 탈 로 그 - R u l e c i t a t i o n : P R O J E C T _ R U L E . m d 의 D C - C O D E G E N , D C - O S S , c o r e - r u l e s / A G E N T S . m d 의 G 6 / G 8 / T D W 게 이 트 # # # [ C O N T R A C T ] - I n p u t : 사 용 자 요 구 사 항 ( D e u k P a c k B M T 리 포 트 매 트 릭 스 문 서 역 할 정 합 ) , 기 존 계 획 문 서 , 규 칙 문 서 - O u t p u t : M a s t e r / P r o t o c o l / T e s t 3 문 서 역 할 분 리 실 행 산 출 물 , 검 증 규 칙 , 티 켓 / 계 획 문 서 정 합 화 - S i d e e f f e c t s : M a s t e r 는 결 론 형 으 로 고 정 되 고 , 근 거 는 P r o t o c o l M a t r i x , 검 증 은 T e s t M a t r i x 로 고 정 됨 # # # [ P A T C H P L A N ] - 범 위 확 장 반 영 한 A P C 를 현 재 계 획 기 준 으 로 보 강 한 다 - M a s t e r 의 r a w 성 능 표 를 제 거 하 고 결 론 / 참 조 중 심 구 조 로 개 편 한 다 - P r o t o c o l / T e s t 매 트 릭 스 를 근 거 · 검 증 표 로 고 정 하 고 링 크 의 존 성 을 정 리 한 다 - 완 료 시 티 켓 상 태 와 체 크 리 스 트 를 반 영 해 후 속 구 현 티 켓 이 바 로 착 수 가 능 하 게 한 다 # # C o m p a c t P l a n - * * P r o b l e m : * * f r o m l e g a c y p l a n - * * A p p r o a c h : * * [ F i l l d u r i n g e x e c u t i o n ] - * * V e r i f i c a t i o n : * * [ A d d r e l e v a n t c h e c k s ] - * * L i n k e d I s s u e s : * * [ U s e t i c k e t - l e v e l l i n k s o n l y ] # # T a s k s - [ x ] A P C 와 계 획 문 서 를 실 행 가 능 한 수 준 으 로 정 합 화 - [ x ] B M T 매 트 릭 스 용 데 이 터 스 키 마 및 상 태 체 계 정 의 - [ x ] 표 배 치 / 렌 더 / 검 증 규 칙 문 서 화 - [ x ] 후 속 구 현 티 켓 에 서 사 용 할 변 경 기 준 정 리 - [ x ] M a s t e r / P r o t o c o l / T e s t 문 서 역 할 강 제 분 리 ( 결 론 - 근 거 - 검 증 ) 문 서 계 획 정 리 - [ x ] B M T _ M A S T E R _ R E P O R T . m d 에 서 . N E T 포 함 r a w 벤 치 수 치 및 중 복 근 거 표 제 거 - [ x ] P r o t o c o l M a t r i x / T e s t M a t r i x 를 근 거 · 검 증 기 준 문 서 로 참 조 고 정 # # D o n e W h e n > 계 획 문 서 와 티 켓 의 A P C 가 일 치 하 고 , 지 원 성 / 구 현 성 / 검 증 성 분 리 기 준 및 샘 플 표 , 검 증 규 칙 , 후 속 구 현 기 준 이 모 두 문 서 화 되 면 완 료 . # # E x e c u t e N o t e s ( C u r r e n t S e s s i o n ) - D e u k P a c k / b e n c h m a r k s / r e p o r t s / B M T _ M A S T E R _ R E P O R T . m d 위 치 의 문 서 가 실 제 중 복 r a w 를 포 함 한 주 원 본 이 므 로 티 켓 대 상 에 포 함 . - 완 료 : M a s t e r R e p o r t 에 역 할 경 계 를 명 시 하 고 , 성 능 / 수 집 근 거 는 B M T _ P R O T O C O L _ M A T R I X . m d , 구 현 / 검 증 상 태 는 D E U K P A C K _ T E S T _ M A T R I X . m d 기 준 으 로 참 조 고 정 . - 관 찰 : 현 재 M a s t e r R e p o r t 에 는 . N E T 상 세 r a w t a b l e , P y t h o n r a w a p p e n d i x , 프 로 토 콜 별 전 수 m a t r i x r o w 가 직 접 포 함 되 어 있 지 않 으 며 결 론 / 참 조 중 심 구 조 로 정 리 됨 . # # � � A t t a c h e d R e p o r t - [ V i e w R e p o r t ] ( . . / . . / . . / d o c s / w a l k t h r o u g h s / 1 3 3 - d e k p a c k - b m t - m a t r i x - j o y - n u c b - r e p o r t . m d )

## Merged Legacy Document


### 133 dekpack bmt matrix joy nucb plan

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

## Merged Legacy Document


### 133 dekpack bmt matrix joy nucb report

# Report: DeukPack BMT Matrix 역할 분리

## 검증 대상
- 티켓: `.deuk-agent/tickets/sub/133-dekpack-bmt-matrix-joy-nucb.md`
- 계획: `merged into this ticket`
- Master Report: `/home/joy/workspace/DeukPack/benchmarks/reports/BMT_MASTER_REPORT.md`
- Protocol Matrix: `/home/joy/workspace/DeukPack/benchmarks/reports/BMT_PROTOCOL_MATRIX.md`
- Test Matrix: `/home/joy/workspace/DeukPack/benchmarks/reports/DEUKPACK_TEST_MATRIX.md`

## 수행 결과
- Master Report에 `Role Boundary`를 추가해 raw benchmark 수치, 프로토콜별 전수 row, 개별 테스트 row를 소유하지 않도록 명시했다.
- 성능/수집 근거는 `BMT_PROTOCOL_MATRIX.md` 기준으로 고정했다.
- 구현/검증 상태는 `DEUKPACK_TEST_MATRIX.md` 기준으로 고정했다.
- 티켓과 계획의 Immediate Execution Scope 항목을 완료 처리했다.

## 검증 명령
- `npx deuk-agent-rule lint:md .deuk-agent/tickets/sub/133-dekpack-bmt-matrix-joy-nucb.md `merged into this ticket` /home/joy/workspace/DeukPack/benchmarks/reports/BMT_MASTER_REPORT.md`

## 검증 결과
- `lint:md passed (3 files)`

## 발견 이슈
- Phase 전환 중 형제 BMT 언어 티켓 `136`, `137`, `138`, `140`에서 `parentTicket` frontmatter 중복 경고가 표시됐다.
- 해당 파일들은 본 matrix 역할 분리 작업의 직접 변경 대상이 아니므로 수정하지 않았다.
- 필요하면 별도 정리 티켓에서 중복 frontmatter를 제거한다.

## 결론
- BMT Master/Protocol/Test 문서의 역할 경계는 문서 기준으로 검증 완료됐다.
- 공식 baseline 확장, benchmark 재생성, generated artifact 수정은 수행하지 않았다.
