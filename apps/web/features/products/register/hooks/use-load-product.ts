import type {
  ProductDetailType,
  ProductOptionType,
} from '@/entities/product/model/product-types';
import type { ProductFormData } from '@/lib/schemas/productSchema';
import type { ApiResponse } from '@/shared/types/api-types';
// File: src/features/products/register/hooks/useLoadProduct.ts
import { useQuery } from '@tanstack/react-query';
import type { UseFormReset } from 'react-hook-form';
import { clientFetchProductDetail } from '../../api/product-client-api';
import { useNewProductStore } from '../store/useNewProductStore';
import type {
  CoachingOption,
  DocumentOption,
} from '../store/useNewProductStore';

/**
 * 서버에서 가져온 ProductDetailType.options 를
 * coachingOptions / documentOptions 형태로 변환하는 유틸
 * contentType을 우선 고려하여 서버 데이터 불일치 문제 해결
 */
function transformOptions(
  opts: ProductOptionType[],
  contentType: 'COACHING' | 'DOCUMENT'
): {
  coachingOptions: CoachingOption[];
  documentOptions: DocumentOption[];
} {
  const coachingOptions: CoachingOption[] = [];
  const documentOptions: DocumentOption[] = [];

  opts.forEach((opt) => {
    // contentType을 우선 고려하여 분류
    if (contentType === 'COACHING') {
      // COACHING 타입이면 모든 옵션을 coachingOptions로 분류
      coachingOptions.push({
        optionId: opt.optionId,
        name: opt.name,
        description: opt.description,
        price: opt.price,
      });
    } else if (contentType === 'DOCUMENT') {
      // DOCUMENT 타입이면 모든 옵션을 documentOptions로 분류
      documentOptions.push({
        optionId: opt.optionId,
        name: opt.name,
        description: opt.description,
        price: opt.price,
        documentFileUrl: opt.documentFileUrl || null,
        documentLinkUrl: opt.documentLinkUrl || null,
      });
    }
  });

  return { coachingOptions, documentOptions };
}

/**
 * ProductDetail 데이터를 FormData 형태로 변환
 */
function transformToFormData(detail: ProductDetailType): ProductFormData {
  const { coachingOptions, documentOptions } = transformOptions(
    detail.options,
    detail.contentType
  );

  const baseFormData = {
    title: detail.title || '',
    contentType: detail.contentType,
    categoryId: detail.categoryId || '',
    thumbnailUrl: detail.thumbnailUrl || '',
    serviceTarget: detail.serviceTarget || '',
    serviceProcess: detail.serviceProcess || '',
    makerIntro: detail.makerIntro || '',
  };

  if (detail.contentType === 'COACHING') {
    return {
      ...baseFormData,
      // 코칭 옵션이 없으면 기본 옵션 하나 생성
      coachingOptions:
        coachingOptions.length > 0
          ? coachingOptions
          : [
              {
                optionId: 1000001, // 고정값 사용
                name: '',
                description: '',
                price: 0,
              },
            ],
    };
  }
  return {
    ...baseFormData,
    // 문서 옵션이 없으면 기본 옵션 하나 생성
    documentOptions:
      documentOptions.length > 0
        ? documentOptions
        : [
            {
              optionId: 1000001, // 고정값 사용
              name: '',
              description: '',
              price: 0,
              documentFileUrl: null,
              documentLinkUrl: null,
            },
          ],
  };
}

/**
 * contentId 가 주어지면 조회 후 zustand 스토어와 react-hook-form에 동기화합니다.
 */
export function useLoadProduct(contentId: string | null) {
  return useQuery({
    queryKey: ['productDetail', contentId],
    queryFn: () => clientFetchProductDetail(contentId!),
    enabled: !!contentId,
    staleTime: 1000 * 60 * 5, // 5분 캐싱
    refetchOnWindowFocus: false,
    select: (response: ApiResponse<ProductDetailType>) => {
      if (response.status !== 'SUCCESS') {
        throw new Error('데이터 로드 실패');
      }

      const detail = response.data;
      const { coachingOptions, documentOptions } = transformOptions(
        detail.options,
        detail.contentType
      );

      // FormData 형태로 반환 (스토어 업데이트는 별도 처리)
      return {
        detail,
        formData: transformToFormData(detail),
        coachingOptions,
        documentOptions,
      };
    },
  });
}
