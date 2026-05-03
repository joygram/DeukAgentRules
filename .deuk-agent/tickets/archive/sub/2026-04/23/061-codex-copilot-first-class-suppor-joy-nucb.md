 - - - c r e a t e d A t : 2 0 2 6 - 0 4 - 2 3 2 2 : 5 5 : 2 9 i d : 0 6 1 - c o d e x - c o p i l o t - f i r s t - c l a s s - s u p p o r - j o y - n u c b p r i o r i t y : P 2 p r o j e c t : D e u k A g e n t R u l e s s t a t u s : o p e n s u m m a r y : " T a r g e t S u b m o d u l e : D e u k A g e n t R u l e s - s c r i p t s / c l i - u t i l s . m j s - s c r i p t s / c l i - i n i t - c o m m a n d s . m j s " t a g s : r a g , m c p , t i c k e t s , t e s t i n g t i t l e : c o d e x - c o p i l o t - f i r s t - c l a s s - s u p p o r t - - - # [ E x e c u t i o n ] T a s k : c o d e x - c o p i l o t - f i r s t - c l a s s - s u p p o r t | I D : 0 6 1 - c o d e x - c o p i l o t - f i r s t - c l a s s - s u p p o r - j o y - n u c b > * * [ C A U T I O N F O R A I A G E N T S ] * * > Y o u a r e o p e r a t i n g w i t h i n a l o c k e d m u l t i - m o d u l e m o n o r e p o . > 1 . R e s t r i c t a b s o l u t e l y a l l a n a l y s i s , f i l e c r e a t i o n , a n d m o d i f i c a t i o n s t o t h e d e c l a r e d * * [ T a r g e t S u b m o d u l e ] * * b e l o w . > 2 . R e a d t h e f i l e s l i s t e d i n * * [ C o n t e x t F i l e s ] * * b e f o r e d o i n g A N Y c o d e g e n e r a t i o n . > 3 . D O N O T l e a k c o n f i g u r a t i o n , l o g i c , o r d e p e n d e n c i e s f r o m o t h e r s u b m o d u l e s . # # � � S c o p e B o u n d s - * * T a r g e t S u b m o d u l e : * * D e u k A g e n t R u l e s - * * C o n t e x t F i l e s : * * - A G E N T S . m d - R E A D M E . m d - R E A D M E . k o . m d - s c r i p t s / c l i - u t i l s . m j s - s c r i p t s / c l i - i n i t - c o m m a n d s . m j s - p u b l i s h / r u l e s . d / c o r e - w o r k f l o w . m d - p u b l i s h / r u l e s . d / d e u k r a g - m c p . m d # # � � F i l e s t o M o d i f y - s c r i p t s / c l i - u t i l s . m j s : A G E N T _ T O O L S 에 c o p i l o t , c o d e x 를 추 가 합 니 다 . - s c r i p t s / c l i - i n i t - c o m m a n d s . m j s : C o p i l o t / C o d e x 산 출 물 생 성 규 칙 과 s p o k e 내 용 을 a g e n t 별 로 분 기 합 니 다 . - p u b l i s h / r u l e s . d / * . m d , p u b l i s h / A G E N T S . m d , p u b l i s h / g e m i n i . m d : C o p i l o t / C o d e x 대 상 r u l e i n j e c t i o n 과 문 구 를 정 리 합 니 다 . - R E A D M E . m d , R E A D M E . k o . m d : 지 원 에 이 전 트 와 실 제 생 성 동 작 을 일 치 시 킵 니 다 . # # � � ️ D e s i g n D e c i s i o n s ( R e f e r t o P l a n ) - 티 켓 은 실 행 정 본 입 니 다 . - 상 세 설 계 판 단 과 배 경 은 연 결 된 p l a n 문 서 를 기 준 으 로 봅 니 다 . - C o d e x 는 전 역 포 인 터 유 지 + r e p o - l o c a l s p o k e 추 가 의 혼 합 형 으 로 갑 니 다 . - C o p i l o t 은 일 반 포 인 터 가 아 니 라 전 용 축 약 지 침 을 생 성 합 니 다 . # # � � S t r i c t C o n s t r a i n t s ( R u l e s t o n e v e r b r e a k ) - 구 현 전 사 용 자 승 인 없 이 코 드 변 경 단 계 로 넘 어 가 지 않 습 니 다 . - 이 번 티 켓 에 서 는 D e u k A g e n t R u l e s 루 트 범 위 밖 으 로 확 장 하 지 않 습 니 다 . - 플 랜 문 서 의 상 세 설 계 를 티 켓 본 문 에 중 복 복 사 하 지 않 고 , 실 행 요 약 만 유 지 합 니 다 . - 검 증 단 계 에 서 범 위 밖 리 팩 토 링 이 나 임 의 설 계 변 경 을 하 지 않 습 니 다 . # # � � P h a s e d E x e c u t i o n S t e p s > A g e n t : D o N O T a t t e m p t t o d o P h a s e 3 b e f o r e P h a s e 1 i s f u l l y t e s t e d . 0 . [ P h a s e 0 > R A G R e s e a r c h ( M C P ) ] - [ x ] m c p _ d e u k r a g _ s e a r c h _ r u l e s 기 반 규 약 검 토 완 료 - [ x ] m c p _ d e u k r a g _ s e a r c h _ t i c k e t s 과 거 유 사 티 켓 이 력 열 람 완 료 - [ x ] ( 필 수 작 성 ) 검 색 된 핵 심 컨 텍 스 트 요 약 : 현 재 규 칙 은 t i c k e t - i n t e r n a l p l a n , 별 도 d o c s / p l a n s , 를 동 시 에 사 용 하 고 있 어 실 행 흐 름 이 끊 길 수 있 습 니 다 . C o p i l o t / C o d e x 는 실 제 생 성 로 직 과 R E A D M E 설 명 사 이 에 비 대 칭 이 있 습 니 다 . - [ x ] ( R A G M i s s 시 필 수 작 성 ) 로 컬 검 색 결 과 m c p _ d e u k r a g _ a d d _ k n o w l e d g e 도 구 로 즉 시 주 입 완 료 여 부 및 주 입 된 파 일 목 록 : R A G m i s s 없 음 . 로 컬 확 인 파 일 : s c r i p t s / c l i - i n i t - c o m m a n d s . m j s , s c r i p t s / c l i - u t i l s . m j s , A G E N T S . m d , R E A D M E . m d , . d e u k - a g e n t / t e m p l a t e s / T I C K E T _ T E M P L A T E . m d 0 . 5 [ P h a s e 0 . 5 > D e e p A n a l y s i s ( O p t i o n a l ) ] - [ x ] 복 잡 한 아 키 텍 처 변 경 시 별 도 분 석 아 티 팩 트 작 성 및 승 인 완 료 1 . [ P h a s e 1 > S e t u p / P a r s i n g ] - [ x ] 티 켓 과 p l a n d o c 를 기 준 으 로 수 정 범 위 확 정 - [ x ] C o p i l o t / C o d e x c u r r e n t b e h a v i o r 와 d e s i r e d b e h a v i o r 를 코 드 기 준 으 로 매 핑 - [ x ] 사 용 자 승 인 후 에 만 P h a s e 2 진 입 2 . [ P h a s e 2 > C o r e L o g i c C h a n g e ] - [ x ] ( C O N T I N U O U S R A G ) 새 로 운 함 수 / 클 래 스 수 정 전 m c p _ d e u k r a g _ s e a r c h _ c o d e 및 s e a r c h _ r u l e s 로 관 련 패 턴 수 시 검 색 - [ x ] A G E N T _ T O O L S 와 i n i t c o n f i g 에 c o p i l o t , c o d e x 반 영 - [ x ] a g e n t 별 s p o k e 생 성 문 구 분 리 - [ x ] C o p i l o t / C o d e x 대 상 문 서 설 명 정 합 화 3 . [ P h a s e 3 > C l e a n u p / V e r i f i c a t i o n ] - [ x ] ( V E R I F Y R A G ) 디 버 깅 및 에 러 발 생 시 로 그 덤 프 전 m c p _ d e u k r a g _ s e a r c h _ t i c k e t s 로 과 거 해 결 책 우 선 탐 색 - [ x ] i n i t - - d r y - r u n 으 로 산 출 물 구 조 확 인 - [ x ] 실 제 i n i t 재 실 행 으 로 o v e r w r i t e / s y n c 동 작 확 인 - [ x ] R E A D M E 설 명 과 실 제 생 성 결 과 일 치 여 부 확 인 - [ ] * * P o t e n t i a l I s s u e T a b l e * * : | 이 슈 | 심 각 도 | 설 명 | 조 치 계 획 | | - - - | - - - | - - - | - - - | | C o d e x l o c a l s p o k e p a t h a m b i g u i t y | m e d i u m | C o d e x r e p o - l o c a l 보 조 문 서 경 로 표 준 이 약 함 | . c o d e x / A G E N T S . m d 를 기 본 안 으 로 유 지 하 고 후 속 티 켓 검 토 | | E x i s t i n g C o p i l o t f i l e o v e r w r i t e | m e d i u m | 기 존 . g i t h u b / c o p i l o t - i n s t r u c t i o n s . m d 를 덮 어 쓸 수 있 음 | o v e r w r i t e 정 책 과 b a c k u p 경 로 검 토 | 4 . [ P h a s e 4 > F o l l o w - u p C h a i n i n g ( M A N D A T O R Y i f i s s u e s e x i s t ) ] - [ ] 위 표 에 서 즉 시 해 결 불 가 능 한 항 목 에 대 해 별 도 티 켓 발 행 완 료 > C L I C o m m a n d E x a m p l e : d e u k - a g e n t - r u l e t i c k e t c r e a t e - - t o p i c 0 4 8 - F 1 - f i x - i s s u e - - c h a i n - - g r o u p < g r o u p > - [ ] ( 필 수 작 성 ) 발 행 된 후 속 티 켓 번 호 리 스 트 : # # ✅ V e r i f i c a t i o n / Q A - [ x ] * * D e e p A n a l y s i s V e r i f i c a t i o n * * : 선 택 지 추 가 , 선 택 기 반 s p o k e 생 성 , a g e n t - s p e c i f i c s p o k e 문 구 , R E A D M E 매 트 릭 스 를 반 영 했 습 니 다 . - [ x ] * * P o t e n t i a l I s s u e s C h e c k * * : 기 존 사 용 자 파 일 o v e r w r i t e 와 C o d e x l o c a l p a t h a m b i g u i t y 를 잔 여 리 스 크 로 유 지 합 니 다 . - [ x ] * * S t r i c t C o n s t r a i n t s A u d i t * * : 범 위 밖 규 칙 체 계 개 편 없 이 C o p i l o t / C o d e x 관 련 변 경 만 반 영 했 습 니 다 . - [ x ] 관 련 검 증 명 령 실 행 결 과 확 인 : n o d e . / s c r i p t s / c l i . m j s i n i t - - d r y - r u n - - n o n - i n t e r a c t i v e - - c w d / h o m e / j o y / w o r k s p a c e / i / D e u k A g e n t R u l e s 및 임 시 디 렉 토 리 에 서 c o p i l o t , c o d e x s p o k e 생 성 d r y - r u n 확 인 # # A g e n t P e r m i s s i o n C o n t r a c t ( A P C ) # # # [ B O U N D A R Y ] - E d i t a b l e m o d u l e s : t h i s t i c k e t t a r g e t m o d u l e s # # # [ C O N T R A C T ] - I n p u t : t a s k c o n t e x t i n t h i s t i c k e t . - O u t p u t : s c o p e d i m p l e m e n t a t i o n a n d v a l i d a t i o n . - S i d e e f f e c t s : u p d a t e s o n l y i n t a r g e t m o d u l e ( s ) . # # # [ P A T C H P L A N ] - I m p l e m e n t c h a n g e s i n t a r g e t m o d u l e s o n l y . - U p d a t e v e r i f i c a t i o n e v i d e n c e i n t h i s t i c k e t . # # C o m p a c t P l a n - * * P r o b l e m : * * f r o m l e g a c y p l a n - * * A p p r o a c h : * * [ F i l l d u r i n g e x e c u t i o n ] - * * V e r i f i c a t i o n : * * [ A d d r e l e v a n t c h e c k s ] - * * L i n k e d I s s u e s : * * [ U s e t i c k e t - l e v e l l i n k s o n l y ]

## Merged Legacy Document


### 061 codex copilot first class suppor joy nucb plan

# Plan: Codex / Copilot first-class support

## Summary
- 목적: `DeukAgentRules`에서 `Codex`, `Copilot`을 문서상 지원 수준이 아니라 `init`, 산출물 생성, 동적 규칙 주입, 문서 설명까지 포함한 1급 대상로 승격해요.
- 범위: `scripts/cli-utils.mjs`, `scripts/cli-init-commands.mjs`, `publish/*`, `README*` 중심으로 계획해요.
- 비범위: 이번 티켓에서 다른 에이전트의 규칙 체계 전면 개편이나 티켓 포맷 변경 자체는 포함하지 않아요.

## Current Gaps
- `AGENT_TOOLS` 선택지에 `copilot`, `codex`가 없어요.
- `Codex`는 `~/.codex/AGENTS.md` 전역 포인터만 있고 repo-local spoke가 없어요.
- `Copilot`은 `.github/copilot-instructions.md` 타깃은 있으나 내용이 일반 포인터 수준이에요.
- dynamic rule assembly가 사실상 `AGENTS.md`, `gemini.md` 위주예요.
- 실행 티켓과 plan reference 연결은 존재하지만 실제 plan 문서 자동 생성/보존이 약해요.

## Design Decisions
- 티켓은 실행 정본으로 유지하고, 이 문서는 상세 설계 정본으로 유지해요.
- `Codex`는 혼합형으로 가요.
  - 전역: `~/.codex/AGENTS.md` 포인터 유지
  - 로컬: repo-local spoke 신설
- `Copilot`은 공통 포인터 재사용이 아니라 전용 축약 지침을 생성해요.
- spoke 생성은 에이전트별 분기 구조로 바꿔서, 같은 문구를 모든 에이전트에 재사용하지 않아요.
- dynamic rule assembly는 에이전트별 최소 주입을 허용하도록 확장해요.

## Implementation Plan
1. `scripts/cli-utils.mjs`
- `AGENT_TOOLS`에 `copilot`, `codex`를 추가해 init UX와 저장 설정을 맞춰요.

2. `scripts/cli-init-commands.mjs`
- `SPOKE_REGISTRY`에 Codex local spoke를 추가해요.
- `generateSpokeContent()`를 agent별 분기형으로 개편해요.
- Copilot 전용 지침에는 티켓 우선, RAG 우선, 범위 제한, 반복 오류 시 티켓 발행 규칙을 짧게 넣어요.
- Codex local spoke에는 로컬 `AGENTS.md` 우선, 최신 티켓 사용, plan reference 열람 규칙을 넣어요.

3. `publish/rules.d/*`, `publish/AGENTS.md`, `publish/gemini.md`
- 현재 target 중심 rule injection 구조를 확장해서 Copilot/Codex 산출물에도 필요한 최소 규칙을 반영할 수 있게 해요.
- `Plan Reference`를 실행 티켓에서 실제 참고 규칙으로 읽도록 문구를 명확히 해요.

4. `README.md`, `README.ko.md`
- 지원 에이전트 매트릭스를 실제 생성 동작과 일치시켜요.
- Copilot/Codex 세션 시작 방식과 생성 산출물을 구분해서 설명해요.

## Verification Plan
- `init --dry-run`으로 `copilot`, `codex` 선택 시 예상 산출물 확인
- 실제 `init` 후 아래 파일 생성/갱신 확인
  - `.github/copilot-instructions.md`
  - repo-local Codex spoke
  - `~/.codex/AGENTS.md` 포인터 유지
- 재실행 시 중복 append 없이 안정적으로 overwrite/sync 되는지 확인
- README 설명과 실제 생성 파일이 일치하는지 확인

## Risks
- 기존 사용자 환경에 이미 있는 Copilot/Codex 파일을 덮어쓸 수 있어요.
- Codex local spoke 경로는 현재 표준화가 약해서 보수적으로 잡아야 해요.
- dynamic rule injection 범위를 넓히면 문서 중복이 늘 수 있어요.

## Acceptance Criteria
- init에서 `copilot`, `codex`를 정식 선택 가능
- Copilot/Codex 산출물이 공통 포인터가 아니라 agent-specific 내용을 가짐
- README가 실제 동작을 과장 없이 설명함
- 실행 티켓이 plan reference를 실사용 가능한 링크로 가짐
