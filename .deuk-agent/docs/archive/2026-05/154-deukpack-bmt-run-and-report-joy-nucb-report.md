---
summary: "DeukPack BMT 실행 결과와 generated roundtrip/external smoke 분리 해석 보고서"
status: done
priority: high
tags:
  - deukpack
  - bmt
  - verification
  - report
---

# DeukPack BMT 실행 결과 보고서

## 실행 결과
`npm run bench:v2-matrix`를 `/home/joy/workspace/DeukPack`에서 실행했다.

파이프라인은 완료됐고 BMT 3D Matrix Hard Validation Gate도 통과했다.

## 핵심 수치
- Validation Gate: Passed 14 / 14, Failed 0 / 14, Exceptions 0
- Generated-code matrix rows: 84
- Matrix rows by language: TypeScript 28, JavaScript 28, Python 28
- Matrix rows by subject: DeukPack 60, competitor 24
- Preflight statuses: 80
- Generated roundtrip: 30 passed
- External preflight: 30 passed, 10 verify_failed, 10 unavailable

## 언어별 해석
- TypeScript: generated roundtrip 10 passed. 우선 검토 가능.
- JavaScript: generated roundtrip 10 passed. 우선 검토 가능.
- Python: generated roundtrip 10 passed, 단 Master adoption map에서는 Python (Pure)가 benchmark_only 근거 중심이라 조건부 검토.
- C#: external smoke/preflight 10 passed. generated roundtrip은 없어서 preflight_only.
- C++: external smoke/preflight 10 verify_failed. 원인은 `cmake: not found`.
- Rust: external smoke/preflight 10 passed. generated roundtrip은 없어서 preflight_only.
- Java: external smoke/preflight 10 unavailable. 원인은 `mvn ENOENT`.
- Elixir: external smoke/preflight 10 passed. generated roundtrip은 없어서 preflight_only.

## 생성 산출물
- `/home/joy/workspace/DeukPack/benchmarks/out/bmt-latest.json`
- `/home/joy/workspace/DeukPack/benchmarks/reports/BMT_PROTOCOL_MATRIX.md`
- `/home/joy/workspace/DeukPack/benchmarks/reports/DEUKPACK_TEST_MATRIX.md`
- `/home/joy/workspace/DeukPack/benchmarks/reports/BMT_MASTER_REPORT.md`
- `/home/joy/workspace/DeukPack/benchmarks/history/bmt-2.0.0-2026-05-01T14-58-19-862Z.json`

## 주의 사항
실행 중 Python runtime auto-install 경고가 있었다. 제안 명령은 `pip install -e "/home/joy/workspace/DeukPack/core/python"`이었다. 이 경고는 pipeline 실패로 이어지지 않았다.

C++과 Java의 실패는 구현 실패라기보다 실행 환경 부족으로 분류한다. C++은 `cmake`, Java는 `mvn`이 필요하다.
