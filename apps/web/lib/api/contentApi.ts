// File: src/lib/api/contentApi.ts
import type { ProductDetailType } from '@/entities/product/model';
import { fetchClient } from '@/shared/api/api-fetch';
import type { ApiResponse } from '@/shared/types/api-types';

/**
 * 콘텐츠 상세 조회 API
 * @param contentId 콘텐츠 ID
 * @returns API 응답
 */
export async function getContentDetail(
  contentId: string
): Promise<ApiResponse<ProductDetailType>> {
  const endpoint = `/api/v1/content/${contentId}`;

  try {
    // No cache
    const response = await fetchClient<ProductDetailType>(endpoint, {
      cache: 'no-cache',
    });
    return response;
  } catch (error) {
    console.error('콘텐츠 상세 조회 실패:', error);
    return {
      status: 'FAIL',
      code: 0,
      message: '콘텐츠 상세 조회 중 오류가 발생했습니다',
      data: {
        contentId: 0,
        status: 'DRAFT',
        thumbnailUrl: '',
        contentType: 'COACHING',
        categoryId: '0',
        title: '',
        sellerProfileImageUrl: '',
        sellerName: '',
        lowestPrice: 0,
        options: [],
      },
      timestamp: new Date().toISOString(),
    };
  }
}

/**
 * 자료 파일 업로드 API
 * @param file 업로드할 PDF 또는 ZIP 파일
 * @returns API 응답 (fileUrl 포함)
 */
export async function uploadDocumentFile(file: File) {
  if (!file) {
    throw new Error('파일이 선택되지 않았습니다.');
  }

  // 파일 크기 검증 (10MB 제한)
  const maxSize = 10 * 1024 * 1024; // 10MB
  if (file.size > maxSize) {
    throw new Error('파일 크기는 10MB 이하여야 합니다.');
  }

  const formData = new FormData();
  formData.append('contentDocumentFile', file);

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE}/api/v1/content/document/upload/file`,
      {
        method: 'POST',
        body: formData,
        credentials: 'include',
      }
    );

    if (!response.ok) {
      throw new Error(
        `파일 업로드에 실패했습니다. 상태 코드: ${response.status}`
      );
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error('자료 파일 업로드 중 오류 발생:', error);
    throw error;
  }
}
