// File: src/features/products/register/hooks/useLoadProduct.ts
import { useQuery } from '@tanstack/react-query';
import { useNewProductStore } from '../store/useNewProductStore';
import { clientFetchProductDetail } from '../../api/product-client-api';
import type { ProductFormData } from '@/lib/schemas/productSchema';
import type { UseFormReset } from 'react-hook-form';
import type {
  ProductOptionType,
  ProductDetailType,
} from '@/entities/product/model/product-types';
import type { ApiResponse } from '@/shared/types/api-types';
import type {
  CoachingOption,
  DocumentOption,
} from '../store/useNewProductStore';

/**
 * 서버에서 가져온 ProductDetailType.options 를
 * coachingOptions / documentOptions 형태로 변환하는 유틸
 */
function transformOptions(opts: ProductOptionType[]): {
  coachingOptions: CoachingOption[];
  documentOptions: DocumentOption[];
} {
  const coachingOptions: CoachingOption[] = [];
  const documentOptions: DocumentOption[] = [];

  opts.forEach((opt) => {
    if (opt.optionType === 'COACHING_OPTION') {
      coachingOptions.push({
        optionId: opt.optionId,
        name: opt.name,
        description: opt.description,
        price: opt.price,
        coachingPeriod: opt.coachingPeriod as
          | 'ONE_DAY'
          | 'TWO_TO_SIX_DAYS'
          | 'MORE_THAN_ONE_WEEK',
        documentProvision: opt.documentProvision as 'PROVIDED' | 'NOT_PROVIDED',
        coachingType: opt.coachingType as 'ONLINE' | 'OFFLINE',
        coachingTypeDescription: opt.coachingTypeDescription || '',
      });
    } else if (opt.optionType === 'DOCUMENT_OPTION') {
      documentOptions.push({
        optionId: opt.optionId,
        name: opt.name,
        description: opt.description,
        price: opt.price,
        contentDeliveryMethod: opt.deliveryMethod as
          | 'IMMEDIATE_DOWNLOAD'
          | 'FUTURE_UPLOAD',
        documentFileUrl: opt.documentFileUrl || null,
        documentLinkUrl: undefined,
      });
    }
  });

  return { coachingOptions, documentOptions };
}

/**
 * ProductDetail 데이터를 FormData 형태로 변환
 */
function transformToFormData(detail: ProductDetailType): ProductFormData {
  const { coachingOptions, documentOptions } = transformOptions(detail.options);

  if (detail.contentType === 'COACHING') {
    return {
      title: detail.title,
      contentType: detail.contentType,
      categoryId: String(detail.categoryId),
      thumbnailUrl: detail.thumbnailUrl,
      serviceTarget: detail.serviceTarget ?? '',
      serviceProcess: detail.serviceProcess ?? '',
      makerIntro: detail.makerIntro ?? '',
      coachingOptions,
    };
  } else {
    return {
      title: detail.title,
      contentType: detail.contentType,
      categoryId: String(detail.categoryId),
      thumbnailUrl: detail.thumbnailUrl,
      serviceTarget: detail.serviceTarget ?? '',
      serviceProcess: detail.serviceProcess ?? '',
      makerIntro: detail.makerIntro ?? '',
      documentOptions,
    };
  }
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
        detail.options
      );

      // Zustand 스토어 업데이트
      const store = useNewProductStore.getState();
      store.setContentId(detail.contentId);
      store.setTitle(detail.title);
      store.setContentType(detail.contentType);
      store.setCategoryId(String(detail.categoryId));
      store.setThumbnailUrl(detail.thumbnailUrl);
      store.setContentIntroduction(detail.contentIntroduction ?? '');
      store.setServiceTarget(detail.serviceTarget ?? '');
      store.setServiceProcess(detail.serviceProcess ?? '');
      store.setMakerIntro(detail.makerIntro ?? '');
      store.setCoachingOptions(coachingOptions);
      store.setDocumentOptions(documentOptions);

      // FormData 형태로 반환
      return transformToFormData(detail);
    },
  });
}
