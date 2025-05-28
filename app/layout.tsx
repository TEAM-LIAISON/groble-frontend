// app/layout.tsx

import GtagRouteTracker from "@/components/GtagRouteTracker";

import { createMetadata } from "@/lib/utils/metadata";
import { BASE_SITE_TITLE } from "@/lib/utils/seo";
import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import { Toaster } from "sonner";
import "./globals.css";
import { Providers } from "./providers";
import WebHeader from "@/components/(improvement)/layout/header";
import Footer from "@/components/(improvement)/layout/footer";

const pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2",
  display: "swap",
  variable: "--font-pretendard",
});

export const metadata: Metadata = createMetadata({
  title: BASE_SITE_TITLE,
  path: "/",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={pretendard.variable}>
      <head>
        {/* 네이버 검증은 metadata.verification 에 없으므로 직접 삽입 */}
        <meta
          name="naver-site-verification"
          content={process.env.NEXT_PUBLIC_NAVER_VERIFICATION}
        />

        {/* CSS Anchor Positioning Polyfill */}
        <Script>{`
          if (!("anchorName" in document.documentElement.style)) {
            import("https://unpkg.com/@oddbird/css-anchor-positioning");
          }
        `}</Script>

        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config','${process.env.NEXT_PUBLIC_GA_ID}', {
                page_path: window.location.pathname
              });
            `}
        </Script>

        {/* Hotjar */}
        <Script id="hotjar" strategy="afterInteractive">
          {`
              (function(h,o,t,j,a,r){
                h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                h._hjSettings={hjid:${process.env.NEXT_PUBLIC_HOTJAR_ID},hjsv:6};
                a=o.getElementsByTagName('head')[0];
                r=o.createElement('script');r.async=1;
                r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                a.appendChild(r);
              })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
            `}
        </Script>
      </head>
      <body className="bg-[#FCFCFD] antialiased">
        <Providers>
          <WebHeader />
          <Toaster />
          <GtagRouteTracker />

          <main className="min-h-[calc(100vh-64px)]">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
};
