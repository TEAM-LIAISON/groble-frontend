import { apiClient } from '@/shared/api/client';
import type { ApiResponse } from '@/shared/api/type';
import type { Paginated } from '@/shared/types/PaginationTypes';
import type { Content } from './ContentType';

/**
 * 콘텐츠 목록 조회
 *
 * @param page 1-based 페이지 번호
 * @param size 페이지당 항목 수
 * @param sort 정렬 기준 ("property,direction" 형식, 예: "createdAt,desc")
 * @returns Paginated<Content>
 */
export async function fetchContents(
  page: number,
  size: number,
  sort: string
): Promise<Paginated<Content>> {
  // Spring Boot API는 0-based 페이지 인덱스를 사용합니다.
  const zeroBasedPage = page - 1;

  const query = new URLSearchParams({
    page: String(zeroBasedPage),
    size: String(size),
    sort,
  });

  // baseURL은 shared/api/client.ts에서 설정됨
  const response = await apiClient<Paginated<Content>>(
    `/api/v1/admin/contents?${query.toString()}`,
    {
      cache: 'no-store',
    }
  );

  if (response.code !== 200) {
    throw new Error(
      response.message || '콘텐츠 목록을 가져오는 데 실패했습니다.'
    );
  }

  return response.data;
}

/**
 * 콘텐츠 심사 요청 타입
 */
export interface ContentExamineRequest {
  action: 'APPROVE' | 'REJECT';
  rejectReason?: string;
}

/**
 * 콘텐츠 심사 처리
 *
 * @param contentId 콘텐츠 ID
 * @param request 심사 요청 데이터
 */
export async function examineContent(
  contentId: string,
  request: ContentExamineRequest
): Promise<void> {
  const response = await apiClient<void>(
    `/api/v1/admin/content/${contentId}/examine`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    }
  );

  if (response.code !== 200) {
    throw new Error(response.message || '콘텐츠 심사 처리에 실패했습니다.');
  }
}
