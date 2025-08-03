import { fetchServerSide } from '@/shared/api/fetch-ssr';
import type {
  MarketContentsParams,
  MarketContentsResponse,
  MarketIntroResponse,
} from '../types/marketTypes';

/**
 * 마켓 소개 정보를 조회합니다. (SSR)
 */
export async function getMarketIntro(
  marketLinkUrl: string
): Promise<MarketIntroResponse> {
  return fetchServerSide<MarketIntroResponse>(
    `/api/v1/market/intro/${marketLinkUrl}`
  );
}

/**
 * 마켓 콘텐츠 목록을 조회합니다. (SSR)
 */
export async function getMarketContents(
  params: MarketContentsParams
): Promise<MarketContentsResponse> {
  const { marketLinkUrl, page = 0, size = 24, sort = 'createdAt' } = params;

  const searchParams = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
    sort,
  });

  return fetchServerSide<MarketContentsResponse>(
    `/api/v1/market/contents/${marketLinkUrl}?${searchParams.toString()}`
  );
}
