module.exports = {
  // TypeScript/JavaScript 파일 검사
  '*.{ts,tsx,js,jsx}': [
    'biome check --write', // Biome으로 포맷팅 + 린트
    'git add',
  ],

  // JSON, YAML, Markdown 파일 포맷팅
  '*.{json,yml,yaml,md}': ['biome format --write', 'git add'],

  // 타입 체크는 변경된 파일과 연관된 모든 파일에 대해 실행
  '*.{ts,tsx}': () => 'pnpm run type-check',
};
