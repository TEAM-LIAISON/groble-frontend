import type { Metadata } from 'next';
import './globals.css';
import Header from '@/widgets/header/ui/Header';
import TanstackQueryProvider from '@/shared/ui/TanstackQueryProvider';

export const dynamic = 'auto';

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
      <body>
        <TanstackQueryProvider>
          <Header />
          {children}
        </TanstackQueryProvider>
      </body>
    </html>
  );
}
