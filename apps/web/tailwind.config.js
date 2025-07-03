/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './features/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
    './shared/**/*.{js,ts,jsx,tsx,mdx}',
    './entities/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-pretendard)', 'Pretendard Variable', 'sans-serif'],
      },
    },
  },
  // 자주 사용되는 outline 클래스들을 safelist에 추가하여 강제 생성
  safelist: [
    'outline-line-normal',
    'outline-line-neutral',
    'outline-line-strong',
    'outline-line-alternative',
  ],
};
