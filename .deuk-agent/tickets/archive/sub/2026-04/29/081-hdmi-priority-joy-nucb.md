---
id: 081-hdmi-priority-joy-nucb
priority: P2
status: open
summary: 미작성 티켓 — 실질적 내용 없음. 좀비/placeholder 티켓으로 분류.
tags: tickets, architecture
title: hdmi-priority
---


# hdmi-priority

> **[CAUTION FOR AI AGENTS]**
> 1. Restrict all analysis, file creation, and modifications to the declared **Target Module** below.
> 2. Read the files listed in **Context Files** before doing ANY code generation.
> 3. DO NOT leak configuration, logic, or dependencies from other modules.

## Target Module
- **Target:** [Fill in the target module/submodule path]
- **Context Files:** [List architecture docs or key files to read first]

## Analysis & Constraints (Deep Review)
> [1. Root Cause & Architecture constraint:]
재시동 시 GDM(GNOME Display Manager)이 더미 HDMI 플러그를 기본 디스플레이로 먼저 인식하여 실제 모니터에 화면이 나오지 않는 현상 발생.
현재 사용자 세션의 `~/.config/monitors.xml`에는 DP-1이 primary로 설정되어 있으나, GDM 서비스는 자체 설정 디렉토리(`/var/lib/gdm3/.config/`)를 사용하므로 이 설정이 로그인 화면이나 부팅 단계에서 적용되지 않음.

> [2. Risk & Edge Cases (What could go wrong?):]
- GDM 설정 디렉토리 권한 문제로 복사 실패 가능성.
- `monitors.xml` 형식 불일치로 인한 GDM 크래시 (단, Ubuntu 24.04 내에서 생성된 파일을 사용하므로 위험 낮음).
- Wayland/Xorg 세션 차이에 따른 동작 차이.

## Strict Rules Check
> [Review DOMAIN_RULES.md. Explicitly list the hard rules applicable here (e.g., No LINQ, Dumb View, No Raw Pointers). Verify your plan against them.]
- 시스템 설정 변경 작업이므로 AGENTS.md의 "No Ticket, No Code" 규칙을 준수함.
- 도메인 하드 규칙(Unity/C++, WebApp)은 해당 사항 없음.

## Scope (In / Out)
- [In] `~/.config/monitors.xml`을 `/var/lib/gdm3/.config/`로 복사 및 권한 설정.
- [Out] BIOS/UEFI 레벨의 디스플레이 우선순위 변경.
- [Out] 그래픽 드라이버 재설치.

## Tasks
- [x] GDM 설정 디렉토리 존재 확인 (존재 확인됨).
- [ ] `monitors.xml` 복사 (사용자 권한 필요).
- [ ] 파일 소유권 변경 (사용자 권한 필요).
- [ ] GDM 서비스 재시작 또는 재부팅 안내.

## Done When
- [ ] `/var/lib/gdm3/.config/monitors.xml` 파일이 존재하고 소유자가 `gdm`임.
- [ ] 재시동 후 더미 HDMI보다 실제 모니터(DP-1)가 우선적으로 활성화됨을 사용자가 확인.
