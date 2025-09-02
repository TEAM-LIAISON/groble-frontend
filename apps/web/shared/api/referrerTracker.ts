import { fetchServerSide } from '@/shared/api/fetch-ssr';

export interface ContentReferrerPayload {
  pageUrl: string;
  referrerUrl?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
}

/**
 * 콘텐츠 유입경로 추적 (SSR 전용)
 * - 렌더링을 막지 않도록 호출부에서 await 없이 사용 가능
 */
export async function trackContentReferrer(
  contentId: string,
  payload: ContentReferrerPayload
): Promise<void> {
  try {
    await fetchServerSide(`/api/v1/content/referrer/${contentId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      cache: 'no-cache',
    });
  } catch (error) {
    // 서버 사이드에서 로깅만 수행하고 흐름 방해하지 않음
    console.error(`유입경로 추적 실패 (contentId: ${contentId})`, error);
  }
}
