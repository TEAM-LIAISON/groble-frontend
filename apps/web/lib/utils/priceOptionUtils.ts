// 가격 옵션 타입 정의
export interface PriceOption {
  optionId: number;
  name: string;
  description: string;
  duration: string | null;
  price: number;
  documentProvision: string | null;
  coachingType: string | null;
  coachingTypeDescription: string;
  documentFileUrl?: string | null;
  documentLinkUrl?: string | null;
}

export interface CoachingOption {
  optionId: number;
  name: string;
  description: string;
  price: number;
  coachingPeriod: "ONE_DAY" | "TWO_TO_SIX_DAYS" | "MORE_THAN_ONE_WEEK";
  documentProvision: "PROVIDED" | "NOT_PROVIDED";
  coachingType: "ONLINE" | "OFFLINE";
  coachingTypeDescription: string;
}

export interface DocumentOption {
  optionId: number;
  name: string;
  description: string;
  price: number;
  contentDeliveryMethod: "IMMEDIATE_DOWNLOAD" | "FUTURE_UPLOAD";
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
    name: "",
    description: "",
    duration: null,
    price: 0,
    documentProvision: null,
    coachingType: null,
    coachingTypeDescription: "",
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
    contentDeliveryMethod:
      (option.duration as "IMMEDIATE_DOWNLOAD" | "FUTURE_UPLOAD") ||
      "IMMEDIATE_DOWNLOAD",
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
  options: CoachingOption[],
): PriceOption[] {
  return options.map((option) => {
    const optionId =
      ("optionId" in option ? option.optionId : (option as any).id) ||
      `temp-id-${Math.random()}`;

    return {
      optionId: optionId, // 문자열로 통일
      name: option.name || "",
      description: option.description || "",
      duration: option.coachingPeriod || "ONE_DAY",
      price:
        typeof option.price === "number"
          ? option.price
          : Number(option.price) || 0,
      documentProvision: option.documentProvision || "NOT_PROVIDED",
      coachingType: option.coachingType || "ONLINE",
      coachingTypeDescription: option.coachingTypeDescription || "",
      documentFileUrl: null,
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
    const optionId =
      ("optionId" in option ? option.optionId : (option as any).id) ||
      `temp-id-${Math.random()}`;

    return {
      optionId: optionId,
      name: option.name || "",
      description: option.description || "",
      duration: option.contentDeliveryMethod || "IMMEDIATE_DOWNLOAD",
      price:
        typeof option.price === "number"
          ? option.price
          : Number(option.price) || 0,
      documentProvision: null,
      coachingType: null,
      coachingTypeDescription: "",
      documentFileUrl: option.documentFileUrl || null,
      documentLinkUrl: option.documentLinkUrl || null,
    };
  });
}
