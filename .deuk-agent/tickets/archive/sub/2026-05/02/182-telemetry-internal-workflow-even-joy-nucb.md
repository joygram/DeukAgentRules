 - - - i d : 1 8 2 - t e l e m e t r y - i n t e r n a l - w o r k f l o w - e v e n - j o y - n u c b t i t l e : t e l e m e t r y - i n t e r n a l - w o r k f l o w - e v e n t s p h a s e : 4 s t a t u s : c l o s e d d o c s L a n g u a g e : k o s u m m a r y : t e l e m e t r y 내 부 w o r k f l o w e v e n t 수 집 과 이 벤 트 t i m e s t a m p 기 반 자 동 t i m i n g 산 출 계 획 및 구 현 p r i o r i t y : P 2 t a g s : [ ] c r e a t e d A t : 2 0 2 6 - 0 5 - 0 2 1 0 : 4 9 : 4 8 - - - # t e l e m e t r y - i n t e r n a l - w o r k f l o w - e v e n t s > R e s t r i c t c h a n g e s t o * * T a r g e t M o d u l e * * . R e a d * * C o n t e x t F i l e s * * b e f o r e c o d e g e n e r a t i o n . > K e e p e x e c u t i o n e v i d e n c e a n d d e t a i l e d s t e p s i n ; d o n o t d u p l i c a t e t h e m h e r e . # # S c o p e & C o n s t r a i n t s - * * T a r g e t : * * s c r i p t s / c l i - t e l e m e t r y - c o m m a n d s . m j s , s c r i p t s / c l i - t i c k e t - c o m m a n d s . m j s , s c r i p t s / c l i - a r g s . m j s , s c r i p t s / t e s t s / c l i - t e l e m e t r y - c o m m a n d s . t e s t . m j s , s c r i p t s / t e s t s / c l i - t i c k e t - c o m m a n d s . t e s t . m j s , s c r i p t s / t e s t s / c l i - u t i l s . t e s t . m j s - * * C o n t e x t F i l e s : * * P R O J E C T _ R U L E . m d , c o r e - r u l e s / A G E N T S . m d , e x i s t i n g t e l e m e t r y s u m m a r y t e s t s , a n d t a r g e t s o u r c e f i l e s - * * C o n s t r a i n t s : * * N o g e n e r a t e d o u t p u t e d i t s , n o u n r e l a t e d r e f a c t o r s , n o b r o a d r e g e n e r a t i o n w i t h o u t a p p r o v a l . - * * L i f e c y c l e G u a r d : * * t i c k e t l i f e c y c l e c o m m a n d s a u t o - r u n m a r k d o w n l i n t o n t o u c h e d f i l e s a n d f a i l f a s t o n b r o k e n m a r k d o w n o r m i s s i n g l i n k e d a r t i f a c t s . # # A g e n t P e r m i s s i o n C o n t r a c t ( A P C ) # # # [ B O U N D A R Y ] - E d i t a b l e m o d u l e s : t e l e m e t r y C L I , t i c k e t l i f e c y c l e t e l e m e t r y h o o k s , t e l e m e t r y a r g u m e n t p a r s e r , a n d f o c u s e d t e s t s f o r i n t e r n a l w o r k f l o w e v e n t s / t i m i n g - F o r b i d d e n m o d u l e s : g e n e r a t e d a r t i f a c t s , u n r e l a t e d s h a r e d i n f r a s t r u c t u r e , e x t e r n a l m o d u l e r o o t s - R u l e c i t a t i o n : P R O J E C T _ R U L E . m d + c o r e - r u l e s / A G E N T S . m d # # # [ C O N T R A C T ] - I n p u t : e x i s t i n g c o d e / c o n t e x t r e q u i r e d t o i m p l e m e n t " t e l e m e t r y 내 부 w o r k f l o w e v e n t 수 집 과 이 벤 트 t i m e s t a m p 기 반 자 동 t i m i n g 산 출 계 획 및 구 현 " - O u t p u t : i n t e r n a l w o r k f l o w e v e n t r e c o r d s i n t e l e m e t r y p l u s d e r i v e d t i m i n g s u m m a r y m e t r i c s , w i t h o u t m i x i n g t h o s e r e c o r d s i n t o m a n u a l R A G / T D W t o k e n m e t r i c s - S i d e e f f e c t s : t i c k e t + p l a n d o c s u p d a t e s , s c o p e d c o d e c h a n g e s o n l y # # # [ P A T C H P L A N ] - P r o b l e m a n a l y s i s , c a u s e h y p o t h e s e s , r a t i o n a l e , e x e c u t i o n s t r a t e g y , a n d v e r i f i c a t i o n d e s i g n l i v e i n . - T i c k e t r e c o r d s o n l y t h e a l l o w e d p a t c h b o u n d a r y a n d c o n t r a c t . - D o n o t d u p l i c a t e c o n t e n t h e r e ; r e f e r e n c e i t w h e n d e t a i l i s n e e d e d . # # C o m p a c t P l a n - * * P r o b l e m : * * f r o m l e g a c y p l a n - * * A p p r o a c h : * * [ F i l l d u r i n g e x e c u t i o n ] - * * V e r i f i c a t i o n : * * [ A d d r e l e v a n t c h e c k s ] - * * L i n k e d I s s u e s : * * [ U s e t i c k e t - l e v e l l i n k s o n l y ] # # T a s k s - [ x ] C o m p l e t e n o n - d u p l i c a t i v e e v i d e n c e / s t e p s / v e r i f i c a t i o n . - [ x ] E x e c u t e c h a n g e s i n s i d e A P C b o u n d a r y . - [ x ] R e c o r d v e r i f i c a t i o n o u t c o m e i n t h e l i n k e d r e p o r t o r . # # D o n e W h e n - A P C i s c o m p l e t e a n d n o n - p l a c e h o l d e r . - T a r g e t c h a n g e s a r e i m p l e m e n t e d i n s i d e t h e d e c l a r e d b o u n d a r y . - M a r k d o w n l i n t / t e s t s r e l e v a n t t o t h i s t i c k e t p a s s o r f a i l u r e s a r e r e c o r d e d . - L i f e c y c l e c o m m a n d s c a n p e r s i s t t h e t i c k e t a n d w i t h o u t m a n u a l l i n t i n t e r v e n t i o n .

## Merged Legacy Document


### 182 telemetry internal workflow even joy nucb plan

# Agent Analysis Plan

## Ticket Contract Pointer
- Linked ticket owns summary, scope, constraints, and APC.
- This legacy split reference owns the agent's problem analysis and decision trail.
- Do not copy ticket APC or summary text into this document.

## Problem Analysis
현재 telemetry에는 수동 `telemetry log` 입력값과 archive knowledge distill 자동 이벤트가 섞여 있습니다. 하지만 ticket lifecycle 자체의 내부 이벤트는 일관되게 남지 않아서, 티켓 생성부터 phase 이동, close/archive까지 걸린 시간을 telemetry summary에서 계산할 수 없습니다.

앞선 잘못된 접근은 "CLI 실행 시간"으로 범위를 넓힌 점이 문제였습니다. 이번 범위는 CLI runtime profiler가 아니라 TDW 내부 workflow event입니다. 즉, `ticket_created`, `ticket_phase_moved`, `ticket_closed`, `ticket_archived`, `knowledge_distilled` 같은 도메인 이벤트를 남기고, 그 이벤트들의 timestamp 차이로 자동 timing을 산출합니다.

## Source Observations
- [scripts/cli-telemetry-commands.mjs](../../../scripts/cli-telemetry-commands.mjs)는 수동 로그와 summary 집계를 처리하지만 내부 workflow event writer는 없습니다.
- [scripts/cli-ticket-commands.mjs](../../../scripts/cli-ticket-commands.mjs)는 archive knowledge distill 시 telemetry를 append하는 로컬 helper를 갖고 있으나, create/move/close/archive lifecycle 이벤트는 공통 형식으로 남기지 않습니다.
- [scripts/cli-args.mjs](../../../scripts/cli-args.mjs)는 RAG/knowledge 수동 로그 필드를 파싱하지만 내부 이벤트용 `source`, `kind`, `event` 입력은 아직 없습니다.
- [scripts/tests/cli-telemetry-commands.test.mjs](../../../scripts/tests/cli-telemetry-commands.test.mjs)는 TDW token summary만 검증하고, 내부 이벤트와 derived timing summary는 검증하지 않습니다.

## Cause Hypotheses
- telemetry 로그가 "작업 토큰" 중심으로 시작되어 ticket lifecycle 이벤트 스키마가 따로 없습니다.
- 자동 이벤트가 archive distill에 부분적으로만 존재해서 summary 계산의 기준선이 불완전합니다.
- timing을 직접 저장하려고 하면 clock skew나 중복 기록에 취약합니다. 이벤트 timestamp를 남기고 summary에서 파생 계산하는 편이 더 안정적입니다.

## Decision Rationale
- 내부 수집 이벤트에는 `source: "internal"`, `kind: "workflow_event"`, `event`, `occurredAt`를 둡니다.
- 기존 수동 로그는 `source: "manual"`, `kind: "work"`로 취급하되, legacy row는 summary에서 work log로 후방 호환 처리합니다.
- timing은 이벤트 레코드 자체에 억지로 저장하지 않고 summary에서 ticket별 이벤트 timestamp 차이로 계산합니다.
- CLI runtime duration은 이번 범위에서 제외합니다. 사용자 요청의 "자동 타이밍"은 TDW workflow timing으로 해석합니다.

## Execution Strategy
- `cli-telemetry-commands.mjs`에 공통 append helper와 내부 workflow event helper를 추가합니다.
- `telemetry log`가 수동 로그임을 명시하는 `source/kind/occurredAt` 필드를 기록하게 합니다.
- `summaryAction()`은 manual/work logs와 internal workflow events를 분리해 집계합니다.
- workflow timing summary는 ticket별 `ticket_created`, `ticket_phase_moved`, `ticket_closed`, `ticket_archived` timestamp를 읽어 `timeToCloseMs`, `timeToArchiveMs`, 평균값을 계산합니다.
- `cli-ticket-commands.mjs`의 create/move/close/archive 성공 지점에 내부 workflow event append를 추가합니다.
- 기존 archive knowledge distill telemetry는 새 공통 writer를 쓰되 `knowledge_distilled` 이벤트로도 분류합니다.

## Verification Design
- `node --test scripts/tests/cli-telemetry-commands.test.mjs`로 internal workflow event와 derived timing summary를 검증합니다.
- `node --test scripts/tests/cli-ticket-commands.test.mjs`로 ticket lifecycle hook이 기존 동작을 깨지 않는지 확인합니다.
- `node --test scripts/tests/cli-utils.test.mjs`로 telemetry args 후방 호환을 확인합니다.
- `npx deuk-agent-rule lint:md .deuk-agent/tickets/sub/182-telemetry-internal-workflow-even-joy-nucb.md `merged into this ticket`로 Phase 1 문서 상태를 검증합니다.

## Verification Outcome
- `npx deuk-agent-rule lint:md .deuk-agent/tickets/sub/182-telemetry-internal-workflow-even-joy-nucb.md `merged into this ticket`: passed.
- `node --test scripts/tests/cli-telemetry-commands.test.mjs scripts/tests/cli-utils.test.mjs scripts/tests/cli-ticket-commands.test.mjs`: passed.
- `node --test scripts/tests/*.test.mjs`: passed.
