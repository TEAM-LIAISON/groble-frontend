# GitHub Actions & CI/CD Pipeline

이 문서는 Groble 프로젝트의 **CI/CD 파이프라인과 자동화 워크플로우**에 대한 상세한 가이드입니다.

## 📁 현재 구조

```
.github/
├── workflows/
│   ├── build-check.yml        # 🔍 빌드 및 품질 체크
│   └── deploy-check.yml       # 🛡️ 배포 전 안전 체크
├── PULL_REQUEST_TEMPLATE.md   # 📝 간단한 PR 템플릿
├── dependabot.yml            # 🤖 의존성 자동 업데이트
└── README.md                 # 📚 이 파일
```

## 🔍 Build Check (build-check.yml)

PR과 push 시 자동으로 코드 품질을 검증합니다.

### 실행 시점

- **Pull Request** → `main`, `develop` 브랜치 대상
- **Push** → `main`, `develop` 브랜치

### 검증 항목

1. **Type Check** → `pnpm run type-check`
2. **Lint Check** → `pnpm run lint`
3. **Build Test** → `pnpm run build`

### 특징

- ✅ **pnpm 8** 사용 (안정 버전)
- ✅ **--frozen-lockfile** 안전한 의존성 설치
- ✅ **명시적 에러 처리** (`continue-on-error: false`)
- ✅ **성공/실패 알림** 포함

## 🛡️ Deploy Guard (deploy-check.yml)

배포 전 마지막 안전 체크를 수행합니다.

### 실행 시점

- **main 브랜치 push** 시
- **Build Check 완료** 후 연계 실행

### 안전 장치

- 🚨 **빌드 실패 시 배포 차단**
- 🚀 **빌드 성공 시 배포 승인**
- 📋 **상세한 로그 및 알림**

### 동작 방식

```bash
Build Check 성공 → Deploy Guard 실행 → Vercel 배포
     ↓ 실패 시
   배포 자동 차단
```

## 🤖 Dependabot 설정 (dependabot.yml)

### 왜 Dependabot이 필요한가요?

#### 🔒 **보안 취약점 자동 해결**

```bash
# 수동 관리 시 놓치기 쉬운 상황들
- 패키지에 보안 취약점 발견 → 몇 주/몇 달 뒤 발견
- 중요한 패치 업데이트 → 수동으로 확인하기 어려움
- 의존성 호환성 문제 → 업데이트 미루다가 대량 충돌

# Dependabot 사용 시
- 매주 자동으로 보안 패치 적용
- 안전한 버전만 제안
- 작은 단위로 점진적 업데이트
```

#### ⚡ **개발 생산성 향상**

- **자동 PR 생성**: 수동으로 패키지 버전 확인할 필요 없음
- **호환성 테스트**: CI/CD와 연동되어 자동으로 테스트 실행
- **점진적 업데이트**: 큰 변경사항을 작은 단위로 분할

#### 💰 **비용 절약**

- **개발자 시간 절약**: 의존성 관리에 쓸 시간을 핵심 기능 개발에 집중
- **보안 사고 예방**: 취약점으로 인한 서비스 중단/해킹 방지
- **기술 부채 감소**: 지속적인 업데이트로 레거시 코드 축적 방지

### 현재 설정 내용

#### 📦 npm 패키지 업데이트

```yml
매주 월요일 오전 9시 (KST)
- 최대 5개 PR 동시 생성
- 라벨: dependencies, auto-update
- 커밋 메시지: build(scope): 업데이트 내용
```

#### 🔧 GitHub Actions 업데이트

```yml
매월 첫 번째 월요일 오전 9시 (KST)
- 최대 3개 PR 동시 생성
- 라벨: github-actions, auto-update
- 커밋 메시지: ci(scope): 업데이트 내용
```

### 실제 동작 예시

```bash
# Dependabot이 자동으로 생성하는 PR 예시
📝 PR: "build(deps): bump @types/react from 19.1.2 to 19.1.5"
🏷️ 라벨: dependencies, auto-update
✅ 자동 테스트: Build Check 워크플로우 실행
🔍 리뷰: 개발자가 확인 후 머지
```

## 📝 Pull Request Template

### 간단하고 실용적인 구조

```markdown
## 📋 요약 - 핵심 내용 한 줄

## 🔧 변경 사항 - 구체적 변경 내용

## 🔗 참조 - 관련 이슈/문서

## 📎 참고 - 스크린샷, 추가 설명

## ✅ 체크리스트 - 빌드/테스트/리뷰 확인
```

### 설계 철학

- ❌ **복잡한 항목 제거**: 개발자 피로도 최소화
- ✅ **핵심만 유지**: 실제로 중요한 정보만 포함
- 🚀 **빠른 작성**: 30초 내 작성 가능한 구조

## 🚀 전체 워크플로우

### 개발 → 배포 파이프라인

```bash
1. 개발자가 PR 생성
   ↓
2. Build Check 자동 실행
   - Type Check ✅
   - Lint Check ✅
   - Build Test ✅
   ↓
3. 리뷰 및 머지
   ↓
4. main 브랜치 push
   ↓
5. Deploy Guard 실행
   - 최종 빌드 체크 ✅
   ↓
6. Vercel 자동 배포 🚀
```

### 안전 장치

- 🛡️ **빌드 실패 시**: 자동으로 배포 차단
- 🔍 **품질 체크**: TypeScript + Lint 필수 통과
- 📋 **명확한 피드백**: 성공/실패 원인 즉시 확인

## 📊 모니터링 및 알림

### GitHub Actions 결과 확인

1. **PR 페이지**: 체크 상태 실시간 확인
2. **Actions 탭**: 상세 로그 및 실행 히스토리
3. **Commits**: 각 커밋의 빌드 상태 표시

### 알림 설정 (권장)

```bash
GitHub Settings → Notifications
- Actions: 실패 시 이메일 알림 활성화
- Pull requests: 리뷰 요청 시 알림
- Dependabot: 보안 알림 활성화
```

## 🔧 문제 해결

### Build Check 실패 시

```bash
1. Actions 탭에서 로그 확인
2. 에러 메시지 확인:
   - Type 에러 → TypeScript 수정
   - Lint 에러 → ESLint 규칙 준수
   - Build 에러 → 빌드 설정 확인
3. 수정 후 다시 push → 자동 재실행
```

### Deploy Guard 실패 시

```bash
1. 빌드 로그 확인
2. 로컬에서 `pnpm build` 테스트
3. 문제 수정 후 다시 push
```

### Dependabot PR 관리

```bash
✅ 권장: 정기적으로 확인하여 머지
⚠️ 주의: 메이저 업데이트는 신중히 검토
🔧 설정: dependabot.yml에서 주기 조정 가능
```

## ⚡ 성능 최적화

### 빌드 시간 단축

- ✅ **pnpm 캐시**: Node.js setup에서 자동 캐시
- ✅ **병렬 실행**: Type check와 Lint check 동시 실행 가능
- ✅ **frozen-lockfile**: 의존성 설치 시간 단축

### 리소스 효율성

- 🎯 **필요할 때만 실행**: 변경된 브랜치만 대상
- 📦 **최소한의 의존성**: 필수 패키지만 설치
- 🔄 **스마트 캐싱**: 반복 빌드 시간 대폭 단축

---

## 💡 추가 개선 아이디어

### 향후 고려사항

- **테스트 커버리지**: Jest 테스트 자동화
- **E2E 테스트**: Playwright 통합
- **성능 모니터링**: Lighthouse CI 추가
- **보안 스캔**: CodeQL 정적 분석

### 맞춤 설정

프로젝트 특성에 맞게 워크플로우를 조정할 수 있습니다:

- 브랜치 전략 변경
- 추가 테스트 도구 통합
- 배포 환경 분리 (staging/production)
- 알림 채널 추가 (Slack, Discord)

---

**🎯 목표**: 안전하고 효율적인 개발 환경 구축  
**💡 원칙**: 자동화로 반복 작업 제거, 품질은 자동으로 보장
