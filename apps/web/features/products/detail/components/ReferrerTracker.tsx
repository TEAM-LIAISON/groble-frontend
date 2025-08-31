'use client';

import { useMemo } from 'react';
import { fetchClient } from '@/shared/api/api-fetch';

interface ReferrerTrackerProps {
  contentId: string;
}

function getEffectiveReferrer(): string | undefined {
  try {
    // 우선순위: document.referrer → opener.location.href → undefined
    if (typeof document !== 'undefined' && document.referrer) {
      return document.referrer;
    }
    if (
      typeof window !== 'undefined' &&
      window.opener &&
      'location' in window.opener
    ) {
      // 일부 브라우저 보안 정책으로 접근이 막힐 수 있음 - try/catch
      try {
        // @ts-expect-error cross-origin may throw
        const openerHref = window.opener.location?.href as string | undefined;
        if (openerHref) return openerHref;
      } catch {}
    }
  } catch {}
  return undefined;
}

function buildUtmParams(url: URL): Record<string, string | undefined> {
  const params = url.searchParams;
  const get = (k: string) => params.get(k) ?? undefined;
  return {
    utmSource: get('utm_source') ?? get('utmSource'),
    utmMedium: get('utm_medium') ?? get('utmMedium'),
    utmCampaign: get('utm_campaign') ?? get('utmCampaign'),
    utmContent: get('utm_content') ?? get('utmContent'),
    utmTerm: get('utm_term') ?? get('utmTerm'),
  };
}

export default function ReferrerTracker({ contentId }: ReferrerTrackerProps) {
  // 최초 렌더 시 1회 전송. useEffect 대신 useMemo와 queueMicrotask 활용
  useMemo(() => {
    if (typeof window === 'undefined') return;

    const pageUrl = window.location.href;
    const referrerUrl = getEffectiveReferrer();
    const url = new URL(pageUrl);
    const utm = buildUtmParams(url);

    const payload = {
      pageUrl,
      referrerUrl,
      ...utm,
    };

    // 렌더 블로킹 방지. 실패는 silent
    queueMicrotask(() => {
      fetchClient(`/api/v1/content/referrer/${contentId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        cache: 'no-cache',
        keepalive: true, // 탭 닫힘 등에도 최대한 전송 시도
      }).catch(() => {
        // ignore
      });
    });
  }, [contentId]);

  return null;
}
