 - - - c r e a t e d A t : 2 0 2 6 - 0 4 - 2 5 1 3 : 2 8 : 3 5 i d : 0 8 0 - a g e n t s - m d - f u l l - r e f a c t o r - j o y - n u c b p r i o r i t y : P 2 s t a t u s : o p e n s u m m a r y : " T a r g e t : [ F i l l i n t h e t a r g e t m o d u l e / s u b m o d u l e p a t h ] - C o n t e x t F i l e s : [ L i s t a r c h i t e c t u r e d o c s o r k e y f i l e s t o r e a d f i r s t ] - T a r g e t S u b m o d u l e : [ 예 : D e u k U I | D e u k P a c k | D e u k N a v i g a t i o n ] " t a g s : r a g , m c p , t i c k e t s , a r c h i t e c t u r e , p e r f o r m a n c e t i t l e : a g e n t s - m d - f u l l - r e f a c t o r - - - # [ 실 행 ] 작 업 : a g e n t s - m d - f u l l - r e f a c t o r | I D : 0 8 0 - a g e n t s - m d - f u l l - r e f a c t o r - j o y - n u c b > * * [ C A U T I O N F O R A I A G E N T S ] * * > 1 . R e s t r i c t a l l a n a l y s i s , f i l e c r e a t i o n , a n d m o d i f i c a t i o n s t o t h e d e c l a r e d * * T a r g e t M o d u l e * * b e l o w . > 2 . R e a d t h e f i l e s l i s t e d i n * * C o n t e x t F i l e s * * b e f o r e d o i n g A N Y c o d e g e n e r a t i o n . > 3 . D O N O T l e a k c o n f i g u r a t i o n , l o g i c , o r d e p e n d e n c i e s f r o m o t h e r m o d u l e s . # # T a r g e t M o d u l e - * * T a r g e t : * * [ F i l l i n t h e t a r g e t m o d u l e / s u b m o d u l e p a t h ] - * * C o n t e x t F i l e s : * * [ L i s t a r c h i t e c t u r e d o c s o r k e y f i l e s t o r e a d f i r s t ] > * * [ 에 이 전 트 주 의 ] * * > 이 작 업 은 잠 긴 멀 티 모 듈 모 노 레 포 안 에 서 진 행 돼 요 . > 1 . 아 래 의 * * [ T a r g e t S u b m o d u l e ] * * 밖 으 로 분 석 , 파 일 생 성 , 수 정 범 위 를 넓 히 지 마 세 요 . > 2 . 코 드 생 성 전 에 * * [ C o n t e x t F i l e s ] * * 를 먼 저 읽 으 세 요 . > 3 . 다 른 서 브 모 듈 의 설 정 , 로 직 , 의 존 성 을 섞 어 쓰 지 마 세 요 . # # � � 범 위 - * * T a r g e t S u b m o d u l e : * * [ 예 : D e u k U I | D e u k P a c k | D e u k N a v i g a t i o n ] - * * C o n t e x t F i l e s : * * - [ 예 : D e u k A g e n t R u l e s / t e m p l a t e s / M O D U L E _ R U L E _ T E M P L A T E . m d ] - [ 예 : p a t h / t o / y o u r / s p e c i f i c / r u l e s . m d ] # # � � 수 정 파 일 - p a t h / f r o m / r o o t / t o / t a r g e t 1 : [ 무 엇 을 수 정 하 는 지 구 체 적 으 로 적 으 세 요 . ] # # � � ️ 설 계 결 정 사 항 - [ 필 요 한 핵 심 결 정 을 간 단 히 적 으 세 요 ] # # � � 엄 격 제 약 - [ 예 : N o h o t p a t h L I N Q , A s y n c S a f e t y , N o R a w P o i n t e r s ] # # � � 단 계 별 실 행 > A g e n t : P h a s e 3 전 에 P h a s e 1 이 완 전 히 검 증 되 기 전 까 지 는 진 행 하 지 마 세 요 . 0 . [ P h a s e 0 > R A G 조 사 ( M C P ) ] - [ ] m c p _ d e u k c o n t e x t _ s e a r c h _ r u l e s 기 반 규 약 검 토 완 료 - [ ] m c p _ d e u k c o n t e x t _ s e a r c h _ t i c k e t s 과 거 유 사 티 켓 이 력 열 람 완 료 - [ ] ( 필 수 작 성 ) 검 색 된 핵 심 컨 텍 스 트 요 약 : - [ ] ( R A G M i s s 시 필 수 작 성 ) 로 컬 검 색 결 과 m c p _ d e u k c o n t e x t _ a d d _ k n o w l e d g e 도 구 로 즉 시 주 입 완 료 여 부 및 주 입 된 파 일 목 록 : 0 . 5 [ P h a s e 0 . 5 > 심 층 분 석 ( 선 택 ) ] - [ ] 복 잡 한 아 키 텍 처 변 경 시 별 도 분 석 아 티 팩 트 작 성 및 승 인 완 료 1 . [ P h a s e 1 > 준 비 / 파 싱 ] 2 . [ P h a s e 2 > 핵 심 로 직 변 경 ] - [ ] ( C O N T I N U O U S R A G ) 새 로 운 함 수 / 클 래 스 수 정 전 m c p _ d e u k c o n t e x t _ s e a r c h _ c o d e 및 s e a r c h _ r u l e s 로 관 련 패 턴 수 시 검 색 3 . [ P h a s e 3 > 정 리 / 검 증 ] - [ ] ( V E R I F Y R A G ) 디 버 깅 및 에 러 발 생 시 로 그 덤 프 전 m c p _ d e u k c o n t e x t _ s e a r c h _ t i c k e t s 로 과 거 해 결 책 우 선 탐 색 - [ ] * * P o t e n t i a l I s s u e T a b l e * * : | 이 슈 | 심 각 도 | 설 명 | 조 치 계 획 | | - - - | - - - | - - - | - - - | | | | | | 4 . [ P h a s e 4 > 후 속 연 결 ( 이 슈 가 있 으 면 필 수 ) ] - [ ] 위 표 에 서 즉 시 해 결 불 가 능 한 항 목 에 대 해 별 도 티 켓 발 행 완 료 > C L I C o m m a n d E x a m p l e : d e u k - a g e n t - r u l e t i c k e t c r e a t e - - t o p i c 0 4 8 - F 1 - f i x - i s s u e - - c h a i n - - g r o u p < g r o u p > - [ ] ( 필 수 작 성 ) 발 행 된 후 속 티 켓 번 호 리 스 트 : # # ✅ 검 증 / Q A - [ ] * * D e e p A n a l y s i s V e r i f i c a t i o n * * : P h a s e 0 . 5 에 서 도 출 된 핵 심 설 계 및 구 조 적 결 정 사 항 이 코 드 에 모 두 올 바 르 게 반 영 되 었 는 지 확 인 . - [ ] * * P o t e n t i a l I s s u e s C h e c k * * : [ s i d e e f f e c t , e d g e c a s e , p e r f o r m a n c e i m p a c t 를 적 으 세 요 ] - [ ] * * S t r i c t C o n s t r a i n t s A u d i t * * : [ N o h o t p a t h L I N Q , A s y n c S a f e t y , N o R a w P o i n t e r s 등 ] - [ ] n p m r u n t e s t 또 는 관 련 검 증 명 령 실 행 결 과 확 인 # # A g e n t P e r m i s s i o n C o n t r a c t ( A P C ) # # # [ B O U N D A R Y ] - E d i t a b l e m o d u l e s : t h i s t i c k e t t a r g e t m o d u l e s # # # [ C O N T R A C T ] - I n p u t : t a s k c o n t e x t i n t h i s t i c k e t . - O u t p u t : s c o p e d i m p l e m e n t a t i o n a n d v a l i d a t i o n . - S i d e e f f e c t s : u p d a t e s o n l y i n t a r g e t m o d u l e ( s ) . # # # [ P A T C H P L A N ] - I m p l e m e n t c h a n g e s i n t a r g e t m o d u l e s o n l y . - U p d a t e v e r i f i c a t i o n e v i d e n c e i n t h i s t i c k e t . # # C o m p a c t P l a n - * * P r o b l e m : * * f r o m l e g a c y p l a n - * * A p p r o a c h : * * [ F i l l d u r i n g e x e c u t i o n ] - * * V e r i f i c a t i o n : * * [ A d d r e l e v a n t c h e c k s ] - * * L i n k e d I s s u e s : * * [ U s e t i c k e t - l e v e l l i n k s o n l y ]

## Merged Legacy Document


### 080 agents md full refactor joy nucb plan

# 계획: AGENTS.md 전면 리팩토링

## 요약

- **목적**: AGENTS.md의 불필요한 중복, 설교, 영/한 이중 기재를 제거하여 시스템 프롬프트 토큰을 최소 60% 절감. 오구현된 Self-Thrift Protocol을 원래 의도(로컬 캐싱)에 맞게 복원.
- **범위**: `DeukAgentRules/AGENTS.md` (정본) + 워크스페이스 내 34개 AGENTS.md 사본에 배포
- **비범위**: DeukContext MCP 서버 코드 수정, 대시보드 변경은 별도 티켓

## 현재 격차

### 정량 측정

| 항목 | 현재 | 목표 |
|---|---|---|
| AGENTS.md 크기 | 8,573 chars / 120 lines / ~3,429 tokens | ~3,000 chars / ~50 lines / ~1,200 tokens |
| 영/한 중복 | Document Archiving Protocol 642 chars 중복 | 한국어 단일 |
| 경고/강조 수식어 | 52회 (MUST 10, 하드룰 9, 금지 5, MANDATORY 5, STRICT 5 ...) | 0회 |
| Document Archiving Protocol | 2개 섹션 중복 존재 (L24-37 + L97-112) | 1개로 통합 |
| Self-Thrift Protocol | MCP API 호출 강제 (매 턴 set_workflow_context 호출) | 삭제 또는 로컬 캐싱으로 복원 |
| 5단계 워크플로우 | 전 작업 강제 (Phase 0~5) | 복잡 작업만 권장 |

### 문제 구조

1. **이중 언어 중복**: 같은 규칙을 EN → KR 순서로 두 번 기재 (~256 tokens 낭비)
2. **섹션 중복**: `Document Archiving Protocol`이 L24와 L97에 두 번 등장 (~280 tokens 낭비)
3. **수식어 비대**: AI에게 `MUST`, `절대`, `심각한 위반` 같은 표현은 `Required` 한 단어와 동일 효과
4. **Self-Thrift 오구현**: 원래 로컬 캐싱 의도였으나 MCP 서버 호출 강제로 변질 (23회 × 81 tok = 1,853 tok 낭비)
5. **강제 5단계 워크플로우**: 모든 작업에 Phase 0 RAG 검색 강제 → 세션당 ~19,500 tok 고정비용

## 설계 결정

### D1: 언어 — 영어 단일
- AGENTS.md는 AI 에이전트가 읽는 문서이므로 토큰 효율이 높은 영어로 통일
- 영어는 한국어 대비 같은 의미를 ~40-50% 적은 토큰으로 표현 가능
- 한국어 블록 전면 삭제, 영어만 유지

### D2: Self-Thrift Protocol — 전면 삭제
- 원래 의도: 로컬 캐싱 기반 추적
- 현재 상태: MCP 서버 호출 강제로 오구현됨
- 결정: AGENTS.md에서 Self-Thrift 섹션 전체 삭제
- 로컬 캐싱 추적은 DeukContext 서버 단에서 자동으로 처리하도록 별도 티켓에서 구현

### D3: 워크플로우 — 강제 → 권장
- Phase 0 RAG 검색: 강제 삭제, 에이전트 자율 판단
- Phase 1 티켓 생성: 복잡 작업에만 권장
- Phase 2~5: 있으면 좋지만 강제하지 않음
- `ticket create` 명령어 안내만 유지

### D4: 수식어 — 기계적 명령문으로 전환
- `[MANDATORY]`, `[하드룰]`, `[STRICT]`, `심각한 위반` → 모두 삭제
- AI는 `Required:` 또는 `Do not:` 로 충분히 지시를 따름

### D5: Anti-Shoveling Rule — 압축
- 현재: 801 chars의 장문
- 목표: 3줄 이내로 압축 (`ticket use --latest --path-only` 실행 후 `view_file`)

## 구현 계획

### Phase 1: AGENTS.md 재작성

리팩토링 후 목표 구조:

```markdown
<!-- deuk-agent-rule:begin -->
# Agent Rules

## Tone
- Dry, concise, technical. No emojis or exclamation marks.
- Reply in Korean 해요체 unless user writes in English.

## Coding
- C#: No LINQ/boxing in update loops.
- C++: No raw pointers. Forward-declare in headers. Mutex all shared resources.
- WebApp: No hardcoded JSON. Use DeukPack generated codecs.

## Workflow
- For complex tasks, create a ticket: `npx deuk-agent-rule ticket create --topic <name>`
- On 2+ repeated errors, stop and file a ticket with analysis.
- Temp scripts go in `tmp/`.

## Ticket Navigation
- Run `npx deuk-agent-rule ticket use --latest --path-only`, then `view_file` the result.

## Docs
- Plans: `merged into this ticket`
- Reports: `merged into this ticket`
- Run `npm run lint:md` after editing markdown.
<!-- deuk-agent-rule:end -->
```

예상 크기: ~850 chars / ~25 lines / ~210 tokens (**현재 대비 94% 감소**)

### Phase 2: 워크스페이스 전체 배포

- [ ] `npx deuk-agent-rule init` 또는 수동 복사로 34개 사본 업데이트
- [ ] 각 프로젝트의 모듈별 커스텀 규칙(있다면)은 유지

### Phase 3: 검증

- [ ] `npm run lint:md -- AGENTS.md`
- [ ] 리팩토링 전/후 토큰 수 비교
- [ ] Cursor/Antigravity에서 새 AGENTS.md로 간단한 작업 수행하여 동작 확인

## 삭제 대상 상세

| 섹션 | 현재 크기 | 조치 |
|---|---|---|
| Self-Thrift Protocol (L14-22) | 770 chars / ~308 tok | 전면 삭제 |
| Document Archiving Protocol EN (L24-31) | 1,321 chars | 삭제 (KR만 유지 후 압축) |
| Document Archiving Protocol KR 중복 (L33-37) | 642 chars | L97-112 섹션과 통합 |
| Ticket-Driven Development 5단계 (L70-95) | 1,679 chars / ~671 tok | 3줄 권장으로 축소 |
| Anti-Shoveling Rule (L114-120) | 801 chars / ~320 tok | 3줄로 압축 |
| AI Model Compliance (L62-66) | 410 chars / ~164 tok | 삭제 (실질 효과 없음) |
| 경고/수식어 52개 | 분산 | 전부 제거 |

## 리스크

| 리스크 | 심각도 | 대응 |
|---|---|---|
| Flash 모델이 간결한 지시를 무시할 가능성 | 낮음 | 간결해도 명확하면 Flash도 따름. 테스트로 확인. |
| 기존 티켓 워크플로우에 의존하는 자동화 깨짐 | 중간 | `ticket create` CLI는 유지하므로 영향 없음 |
| 34개 사본 중 동기화 누락 | 낮음 | `deuk-agent-rule init`으로 일괄 배포 |

## 수용 기준

- [ ] AGENTS.md 크기 3,000 chars 이하
- [ ] AGENTS.md 추정 토큰 1,200 이하
- [ ] Self-Thrift Protocol 조항 0줄
- [ ] 영어/한국어 중복 0줄
- [ ] `npm run lint:md` 통과
- [ ] 워크스페이스 34개 사본 동기화 완료
