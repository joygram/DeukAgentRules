 - - - c r e a t e d A t : 2 0 2 6 - 0 4 - 2 5 1 1 : 3 6 : 1 7 i d : 0 7 9 - m c p - s s e - s t a b i l i t y - p o s t m o r t e m - j o y - n u c b p r i o r i t y : P 2 s t a t u s : o p e n s u m m a r y : " T a r g e t : [ F i l l i n t h e t a r g e t m o d u l e / s u b m o d u l e p a t h ] - C o n t e x t F i l e s : [ L i s t a r c h i t e c t u r e d o c s o r k e y f i l e s t o r e a d f i r s t ] - T a r g e t S u b m o d u l e : [ 예 : D e u k U I | D e u k P a c k | D e u k N a v i g a t i o n ] " t a g s : r a g , m c p , t i c k e t s , a r c h i t e c t u r e , p e r f o r m a n c e t i t l e : M C P - S S E - S t a b i l i t y - P o s t M o r t e m - - - # [ 실 행 ] 작 업 : M C P - S S E - S t a b i l i t y - P o s t M o r t e m | I D : 0 7 9 - m c p - s s e - s t a b i l i t y - p o s t m o r t e m - j o y - n u c b > * * [ C A U T I O N F O R A I A G E N T S ] * * > 1 . R e s t r i c t a l l a n a l y s i s , f i l e c r e a t i o n , a n d m o d i f i c a t i o n s t o t h e d e c l a r e d * * T a r g e t M o d u l e * * b e l o w . > 2 . R e a d t h e f i l e s l i s t e d i n * * C o n t e x t F i l e s * * b e f o r e d o i n g A N Y c o d e g e n e r a t i o n . > 3 . D O N O T l e a k c o n f i g u r a t i o n , l o g i c , o r d e p e n d e n c i e s f r o m o t h e r m o d u l e s . # # T a r g e t M o d u l e - * * T a r g e t : * * [ F i l l i n t h e t a r g e t m o d u l e / s u b m o d u l e p a t h ] - * * C o n t e x t F i l e s : * * [ L i s t a r c h i t e c t u r e d o c s o r k e y f i l e s t o r e a d f i r s t ] > * * [ 에 이 전 트 주 의 ] * * > 이 작 업 은 잠 긴 멀 티 모 듈 모 노 레 포 안 에 서 진 행 돼 요 . > 1 . 아 래 의 * * [ T a r g e t S u b m o d u l e ] * * 밖 으 로 분 석 , 파 일 생 성 , 수 정 범 위 를 넓 히 지 마 세 요 . > 2 . 코 드 생 성 전 에 * * [ C o n t e x t F i l e s ] * * 를 먼 저 읽 으 세 요 . > 3 . 다 른 서 브 모 듈 의 설 정 , 로 직 , 의 존 성 을 섞 어 쓰 지 마 세 요 . # # � � 범 위 - * * T a r g e t S u b m o d u l e : * * [ 예 : D e u k U I | D e u k P a c k | D e u k N a v i g a t i o n ] - * * C o n t e x t F i l e s : * * - [ 예 : D e u k A g e n t R u l e s / t e m p l a t e s / M O D U L E _ R U L E _ T E M P L A T E . m d ] - [ 예 : p a t h / t o / y o u r / s p e c i f i c / r u l e s . m d ] # # � � 수 정 파 일 - p a t h / f r o m / r o o t / t o / t a r g e t 1 : [ 무 엇 을 수 정 하 는 지 구 체 적 으 로 적 으 세 요 . ] # # � � ️ 설 계 결 정 사 항 - [ 필 요 한 핵 심 결 정 을 간 단 히 적 으 세 요 ] # # � � 엄 격 제 약 - [ 예 : N o h o t p a t h L I N Q , A s y n c S a f e t y , N o R a w P o i n t e r s ] # # � � 단 계 별 실 행 > A g e n t : P h a s e 3 전 에 P h a s e 1 이 완 전 히 검 증 되 기 전 까 지 는 진 행 하 지 마 세 요 . 0 . [ P h a s e 0 > R A G 조 사 ( M C P ) ] - [ ] m c p _ d e u k c o n t e x t _ s e a r c h _ r u l e s 기 반 규 약 검 토 완 료 - [ ] m c p _ d e u k c o n t e x t _ s e a r c h _ t i c k e t s 과 거 유 사 티 켓 이 력 열 람 완 료 - [ ] ( 필 수 작 성 ) 검 색 된 핵 심 컨 텍 스 트 요 약 : - [ ] ( R A G M i s s 시 필 수 작 성 ) 로 컬 검 색 결 과 m c p _ d e u k c o n t e x t _ a d d _ k n o w l e d g e 도 구 로 즉 시 주 입 완 료 여 부 및 주 입 된 파 일 목 록 : 0 . 5 [ P h a s e 0 . 5 > 심 층 분 석 ( 선 택 ) ] - [ ] 복 잡 한 아 키 텍 처 변 경 시 별 도 분 석 아 티 팩 트 작 성 및 승 인 완 료 1 . [ P h a s e 1 > 준 비 / 파 싱 ] 2 . [ P h a s e 2 > 핵 심 로 직 변 경 ] - [ ] ( C O N T I N U O U S R A G ) 새 로 운 함 수 / 클 래 스 수 정 전 m c p _ d e u k c o n t e x t _ s e a r c h _ c o d e 및 s e a r c h _ r u l e s 로 관 련 패 턴 수 시 검 색 3 . [ P h a s e 3 > 정 리 / 검 증 ] - [ ] ( V E R I F Y R A G ) 디 버 깅 및 에 러 발 생 시 로 그 덤 프 전 m c p _ d e u k c o n t e x t _ s e a r c h _ t i c k e t s 로 과 거 해 결 책 우 선 탐 색 - [ ] * * P o t e n t i a l I s s u e T a b l e * * : | 이 슈 | 심 각 도 | 설 명 | 조 치 계 획 | | - - - | - - - | - - - | - - - | | | | | | 4 . [ P h a s e 4 > 후 속 연 결 ( 이 슈 가 있 으 면 필 수 ) ] - [ ] 위 표 에 서 즉 시 해 결 불 가 능 한 항 목 에 대 해 별 도 티 켓 발 행 완 료 > C L I C o m m a n d E x a m p l e : d e u k - a g e n t - r u l e t i c k e t c r e a t e - - t o p i c 0 4 8 - F 1 - f i x - i s s u e - - c h a i n - - g r o u p < g r o u p > - [ ] ( 필 수 작 성 ) 발 행 된 후 속 티 켓 번 호 리 스 트 : # # ✅ 검 증 / Q A - [ ] * * D e e p A n a l y s i s V e r i f i c a t i o n * * : P h a s e 0 . 5 에 서 도 출 된 핵 심 설 계 및 구 조 적 결 정 사 항 이 코 드 에 모 두 올 바 르 게 반 영 되 었 는 지 확 인 . - [ ] * * P o t e n t i a l I s s u e s C h e c k * * : [ s i d e e f f e c t , e d g e c a s e , p e r f o r m a n c e i m p a c t 를 적 으 세 요 ] - [ ] * * S t r i c t C o n s t r a i n t s A u d i t * * : [ N o h o t p a t h L I N Q , A s y n c S a f e t y , N o R a w P o i n t e r s 등 ] - [ ] n p m r u n t e s t 또 는 관 련 검 증 명 령 실 행 결 과 확 인 # # A g e n t P e r m i s s i o n C o n t r a c t ( A P C ) # # # [ B O U N D A R Y ] - E d i t a b l e m o d u l e s : t h i s t i c k e t t a r g e t m o d u l e s # # # [ C O N T R A C T ] - I n p u t : t a s k c o n t e x t i n t h i s t i c k e t . - O u t p u t : s c o p e d i m p l e m e n t a t i o n a n d v a l i d a t i o n . - S i d e e f f e c t s : u p d a t e s o n l y i n t a r g e t m o d u l e ( s ) . # # # [ P A T C H P L A N ] - I m p l e m e n t c h a n g e s i n t a r g e t m o d u l e s o n l y . - U p d a t e v e r i f i c a t i o n e v i d e n c e i n t h i s t i c k e t . # # C o m p a c t P l a n - * * P r o b l e m : * * f r o m l e g a c y p l a n - * * A p p r o a c h : * * [ F i l l d u r i n g e x e c u t i o n ] - * * V e r i f i c a t i o n : * * [ A d d r e l e v a n t c h e c k s ] - * * L i n k e d I s s u e s : * * [ U s e t i c k e t - l e v e l l i n k s o n l y ]

## Merged Legacy Document


### 079 mcp sse stability postmortem joy nucb plan

# 계획: MCP-SSE-Stability-PostMortem

## 요약
- **목적**: 클러드 코드의 무지성 탐색(Shoveling) 원인 분석 및 MCP-SSE 연결 안정화
- **범위**: `DeukAgentContext` 서버 프로토콜 수정 및 시스템 서비스 설정 최적화
- **비범위**: RAG 로직 자체의 성능 개선

## 현재 격차
- **현상 1**: 클러드 코드가 `streamable-http` 프로토콜 미지원으로 30초 타임아웃 발생 -> 수동 `grep/find` 삽질로 이어짐.
- **현상 2**: `uvicorn` 직접 실행 시 FastMCP 라이프사이클이 누락되어 SSE 엔드포인트가 이벤트를 방출하지 않음.
- **현상 3 (진행중)**: 표준 SSE 전환 후 클러드 코드는 복구되었으나, 안티그라비티(Antigravity) 플랫폼 클라이언트가 `POST /sse` (405 에러)를 시도하며 연결 실패.

## 설계 결정
- **프로토콜 표준화**: 비표준 `streamable-http`를 폐기하고 표준 `mcp.server.sse`를 사용.
- **서비스 구동 방식**: `python -m uvicorn` 대신 `python src/mcp/server.py`를 통해 FastMCP가 직접 ASGI 루프를 제어하도록 변경.
- **하이브리드 대응**: 안티그라비티 플랫폼의 특이한 POST 패턴 대응을 위해 필요한 경우 라우팅 보완.

## 구현 계획
1. **[DONE]** `server.py`에서 `streamable_http_path` 및 `stateless_http` 제거, `transport="sse"`로 변경.
2. **[DONE]** `cli/main.py`의 시스템 서비스 설정을 `uvicorn`에서 `python` 명령으로 수정 및 `PYTHONPATH` 환경변수 추가.
3. **[TODO]** 안티그라비티 연결 복구를 위한 서버 사이드 POST 라우팅 검증.
4. **[TODO]** `DeukAgentContext`에 `setup-ide` 명령어를 내장하여 모든 프로젝트에 MCP 설정을 자동 주입.

## 검증 계획
- `curl -v -H "Accept: text/event-stream" http://localhost:8001/sse` 실행 시 `endpoint` 이벤트 즉시 수신 확인.
- 클러드 코드 `ListTools` 정상 동작 확인.
- 안티그라비티 도구 목록 노출 확인.

## 리스크
- 특정 에이전트 클라이언트가 구형 MCP 사양(POST /sse)을 고집할 경우 호환성 문제 발생 가능.

## 수용 기준
- 클러드 코드와 안티그라비티 모두 타임아웃 없이 MCP 도구를 즉시 로드해야 함.
- 프로젝트 전체에 대해 `deuk-agent-context setup-ide` 한 줄로 설정이 완료되어야 함.

## Merged Legacy Document


### 079 mcp hybrid transport fix report

# Walkthrough: MCP Hybrid Transport & Stability Fix

## Problem Description
- Claude Code experienced 30s timeouts due to server-side hangs and protocol mismatch.
- Antigravity (Google) experienced 405 Method Not Allowed due to legacy POST-based transport expectations.
- Systemd services were failing to initialize the ASGI lifecycle correctly when using `uvicorn` directly.

## Changes Made
### 1. Hybrid MCP Transport (`src/mcp/server.py`)
- Implemented a unified Starlette app that routes:
    - `GET /sse` -> Standard SSE (Anthropic/Cursor)
    - `POST /sse` -> Streamable HTTP (Google/Legacy)
    - `POST /messages` -> Standard SSE Message Handler
- Replaced `uvicorn` with `python src/mcp/server.py` to ensure `mcp.run()` initializes the session manager and pre-warming logic.

### 2. CLI Hardening (`src/cli/main.py`)
- Updated `cmd_init` to use `python` and set `PYTHONPATH` in systemd.
- Added `setup-ide` command to mass-configure all registered projects with the correct MCP URL.

### 3. Knowledge Base
- Added `rules.d/mcp_hybrid_transport_fix.md` for real-time RAG ingestion of the solution pattern.

## Verification Results
- **Claude Code**: Verified via `curl http://localhost:8001/sse` receiving `event: endpoint`.
- **Antigravity (Legacy)**: Verified via `curl -X POST http://localhost:8001/sse` receiving 200 OK (with message payload).
- **Automation**: `setup-ide` successfully updated 7 projects across the workspace.

## Next Steps
- Monitor dashboard for token consumption parity between clients.
- Verify if any other IDEs (Windsurf, PearAI) require additional path mapping.
