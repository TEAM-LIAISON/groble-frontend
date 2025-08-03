import { fetchClient } from '@/shared/api/api-fetch';
import type { ApiResponse } from '@/shared/types/api-types';
import type { ContentManageDetailResponse } from '../types/productDetailTypes';
import type {
  PageResponseContentReviewDetailResponse,
  PageResponseContentSellDetailResponse,
  ReplyModifyRequest,
  ReviewDetailResponse,
  ReviewReplyRequest,
  SellDetailResponse,
} from '../types/productDetailTypes';

/**
 * 콘텐츠 관리 상세 정보 조회 API
 */
export async function getContentManageDetail(
  contentId: string
): Promise<ApiResponse<ContentManageDetailResponse>> {
  const response = await fetchClient<ContentManageDetailResponse>(
    `/api/v1/sell/content/manage/${contentId}`,
    {
      method: 'GET',
    }
  );

  return response;
}

export const getContentSellList = async (
  contentId: string,
  page = 0,
  size = 15,
  sort = 'purchasedAt,desc'
): Promise<ApiResponse<PageResponseContentSellDetailResponse>> => {
  const params = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
    sort,
  });

  const response = await fetchClient<PageResponseContentSellDetailResponse>(
    `/api/v1/sell/content/manage/${contentId}/sell-list?${params}`,
    {
      method: 'GET',
    }
  );

  return response;
};

export const getContentReviewList = async (
  contentId: string,
  page = 0,
  size = 15,
  sort = 'createdAt,desc'
): Promise<ApiResponse<PageResponseContentReviewDetailResponse>> => {
  const params = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
    sort,
  });

  const response = await fetchClient<PageResponseContentReviewDetailResponse>(
    `/api/v1/sell/content/manage/${contentId}/review-list?${params}`,
    {
      method: 'GET',
    }
  );

  return response;
};

export const getSellDetail = async (
  contentId: string,
  purchaseId: string
): Promise<ApiResponse<SellDetailResponse>> => {
  const response = await fetchClient<SellDetailResponse>(
    `/api/v1/sell/content/manage/${contentId}/sell-detail/${purchaseId}`,
    {
      method: 'GET',
    }
  );

  return response;
};

export const getReviewDetail = async (
  contentId: string,
  reviewId: string
): Promise<ApiResponse<ReviewDetailResponse>> => {
  const response = await fetchClient<ReviewDetailResponse>(
    `/api/v1/sell/content/manage/${contentId}/review-detail/${reviewId}`,
    {
      method: 'GET',
    }
  );

  return response;
};

export const postReviewReply = async (
  reviewId: number,
  request: ReviewReplyRequest
) => {
  return fetchClient<void>(
    `/api/v1/sell/content/manage/${reviewId}/review-reply`,
    {
      method: 'POST',
      body: JSON.stringify(request),
    }
  );
};

// 리뷰 답글 수정
export const updateReviewReply = async (
  reviewId: number,
  replyId: number,
  request: ReplyModifyRequest
) => {
  return fetchClient<void>(
    `/api/v1/sell/content/manage/${reviewId}/review-reply/${replyId}`,
    {
      method: 'POST',
      body: JSON.stringify(request),
    }
  );
};

// 리뷰 답글 삭제
export const deleteReviewReply = async (reviewId: number, replyId: number) => {
  return fetchClient<void>(
    `/api/v1/sell/content/manage/${reviewId}/review-reply/${replyId}/delete`,
    {
      method: 'POST',
    }
  );
};

// 리뷰 삭제 요청
export const requestReviewDelete = async (reviewId: number) => {
  return fetchClient<void>(
    `/api/v1/sell/content/manage/${reviewId}/review-delete-request`,
    {
      method: 'POST',
    }
  );
};
