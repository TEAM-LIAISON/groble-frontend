'use client';

import Script from 'next/script';
import { useEffect } from 'react';
import Clarity from '@microsoft/clarity';

export default function HeadTags() {
  // Microsoft Clarity 초기화
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_CLARITY_ID) {
      Clarity.init(process.env.NEXT_PUBLIC_CLARITY_ID);
    }
  }, []);

  return (
    <>
      {/* 네이버 검증은 metadata.verification 에 없으므로 직접 삽입 */}
      <meta
        name="naver-site-verification"
        content={process.env.NEXT_PUBLIC_NAVER_VERIFICATION}
      />

      {/* CSS Anchor Positioning Polyfill */}
      <Script id="css-anchor-polyfill" strategy="afterInteractive">
        {`
          if (!("anchorName" in document.documentElement.style)) {
            import("https://unpkg.com/@oddbird/css-anchor-positioning");
          }
        `}
      </Script>

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
    </>
  );
}
