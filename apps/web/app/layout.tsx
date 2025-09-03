// app/layout.tsx

import GtagRouteTracker from '@/components/GtagRouteTracker';
import MaintenancePage from '@/components/maintenance/MaintenancePage';

import Footer from '@/components/(improvement)/layout/footer';
import HeadTags from '@/components/layout/HeadTags';
import { createMetadata } from '@/lib/utils/metadata';
import { BASE_SITE_TITLE } from '@/lib/utils/seo';
import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { Providers } from './providers';
import { ToastProvider } from '@/shared/ui/Toast';

const pretendard = localFont({
  src: [
    {
      path: '../public/assets/fonts/PretendardVariable.woff2',
      weight: '100 900',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-pretendard',
  fallback: ['Pretendard', 'ui-sans-serif', 'system-ui', 'sans-serif'],
});

const IS_MAINTENANCE = (process.env.NEXT_PUBLIC_MAINTENANCE ?? '1') === '1';

export const metadata: Metadata = createMetadata({
  title: BASE_SITE_TITLE,
  path: '/intro',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={`${pretendard.variable} font-pretendard font-medium`}>
      <head>
        <HeadTags />
      </head>
      <body className="antialiased">
        <Providers>
          <ToastProvider />
          <GtagRouteTracker />
          <main className="min-h-[calc(100vh-64px)]">
            {IS_MAINTENANCE ? <MaintenancePage /> : children}
          </main>
        </Providers>
      </body>
    </html>
  );
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover',
};
