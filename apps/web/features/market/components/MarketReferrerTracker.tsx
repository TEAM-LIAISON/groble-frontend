'use client';

import { useMemo } from 'react';
import { fetchClient } from '@/shared/api/api-fetch';

interface MarketReferrerTrackerProps {
  marketLinkUrl: string;
}

function getEffectiveReferrer(): string | undefined {
  try {
    if (typeof document !== 'undefined' && document.referrer) {
      return document.referrer;
    }
    if (
      typeof window !== 'undefined' &&
      window.opener &&
      'location' in window.opener
    ) {
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

export default function MarketReferrerTracker({
  marketLinkUrl,
}: MarketReferrerTrackerProps) {
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

    queueMicrotask(() => {
      fetchClient(`/api/v1/market/referrer/${marketLinkUrl}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        cache: 'no-cache',
        keepalive: true,
      }).catch(() => {
        // ignore
      });
    });
  }, [marketLinkUrl]);

  return null;
}
