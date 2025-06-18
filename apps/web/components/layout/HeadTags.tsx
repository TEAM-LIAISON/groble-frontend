'use client';

import Script from 'next/script';

export default function HeadTags() {
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

      <Script id="clarity" strategy="afterInteractive">
        {`
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y = l.getElementsByTagName(r)[0];
          y.parentNode.insertBefore(t, y);
        })(window, document, 'clarity', 'script', 's0scshi2dm');
      `}
      </Script>
    </>
  );
}
