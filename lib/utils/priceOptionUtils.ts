// 가격 옵션 타입 정의
export interface PriceOption {
  optionId: string | number;
  name: string;
  description: string;
  duration: string | null;
  price: number;
  documentProvision: string | null;
  coachingType: string | null;
  coachingTypeDescription: string;
}

export interface CoachingOption {
  optionId: string | number;
  name: string;
  description: string;
  price: number;
  coachingPeriod: "ONE_DAY" | "TWO_TO_SIX_DAYS" | "MORE_THAN_ONE_WEEK";
  documentProvision: "PROVIDED" | "NOT_PROVIDED";
  coachingType: "ONLINE" | "OFFLINE";
  coachingTypeDescription: string;
}

export interface DocumentOption {
  optionId: string | number;
  name: string;
  description: string;
  price: number;
  contentDeliveryMethod: string | null;
}

/**
 * 새 가격 옵션 객체 생성
 * @returns 초기화된 가격 옵션 객체
 */
export function createNewPriceOption(): PriceOption {
  return {
    optionId: `option-${Date.now()}`,
    name: "",
    description: "",
    duration: null,
    price: 0,
    documentProvision: null,
    coachingType: null,
    coachingTypeDescription: "",
  };
}

/**
 * 로컬 가격 옵션을 코칭 옵션으로 변환
 * @param options 로컬 가격 옵션 배열
 * @returns 코칭 옵션 배열
 */
export function convertToCoachingOptions(
  options: PriceOption[],
): CoachingOption[] {
  return options.map((option) => ({
    optionId: option.optionId,
    name: option.name,
    description: option.description,
    price: option.price,
    coachingPeriod: option.duration as
      | "ONE_DAY"
      | "TWO_TO_SIX_DAYS"
      | "MORE_THAN_ONE_WEEK",
    documentProvision: option.documentProvision as "PROVIDED" | "NOT_PROVIDED",
    coachingType: option.coachingType as "ONLINE" | "OFFLINE",
    coachingTypeDescription: option.coachingTypeDescription,
  }));
}

/**
 * 로컬 가격 옵션을 문서 옵션으로 변환
 * @param options 로컬 가격 옵션 배열
 * @returns 문서 옵션 배열
 */
export function convertToDocumentOptions(
  options: PriceOption[],
): DocumentOption[] {
  return options.map((option) => ({
    optionId: option.optionId,
    name: option.name,
    description: option.description,
    price: option.price,
    contentDeliveryMethod: option.duration || null,
  }));
}

/**
 * 코칭 옵션을 로컬 가격 옵션으로 변환
 * @param options 코칭 옵션 배열
 * @returns 로컬 가격 옵션 배열
 */
export function convertFromCoachingOptions(
  options: CoachingOption[],
): PriceOption[] {
  return options.map((option) => {
    // id 또는 optionId 필드 사용 확인
    const optionId =
      "optionId" in option ? option.optionId : (option as any).id;

    return {
      optionId: optionId,
      name: option.name,
      description: option.description,
      duration: option.coachingPeriod,
      price: option.price,
      documentProvision: option.documentProvision,
      coachingType: option.coachingType,
      coachingTypeDescription: option.coachingTypeDescription,
    };
  });
}

/**
 * 문서 옵션을 로컬 가격 옵션으로 변환
 * @param options 문서 옵션 배열
 * @returns 로컬 가격 옵션 배열
 */
export function convertFromDocumentOptions(
  options: DocumentOption[],
): PriceOption[] {
  return options.map((option) => {
    // id 또는 optionId 필드 사용 확인
    const optionId =
      "optionId" in option ? option.optionId : (option as any).id;

    return {
      optionId: optionId,
      name: option.name,
      description: option.description,
      duration: option.contentDeliveryMethod,
      price: option.price,
      documentProvision: null,
      coachingType: null,
      coachingTypeDescription: "",
    };
  });
}
