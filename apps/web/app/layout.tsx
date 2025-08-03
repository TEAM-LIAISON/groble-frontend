// app/layout.tsx

import GtagRouteTracker from '@/components/GtagRouteTracker';

import Footer from '@/components/(improvement)/layout/footer';
import HeadTags from '@/components/layout/HeadTags';
import { createMetadata } from '@/lib/utils/metadata';
import { BASE_SITE_TITLE } from '@/lib/utils/seo';
import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { ToastProvider } from '@/shared/ui/Toast';
import { Providers } from './providers';

const pretendard = localFont({
  src: [
    {
      path: '../public/assets/fonts/PretendardVariable.woff2',
      weight: 'normal',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-pretendard',
});

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
    <html lang="ko" className={`${pretendard.variable} font-medium`}>
      <head>
        <HeadTags />
      </head>
      <body className="antialiased">
        <Providers>
          <ToastProvider />
          <GtagRouteTracker />
          <main className="min-h-[calc(100vh-64px)]">{children}</main>
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
