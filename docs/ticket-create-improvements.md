# 티켓 생성 및 워크플로 개선 제안

요약
- 티켓 생성 흐름에서 placeholder(빈 본문/계획)으로 넘어가는 실수를 줄이기 위한 개선안 모음.

제안 항목

1) CLI 개선
- `ticket create`에 `--require-filled` 플래그 추가: 플래그 사용 시 본문/APC/planLink가 없으면 생성 실패.
- `planLink`는 파일 존재뿐 아니라 실제 분석 내용까지 검사해 placeholder 초안이 완료 상태로 보이지 않게 한다.
- `--from-plan`을 점진적으로 기본값으로 전환(레거시 호환성 고려) 또는 별도 `--strict` 모드 제공.

2) 룰 개선 (프로젝트 루트)
- 모든 프로젝트 루트의 `AGENTS.md` 또는 `PROJECT_RULE.md`에 다음 짧은 문구를 중복 명시:
  - "ticket create 직후 placeholder 상태는 미완료(작업 착수 전 본문/계획을 채울 것)"

3) 템플릿 개선
- placeholder만 남기는 기존 템플릿 대신, `--summary` 입력 값을 기반으로 최소 APC(작업요약, 목표, 예상 산출물)를 자동 생성하도록 템플릿 엔진 확장.
- 자동생성 결과는 편집 가능한 초안으로 티켓 본문에 삽입.

4) 워크플로 가드 개선
- `ticket create` 직후 `planLink` 파일이 없으면 단순 경고가 아니라 실패로 처리하거나,
  최소한 `ticket status`에서 `phase1_incomplete` 같은 명확한 상태를 보이도록 연동.

운영 제안 (절차)
- 티켓 생성 요청을 받으면 한 묶음으로 처리: 생성 + APC 본문 작성(자동/수정) + `planLink` 작성 및 커밋.
- 기존 느슨한 생성(placeholder 허용)과 엄격한 승급(phase 전환) 사이의 중간 단계로 `filled` 상태를 도입.

다음 작업 제안
- (단계 1) 이 RFC를 리뷰, 합의
- (단계 2) CLI 코드에서 `--require-filled`/`--from-plan` 옵션 설계 및 구현
- (단계 3) 프로젝트 루트 문서(`AGENTS.md`/`PROJECT_RULE.md`) 업데이트
- (단계 4) 템플릿 자동채우기 구현 및 테스트
- (단계 5) 워크플로 가드(생성 실패 또는 상태 마킹) 구현 및 테스트

참고: 구현 시 backward-compat을 위해 점진적 전환과 명확한 플래그(옵트인/옵트아웃)를 권장합니다.
