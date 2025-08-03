# 🚀 Groble: 창작자 중심의 디지털 자산 마켓 플랫폼

<div align="">
  <img src="https://img.shields.io/badge/Next.js-15-000000?style=plastic&logo=next.js&logoColor=white" alt="Next.js">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=plastic&logo=react&logoColor=white" alt="React">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=plastic&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Turborepo-E63983?style=plastic&logo=turborepo&logoColor=white" alt="Turborepo">
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=plastic&logo=tailwindcss&logoColor=white" alt="Tailwind CSS">
</div>
<br>

## 📌 Introduce

**Groble**은 디지털 콘텐츠 창작자들이 기존 플랫폼에서 겪는 **고객과의 단절, 데이터 부재, 반복 수익의 한계**라는 구조적 문제를 해결하기 위해 시작된 프로젝트입니다. 단순 거래 중개를 넘어, 창작자가 자신의 고객 데이터를 직접 소유하고 관계를 형성하여 지속 가능한 비즈니스를 구축할 수 있도록 지원합니다.

<br>

## 🚀 Key Features

### 1. 상품 등록 및 관리 시스템

- **멀티스텝 폼**: 복잡한 상품 정보를 단계별로 쉽게 입력할 수 있는 UI/UX
- **리치 텍스트 에디터**: `TipTap` 기반의 에디터로 이미지, 표 등을 포함한 상세 페이지 제작
- **디지털 파일 업로드**: 판매할 콘텐츠 파일을 안전하게 업로드 및 관리
- **판매자 대시보드**: 상품 목록, 판매 현황 등 핵심 지표 관리

### 2. 판매 및 결제 시스템

- **콘텐츠 판매 페이지**: 생성된 상품의 상세 정보 및 구매 페이지 제공
- **간편 결제 연동**: `Payple` 결제 모듈을 연동하여 카카오페이, 네이버페이 등 주요 결제 수단 지원
- **즉시 다운로드**: 결제 완료 후 구매자가 즉시 콘텐츠를 다운로드할 수 있는 시스템

### 3. 고객 관계 관리 (CRM)

- **구매자 관리**: 내 상품을 구매한 고객 목록 및 정보 확인
- **고객 그룹 관리**: 특정 조건(신규 구매자, 재구매자 등)에 따라 고객을 그룹화
- **타겟 마케팅**: 특정 고객 그룹에게 할인 쿠폰 및 신규 콘텐츠 알림 발송
- **통계 및 분석 대시보드**: URL에 UTM 파라미터를 사용하여 유입 추적, 페이지 조회수 제공

<br>

## 🛠 Tech Stack

### Frontend Core

- **Framework**: Next.js 15 (App Router), React 19
- **Language**: TypeScript
- **UI Library**: TipTap (Editor)

### State Management

- **Server State**: TanStack Query (React Query)
- **Client State**: Zustand
- **Form**: React Hook Form, Zod (Schema Validation)

### Styling

- **CSS Framework**: Tailwind CSS
- **Component**: CVA (Class Variance Authority)

### Architecture & Build

- **Monorepo**: Turborepo
- **Package Manager**: pnpm
- **Deployment**: Vercel

<br>

## Architectural Design

### 📁 Folder Architecture

프로젝트는 Turborepo 기반의 모노레포와 FSD(기능 중심 설계) 패턴을 기반으로 다음과 같이 구성되어 있습니다. `apps` 내 각 애플리케이션은 기능별로 모듈화된 `features` 디렉토리와 공통 로직을 다루는 `shared`, `components` 디렉토리를 가집니다.

```bash
groble-frontend/
├── apps/
│   ├── web/              # 메인 웹 애플리케이션
│   │   ├── app/          # Next.js App Router
│   │   ├── features/     # 기능별 모듈 (FSD 패턴)
│   │   │   ├── auth/
│   │   │   ├── products/
│   │   │   └── ...
│   │   ├── shared/       # 공통 유틸리티 (API, UI, Types 등)
│   │   └── components/   # 글로벌 공통 컴포넌트
│   └── admin/            # 어드민 대시보드
├── packages/
│   ├── ui/               # 공유 디자인 시스템
│   └── config/           # 공유 설정 (ESLint, TSConfig 등)
└── turbo.json            # Turborepo 설정
```

<br>

### 📁 Dual State Management

서버 상태와 클라이언트 상태의 **책임을 명확히 분리**하여, 데이터 불일치 및 동기화 로직 등 안티패턴을 방지합니다.

- **서버 상태 (TanStack Query)**:
  - 서버 데이터의 **단일 진실 공급원(Single Source of Truth)** 역할
  - 캐시를 페이지 간 데이터 공유 허브로 활용하여 불필요한 API 호출 방지 및 즉시 로딩 경험 제공
- **클라이언트 상태 (Zustand)**:
  - UI와 직접 관련된 **휘발성 상태** 관리
  - **선택자(Selector) 기반 렌더링 최적화**로 불필요한 리렌더링 방지 및 성능 확보

<img width="700" alt="Groble 상태관리 아키텍처" src="https://github.com/user-attachments/assets/f33c2cf2-454b-475f-a90b-e16f7ee08809" />
# 테스트 코멘트
