module.exports = {
  // TypeScript/JavaScript 파일 검사 (apps/web 폴더만)
  'apps/web/**/*.{ts,tsx,js,jsx}': [
    'biome check --write', // Biome으로 포맷팅 + 린트
  ],

  // JSON, YAML 파일 포맷팅만 (Markdown은 제외)
  '*.{json,yml,yaml}': ['biome format --write'],

  // 타입 체크는 변경된 파일과 연관된 모든 파일에 대해 실행 (apps/web만)
  'apps/web/**/*.{ts,tsx}': () => 'pnpm run type-check',
};
