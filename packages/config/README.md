# @groble/config

Groble 프로젝트의 공통 설정을 관리하는 패키지입니다.

## 📦 포함된 설정

### ✅ 현재 사용 가능

- **🎨 Tailwind CSS**: 디자인 시스템, 컬러 팔레트, 타이포그래피

### 🚧 추후 추가 예정

- **📝 ESLint**: 코드 린팅 규칙
- **💄 Prettier**: 코드 포맷팅 규칙
- **⚡ TypeScript**: 타입 설정

## 🚀 사용법

### Tailwind CSS 설정

```css
/* app/globals.css */
@import '@groble/config/tailwind';

/* 앱별 전용 스타일 추가 */
.app-specific-styles {
  /* ... */
}
```

### package.json 의존성 추가

```json
{
  "dependencies": {
    "@groble/config": "workspace:*"
  }
}
```

## 📁 패키지 구조

```
packages/config/
├── package.json
├── index.js
├── tailwind/
│   └── globals.css      # Tailwind 설정
└── README.md
```

## 🔧 확장 예정 구조

```
packages/config/
├── tailwind/
├── eslint/
│   ├── base.js
│   ├── react.js
│   └── typescript.js
├── prettier/
│   └── index.js
└── typescript/
    ├── base.json
    ├── react.json
    └── library.json
```

## ✨ 장점

- 🎯 **중앙 집중식 관리**: 모든 설정을 한 곳에서 관리
- 🔄 **일관성 보장**: 프로젝트 전체에 동일한 설정 적용
- 📦 **모듈화**: 필요한 설정만 선택적으로 사용
- ⚡ **성능 최적화**: 중복 설정 제거로 빌드 최적화
- 🛠️ **유지보수성**: 설정 변경 시 한 곳에서만 수정
