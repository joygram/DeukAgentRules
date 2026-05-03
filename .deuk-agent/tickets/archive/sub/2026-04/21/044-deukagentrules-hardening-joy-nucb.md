 - - - c r e a t e d A t : 2 0 2 6 - 0 4 - 2 1 2 3 : 5 5 : 2 1 i d : 0 0 1 - 0 4 4 - d e u k a g e n t r u l e s - h a r d e n i n g - j o y - n u c b p h a s e : 4 p r i o r i t y : P 2 s t a t u s : c l o s e d s u m m a r y : t i c k e t n e x t 가 레 거 시 루 트 티 켓 경 로 를 . d e u k - a g e n t / t i c k e t s / t i c k e t s / . . . 로 잘 못 계 산 하 는 문 제 를 수 정 한 다 . t a g s : - t i c k e t s - c l i - h a r d e n i n g - r e g r e s s i o n t i t l e : 0 4 4 - d e u k a g e n t r u l e s - h a r d e n i n g - - - # T a s k : t i c k e t n e x t 경 로 재 계 산 하 드 닝 | I D : 0 0 1 - 0 4 4 - d e u k a g e n t r u l e s - h a r d e n i n g - j o y - n u c b # # S c o p e B o u n d s - * * T a r g e t S u b m o d u l e : * * s c r i p t s / c l i - u t i l s . m j s , s c r i p t s / c l i - t i c k e t - p a r s e r . m j s , s c r i p t s / t e s t s / c l i - u t i l s . t e s t . m j s - * * C o n t e x t F i l e s : * * - c o r e - r u l e s / A G E N T S . m d - P R O J E C T _ R U L E . m d - s c r i p t s / c l i - t i c k e t - c o m m a n d s . m j s - s c r i p t s / c l i - t i c k e t - i n d e x . m j s - . d e u k - a g e n t / t i c k e t s / I N D E X . j s o n # # F i l e s t o M o d i f y - s c r i p t s / c l i - u t i l s . m j s : c o m p u t e T i c k e t P a t h ( ) 가 루 트 레 거 시 티 켓 을 하 위 t i c k e t s / 그 룹 으 로 오 인 하 지 않 도 록 경 로 계 산 을 보 강 한 다 . - s c r i p t s / c l i - t i c k e t - p a r s e r . m j s : 루 트 티 켓 파 일 을 인 덱 싱 할 때 g r o u p 과 파 일 명 정 보 를 안 정 적 으 로 보 존 한 다 . - s c r i p t s / t e s t s / c l i - u t i l s . t e s t . m j s : 루 트 티 켓 과 파 일 명 기 반 경 로 보 존 회 귀 테 스 트 를 추 가 한 다 . # # D e s i g n D e c i s i o n s - 기 존 인 덱 스 는 p a t h 스 냅 샷 을 저 장 하 지 않 고 상 태 에 서 동 적 으 로 경 로 를 재 계 산 한 다 . - 루 트 티 켓 ( . d e u k - a g e n t / t i c k e t s / * . m d ) 은 과 거 데 이 터 로 존 재 하 므 로 , 신 규 s u b / 그 룹 티 켓 과 함 께 계 속 읽 을 수 있 어 야 한 다 . - t i c k e t n e x t - - p a t h - o n l y 는 존 재 하 는 티 켓 파 일 경 로 를 출 력 해 야 하 며 , . d e u k - a g e n t / t i c k e t s / t i c k e t s / . . . 형 태 를 만 들 면 안 된 다 . # # S t r i c t C o n s t r a i n t s - I N D E X . j s o n 은 수 동 편 집 하 지 않 는 다 . - 생 성 / 배 포 산 출 물 은 직 접 수 정 하 지 않 는 다 . - b i n / d e u k - a g e n t - r u l e . j s 에 는 비 즈 니 스 로 직 을 추 가 하 지 않 는 다 . # # A g e n t P e r m i s s i o n C o n t r a c t # # # [ B O U N D A R Y ] - E d i t a b l e m o d u l e s : s c r i p t s / c l i - u t i l s . m j s , s c r i p t s / c l i - t i c k e t - p a r s e r . m j s , s c r i p t s / t e s t s / c l i - u t i l s . t e s t . m j s , 이 티 켓 문 서 와 연 결 p l a n 문 서 . - F o r b i d d e n m o d u l e s : b i n / d e u k - a g e n t - r u l e . j s , 생 성 된 c o n s u m e r s p o k e s , u n r e l a t e d D e u k P a c k / b e n c h m a r k / r e p o r t 산 출 물 . - R u l e c i t a t i o n : P R O J E C T _ R U L E . m d 의 C L I P r o x y 경 계 와 D C - C O D E G E N ; 실 제 C L I 로 직 은 s c r i p t s / 에 서 수 정 한 다 . # # # [ C O N T R A C T ] - I n p u t : t i c k e t n e x t - - p a t h - o n l y 가 존 재 하 지 않 는 . d e u k - a g e n t / t i c k e t s / t i c k e t s / 0 0 1 - 0 4 4 - . . . m d 를 출 력 한 재 현 사 례 와 현 재 티 켓 인 덱 스 / 레 거 시 루 트 티 켓 구 조 . - O u t p u t : 루 트 레 거 시 티 켓 과 그 룹 티 켓 모 두 존 재 경 로 로 재 계 산 되 는 C L I 경 로 로 직 및 회 귀 테 스 트 . - S i d e e f f e c t s : 테 스 트 실 행 , 티 켓 / 계 획 문 서 갱 신 , 필 요 시 p h a s e / s t a t u s 갱 신 . # # # [ P A T C H P L A N ] 1 . p r o c e s s T i c k e t F i l e ( ) 에 서 루 트 티 켓 파 일 을 별 도 g r o u p 값 으 로 표 현 하 고 파 일 명 기 반 경 로 복 원 에 필 요 한 정 보 를 보 존 한 다 . 2 . c o m p u t e T i c k e t P a t h ( ) 가 루 트 티 켓 과 일 반 그 룹 티 켓 을 모 두 올 바 르 게 계 산 하 도 록 수 정 한 다 . 3 . 회 귀 테 스 트 로 루 트 티 켓 경 로 와 기 존 s u b / , a r c h i v e / 경 로 를 검 증 한 다 . 4 . n o d e - - t e s t s c r i p t s / t e s t s / * . t e s t . m j s 및 n p x d e u k - a g e n t - r u l e l i n t : m d 로 검 증 한 다 . # # P h a s e d E x e c u t i o n S t e p s 0 . [ x ] P h a s e 0 : R A G / 로 컬 컨 텍 스 트 확 인 - R A G t i c k e t 검 색 으 로 관 련 / 티 켓 탐 색 안 정 화 이 력 을 확 인 했 다 . - r u l e s 검 색 은 m i s s 였 고 , 로 컬 재 현 사 실 을 R A G k n o w l e d g e 에 보 강 했 다 . 1 . [ x ] P h a s e 1 : 티 켓 / A P C / 정 상 화 2 . [ x ] P h a s e 2 : 경 로 계 산 및 인 덱 싱 로 직 수 정 - c o m p u t e T i c k e t P a t h ( ) 가 g r o u p : " t i c k e t s " 레 거 시 루 트 티 켓 을 루 트 파 일 로 계 산 하 도 록 수 정 했 다 . - p r o c e s s T i c k e t F i l e ( ) 이 실 제 파 일 명 을 f i l e N a m e 으 로 보 존 하 도 록 수 정 했 다 . 3 . [ x ] P h a s e 3 : 회 귀 테 스 트 및 l i n t 실 행 - n o d e - - t e s t s c r i p t s / t e s t s / c l i - u t i l s . t e s t . m j s : 1 6 개 테 스 트 통 과 . - n o d e - - t e s t s c r i p t s / t e s t s / * . t e s t . m j s : 2 2 개 테 스 트 통 과 . - n p x d e u k - a g e n t - r u l e t i c k e t n e x t - - p a t h - o n l y : 실 제 파 일 . d e u k - a g e n t / t i c k e t s / 0 4 4 - d e u k a g e n t r u l e s - h a r d e n i n g - j o y - n u c b . m d 출 력 확 인 . 4 . [ x ] P h a s e 4 : 결 과 기 록 및 티 켓 종 료 / 아 카 이 브 - w a l k t h r o u g h r e p o r t 를 . d e u k - a g e n t / d o c s / w a l k t h r o u g h s / 0 0 1 - 0 4 4 - d e u k a g e n t r u l e s - h a r d e n i n g - j o y - n u c b - r e p o r t . m d 에 기 록 한 다 . # # V e r i f i c a t i o n / Q A - [ x ] n o d e - - t e s t s c r i p t s / t e s t s / * . t e s t . m j s - [ x ] n p x d e u k - a g e n t - r u l e l i n t : m d - [ x ] n p x d e u k - a g e n t - r u l e t i c k e t n e x t - - p a t h - o n l y 가 존 재 하 는 파 일 을 출 력 하 는 지 확 인 # # � � A t t a c h e d R e p o r t - [ V i e w R e p o r t ] ( . . / . . / . . / d o c s / w a l k t h r o u g h s / 0 4 4 - d e u k a g e n t r u l e s - h a r d e n i n g - j o y - n u c b - r e p o r t . m d )

## Merged Legacy Document


### 001 044 deukagentrules hardening joy nucb report

# ticket next 경로 재계산 하드닝 보고서

## 변경 요약

- `computeTicketPath()`가 `group: "tickets"`인 레거시 루트 티켓을 `.deuk-agent/tickets/<topic>.md`로 계산하도록 수정했다.
- `processTicketFile()`이 실제 markdown 파일명을 `fileName`으로 보존하도록 수정했다.
- `computeTicketPath()` 회귀 테스트에 루트 레거시 티켓과 파일명 기반 경로 케이스를 추가했다.

## 검증

- `node --test scripts/tests/cli-utils.test.mjs`: 16개 통과.
- `node --test scripts/tests/*.test.mjs`: 22개 통과.
- `npx deuk-agent-rule ticket next --path-only`: `/home/joy/workspace/DeukAgentRules/.deuk-agent/tickets/044-deukagentrules-hardening-joy-nucb.md` 출력 확인.
- `npx deuk-agent-rule lint:md .deuk-agent/tickets/044-deukagentrules-hardening-joy-nucb.md `merged into this ticket`: 통과.

## 참고

- 전체 테스트 출력에 기존 shell quoting 경고 한 줄이 표시되지만 TAP 결과는 모두 pass였다.
- 작업 중 이미 존재하던 다른 티켓 파일 삭제 상태는 이번 범위가 아니어서 변경하지 않았다.

## Merged Legacy Document


### 001 044 deukagentrules hardening joy nucb plan

# ticket next 경로 재계산 하드닝 계획

## 목표

`npx deuk-agent-rule ticket next --path-only`가 항상 실제 존재하는 티켓 파일 경로를 출력하도록, 루트 레거시 티켓과 그룹 티켓의 경로 재계산 로직을 정리한다.

## 실행 단계

- [x] 현재 티켓이 placeholder 상태인지 확인하고 작업 범위를 실제 재현 이슈로 축소한다.
- [x] `scripts/cli-ticket-commands.mjs`, `scripts/cli-ticket-index.mjs`, `scripts/cli-ticket-parser.mjs`, `scripts/cli-utils.mjs`의 경로 흐름을 확인한다.
- [x] `processTicketFile()`이 파일명을 보존하도록 수정한다.
- [x] `computeTicketPath()`에 루트 티켓과 파일명 보존 케이스를 반영한다.
- [x] 회귀 테스트를 추가해 `sub/`, `archive/`, 루트 레거시 티켓 경로를 검증한다.
- [x] 전체 테스트와 markdown lint를 실행하고 결과를 티켓에 반영한다.

## 검증

- [x] `node --test scripts/tests/*.test.mjs`
- [x] `npx deuk-agent-rule lint:md`
- [x] `npx deuk-agent-rule ticket next --path-only`

## Rollback

- CLI 로직 변경은 `scripts/cli-utils.mjs`, `scripts/cli-ticket-parser.mjs`, 테스트 추가분을 되돌리면 된다.
- `INDEX.json`은 수동 편집하지 않으며, 필요 시 CLI rebuild 명령으로만 재생성한다.

## Merged Legacy Document


### 044 plan

# [Goal] Hardening DeukAgentRules: Recursive Consistency and Index Normalization

Stabilize the `DeukAgentRules` CLI and rule system by resolving data integrity issues in `INDEX.json` and ensuring full recursive initialization across all submodules.

## User Review Required

> [!IMPORTANT]
> The `init` command will now perform a deep scan and update `INDEX.json` paths. This is a non-destructive but significant metadata change.
> Submodules will now receive full `AGENTS.md` and Hub Rules deployment by default if `init` is run at the root.

## Proposed Changes

### [CLI Logic & Normalization]

#### [MODIFY] [cli-ticket-logic.mjs](file:///home/joy/workspace/i/DeukAgentRules/scripts/cli-ticket-logic.mjs)
- Implement `normalizeTicketPaths(cwd)`:
  - Reads `INDEX.json`.
  - Scans the actual file system in `.deuk-agent/tickets`.
  - Updates each entry's `path` to match reality.
  - Removes entries whose files no longer exist.
- Update `syncActiveTicketId` to call normalization if significant path changes are detected.

### [Recursive Initialization Expansion]

#### [MODIFY] [cli-init-commands.mjs](file:///home/joy/workspace/i/DeukAgentRules/scripts/cli-init-commands.mjs)
- Refactor `runInit` to move `applyAgents`, `applyRules`, and `syncTemplates` INTO the submodule loop.
- Ensure each submodule gets a standalone `AGENTS.md` and a fully populated `.deuk-agent/rules` folder.
- Add a final `writeTicketListFile(subCwd, index.entries, { render: true })` call for each submodule to ensure documentation is fresh.

### [Verification & Cleanup]

#### [MODIFY] [cli-init-logic.mjs](file:///home/joy/workspace/i/DeukAgentRules/scripts/cli-init-logic.mjs)
- Add verification step to ensure `merged ticket body` and `merged reports` are created with correct permissions.

## Verification Plan

### Automated Tests
- `node scripts/cli.mjs init --cwd tmp/test-recursive --non-interactive`
- Check if `tmp/test-recursive/submoduleA/AGENTS.md` exists and is updated.
- Check if `tmp/test-recursive/submoduleA/.deuk-agent/tickets/INDEX.json` has normalized paths.

### Manual Verification
- Run `init` in `workspace/i` and check `DeukPack` index state.
- Verify `TICKET_LIST.md` in `DeukPack` is updated.

## Merged Legacy Document


### 044 deukagentrules hardening joy nucb report

# ticket next 경로 재계산 하드닝 보고서

## 변경 요약

- `computeTicketPath()`가 `group: "tickets"`인 레거시 루트 티켓을 `.deuk-agent/tickets/<topic>.md`로 계산하도록 수정했다.
- `processTicketFile()`이 실제 markdown 파일명을 `fileName`으로 보존하도록 수정했다.
- `computeTicketPath()` 회귀 테스트에 루트 레거시 티켓과 파일명 기반 경로 케이스를 추가했다.

## 검증

- `node --test scripts/tests/cli-utils.test.mjs`: 16개 통과.
- `node --test scripts/tests/*.test.mjs`: 22개 통과.
- `npx deuk-agent-rule ticket next --path-only`: `/home/joy/workspace/DeukAgentRules/.deuk-agent/tickets/044-deukagentrules-hardening-joy-nucb.md` 출력 확인.
- `npx deuk-agent-rule lint:md .deuk-agent/tickets/044-deukagentrules-hardening-joy-nucb.md `merged into this ticket`: 통과.

## 참고

- 전체 테스트 출력에 기존 shell quoting 경고 한 줄이 표시되지만 TAP 결과는 모두 pass였다.
- 작업 중 이미 존재하던 다른 티켓 파일 삭제 상태는 이번 범위가 아니어서 변경하지 않았다.
