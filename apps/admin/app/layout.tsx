import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Groble Admin',
  description: 'Groble 관리자 사이트',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
