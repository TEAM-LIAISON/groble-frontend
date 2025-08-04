import type { ProductFormData } from '@/lib/schemas/productSchema';
import type {
  ProductDetailType,
  ProductOptionType,
} from '@/entities/product/model/product-types';
import type { DraftRequest } from '../api/draft-api';
import type {
  CoachingOption,
  DocumentOption,
} from '../store/useNewProductStore';

/**
 * ProductDetail의 options를 coachingOptions/documentOptions로 분리
 * contentType을 우선 고려하여 서버 데이터 불일치 문제 해결
 */
export function transformOptionsFromServer(
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
 * 서버 데이터를 폼 데이터로 변환
 */
export function transformServerToForm(
  detail: ProductDetailType
): ProductFormData {
  const { coachingOptions, documentOptions } = transformOptionsFromServer(
    detail.options,
    detail.contentType
  );

  const baseFormData = {
    title: detail.title || '',
    contentType: detail.contentType,
    categoryId: detail.categoryId || '',
    thumbnailUrl: detail.thumbnailUrl || '',
    contentIntroduction: detail.contentIntroduction || '',
    serviceTarget: detail.serviceTarget || '',
    serviceProcess: detail.serviceProcess || '',
    makerIntro: detail.makerIntro || '',
  };

  if (detail.contentType === 'COACHING') {
    const result = {
      ...baseFormData,
      coachingOptions:
        coachingOptions.length > 0
          ? coachingOptions
          : [{ optionId: 1000001, name: '', description: '', price: 0 }],
    };
    return result;
  } else {
    const result = {
      ...baseFormData,
      documentOptions:
        documentOptions.length > 0
          ? documentOptions
          : [
              {
                optionId: 1000001,
                name: '',
                description: '',
                price: 0,
                documentFileUrl: null,
                documentLinkUrl: null,
              },
            ],
    };
    return result;
  }
}

/**
 * 폼 데이터를 API 요청 데이터로 변환
 */
export function transformFormToDraft(
  formData: ProductFormData,
  existingContentId?: number
): DraftRequest {
  const baseData: DraftRequest = {
    ...(existingContentId && { contentId: existingContentId }),
    title: formData.title,
    contentType: formData.contentType,
    categoryId: formData.categoryId,
    thumbnailUrl: formData.thumbnailUrl,
    contentIntroduction: formData.contentIntroduction,
    serviceTarget: formData.serviceTarget,
    serviceProcess: formData.serviceProcess,
    makerIntro: formData.makerIntro,
  };

  // contentType에 따른 옵션 처리
  if (formData.contentType === 'COACHING' && formData.coachingOptions) {
    baseData.coachingOptions = formData.coachingOptions
      .filter((option) => option.name?.trim())
      .map((option) => ({
        name: option.name,
        description: option.description,
        price: option.price,
      }));
  } else if (formData.contentType === 'DOCUMENT' && formData.documentOptions) {
    baseData.documentOptions = formData.documentOptions
      .filter((option) => option.name?.trim())
      .map((option) => ({
        name: option.name,
        description: option.description,
        price: option.price,
        documentFileUrl: option.documentFileUrl || null,
        documentLinkUrl: option.documentLinkUrl || null,
      }));
  }

  return baseData;
}

/**
 * 기본 폼 데이터 생성
 */
export function createDefaultFormData(): ProductFormData {
  return {
    title: '',
    contentType: 'COACHING',
    categoryId: '',
    thumbnailUrl: '',
    contentIntroduction: '',
    serviceTarget: '',
    serviceProcess: '',
    makerIntro: '',
    coachingOptions: [
      {
        optionId: 1000001,
        name: '',
        description: '',
        price: 0,
      },
    ],
  };
}

/**
 * 두 폼 데이터가 동일한지 깊은 비교
 */
export function isFormDataEqual(
  data1: ProductFormData,
  data2: ProductFormData
): boolean {
  // 기본 필드 비교
  if (
    data1.title !== data2.title ||
    data1.contentType !== data2.contentType ||
    data1.categoryId !== data2.categoryId ||
    data1.thumbnailUrl !== data2.thumbnailUrl ||
    data1.contentIntroduction !== data2.contentIntroduction ||
    data1.serviceTarget !== data2.serviceTarget ||
    data1.serviceProcess !== data2.serviceProcess ||
    data1.makerIntro !== data2.makerIntro
  ) {
    return false;
  }

  // 옵션 비교
  if (data1.contentType === 'COACHING') {
    const options1 = data1.coachingOptions || [];
    const options2 = data2.coachingOptions || [];

    if (options1.length !== options2.length) {
      return false;
    }

    for (let i = 0; i < options1.length; i++) {
      const opt1 = options1[i];
      const opt2 = options2[i];
      if (
        opt1.name !== opt2.name ||
        opt1.description !== opt2.description ||
        opt1.price !== opt2.price
      ) {
        return false;
      }
    }
  } else if (data1.contentType === 'DOCUMENT') {
    const options1 = data1.documentOptions || [];
    const options2 = data2.documentOptions || [];

    if (options1.length !== options2.length) {
      return false;
    }

    for (let i = 0; i < options1.length; i++) {
      const opt1 = options1[i];
      const opt2 = options2[i];
      if (
        opt1.name !== opt2.name ||
        opt1.description !== opt2.description ||
        opt1.price !== opt2.price ||
        opt1.documentFileUrl !== opt2.documentFileUrl ||
        opt1.documentLinkUrl !== opt2.documentLinkUrl
      ) {
        return false;
      }
    }
  }

  return true;
}
