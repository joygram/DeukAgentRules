 - - - c r e a t e d A t : 2 0 2 6 - 0 4 - 2 9 0 9 : 5 2 : 3 4 d o c s L a n g u a g e : k o i d : 1 1 0 - a g e n t - d e g r a d a t i o n - r e m e d i a t i o n - j o y - n u c b p h a s e : 3 p r i o r i t y : P 2 s t a t u s : c l o s e d s u m m a r y : " T a r g e t : [ F i l l i n t h e t a r g e t m o d u l e / s u b m o d u l e p a t h ] - C o n t e x t F i l e s : [ L i s t a r c h i t e c t u r e d o c s o r k e y f i l e s t o r e a d f i r s t ] " t a g s : f r o n t m a t t e r , p r o t o c o l , t i c k e t s , a r c h i t e c t u r e , t e s t i n g t i t l e : a g e n t - d e g r a d a t i o n - r e m e d i a t i o n - - - # a g e n t - d e g r a d a t i o n - r e m e d i a t i o n > * * [ C A U T I O N F O R A I A G E N T S ] * * > 1 . R e s t r i c t a l l a n a l y s i s , f i l e c r e a t i o n , a n d m o d i f i c a t i o n s t o t h e d e c l a r e d * * T a r g e t M o d u l e * * b e l o w . > 2 . R e a d t h e f i l e s l i s t e d i n * * C o n t e x t F i l e s * * b e f o r e d o i n g A N Y c o d e g e n e r a t i o n . > 3 . D O N O T l e a k c o n f i g u r a t i o n , l o g i c , o r d e p e n d e n c i e s f r o m o t h e r m o d u l e s . # # T a r g e t M o d u l e - * * T a r g e t : * * [ F i l l i n t h e t a r g e t m o d u l e / s u b m o d u l e p a t h ] - * * C o n t e x t F i l e s : * * [ L i s t a r c h i t e c t u r e d o c s o r k e y f i l e s t o r e a d f i r s t ] # # A n a l y s i s & C o n s t r a i n t s ( D e e p R e v i e w ) > 1 . R o o t C a u s e : A g e n t 퇴 화 분 석 에 서 3 가 지 구 조 적 결 함 발 견 — 누 락 ( 계 획 - 실 행 추 적 불 가 ) , c o r e - w o r k f l o w . m d 분 리 배 치 ( 에 이 전 트 도 달 실 패 ) , 가 드 레 일 조 건 부 분 기 ( 안 전 장 치 미 적 용 ) > 2 . R i s k : A G E N T S . m d 크 기 증 가 로 토 큰 비 용 상 승 가 능 ( 허 용 범 위 내 ) , c o r e - w o r k f l o w . m d 삭 제 시 기 존 i n i t 으 로 배 포 된 프 로 젝 트 에 영 향 없 음 ( r u l e s . d 스 캔 은 조 건 부 ) # # A g e n t P e r m i s s i o n C o n t r a c t ( A P C ) > ⚠ ️ [ M A N D A T O R Y ] D o N O T w r i t e o r m o d i f y a n y c o d e u n t i l t h i s 4 - b l o c k c o n t r a c t i s c o m p l e t e l y f i l l e d o u t . # # # [ B O U N D A R Y ] - * * 변 경 가 능 한 모 듈 : * * t e m p l a t e s / T I C K E T _ T E M P L A T E . m d , c o r e - r u l e s / A G E N T S . m d , t e m p l a t e s / r u l e s . d / c o r e - w o r k f l o w . m d , s c r i p t s / c l i - t i c k e t - c o m m a n d s . m j s - * * 변 경 금 지 모 듈 : * * s c r i p t s / c l i - r u l e - c o m p i l e r . m j s , b i n / , s c r i p t s / c l i - i n i t - c o m m a n d s . m j s # # # [ C O N T R A C T ] - * * i n p u t : * * 현 재 T I C K E T _ T E M P L A T E . m d , c o r e - w o r k f l o w . m d , A G E N T S . m d - * * o u t p u t : * * 포 함 티 켓 템 플 릿 , 인 라 인 워 크 플 로 우 A G E N T S . m d , c o r e - w o r k f l o w . m d 삭 제 - * * s i d e e f f e c t s : * * r u l e s . d / 에 서 c o r e - w o r k f l o w . m d 파 일 1 개 삭 제 - * * R u l e C i t a t i o n ( 프 로 젝 트 룰 인 용 ) : * * " 모 든 에 이 전 트 핵 심 룰 은 c o r e - r u l e s / 및 t e m p l a t e s / r u l e s . d / 하 위 모 듈 단 위 로 관 리 됩 니 다 . " ( P R O J E C T _ R U L E . m d § 1 ) # # # [ P A T C H P L A N ] - * * f i l e : * * t e m p l a t e s / T I C K E T _ T E M P L A T E . m d / * * f u n c t i o n : * * E J S t e m p l a t e / * * c h a n g e : * * f r o n t m a t t e r 에 추 가 , 본 문 에 C A U T I O N + T a r g e t M o d u l e 가 드 레 일 무 조 건 삽 입 - * * f i l e : * * c o r e - r u l e s / A G E N T S . m d / * * f u n c t i o n : * * N / A / * * c h a n g e : * * c o r e - w o r k f l o w . m d 전 체 내 용 을 W o r k f l o w G a t e P r o t o c o l 앞 에 인 라 인 병 합 - * * f i l e : * * t e m p l a t e s / r u l e s . d / c o r e - w o r k f l o w . m d / * * f u n c t i o n : * * N / A / * * c h a n g e : * * 파 일 삭 제 - * * f i l e : * * s c r i p t s / c l i - t i c k e t - c o m m a n d s . m j s / * * f u n c t i o n : * * r u n T i c k e t C r e a t e / * * c h a n g e : * * r a w M e t a 에 필 드 추 가 # # # [ T E S T I M P A C T ] - * * a f f e c t e d t e s t s : * * n p x d e u k - a g e n t - r u l e t i c k e t c r e a t e 스 모 크 테 스 트 , n p x d e u k - a g e n t - r u l e i n i t 정 상 동 작 확 인 # # C o m p a c t P l a n - * * P r o b l e m : * * f r o m l e g a c y p l a n - * * A p p r o a c h : * * [ F i l l d u r i n g e x e c u t i o n ] - * * V e r i f i c a t i o n : * * [ A d d r e l e v a n t c h e c k s ] - * * L i n k e d I s s u e s : * * [ U s e t i c k e t - l e v e l l i n k s o n l y ] # # T a s k s - [ ] T a s k 1 : T I C K E T _ T E M P L A T E . m d — 필 드 복 원 + C A U T I O N / T a r g e t M o d u l e 가 드 레 일 무 조 건 포 함 - [ ] T a s k 2 : c o r e - w o r k f l o w . m d 내 용 을 A G E N T S . m d 에 인 라 인 병 합 - [ ] T a s k 3 : t e m p l a t e s / r u l e s . d / c o r e - w o r k f l o w . m d 삭 제 - [ ] T a s k 4 : c l i - t i c k e t - c o m m a n d s . m j s — r a w M e t a 에 필 드 추 가 - [ ] T a s k 5 : 스 모 크 테 스 트 ( t i c k e t c r e a t e + i n i t ) # # D o n e W h e n > 1 . t i c k e t c r e a t e 생 성 티 켓 에 필 드 존 재 > 2 . 생 성 된 티 켓 본 문 에 [ C A U T I O N F O R A I A G E N T S ] 블 록 항 상 존 재 > 3 . c o r e - r u l e s / A G E N T S . m d 에 T D W 섹 션 이 인 라 인 > 4 . r u l e s . d / c o r e - w o r k f l o w . m d 삭 제 됨 > 5 . i n i t / t i c k e t c r e a t e 정 상 동 작

## Merged Legacy Document


### 110 agent degradation remediation joy nucb plan

# Agent 퇴화 분석 결과 반영 — 구현 계획

## 결정사항 요약

| # | 결정 | 근거 |
|---|------|------|
| A1 | `legacy split reference` 필드를 TICKET_TEMPLATE에 복원 | Plan Reference 링크가 누락되어 에이전트가 계획-실행 연결을 추적할 수 없음 |
| A2 | `rules.d/core-workflow.md`를 `core-rules/AGENTS.md`에 인라인 병합 | 토큰 최적화 + 에이전트 도달성 보장 (별도 파일은 컴파일 단계 필요 → 도달 실패 가능) |
| A3 | 모든 가드레일을 범용 TICKET_TEMPLATE에 무조건 포함 | 범용 = 코어. 조건부 분기 없이 `[CAUTION FOR AI AGENTS]`, Target Module 등 삽입 |

## 변경 범위

### Task 1: TICKET_TEMPLATE.md — legacy split reference 필드 복원 + 가드레일 무조건 포함

**파일:** `templates/TICKET_TEMPLATE.md`

**변경 내용:**
1. frontmatter에 `legacy split reference` 필드 추가 (`merged into this ticket` meta.id %>-plan.md` 형태)
2. 본문 상단에 `[CAUTION FOR AI AGENTS]` 가드레일 블록 무조건 삽입
3. `Target Module` 섹션 추가 (조건부 분기 없이 항상 포함)

### Task 2: core-workflow.md 내용을 AGENTS.md에 인라인 병합

**파일:**
- `core-rules/AGENTS.md` — core-workflow 내용 인라인 삽입
- `templates/rules.d/core-workflow.md` — 삭제

**변경 내용:**
1. `core-workflow.md`의 Ticket-Driven Workflow, Ticket Navigation, Telemetry 섹션을 AGENTS.md에 직접 삽입
2. `rules.d/core-workflow.md` 파일 삭제 (중복 제거)
3. `cli-rule-compiler.mjs`에서 core-workflow 파일이 없어도 정상 동작 확인 (이미 조건부 스캔이므로 영향 없음)

### Task 3: cli-ticket-commands.mjs — legacy split reference 필드 생성 로직 추가

**파일:** `scripts/cli-ticket-commands.mjs`

**변경 내용:**
1. `runTicketCreate()`의 `rawMeta` 객체에 `legacy split reference` 필드 추가
2. 값: `merged into this ticket` (상대 경로)

## APC (Agent Permission Contract)

### [BOUNDARY]
- **변경 가능한 모듈:** `templates/TICKET_TEMPLATE.md`, `core-rules/AGENTS.md`, `templates/rules.d/core-workflow.md`, `scripts/cli-ticket-commands.mjs`
- **변경 금지 모듈:** `scripts/cli-rule-compiler.mjs`, `bin/`, `scripts/cli-init-commands.mjs`

### [CONTRACT]
- **input:** 현재 TICKET_TEMPLATE.md, core-workflow.md, AGENTS.md
- **output:** legacy split reference 포함 티켓 템플릿, 인라인 워크플로우가 포함된 AGENTS.md, 삭제된 core-workflow.md
- **side effects:** rules.d/에서 core-workflow.md 파일 1개 삭제
- **Rule Citation:** PROJECT_RULE.md §1 "Hub-Spoke Architecture — 모든 에이전트 핵심 룰은 core-rules/ 및 templates/rules.d/ 하위 모듈 단위로 관리"

### [PATCH PLAN]
1. `templates/TICKET_TEMPLATE.md` — frontmatter에 legacy split reference, 본문에 CAUTION + Target Module 추가
2. `core-rules/AGENTS.md` — Workflow Gate Protocol 섹션 앞에 core-workflow 내용 인라인
3. `templates/rules.d/core-workflow.md` — 파일 삭제
4. `scripts/cli-ticket-commands.mjs` — rawMeta에 legacy split reference 필드 추가

### [TEST IMPACT]
- `npx deuk-agent-rule ticket create --topic test --non-interactive` 스모크 테스트

## Done When
1. 생성된 티켓에 `legacy split reference` 필드가 포함됨
2. 생성된 티켓 본문에 `[CAUTION FOR AI AGENTS]` 블록이 항상 존재함
3. `core-rules/AGENTS.md`에 Ticket-Driven Workflow 섹션이 인라인되어 있음
4. `templates/rules.d/core-workflow.md` 파일이 삭제됨
5. 기존 `npx deuk-agent-rule init` 정상 동작 확인
