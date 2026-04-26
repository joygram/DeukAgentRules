---
id: 096-reinforce-deployment-usage-guide-joy-nucb
title: "reinforce-deployment-usage-guide"
---
# reinforce-deployment-usage-guide

## Analysis & Constraints (Deep Review)
- **Root Cause & Architecture constraint**: 현재 문서는 아키텍처와 개념 설명에 집중되어 있어, 실제 프로젝트에 도입하려는 사용자가 바로 따라 할 수 있는 구체적인 실행 가이드가 부족함.
- **Risk & Edge Cases**:
    - 가이드가 너무 길어지면 오히려 가독성이 떨어짐 -> 핵심 워크플로우 위주로 요약 필요.
    - 글로벌 설치 vs 로컬 링크 방식의 혼선 방지 필요.

## Strict Rules Check
- **Tone**: Dry, concise, technical. No emojis.
- **Language**: Korean 해요체.
- **Markdown**: absolute clickable paths, language identifiers.

## Scope (In / Out)
- **In**: `README.ko.md` 보강, 새로운 실전 가이드(`docs/usage-guide.ko.md`) 작성.
- **Out**: 코드 로직 수정.

## Tasks
- [ ] `docs/usage-guide.ko.md` 신규 작성 (구체적 배포 및 사용 사례 포함).
- [ ] `README.ko.md`에 "Quick Start" 섹션 보강 및 신규 가이드 링크 추가.
- [ ] 에이전트에게 내리는 프롬프트 예시(Agent Persona Injection) 가이드 추가.
- [ ] `npm run lint:md` 실행 및 검증.

## Done When
- 실전 가이드 문서가 추가되고 `README.ko.md`에서 접근 가능함.
- 사용자가 5단계 이내로 설정을 완료할 수 있는 명확한 가이드가 제공됨.
