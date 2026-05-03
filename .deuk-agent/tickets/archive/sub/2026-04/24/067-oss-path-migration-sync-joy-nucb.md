 - - - c r e a t e d A t : 2 0 2 6 - 0 4 - 2 4 2 1 : 2 6 : 3 3 i d : 0 6 7 - o s s - p a t h - m i g r a t i o n - s y n c - j o y - n u c b p r i o r i t y : P 2 s t a t u s : o p e n s u m m a r y : " T a r g e t : [ F i l l i n t h e t a r g e t m o d u l e / s u b m o d u l e p a t h ] - C o n t e x t F i l e s : [ L i s t a r c h i t e c t u r e d o c s o r k e y f i l e s t o r e a d f i r s t ] - T a r g e t S u b m o d u l e : D e u k P a c k , D e u k A g e n t R u l e s ( O S S m i r r o r 경 로 정 합 성 ) " t a g s : r a g , m c p , t i c k e t s , a r c h i t e c t u r e , m i g r a t i o n t i t l e : o s s - p a t h - m i g r a t i o n - s y n c - - - # [ 실 행 ] 작 업 : o s s - p a t h - m i g r a t i o n - s y n c | I D : 0 6 7 - o s s - p a t h - m i g r a t i o n - s y n c - j o y - n u c b > * * [ C A U T I O N F O R A I A G E N T S ] * * > 1 . R e s t r i c t a l l a n a l y s i s , f i l e c r e a t i o n , a n d m o d i f i c a t i o n s t o t h e d e c l a r e d * * T a r g e t M o d u l e * * b e l o w . > 2 . R e a d t h e f i l e s l i s t e d i n * * C o n t e x t F i l e s * * b e f o r e d o i n g A N Y c o d e g e n e r a t i o n . > 3 . D O N O T l e a k c o n f i g u r a t i o n , l o g i c , o r d e p e n d e n c i e s f r o m o t h e r m o d u l e s . # # T a r g e t M o d u l e - * * T a r g e t : * * [ F i l l i n t h e t a r g e t m o d u l e / s u b m o d u l e p a t h ] - * * C o n t e x t F i l e s : * * [ L i s t a r c h i t e c t u r e d o c s o r k e y f i l e s t o r e a d f i r s t ] > * * [ 에 이 전 트 주 의 ] * * > 이 작 업 은 잠 긴 멀 티 모 듈 모 노 레 포 안 에 서 진 행 돼 요 . > 1 . 아 래 의 * * [ T a r g e t S u b m o d u l e ] * * 밖 으 로 분 석 , 파 일 생 성 , 수 정 범 위 를 넓 히 지 마 세 요 . > 2 . 코 드 생 성 전 에 * * [ C o n t e x t F i l e s ] * * 를 먼 저 읽 으 세 요 . > 3 . 다 른 서 브 모 듈 의 설 정 , 로 직 , 의 존 성 을 섞 어 쓰 지 마 세 요 . # # � � 범 위 - * * T a r g e t S u b m o d u l e : * * D e u k P a c k , D e u k A g e n t R u l e s ( O S S m i r r o r 경 로 정 합 성 ) - * * C o n t e x t F i l e s : * * - D e u k P a c k / s c r i p t s / m i r r o r - t o - o s s . j s - D e u k P a c k / s c r i p t s / m i r r o r - t o - o s s . s h - D e u k A g e n t R u l e s / s c r i p t s / s y n c - o s s . m j s - D e u k A g e n t R u l e s / O S S _ S Y N C . i n t e r n a l . m d # # � � 수 정 파 일 - D e u k P a c k / p a c k a g e . j s o n : s y n c : o s s , s y n c : o s s : a p p l y 명 령 을 표 준 화 하 고 기 존 m i r r o r : o s s * 는 호 환 별 칭 으 로 유 지 - D e u k P a c k / s c r i p t s / m i r r o r - t o - o s s . j s : 공 개 미 러 에 서 s y n c : o s s * , m i r r o r : o s s * 내 부 스 크 립 트 제 거 정 합 성 반 영 - D e u k A g e n t R u l e s / . d e u k - a g e n t / t i c k e t s / s u b / 0 6 7 - o s s - p a t h - m i g r a t i o n - s y n c - j o y - n u c b . m d : 이 동 단 계 제 거 및 실 행 기 준 갱 신 # # � � ️ 설 계 결 정 사 항 - * * D e u k A g e n t R u l e s * * : s y n c - o s s . m j s 가 이 미 w o r k s p a c e / O S S / D e u k A g e n t R u l e s O S S 를 타 겟 으 로 설 정 완 료 → 경 로 수 정 불 필 요 , 실 행 만 검 증 - * * D e u k P a c k * * : 실 제 O S S 동 기 화 구 현 은 유 지 하 되 , 사 용 자 진 입 명 령 은 s y n c : o s s , s y n c : o s s : a p p l y 로 통 일 - 기 존 m i r r o r : o s s * 는 하 위 호 환 용 a l i a s 로 남 기 고 , 문 서 / 운 영 기 준 명 령 은 s y n c : o s s * 로 간 주 - 사 용 자 지 시 에 따 라 O S S 이 동 작 업 은 완 료 된 것 으 로 간 주 하 고 , 본 티 켓 에 서 는 경 로 이 동 절 차 를 제 외 - w o r k s p a c e / O S S / D e u k P a c k K i t s O S S 는 D e u k P a c k S t a r t e r K i t ( 별 도 프 로 젝 트 , 관 계 없 음 ) # # � � 엄 격 제 약 - 기 존 m i r r o r : o s s * 호 출 자 와 릴 리 즈 자 동 화 는 깨 지 지 않 아 야 함 - 공 개 미 러 p a c k a g e . j s o n 에 는 내 부 동 기 화 스 크 립 트 가 남 지 않 아 야 함 - 실 제 O S S 대 상 경 로 존 재 여 부 는 검 증 단 계 에 서 별 도 확 인 # # � � 단 계 별 실 행 > A g e n t : P h a s e 3 전 에 P h a s e 1 이 완 전 히 검 증 되 기 전 까 지 는 진 행 하 지 마 세 요 . 0 . [ P h a s e 0 > R A G 조 사 ( M C P ) ] - [ x ] 로 컬 파 일 직 접 확 인 으 로 현 황 파 악 완 료 ( M C P 미 사 용 ) - [ x ] 핵 심 컨 텍 스 트 : D e u k A g e n t R u l e s 는 이 미 s y n c : o s s 기 준 , D e u k P a c k 은 문 서 와 p a c k a g e . j s o n 명 령 명 이 불 일 치 0 . 5 [ P h a s e 0 . 5 > 심 층 분 석 ( 선 택 ) ] - [ ] 복 잡 한 아 키 텍 처 변 경 시 별 도 분 석 아 티 팩 트 작 성 및 승 인 완 료 1 . [ P h a s e 1 > 준 비 / 파 싱 ] - [ x ] D e u k P a c k n p m s c r i p t 명 칭 을 s y n c : o s s * 기 준 으 로 정 리 하 고 기 존 m i r r o r : o s s * 는 a l i a s 로 유 지 2 . [ P h a s e 2 > 핵 심 로 직 변 경 ] - [ ] ( C O N T I N U O U S R A G ) 새 로 운 함 수 / 클 래 스 수 정 전 m c p _ d e u k r a g _ s e a r c h _ c o d e 및 s e a r c h _ r u l e s 로 관 련 패 턴 수 시 검 색 - [ x ] n p m r u n s y n c : o s s - - - - h e l p 기 준 으 로 D e u k P a c k 표 준 명 령 노 출 검 증 완 료 - [ x ] n p m r u n s y n c : o s s d r y - r u n 기 준 으 로 D e u k P a c k O S S 동 기 화 경 로 해 석 검 증 완 료 3 . [ P h a s e 3 > 정 리 / 검 증 ] - [ ] ( V E R I F Y R A G ) 디 버 깅 및 에 러 발 생 시 로 그 덤 프 전 m c p _ d e u k r a g _ s e a r c h _ t i c k e t s 로 과 거 해 결 책 우 선 탐 색 - [ ] * * P o t e n t i a l I s s u e T a b l e * * : | 이 슈 | 심 각 도 | 설 명 | 조 치 계 획 | | - - - | - - - | - - - | - - - | | O S S a p p l y 대 상 경 로 준 비 필 요 | 중 간 | d r y - r u n 은 성 공 했 지 만 s y n c : o s s : a p p l y 전 실 제 미 러 c l o n e 위 치 는 별 도 보 장 필 요 | a p p l y 직 전 w o r k s p a c e / O S S / D e u k P a c k O S S 준 비 여 부 확 인 | 4 . [ P h a s e 4 > 후 속 연 결 ( 이 슈 가 있 으 면 필 수 ) ] - [ ] 위 표 에 서 즉 시 해 결 불 가 능 한 항 목 에 대 해 별 도 티 켓 발 행 완 료 > C L I C o m m a n d E x a m p l e : d e u k - a g e n t - r u l e t i c k e t c r e a t e - - t o p i c 0 4 8 - F 1 - f i x - i s s u e - - c h a i n - - g r o u p < g r o u p > - [ ] ( 필 수 작 성 ) 발 행 된 후 속 티 켓 번 호 리 스 트 : # # ✅ 검 증 / Q A - [ ] * * D e e p A n a l y s i s V e r i f i c a t i o n * * : P h a s e 0 . 5 에 서 도 출 된 핵 심 설 계 및 구 조 적 결 정 사 항 이 코 드 에 모 두 올 바 르 게 반 영 되 었 는 지 확 인 . - [ ] * * P o t e n t i a l I s s u e s C h e c k * * : [ s i d e e f f e c t , e d g e c a s e , p e r f o r m a n c e i m p a c t 를 적 으 세 요 ] - [ ] * * S t r i c t C o n s t r a i n t s A u d i t * * : [ N o h o t p a t h L I N Q , A s y n c S a f e t y , N o R a w P o i n t e r s 등 ] - [ x ] n p m r u n s y n c : o s s - - - - h e l p 결 과 확 인 - [ x ] n p m r u n s y n c : o s s d r y - r u n 결 과 확 인 ( / h o m e / j o y / w o r k s p a c e / O S S / D e u k P a c k O S S 대 상 으 로 목 록 출 력 성 공 ) # # A g e n t P e r m i s s i o n C o n t r a c t ( A P C ) # # # [ B O U N D A R Y ] - E d i t a b l e m o d u l e s : t h i s t i c k e t t a r g e t m o d u l e s # # # [ C O N T R A C T ] - I n p u t : t a s k c o n t e x t i n t h i s t i c k e t . - O u t p u t : s c o p e d i m p l e m e n t a t i o n a n d v a l i d a t i o n . - S i d e e f f e c t s : u p d a t e s o n l y i n t a r g e t m o d u l e ( s ) . # # # [ P A T C H P L A N ] - I m p l e m e n t c h a n g e s i n t a r g e t m o d u l e s o n l y . - U p d a t e v e r i f i c a t i o n e v i d e n c e i n t h i s t i c k e t . # # C o m p a c t P l a n - * * P r o b l e m : * * f r o m l e g a c y p l a n - * * A p p r o a c h : * * [ F i l l d u r i n g e x e c u t i o n ] - * * V e r i f i c a t i o n : * * [ A d d r e l e v a n t c h e c k s ] - * * L i n k e d I s s u e s : * * [ U s e t i c k e t - l e v e l l i n k s o n l y ]

## Merged Legacy Document


### 067 oss path migration sync joy nucb plan

# 계획: oss-path-migration-sync

## 요약
- 목적: DeukAgentRules와 DeukPack의 OSS 동기화 진입 명령을 `sync:oss` 계열로 맞추고, 티켓 계획을 현재 운영 기준에 맞게 정리한다.
- 범위: DeukPack npm scripts 정리, OSS 미러 정리 로직 보완, 티켓/플랜 문서 갱신.
- 비범위: 실제 OSS 저장소 생성, 공개 저장소 푸시, DeukPackStarterKit 관련 작업.

## 현재 격차
- DeukAgentRules는 이미 `sync:oss` 기반으로 동작한다.
- DeukPack 문서들은 `sync:oss`를 기준으로 설명하지만 실제 `package.json`은 `mirror:oss`만 제공한다.
- 계획 문서는 아직 “OSS 폴더 이동 작업”을 전제로 적혀 있어 현재 운영 의도와 맞지 않는다.

## 설계 결정
- DeukPack의 실제 구현 파일명 `mirror-to-oss.js`는 유지하고, 사용자 진입 script 명만 `sync:oss`로 표준화한다.
- 기존 `mirror:oss`, `mirror:oss:apply`는 하위 호환을 위해 alias로 유지한다.
- 공개 OSS 미러 package.json에서는 `sync:oss*`, `mirror:oss*` 모두 제거한다.

## 구현 계획
1. DeukPack `package.json`에 `sync:oss`, `sync:oss:apply`를 추가하고 기존 `mirror:oss*`를 alias로 변경한다.
2. `scripts/mirror-to-oss.js`에서 공개 미러 산출물 정리 시 `sync:oss*`도 제거하도록 맞춘다.
3. 티켓과 플랜 문서를 “이동 절차” 대신 “명령 표준화 및 경로 검증” 기준으로 갱신한다.

## 검증 계획
- `npm run sync:oss -- --help`로 DeukPack 명령 노출이 정상인지 확인한다.
- `npm run sync:oss` dry-run으로 실제 대상 경로 해석이 예상대로 동작하는지 확인한다.

## 검증 결과
- `npm run sync:oss -- --help`가 표준 진입 명령과 기본 경로 `../../OSS/DeukPackOSS`를 정상 출력했다.
- `npm run sync:oss` dry-run이 `/home/joy/workspace/OSS/DeukPackOSS` 대상으로 파일 목록을 출력했다.

## 리스크
- dry-run은 대상 경로 없이도 목록 출력이 가능하므로, 실제 준비 검증은 `sync:oss:apply` 직전에 다시 필요하다.
- 외부 자동화가 `mirror:oss*`를 직접 호출 중일 수 있어 alias 제거는 금지한다.

## 수용 기준
- DeukPack에서 `npm run sync:oss`와 `npm run sync:oss:apply`가 호출 가능하다.
- 공개 미러용 package.json에는 내부 동기화 스크립트가 남지 않는다.
- 티켓/플랜 문서가 `sync:oss` 기준으로 정리되어 있다.
