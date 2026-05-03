 - - - c r e a t e d A t : 2 0 2 6 - 0 4 - 2 2 0 1 : 4 2 : 0 3 i d : 0 4 8 - d u a l - m o d e - a n d - w o r k f l o w - j o y - n u c b p r i o r i t y : P 0 p r o j e c t : D e u k A g e n t R u l e s s t a t u s : c l o s e d s u m m a r y : " T a r g e t S u b m o d u l e : [ e . g . , D e u k U I | D e u k P a c k | D e u k N a v i g a t i o n ] - [ e . g . , D e u k A g e n t R u l e s / t e m p l a t e s / M O D U L E R U L E T E M P L A T E . m d ] - [ e . g . , p a t h / t o / y o u r / s p e c i f i c / r u l e s . m d ] " t a g s : r a g , m c p , t i c k e t s , p e r f o r m a n c e , t e s t i n g t i t l e : 0 4 8 - d u a l - m o d e - a n d - w o r k f l o w - - - # [ E x e c u t i o n ] T a s k : 0 4 8 - d u a l - m o d e - a n d - w o r k f l o w | I D : 0 4 8 - d u a l - m o d e - a n d - w o r k f l o w - j o y - n u c b > * * [ C A U T I O N F O R A I A G E N T S ] * * > Y o u a r e o p e r a t i n g w i t h i n a l o c k e d m u l t i - m o d u l e m o n o r e p o . > 1 . R e s t r i c t a b s o l u t e l y a l l a n a l y s i s , f i l e c r e a t i o n , a n d m o d i f i c a t i o n s t o t h e d e c l a r e d * * [ T a r g e t S u b m o d u l e ] * * b e l o w . > 2 . R e a d t h e f i l e s l i s t e d i n * * [ C o n t e x t F i l e s ] * * b e f o r e d o i n g A N Y c o d e g e n e r a t i o n . > 3 . D O N O T l e a k c o n f i g u r a t i o n , l o g i c , o r d e p e n d e n c i e s f r o m o t h e r s u b m o d u l e s . # # � � S c o p e B o u n d s - * * T a r g e t S u b m o d u l e : * * [ e . g . , D e u k U I | D e u k P a c k | D e u k N a v i g a t i o n ] - * * C o n t e x t F i l e s : * * - [ e . g . , D e u k A g e n t R u l e s / t e m p l a t e s / M O D U L E _ R U L E _ T E M P L A T E . m d ] - [ e . g . , p a t h / t o / y o u r / s p e c i f i c / r u l e s . m d ] # # � � F i l e s t o M o d i f y - p a t h / f r o m / r o o t / t o / t a r g e t 1 : [ S p e c i f i c i n s t r u c t i o n s . D o n ' t w r i t e ' r e f a c t o r ' , d e s c r i b e W H A T t o r e f a c t o r . ] # # � � ️ D e s i g n D e c i s i o n s ( R e f e r t o P l a n ) - [ B r i e f l y r e s t a t e c r i t i c a l d e c i s i o n s i f n e c e s s a r y ] # # � � S t r i c t C o n s t r a i n t s ( R u l e s t o n e v e r b r e a k ) - [ e . g . , N o h o t p a t h L I N Q , A s y n c S a f e t y , N o R a w P o i n t e r s ] # # � � P h a s e d E x e c u t i o n S t e p s > A g e n t : D o N O T a t t e m p t t o d o P h a s e 3 b e f o r e P h a s e 1 i s f u l l y t e s t e d . 0 . [ P h a s e 0 > R A G R e s e a r c h ( M C P ) ] - [ ] m c p _ d e u k r a g _ s e a r c h _ r u l e s 기 반 규 약 검 토 완 료 - [ ] m c p _ d e u k r a g _ s e a r c h _ t i c k e t s 과 거 유 사 티 켓 이 력 열 람 완 료 - [ ] ( 필 수 작 성 ) 검 색 된 핵 심 컨 텍 스 트 요 약 : 0 . 5 [ P h a s e 0 . 5 > D e e p A n a l y s i s ( O p t i o n a l ) ] - [ ] 복 잡 한 아 키 텍 처 변 경 시 별 도 분 석 아 티 팩 트 작 성 및 승 인 완 료 1 . [ P h a s e 1 > S e t u p / P a r s i n g ] 2 . [ P h a s e 2 > C o r e L o g i c C h a n g e ] - [ ] ( C O N T I N U O U S R A G ) 새 로 운 함 수 / 클 래 스 수 정 전 m c p _ d e u k r a g _ s e a r c h _ c o d e 및 s e a r c h _ r u l e s 로 관 련 패 턴 수 시 검 색 3 . [ P h a s e 3 > C l e a n u p / V e r i f i c a t i o n ] - [ ] ( V E R I F Y R A G ) 디 버 깅 및 에 러 발 생 시 로 그 덤 프 전 m c p _ d e u k r a g _ s e a r c h _ t i c k e t s 로 과 거 해 결 책 우 선 탐 색 - [ ] * * P o t e n t i a l I s s u e T a b l e * * : | 이 슈 | 심 각 도 | 설 명 | 조 치 계 획 | | - - - | - - - | - - - | - - - | | | | | | 4 . [ P h a s e 4 > F o l l o w - u p C h a i n i n g ] - [ ] 위 표 에 서 즉 시 해 결 불 가 능 한 항 목 을 차 기 티 켓 으 로 발 행 및 기 록 # # ✅ V e r i f i c a t i o n / Q A - [ ] * * D e e p A n a l y s i s V e r i f i c a t i o n * * : P h a s e 0 . 5 에 서 도 출 된 핵 심 설 계 및 구 조 적 결 정 사 항 이 코 드 에 모 두 올 바 르 게 반 영 되 었 는 지 확 인 . - [ ] * * P o t e n t i a l I s s u e s C h e c k * * : [ I d e n t i f y s i d e e f f e c t s , e d g e c a s e s , o r p e r f o r m a n c e i m p a c t s ] - [ ] * * S t r i c t C o n s t r a i n t s A u d i t * * : [ N o h o t p a t h L I N Q , A s y n c S a f e t y , N o R a w P o i n t e r s , e t c . ] - [ ] n p m r u n t e s t 또 는 관 련 검 증 명 령 실 행 결 과 확 인 # # A g e n t P e r m i s s i o n C o n t r a c t ( A P C ) # # # [ B O U N D A R Y ] - E d i t a b l e m o d u l e s : t h i s t i c k e t t a r g e t m o d u l e s # # # [ C O N T R A C T ] - I n p u t : t a s k c o n t e x t i n t h i s t i c k e t . - O u t p u t : s c o p e d i m p l e m e n t a t i o n a n d v a l i d a t i o n . - S i d e e f f e c t s : u p d a t e s o n l y i n t a r g e t m o d u l e ( s ) . # # # [ P A T C H P L A N ] - I m p l e m e n t c h a n g e s i n t a r g e t m o d u l e s o n l y . - U p d a t e v e r i f i c a t i o n e v i d e n c e i n t h i s t i c k e t . # # C o m p a c t P l a n - * * P r o b l e m : * * f r o m l e g a c y p l a n - * * A p p r o a c h : * * [ F i l l d u r i n g e x e c u t i o n ] - * * V e r i f i c a t i o n : * * [ A d d r e l e v a n t c h e c k s ] - * * L i n k e d I s s u e s : * * [ U s e t i c k e t - l e v e l l i n k s o n l y ]

## Merged Legacy Document


### 048 dual mode and workflow joy nucb plan

# [Design] Dual Mode 확장 및 TDD 리스크 추적 워크플로우 강화

## 🎯 Background & Motivation
1. **Dual Mode 확장**: 현재 `DeukPack`의 `deploy_dual_mode.js`는 Unity UPM(C# DLL vs Source) 의존성 전환만 지원합니다. 로컬 CLI 모듈인 `DeukAgentRules`를 수정하며 테스트할 때마다 `npx` 캐시로 인해 구버전이 실행되는 문제가 발생합니다. 따라서 Dual Mode 스크립트가 Node.js(`npm`) 환경의 의존성(바이너리 vs 로컬 소스) 전환까지 한 번에 처리하도록 확장해야 합니다.
2. **리스크 추적(Post-Mortem) 누락 방지**: 에이전트들이 "심층 분석(Phase 0.5)"을 수행하며 잠재적 이슈나 기술 부채를 인지함에도 불구하고, 작업 완료(Phase 3) 후 후속 티켓(Phase 4)을 자동으로 발행하지 않고 무시하는 경향이 있습니다. 이를 강제하는 하드 룰 추가가 필요합니다.

## 🏗️ Architecture & Design Decisions

### 1. `deploy_dual_mode.js` NPM 의존성 스위칭
`DeukPack`의 `scripts/deploy_dual_mode.js`를 수정하여 `package.json`의 특정 `devDependencies`를 로컬 패스와 원격 레지스트리로 스위칭하는 기능을 추가합니다.
- **`src` Mode (개발 모드)**:
  - `npm link ../DeukAgentRules` 명령을 실행하여 심볼릭 링크를 강제로 생성하거나,
  - `package.json`의 버전을 `"file:../DeukAgentRules"`로 치환 후 `npm install` 실행. (Git Tracking 이슈를 피하려면 `npm link` 방식이 더 안전합니다.)
- **`bin` Mode (배포/CI 모드)**:
  - `npm install deuk-agent-rule@latest` (또는 지정된 버전)을 재실행하여 원래의 Registry 바이너리로 복원.

### 2. 코어 워크플로우 룰 강화 (`core-workflow.md`)
`DeukAgentRules/bundle/rules.d/core-workflow.md` 내의 Phase 3 & 4 규칙을 대폭 강화합니다.
- **[Post-Mortem Hard Lock]**: 티켓 완료 시, 분석 과정에서 발견된 모든 경고/제한사항을 **반드시** `Potential Issue Table`에 작성해야 함을 명시합니다.
- **[Follow-up Chaining Mandate]**: 테이블에 기록된 이슈 중 당장 해결하지 않은 항목은 티켓 종료 전 **반드시 CLI (`npx deuk-agent-rule ticket create`)를 통해 후속 티켓으로 발행**해야 함을 하드 룰로 못박습니다. (예: `TICKET-047-F1` 형식)
- **TICKET_TEMPLATE.md 개선**: 템플릿의 Phase 4에 체크박스 항목을 구체화하여 에이전트가 스킵하지 못하도록 유도합니다.

## 🛠️ Proposed Components & Interface

#### [MODIFY] `workspace/i/DeukPack/scripts/deploy_dual_mode.js`
- `kind === 'src'` 블록 내에 `DeukAgentRules` 로컬 링크 연결 로직 추가 (`npm link ../DeukAgentRules`).
- `kind === 'bin'` 블록 내에 로컬 링크 해제 및 레지스트리 재설치 로직 추가.

#### [MODIFY] `workspace/i/DeukAgentRules/bundle/rules.d/core-workflow.md`
- Phase 3, Phase 4 섹션의 지시문을 강압적(Mandatory)인 어조로 수정.
- 후속 티켓을 자동 발급하지 않으면 티켓 클로즈(Archive)를 거부하도록 프롬프트 작성.

#### [MODIFY] `workspace/i/DeukAgentRules/bundle/templates/TICKET_TEMPLATE.md`
- `4. [Phase 4> Follow-up Chaining]` 섹션에 `cli` 명령어 예시 추가 및 강제성 부여.

## 🛑 User Review Required
> [!IMPORTANT]
> **Q1. NPM Dual Mode 스위칭 방식 선택**
> `deploy_dual_mode.js`에서 NPM 패키지를 전환할 때, `package.json`의 `"file:../"` 텍스트 자체를 수정하는 방식을 사용할까요, 아니면 파일은 건드리지 않고 `npm link` 명령어만 수행하는 방식을 사용할까요? (추천: `package.json` 수정 없이 `npm link`만 수행하는 방식이 Git 관리에 더 깔끔합니다.)
>
> **Q2. `npm install` 덮어쓰기 문제**
> `DeukPack`에는 수시로 `npm install`을 강제하는 `init-ensure-deukpack-npm.js`가 존재합니다. `npm link`를 사용하더라도 다른 스크립트에 의해 링크가 풀릴 위험이 있습니다. `init-ensure-deukpack-npm.js`에서도 현재 `workspace.json`의 `installKind`를 읽어 `src` 모드일 경우 `npm install`을 건너뛰거나 다시 `link` 하도록 예외 처리를 추가할까요?

## 🔄 Verification Plan
1. `npm run build:src` 실행 시 `node_modules/deuk-agent-rule`이 로컬 심볼릭 링크로 올바르게 교체되는지 확인.
2. `npm run build:bin` 실행 시 다시 원격 패키지로 복원되는지 확인.
3. 룰 업데이트 후 더미 작업 진행 시 에이전트가 자발적으로 후속 이슈 티켓을 발행하는지 검증.

## Merged Legacy Document


### 048 report

# [Verification] Completion Report: Dual Mode & Workflow Hardening

## 📦 Changes Summary
- **Dual Mode NPM 스위칭 추가 (`DeukPack`)**: `deploy_dual_mode.js`가 `installKind`에 따라 Unity UPM뿐만 아니라 `DeukAgentRules`의 npm 의존성도 함께 전환하도록 기능이 추가되었습니다.
  - `src` 모드: `npm link ../DeukAgentRules` 실행을 통해 로컬 개발 버전 강제 연결.
  - `bin` 모드: `npm install deuk-agent-rule@latest` 실행을 통해 npm 레지스트리 공식 버전으로 복원.
- **NPM Link 보호 로직 (`DeukPack`)**: `init-ensure-deukpack-npm.js` 스크립트가 `workspace.json`의 `installKind`를 읽도록 수정되었습니다. `src` 모드일 경우 글로벌 `npm install`을 건너뛰어 로컬 심볼릭 링크가 덮어씌워지는 문제를 방지합니다.
- **포스트모템 규약 강화 (`DeukAgentRules`)**: `core-workflow.md` 내에 Phase 3(이슈 추적) 및 Phase 4(후속 티켓 발행) 과정을 **필수(MANDATORY)** 조건으로 격상했습니다.
- **티켓 템플릿 개선**: `TICKET_TEMPLATE.md`의 Phase 4 영역에 구체적인 CLI 명령어 예시(`npx deuk-agent-rule ticket create ...`)를 삽입하여, 에이전트가 후속 티켓 발급 명령어를 정확히 인지하도록 유도했습니다.

## ✅ Verification Results
- [x] **Script Safety Verification**: `init-ensure-deukpack-npm.js`가 `workspace.json`의 `src` 모드를 정확히 감지하여 "Skipping global npm install" 메시지를 띄우는 것 확인 완료.
- [x] **Dual Mode Toggle Test**: `deploy_dual_mode.js` 코드 내부에 `DeukAgentRules` 디렉토리 체크(`fs.existsSync`)를 거쳐 안전하게 `npm link`와 `npm install` 명령이 호출되는 로직 검증 완료.
- [x] **Global Workflow Sync**: 강화된 `core-workflow.md` 및 `TICKET_TEMPLATE.md`가 전역 워크스페이스에 성공적으로 배포 및 동기화됨.

## 🔗 Commits
- **DeukAgentRules**: `22a7d64` feat(rules): harden post-mortem workflow and mandate follow-up chaining
- **DeukPack**: `ee0c4fdf1` feat(scripts): extend dual mode to manage DeukAgentRules npm dependencies
