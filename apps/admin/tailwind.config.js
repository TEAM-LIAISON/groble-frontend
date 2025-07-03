/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Pretendard Variable',
          'ui-sans-serif',
          'system-ui',
          'sans-serif',
        ],
      },
    },
  },
  // theme/plugins 설정은 CSS-First(@theme)에 위임
  safelist: [
    // 자주 사용되는 outline 클래스들을 safelist에 추가하여 강제 생성
    'outline-line-normal',
    'outline-line-neutral',
    'outline-line-strong',
    'outline-line-alternative',
  ],
};
