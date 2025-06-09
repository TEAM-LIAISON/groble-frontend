# Groble Client Monorepo

이 프로젝트는 pnpm과 Turbo를 사용하는 모노레포입니다.

## 구조

```
groble-client/
├── apps/
│   ├── web/          # 메인 웹사이트 (Next.js)
│   └── admin/        # 관리자 사이트 (Next.js)
├── packages/         # 공통 패키지들
├── package.json      # 루트 package.json
├── pnpm-workspace.yaml
└── turbo.json
```

## 시작하기

### 설치

```bash
pnpm install
```

### 개발 서버 실행

```bash
# 모든 앱 실행
pnpm dev

# 특정 앱만 실행
pnpm --filter @groble/web dev
pnpm --filter @groble/admin dev
```

### 빌드

```bash
# 모든 앱 빌드
pnpm build

# 특정 앱만 빌드
pnpm --filter @groble/web build
pnpm --filter @groble/admin build
```

### 린트

```bash
pnpm lint
```

### 타입 체크

```bash
pnpm type-check
```

## 포트 정보

- Web: http://localhost:3000
- Admin: http://localhost:3001

## 기술 스택

- **Package Manager**: pnpm
- **Build System**: Turbo
- **Framework**: Next.js 15
- **Language**: TypeScript
- **UI**: React 19 