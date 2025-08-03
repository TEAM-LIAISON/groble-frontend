module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    // 제목 최대 길이 100자
    "header-max-length": [2, "always", 100],

    // 타입 규칙 - 한국어 환경을 고려한 추가 타입
    "type-enum": [
      2,
      "always",
      [
        "feat", // 새로운 기능
        "fix", // 버그 수정
        "docs", // 문서 변경
        "style", // 코드 스타일 변경 (포맷팅, 세미콜론 등)
        "refactor", // 리팩토링
        "perf", // 성능 개선
        "test", // 테스트 추가/수정
        "build", // 빌드 시스템 변경
        "ci", // CI 설정 변경
        "chore", // 기타 변경 (패키지 매니저, 설정 등)
        "revert", // 이전 커밋 되돌리기
        "hotfix", // 긴급 수정
        "wip", // 작업 중 (Work In Progress)
      ],
    ],

    // 제목 첫 글자 소문자
    "subject-case": [2, "never", ["start-case", "pascal-case", "upper-case"]],

    // 제목 끝에 마침표 금지
    "subject-full-stop": [2, "never", "."],

    // 본문은 선택사항
    "body-leading-blank": [1, "always"],

    // footer는 선택사항
    "footer-leading-blank": [1, "always"],
  },
};
