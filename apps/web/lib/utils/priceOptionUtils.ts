// 가격 옵션 타입 정의
export interface PriceOption {
  optionId: number;
  name: string;
  description: string;
  duration?: string | null;
  price: number;
  documentProvision?: string | null;
  coachingType?: string | null;
  coachingTypeDescription?: string;
  documentFileUrl?: string | null;
  documentLinkUrl?: string | null;
}

export interface CoachingOption {
  optionId: number;
  name: string;
  description: string;
  price: number;
  deliveryMethod?: 'DOWNLOAD' | 'UPLOAD';
}

export interface DocumentOption {
  optionId: number;
  name: string;
  description: string;
  price: number;

  documentFileUrl?: string | null;
  documentLinkUrl?: string | null;
}

/**
 * 새 가격 옵션 객체 생성
 * @returns 초기화된 가격 옵션 객체
 */
export function createNewPriceOption(): PriceOption {
  return {
    optionId: Date.now(),
    name: '',
    description: '',
    price: 0,
    documentFileUrl: null,
    documentLinkUrl: null,
  };
}

/**
 * 로컬 가격 옵션을 코칭 옵션으로 변환
 * @param options 로컬 가격 옵션 배열
 * @returns 코칭 옵션 배열
 */
export function convertToCoachingOptions(
  options: PriceOption[]
): CoachingOption[] {
  return options.map((option) => ({
    optionId: option.optionId,
    name: option.name,
    description: option.description,
    price: option.price,
  }));
}

/**
 * 로컬 가격 옵션을 문서 옵션으로 변환
 * @param options 로컬 가격 옵션 배열
 * @returns 문서 옵션 배열
 */
export function convertToDocumentOptions(
  options: PriceOption[]
): DocumentOption[] {
  return options.map((option) => ({
    optionId: option.optionId,
    name: option.name,
    description: option.description,
    price: option.price,
    documentFileUrl: option.documentFileUrl || null,
    documentLinkUrl: option.documentLinkUrl || null,
  }));
}

/**
 * 코칭 옵션을 로컬 가격 옵션으로 변환
 * @param options 코칭 옵션 배열
 * @returns 로컬 가격 옵션 배열
 */
export function convertFromCoachingOptions(
  options: CoachingOption[]
): PriceOption[] {
  return options.map((option) => {
    const optionId =
      ('optionId' in option ? option.optionId : (option as any).id) ||
      `temp-id-${Math.random()}`;

    const result: PriceOption = {
      optionId: optionId,
      name: option.name || '',
      description: option.description || '',
      price:
        typeof option.price === 'number'
          ? option.price
          : Number(option.price) || 0,
      documentFileUrl: null,
      documentLinkUrl: null,
    };

    return result;
  });
}

/**
 * 문서 옵션을 로컬 가격 옵션으로 변환
 * @param options 문서 옵션 배열
 * @returns 로컬 가격 옵션 배열
 */
export function convertFromDocumentOptions(
  options: DocumentOption[]
): PriceOption[] {
  return options.map((option) => {
    const optionId =
      ('optionId' in option ? option.optionId : (option as any).id) ||
      `temp-id-${Math.random()}`;

    const result: PriceOption = {
      optionId: optionId,
      name: option.name || '',
      description: option.description || '',
      price:
        typeof option.price === 'number'
          ? option.price
          : Number(option.price) || 0,
      documentFileUrl: option.documentFileUrl || null,
      documentLinkUrl: option.documentLinkUrl || null,
    };

    return result;
  });
}
