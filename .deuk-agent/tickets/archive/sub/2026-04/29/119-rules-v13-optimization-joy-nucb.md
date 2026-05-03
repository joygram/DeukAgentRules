 - - - i d : 1 1 9 - r u l e s - v 1 3 - o p t i m i z a t i o n - j o y - n u c b t i t l e : r u l e s - v 1 3 - o p t i m i z a t i o n p h a s e : 4 s t a t u s : c l o s e d d o c s L a n g u a g e : k o s u m m a r y : " A G E N T S . m d v 1 2 → v 1 3 최 적 화 : 8 . 7 K B → 6 K B 압 축 , T I C K E T _ T E M P L A T E m o d e r n i z e , d e a d f i l e c l e a n u p " c r e a t e d A t : 2 0 2 6 - 0 4 - 2 9 2 0 : 0 2 : 5 5 p r i o r i t y : P 3 t a g s : - r u l e s - o p t i m i z a t i o n - p l a n n i n g - m i g r a t e d - - - # r u l e s - v 1 3 - o p t i m i z a t i o n > * * [ C A U T I O N F O R A I A G E N T S ] * * > 1 . R e s t r i c t a l l a n a l y s i s , f i l e c r e a t i o n , a n d m o d i f i c a t i o n s t o t h e d e c l a r e d * * T a r g e t M o d u l e * * b e l o w . > 2 . R e a d t h e f i l e s l i s t e d i n * * C o n t e x t F i l e s * * b e f o r e d o i n g A N Y c o d e g e n e r a t i o n . > 3 . D O N O T l e a k c o n f i g u r a t i o n , l o g i c , o r d e p e n d e n c i e s f r o m o t h e r m o d u l e s . # # T a r g e t M o d u l e - * * T a r g e t : * * c o r e - r u l e s / A G E N T S . m d , t e m p l a t e s / T I C K E T _ T E M P L A T E . m d , r e l a t e d m a r k d o w n l i n t / t e s t s o n l y . # # A n a l y s i s & C o n s t r a i n t s ( D e e p R e v i e w ) 1 . R o o t C a u s e & A r c h i t e c t u r e c o n s t r a i n t : - 이 티 켓 은 오 래 된 “ v 1 2 → v 1 3 최 적 화 ” 목 표 를 담 고 있 지 만 현 재 정 본 은 v 1 7 이 다 . - v 1 7 에 는 T D W , g e n e r a t e d / r e p o r t g u a r d , b a s e l i n e e x p a n s i o n g u a r d 등 최 신 안 전 규 칙 이 포 함 되 어 있 어 단 순 압 축 삭 제 는 회 귀 위 험 이 크 다 . 2 . R i s k & E d g e C a s e s : - c o r e - r u l e s / A G E N T S . m d 를 과 도 하 게 축 약 하 면 b o o t s e q u e n c e , p h a s e g a t e , g e n e r a t e d a r t i f a c t g u a r d 가 약 화 될 수 있 다 . - t e m p l a t e s / T I C K E T _ T E M P L A T E . m d 를 바 꾸 면 이 후 모 든 신 규 티 켓 품 질 에 영 향 을 준 다 . - i n i t 실 행 은 b r o a d o u t p u t r e g e n e r a t i o n 이 므 로 실 행 단 계 에 서 별 도 승 인 없 이 는 금 지 한 다 . # # A g e n t P e r m i s s i o n C o n t r a c t ( A P C ) > ⚠ ️ [ M A N D A T O R Y ] D o N O T w r i t e o r m o d i f y a n y c o d e u n t i l t h i s 4 - b l o c k c o n t r a c t i s c o m p l e t e l y f i l l e d o u t . # # # [ B O U N D A R Y ] - * * 변 경 가 능 한 모 듈 : * * c o r e - r u l e s / A G E N T S . m d , t e m p l a t e s / T I C K E T _ T E M P L A T E . m d , 이 티 켓 문 서 와 p l a n / r e p o r t 문 서 . - * * 변 경 금 지 모 듈 : * * b i n / d e u k - a g e n t - r u l e . j s , g e n e r a t e d c o n s u m e r s p o k e s , . c u r s o r / r u l e s / 배 포 산 출 물 , b e n c h m a r k / r e p o r t / g e n e r a t e d o u t p u t s , u n r e l a t e d D e u k P a c k f i l e s . # # # [ C O N T R A C T ] - * * i n p u t : * * 현 재 v 1 7 c o r e - r u l e s / A G E N T S . m d ( 약 1 0 . 3 K B ) , t e m p l a t e s / T I C K E T _ T E M P L A T E . m d , 과 거 0 8 0 / 1 1 0 계 획 . - * * o u t p u t : * * 최 신 v 1 7 안 전 규 칙 을 유 지 하 면 서 중 복 / 불 명 확 / 낡 은 표 현 만 줄 이 는 실 행 후 보 안 과 , 승 인 후 적 용 가 능 한 제 한 된 패 치 . - * * s i d e e f f e c t s : * * m a r k d o w n 문 서 갱 신 , 실 행 승 인 후 정 본 / 템 플 릿 문 서 수 정 가 능 . i n i t 이 나 g e n e r a t e d o u t p u t 재 생 성 은 별 도 승 인 전 금 지 . - * * R u l e C i t a t i o n ( 프 로 젝 트 룰 인 용 ) : * * c o r e - r u l e s / A G E N T S . m d = s i n g l e s o u r c e o f t r u t h ; t e m p l a t e s / = d i s t r i b u t e d t o c o n s u m e r s v i a i n i t ; C o n s u m e r . c u r s o r / r u l e s / s p o k e s a n d C o n s u m e r A G E N T S . m d a r e g e n e r a t e d f r o m c o r e - r u l e s / A G E N T S . m d / t e m p l a t e s / r u l e s . d / . # # # [ P A T C H P L A N ] - * * f i l e : * * c o r e - r u l e s / A G E N T S . m d - * * f u n c t i o n : * * 정 본 에 이 전 트 규 칙 - * * c h a n g e : * * v 1 7 g u a r d 의 미 를 유 지 하 면 서 중 복 문 장 , 장 황 한 설 명 , 오 래 된 C L I r e f e r e n c e 표 현 을 축 약 한 다 . 삭 제 후 보 는 먼 저 p l a n 에 명 시 하 고 실 행 전 승 인 받 는 다 . - * * f i l e : * * t e m p l a t e s / T I C K E T _ T E M P L A T E . m d - * * f u n c t i o n : * * 신 규 티 켓 기 본 구 조 - * * c h a n g e : * * p l a c e h o l d e r 발 생 을 줄 이 도 록 T a r g e t / C o n t e x t / A P C / D o n e W h e n 문 구 를 더 실 행 가 능 한 형 태 로 정 리 한 다 . - * * f i l e : * * m a r k d o w n l i n t / t e s t s - * * f u n c t i o n : * * 검 증 - * * c h a n g e : * * n p x d e u k - a g e n t - r u l e l i n t : m d , 필 요 시 n o d e - - t e s t s c r i p t s / t e s t s / * . t e s t . m j s 로 문 서 / C L I 회 귀 를 확 인 한 다 . # # # [ T E S T I M P A C T ] - * * a f f e c t e d t e s t s : * * n p x d e u k - a g e n t - r u l e l i n t : m d , n o d e - - t e s t s c r i p t s / t e s t s / * . t e s t . m j s , 실 행 승 인 시 n p x d e u k - a g e n t - r u l e i n i t - - d r y - r u n 또 는 / t m p 기 반 검 증 만 사 용 . # # C o m p a c t P l a n - * * P r o b l e m : * * f r o m l e g a c y p l a n - * * A p p r o a c h : * * [ F i l l d u r i n g e x e c u t i o n ] - * * V e r i f i c a t i o n : * * [ A d d r e l e v a n t c h e c k s ] - * * L i n k e d I s s u e s : * * [ U s e t i c k e t - l e v e l l i n k s o n l y ] # # T a s k s - [ x ] P h a s e 0 : 현 재 v 1 7 정 본 과 관 련 과 거 계 획 확 인 . - [ x ] P h a s e 1 : 최 신 상 태 기 준 으 로 A P C 와 실 행 계 획 재 작 성 . - [ x ] P h a s e 2 : 승 인 후 정 본 / 템 플 릿 최 적 화 후 보 적 용 . - c o r e - r u l e s / A G E N T S . m d v e r s i o n 을 1 8 로 올 리 고 v 1 7 g u a r d 의 미 를 유 지 한 채 문 구 를 압 축 했 다 . - t e m p l a t e s / T I C K E T _ T E M P L A T E . m d 의 빈 p l a c e h o l d e r 를 실 행 가 능 한 기 본 문 구 로 교 체 했 다 . - [ x ] P h a s e 3 : l i n t / t e s t 및 생 성 산 출 물 d r y - r u n 검 증 . - c o r e - r u l e s / A G E N T S . m d : 1 0 , 3 2 0 b y t e s → 8 , 8 4 7 b y t e s . - t e m p l a t e s / T I C K E T _ T E M P L A T E . m d : 1 , 2 1 4 b y t e s → 1 , 6 2 7 b y t e s . p l a c e h o l d e r 감 소 를 위 해 구 조 설 명 은 늘 어 났 다 . - n o d e - - t e s t s c r i p t s / t e s t s / * . t e s t . m j s : 2 2 개 통 과 . - [ x ] P h a s e 4 : 보 고 서 작 성 후 c l o s e / a r c h i v e . - . d e u k - a g e n t / d o c s / w a l k t h r o u g h s / 1 1 9 - r u l e s - v 1 3 - o p t i m i z a t i o n - j o y - n u c b - r e p o r t . m d 작 성 . # # D o n e W h e n - c o r e - r u l e s / A G E N T S . m d 의 최 신 v 1 7 안 전 규 칙 이 손 상 되 지 않 는 다 . - 변 경 전 후 크 기 와 주 요 g u a r d 보 존 여 부 가 기 록 된 다 . - t e m p l a t e s / T I C K E T _ T E M P L A T E . m d 가 p l a c e h o l d e r 티 켓 생 성 을 줄 이 는 방 향 으 로 개 선 된 다 . - m a r k d o w n l i n t 와 관 련 테 스 트 가 통 과 한 다 . # # � � A t t a c h e d R e p o r t - [ V i e w R e p o r t ] ( . . / . . / . . / d o c s / w a l k t h r o u g h s / 1 1 9 - r u l e s - v 1 3 - o p t i m i z a t i o n - j o y - n u c b - r e p o r t . m d )

## Merged Legacy Document


### 119 rules v13 optimization joy nucb report

# rules-v13-optimization 실행 보고서

## 변경 요약

- `core-rules/AGENTS.md`를 version 18로 올렸다.
- v17에서 추가된 G6/G7/G8, generated output guard, TDW phase gate는 유지했다.
- 장황한 guard 설명과 shell mutation clause를 압축했다.
- `templates/TICKET_TEMPLATE.md`의 빈 placeholder 문구를 실행 가능한 기본 문장으로 바꿨다.

## 크기 변화

- `core-rules/AGENTS.md`: 10,320 bytes → 8,847 bytes.
- `templates/TICKET_TEMPLATE.md`: 1,214 bytes → 1,627 bytes.
- 템플릿은 placeholder를 줄이기 위해 설명이 늘었지만 신규 티켓 품질을 우선했다.

## 검증

- `npx deuk-agent-rule lint:md core-rules/AGENTS.md templates/TICKET_TEMPLATE.md .deuk-agent/tickets/sub/119-rules-v13-optimization-joy-nucb.md `merged into this ticket`: 통과.
- `node --test scripts/tests/*.test.mjs`: 22개 통과.

## 참고

- 전체 테스트 출력에 기존 shell quoting 경고 한 줄이 표시되지만 TAP 결과는 모두 pass였다.
- broad regeneration인 `npx deuk-agent-rule init`은 실행하지 않았다.

## Merged Legacy Document


### 119 rules v13 optimization joy nucb plan

# rules-v13-optimization 실행 계획

## 목표

오래된 “v12→v13 최적화” 목표를 현재 v17 정본 기준으로 재해석한다. 핵심 안전 규칙은 유지하고, 실제 실행 단계에서는 중복/장황함/placeholder 유발 문구만 줄인다.

## 현재 관찰

- `core-rules/AGENTS.md`: version 17, 약 10.3KB.
- `templates/TICKET_TEMPLATE.md`: 약 1.2KB, placeholder 항목이 남아 있어 신규 티켓 품질 저하 가능성이 있다.
- 과거 080 계획은 강한 압축을 제안하지만, 현재 v17의 TDW/가드 확장 이후 그대로 적용하면 안전 규칙 회귀 위험이 있다.
- 과거 110 계획은 `legacy split reference`와 APC 도달성을 강화한 이력으로, 이번 작업에서도 보존해야 한다.

## 실행 후보

### 1. `core-rules/AGENTS.md` 축약 후보

- Tone/Boot/Pre-Action/Lifecycle/File Guard의 의미는 유지한다.
- 중복 설명과 장황한 경고 문구만 줄인다.
- CLI Reference는 현재 실제 명령과 맞는 항목만 유지한다.
- G6/G7/G8 같은 최신 scope-expansion guard는 삭제하지 않는다.

### 2. `templates/TICKET_TEMPLATE.md` 개선 후보

- `[module/submodule path]`, `[Task 1]`, `[Verification steps...]` 같은 빈 placeholder를 줄인다.
- Target/Context/APC/Tasks/Done When을 생성 직후 더 실행 가능한 문장으로 바꾼다.
- `legacy split reference` 전제와 Phase 1 완료 조건이 티켓 본문에서 드러나게 한다.

### 3. 검증 후보

- `wc -c core-rules/AGENTS.md templates/TICKET_TEMPLATE.md`
- `npx deuk-agent-rule lint:md core-rules/AGENTS.md templates/TICKET_TEMPLATE.md .deuk-agent/tickets/sub/119-rules-v13-optimization-joy-nucb.md `merged into this ticket`
- `node --test scripts/tests/*.test.mjs`
- broad regeneration은 금지한다. 필요하면 `/tmp` 워크스페이스에서 dry-run 성격으로만 확인한다.

## 승인 후 Patch Plan

1. [x] `core-rules/AGENTS.md`에서 의미 중복과 과도한 설명만 축약한다.
2. [x] `templates/TICKET_TEMPLATE.md`의 placeholder 문구를 실행 가능한 기본값으로 개선한다.
3. [x] 변경 전후 크기와 보존한 guard 목록을 티켓에 기록한다.
4. [x] lint/test를 실행한다.
5. [ ] walkthrough report 작성 후 티켓을 close/archive한다.

## 비범위

- consumer `.cursor/rules/`, consumer `AGENTS.md` 직접 수정.
- `npx deuk-agent-rule init`로 broad generated output 재생성.
- `bin/deuk-agent-rule.js` 로직 변경.
- v17 신규 guard 삭제.

## 승인 필요

이 계획은 Phase 1까지의 준비안이다. 실행하려면 사용자의 명시 승인이 필요하다.
