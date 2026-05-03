---
summary: 티켓 발행 이후 INDEX.json 검사 결과를 증명 가능한 리포트로 정리하는 계획
status: draft
priority: medium
tags:
  - index
  - inspection
  - proof
  - report
---

# Index Data Inspection Proof Plan

## 문제 분석

티켓 발행 후 인덱스 데이터가 실제로 어떻게 보이는지 증명하려면, 단순히 "인덱스가 있다"가 아니라 현재 인덱스 상태와 개별 티켓 등록 여부를 같이 보여줘야 한다. 이 작업은 생성 직후 티켓이 `INDEX.json`에 등록되었는지, 전체 인덱스가 깨진 참조 없이 유지되는지, 그리고 검사 결과를 나중에 다시 확인할 수 있는 문서로 남기는 것을 목표로 한다.

이번 작업은 코드 수정이 아니라 증명 문서 정리다. 따라서 실제 산출물은 `INDEX.json` 검사 결과, 현재 티켓의 인덱스 존재 여부, 그리고 그 결과를 읽을 수 있는 report 문서다.

## 근거 관찰

실제 읽기 결과로 `.deuk-agent/tickets/INDEX.json`은 총 125개 엔트리를 포함했고, 상태 분포는 `open 3`, `archived 122`였다. 같은 검사에서 missing reference는 0개였고, 새로 발행한 `174-index-data-inspection-proof-joy-nucb` 엔트리도 `status: open`으로 확인되었다.

이 수치는 "인덱스에 등록되었는가"와 "등록된 인덱스가 살아있는가"를 분리해서 보여준다. 즉, 티켓 발행 직후의 인덱스 데이터는 현재 최소한 깨진 링크 없이 새 티켓을 포함하고 있다.

## 판단 기준

- `INDEX.json` 총 엔트리 수가 수치로 확인되어야 한다.
- open/archived 상태 분포가 확인되어야 한다.
- missing reference가 0인지 확인해야 한다.
- 현재 티켓이 INDEX에 실제 등록되었는지 확인해야 한다.

이 네 가지가 충족되면 "티켓 발행 후 인덱스 데이터 검사 결과"를 증명했다고 볼 수 있다.

## 실행 전략

1. `INDEX.json`을 읽어 총 엔트리 수와 상태 분포를 집계한다.
2. 파일 참조가 실제로 존재하는지 검사한다.
3. 현재 티켓 `174-index-data-inspection-proof-joy-nucb`의 등록 여부를 확인한다.
4. 같은 결과를 planLink와 report에 중복 없이 분리해서 기록한다.

## 검증 설계

문서 lint로 구조를 확인하고, 인덱스 수치는 `node -e` 읽기 전용 검사 결과로 증명한다. 추가 코드 변경은 없다.

## 완료 기준

- report에 인덱스 검사 수치가 들어간다.
- planLink가 검사 기준과 해석을 설명한다.
- 티켓에 검증 근거가 남는다.
