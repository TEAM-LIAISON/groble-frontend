import { fetchClient } from '@/shared/api/api-fetch';
import type { ApiResponse } from '@/shared/types/api-types';
import type {
  PurchasedContentsResponse,
  PurchasedContentsParams,
  PurchaseDetailResponse,
  InquiryResponse,
  PaymentCancelRequest,
  PaymentCancelResponse,
} from '../types/purchaseTypes';

/**
 * 구매한 콘텐츠 목록을 가져오는 API
 */
export async function getPurchasedContents(
  params: PurchasedContentsParams = {}
): Promise<ApiResponse<PurchasedContentsResponse>> {
  const { page = 0, size = 9, sort = 'purchasedAt', state } = params;

  const searchParams = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
    sort,
  });

  // state가 있고 빈 문자열이 아닌 경우에만 추가
  if (state && state.trim() !== '') {
    searchParams.append('state', state);
  }

  const response = await fetchClient<PurchasedContentsResponse>(
    `/api/v1/purchase/content/my/purchased-contents?${searchParams.toString()}`,
    {
      method: 'GET',
    }
  );

  if (!response.data) {
    throw new Error('구매한 콘텐츠 목록을 불러오는데 실패했습니다.');
  }

  return response;
}

/**
 * 구매 상세 정보 조회
 */
export async function getPurchaseDetail(
  merchantUid: string
): Promise<ApiResponse<PurchaseDetailResponse>> {
  const response = await fetchClient<PurchaseDetailResponse>(
    `/api/v1/purchase/content/my/${merchantUid}`,
    {
      method: 'GET',
    }
  );

  if (!response.data) {
    throw new Error('구매 상세 정보를 불러오는데 실패했습니다.');
  }

  return response;
}

/**
 * 문의 수단 정보 조회
 */
export async function getPurchaseInquiry(
  merchantUid: string
): Promise<ApiResponse<InquiryResponse>> {
  const response = await fetchClient<InquiryResponse>(
    `/api/v1/purchase/inquiry/${merchantUid}`,
    {
      method: 'GET',
    }
  );

  if (!response.data) {
    throw new Error('문의 수단 정보를 불러오는데 실패했습니다.');
  }

  return response;
}

/**
 * 결제 취소 요청
 */
export async function requestPaymentCancel(
  merchantUid: string,
  cancelData: PaymentCancelRequest
): Promise<ApiResponse<PaymentCancelResponse>> {
  const response = await fetchClient<PaymentCancelResponse>(
    `/api/v1/payment/${merchantUid}/cancel/request`,
    {
      method: 'POST',
      body: JSON.stringify(cancelData),
    }
  );

  if (!response.data) {
    throw new Error('결제 취소 요청에 실패했습니다.');
  }

  return response;
}

/**
 * 리뷰 등록
 */
export async function createReview(
  contentId: number,
  reviewData: { rating: number; reviewContent: string }
): Promise<ApiResponse<any>> {
  const response = await fetchClient<any>(
    `/api/v1/purchase/review/${contentId}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reviewData),
    }
  );

  return response;
}

/**
 * 리뷰 수정
 */
export async function updateReview(
  contentId: number,
  reviewId: number,
  reviewData: { rating: number; reviewContent: string }
): Promise<ApiResponse<any>> {
  const response = await fetchClient<any>(
    `/api/v1/purchase/review/${contentId}/update/${reviewId}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reviewData),
    }
  );

  return response;
}

/**
 * 리뷰 삭제
 */
export async function deleteReview(
  contentId: number,
  reviewId: number
): Promise<ApiResponse<any>> {
  const response = await fetchClient<any>(
    `/api/v1/purchase/review/${contentId}/delete/${reviewId}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  return response;
}
