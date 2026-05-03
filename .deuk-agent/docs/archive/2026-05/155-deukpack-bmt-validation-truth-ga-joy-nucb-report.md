---
summary: "DeukPack BMT validation gate가 환경/third-party 거짓 양성을 실패로 처리하도록 보강한 보고서"
status: done
priority: high
tags:
  - deukpack
  - bmt
  - validation
  - truth-gate
---

# DeukPack BMT Truth Gate 보고서

## 결론
기존 BMT validation gate는 환경 미구성과 가짜 third-party 근거를 통과시킬 수 있었다.

`scripts/bmt/matrix-validator.js`에 두 개의 hard gate를 추가해 이 상태를 실패로 바꿨다.

## 변경
`Preflight Truth Gate`를 추가했다. `bmt.preflight.statuses`에 `verify_failed` 또는 `unavailable`이 있으면 gate는 실패한다.

`Third-party Truth Gate`를 추가했다. similar competitor row가 plain object 대체물이거나 dependency install proof가 없으면 third-party 비교 근거로 인정하지 않는다.

## 검증
`node --check scripts/bmt/matrix-validator.js` 통과.

`node scripts/bmt/matrix-validator.js --fix-suggestions`는 의도대로 실패했다.

실패 내용:
- C++ external preflight 10건 실패: `cmake: not found`
- Java external preflight 10건 unavailable: `mvn ENOENT`
- MessagePack similar competitor 12건 proof 부족: `schemaProof.kind: plain-object`, dependency proof 없음

## 후속
C++/Java 환경을 구성하고, MessagePack 등 third-party 비교는 실제 설치 증명과 schema/workload 동등성 증명을 추가해야 한다. 그 전까지 BMT는 green으로 간주하면 안 된다.
