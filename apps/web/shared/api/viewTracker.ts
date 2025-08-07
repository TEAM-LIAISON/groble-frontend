import { fetchClient } from './api-fetch';
import { ApiResponse } from '@/shared/types/api-types';

/**
 * 콘텐츠 조회수 증가 API
 * 1시간 이내 중복 조회 방지
 */
export async function trackContentView(
  contentId: string
): Promise<ApiResponse<null>> {
  try {
    const response = await fetchClient<null>(
      `/api/v1/content/view/${contentId}`,
      {
        method: 'POST',
      }
    );
    return response;
  } catch (error) {
    console.error(`콘텐츠 조회수 추적 실패 (ID: ${contentId}):`, error);
    return {
      message: '콘텐츠 조회수 추적에 실패했습니다.',
      data: null,
      status: 'error',
      code: 500,
      timestamp: new Date().toISOString(),
    };
  }
}

/**
 * 마켓 조회수 증가 API
 * 1시간 이내 중복 조회 방지
 */
export async function trackMarketView(
  marketLinkUrl: string
): Promise<ApiResponse<null>> {
  try {
    const response = await fetchClient<null>(
      `/api/v1/market/view/${marketLinkUrl}`,
      {
        method: 'POST',
      }
    );
    return response;
  } catch (error) {
    console.error(`마켓 조회수 추적 실패 (URL: ${marketLinkUrl}):`, error);
    return {
      message: '마켓 조회수 추적에 실패했습니다.',
      data: null,
      status: 'error',
      code: 500,
      timestamp: new Date().toISOString(),
    };
  }
}
