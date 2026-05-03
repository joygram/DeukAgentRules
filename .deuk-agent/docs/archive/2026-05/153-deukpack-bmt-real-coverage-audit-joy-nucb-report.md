---
summary: "DeukPack BMT 테스트 근거 과장 방지를 위한 상태 모델 수정 보고서"
status: done
priority: high
tags:
  - deukpack
  - bmt
  - test-coverage
  - audit
---

# DeukPack BMT 실제 커버리지 감사 보고서

## 결론
기존 BMT Matrix는 generated roundtrip, external smoke/preflight, benchmark 측정 흔적을 한 구현 상태 안에 섞을 수 있었다.

특히 external command preflight는 언어별 명령 하나의 성공/실패를 모든 protocol/model row에 복제하므로, 실제 generated roundtrip 테스트로 볼 수 없다.

## 변경
DeukPack `scripts/bmt/preflight-matrix.js`에 evidence kind를 추가했다.

DeukPack `scripts/bmt/reporter.js`는 generated roundtrip과 external smoke/preflight를 분리 집계한다. external evidence만 있으면 `preflight_only`, benchmark 측정만 있으면 `benchmark_only`로 표시한다.

DeukPack BMT Matrix 템플릿은 `RT`와 `SK`를 나눠 표시한다.

## 검증
`node --check scripts/bmt/preflight-matrix.js && node --check scripts/bmt/reporter.js` 통과.

`git diff --check -- scripts/bmt/preflight-matrix.js scripts/bmt/reporter.js benchmarks/templates/DEUKPACK_TEST_MATRIX.md.ejs benchmarks/templates/BMT_PROTOCOL_MATRIX.md.ejs` 통과.

보고서 재생성은 생성 산출물 변경이라 실행하지 않았다.
