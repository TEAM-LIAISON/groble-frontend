/**
 * Groble 프로젝트 공통 설정 패키지
 *
 * 사용 가능한 설정들:
 * - Tailwind CSS: '@groble/config/tailwind'
 * - ESLint (추후 추가): '@groble/config/eslint'
 * - Prettier (추후 추가): '@groble/config/prettier'
 * - TypeScript (추후 추가): '@groble/config/typescript'
 */

module.exports = {
  tailwind: {
    globals: './tailwind/globals.css',
  },
  // 추후 확장 예정
  // eslint: require('./eslint'),
  // prettier: require('./prettier'),
  // typescript: require('./typescript'),
};
