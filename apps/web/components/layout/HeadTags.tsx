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

      <Script
        src={`https://cdn.amplitude.com/script/${process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY}.js`}
        strategy="afterInteractive"
        onLoad={() => {
          if (window.amplitude && window.sessionReplay) {
            try {
              window.amplitude.add(window.sessionReplay.plugin({ sampleRate: 1 }));
              window.amplitude.init(process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY || '5a74abd847037324bc4099e5376f6568', {
                "fetchRemoteConfig": true,
                "autocapture": {
                  "attribution": true,
                  "fileDownloads": true,
                  "formInteractions": true,
                  "pageViews": true,
                  "sessions": true,
                  "elementInteractions": true,
                  "networkTracking": true,
                  "webVitals": true,
                  "frustrationInteractions": true
                }
              });
            } catch (error) {
              console.error('Failed to initialize Amplitude:', error);
            }
          } else {
            console.warn('Amplitude or sessionReplay not available');
          }
        }}
      />
    </>
  );
}
