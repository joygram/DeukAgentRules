 - - - i d : 1 9 9 - 디 렉 토 리 - 정 리 - 재 시 도 - 통 합 - j o y - n u c b t i t l e : 디 렉 토 리 - 정 리 - 재 시 도 - 통 합 p h a s e : 4 s t a t u s : c l o s e d d o c s L a n g u a g e : k o s u m m a r y : 레 거 시 산 재 파 일 을 월 별 아 카 이 브 구 조 로 정 리 p r i o r i t y : P 2 t a g s : [ ] c r e a t e d A t : 2 0 2 6 - 0 5 - 0 2 2 2 : 3 9 : 2 9 - - - # 디 렉 토 리 - 정 리 - 재 시 도 - 통 합 > R e s t r i c t c h a n g e s t o * * T a r g e t M o d u l e * * . R e a d * * C o n t e x t F i l e s * * b e f o r e c o d e g e n e r a t i o n . > K e e p e x e c u t i o n e v i d e n c e a n d d e t a i l e d s t e p s i n ; d o n o t d u p l i c a t e t h e m h e r e . # # S c o p e & C o n s t r a i n t s - * * T a r g e t : * * m o d u l e / s u b m o d u l e p a t h s d i r e c t l y r e q u i r e d b y 디 렉 토 리 - 정 리 - 재 시 도 - 통 합 - * * C o n t e x t F i l e s : * * P R O J E C T _ R U L E . m d , r e l e v a n t a r c h i t e c t u r e d o c s , a n d t a r g e t s o u r c e f i l e s - * * : * * l e g a c y p l a n d o c o w n s e v i d e n c e , d e c i s i o n s , d e t a i l e d s t e p s , a n d v e r i f i c a t i o n n o t e s . - * * C o n s t r a i n t s : * * N o g e n e r a t e d o u t p u t e d i t s , n o u n r e l a t e d r e f a c t o r s , n o b r o a d r e g e n e r a t i o n w i t h o u t a p p r o v a l . - * * L i f e c y c l e G u a r d : * * t i c k e t l i f e c y c l e c o m m a n d s a u t o - r u n m a r k d o w n l i n t o n t o u c h e d f i l e s a n d f a i l f a s t o n b r o k e n m a r k d o w n o r m i s s i n g l i n k e d a r t i f a c t s . # # A g e n t P e r m i s s i o n C o n t r a c t ( A P C ) # # # [ B O U N D A R Y ] - E d i t a b l e m o d u l e s : t i c k e t t a r g e t m o d u l e s d i r e c t l y r e l a t e d t o " 레 거 시 산 재 파 일 을 월 별 아 카 이 브 구 조 로 정 리 " - F o r b i d d e n m o d u l e s : g e n e r a t e d a r t i f a c t s , u n r e l a t e d s h a r e d i n f r a s t r u c t u r e , e x t e r n a l m o d u l e r o o t s - R u l e c i t a t i o n : P R O J E C T _ R U L E . m d + c o r e - r u l e s / A G E N T S . m d # # # [ C O N T R A C T ] - I n p u t : e x i s t i n g c o d e / c o n t e x t r e q u i r e d t o i m p l e m e n t " 레 거 시 산 재 파 일 을 월 별 아 카 이 브 구 조 로 정 리 " - O u t p u t : m i n i m a l i m p l e m e n t a t i o n a n d t e s t s t h a t s a t i s f y " 레 거 시 산 재 파 일 을 월 별 아 카 이 브 구 조 로 정 리 " - S i d e e f f e c t s : t i c k e t + p l a n d o c s u p d a t e s , s c o p e d c o d e c h a n g e s o n l y # # # [ P A T C H P L A N ] - P r o b l e m a n a l y s i s , c a u s e h y p o t h e s e s , r a t i o n a l e , e x e c u t i o n s t r a t e g y , a n d v e r i f i c a t i o n d e s i g n l i v e i n . - T i c k e t r e c o r d s o n l y t h e a l l o w e d p a t c h b o u n d a r y a n d c o n t r a c t . - D o n o t d u p l i c a t e c o n t e n t h e r e ; r e f e r e n c e i t w h e n d e t a i l i s n e e d e d . # # C o m p a c t P l a n - * * P r o b l e m : * * f r o m l e g a c y p l a n - * * A p p r o a c h : * * [ F i l l d u r i n g e x e c u t i o n ] - * * V e r i f i c a t i o n : * * [ A d d r e l e v a n t c h e c k s ] - * * L i n k e d I s s u e s : * * [ U s e t i c k e t - l e v e l l i n k s o n l y ] # # T a s k s - [ x ] C o m p l e t e n o n - d u p l i c a t i v e e v i d e n c e / s t e p s / v e r i f i c a t i o n . - [ x ] E x e c u t e c h a n g e s i n s i d e A P C b o u n d a r y . - [ x ] R e c o r d v e r i f i c a t i o n o u t c o m e i n t h e l i n k e d r e p o r t o r . # # D o n e W h e n - A P C i s c o m p l e t e a n d n o n - p l a c e h o l d e r . - T a r g e t c h a n g e s a r e i m p l e m e n t e d i n s i d e t h e d e c l a r e d b o u n d a r y . - M a r k d o w n l i n t / t e s t s r e l e v a n t t o t h i s t i c k e t p a s s o r f a i l u r e s a r e r e c o r d e d . - L i f e c y c l e c o m m a n d s c a n p e r s i s t t h e t i c k e t a n d w i t h o u t m a n u a l l i n t i n t e r v e n t i o n .

## Merged Legacy Document


### 199 디렉토리 정리 재시도 통합 joy nucb plan

# Agent Analysis Plan

## Ticket Contract Pointer
- Linked ticket owns scope and lifecycle constraints.
- This plan documents root-cause, evidence, and execution strategy for directory cleanup.

## Problem Analysis
- 사용자 요청은 `.deuk-agent` 내부뿐 아니라 레포 루트에 존재하는 의미 불분명 디렉토리(특히 `ticket/`)까지 포함되는 것으로 보입니다.
- 현재 `.deuk-agent`는 `docs`, `knowledge`, `tickets`, `config.json`, `telemetry.jsonl` 구조로 정리되어 있으나, 루트 `ticket/`은 `.deuk-agent` 패턴과 맞지 않고 이전 시스템 흔적으로 보입니다.
- `ticket/TICKET_LIST.md`는 `Source index: .deuk-agent-ticket/INDEX.json` 등 현재 미존재 경로를 가리켜 이미 깨진 링크를 포함하고 있어 정리 대상입니다.
- `npx deuk-agent-rule init --dry-run`에서는 루트 `ticket/`을 legacy 대상 인식하지 못해 제거되지 않습니다. 즉, init이 deterministic하게 정리해 주지 못해 재출현이 발생할 수 있습니다.

## Source Observations
- Root scan confirms legacy: `ticket/TICKET-DEUKPACK-Security.md`, `ticket/TICKET-DEUKUI-IR-Refactoring.md`, `ticket/TICKET_LIST.md`.
- `.deuk-agent/tickets` 하위는 `archive/sub/<YYYY-MM>/<DD>`와 `sub/`로 정리되어 있으며, `init` dry-run 시 추가 마이그레이션이 거의 없습니다.
- `scripts/cli-init-commands.mjs`의 `migrateLegacyStructure()`는 `.deuk-agent-ticket` / `.deuk-agent-tickets`만 legacy로 인식하며, 루트 `ticket/`은 처리되지 않습니다.

## Cause Hypotheses
- 1) 루트 레거시 디렉토리 `ticket/`가 새 네이밍 규칙에서 누락돼 계속 잔존.
- 2) `init`이 legacy 후보를 선별할 때 `ticket/`까지 다루지 않아 반복 실행해도 정리되지 않음.

## Decision Rationale
- 우선 레이아웃 정합성을 위해 `init`의 `migrateLegacyStructure()`에 루트 `ticket/` 처리를 추가합니다.
- `ticket/`의 존재 자체가 문맥상 고아 흔적이므로 자동 정리 대상으로 분류하고, 기존 `TICKET_LIST.md`와 티켓 파일은 안전하게 별도 보관 후 삭제합니다.
- 보관 위치는 기존 레포 내 `deuk-agent` 영구 저장소 밖에서 추적 가능하도록 `.deuk-agent/legacy-ticket/` 경로로 통일 정리합니다(구조 단일화 + 추적성).

## Execution Strategy
- 1단계: `scripts/cli-utils.mjs`에 root legacy 상수(`LEGACY_TICKET_DIR_ROOT = "ticket"`) 추가.
- 2단계: `scripts/cli-init-commands.mjs`의 `migrateLegacyStructure()`에서 root `ticket/` 디렉토리 병합/이관 로직 추가.
  - `ticket` 폴더가 존재하면 `.deuk-agent/legacy-tickets/<timestamp>`로 이동.
  - 이동 실패 시 삭제/병합 로그를 남기고 dry-run에서 동작 확인 가능.
- 3단계: 기존 `init`과 충돌 없는지 `npx deuk-agent-rule init --dry-run` 실행 후, 새 경로가 예측대로 생성되는지 확인.
- 4단계: `merged ticket body`, `.deuk-agent/tickets`, `.deuk-agent/knowledge`, 루트 `ticket/` 존재 여부를 재점검해 결과를 보고.

## Verification Design
- `rg --files ticket` → 빈 결과/legacy-only 이동 검증.
- `npx deuk-agent-rule init --dry-run` → root legacy가 감지되어 작업 로그에 노출되는지 확인.
- `rg --files .deuk-agent | rg "(^|/)tickets/(global|main|core|reports|archive/tickets|legacy-tickets)` → legacy 레이아웃이 제거되었는지 확인.
- `git diff`로 변경 파일이 init 스크립트 및 계획 산출만 반영되는지 확인.

## Verification Outcome
- `.agent/workflows/*.md`는 `merged into this ticket`로 이동했고 루트 `.agent`는 제거되었습니다.
- `.deuk-agent` 최상위는 `docs`, `knowledge`, `tickets`, `config.json`, `telemetry.jsonl`만 허용하도록 init 정리 로직이 보강되었습니다.
- `npx deuk-agent-rule init --dry-run` 재실행 결과 추가 이동 대상이 없습니다.
- `npx deuk-agent-rule lint:md`와 `node --test scripts/tests/*.test.mjs`가 통과했습니다.
