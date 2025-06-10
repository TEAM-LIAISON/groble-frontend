// 도메인 레벨: API ↔ 내부 도메인 간 옵션 변환 유틸

import { ProductOptionType } from "../model/product-types";

/** 도메인 레벨: 코칭 옵션 */
export interface CoachingOptionDomain {
  optionId: number;
  name: string;
  description: string;
  price: number;
  coachingPeriod: "ONE_DAY" | "TWO_TO_SIX_DAYS" | "MORE_THAN_ONE_WEEK";
  documentProvision: "PROVIDED" | "NOT_PROVIDED";
  coachingType: "ONLINE" | "OFFLINE";
  coachingTypeDescription: string;
}

/** 도메인 레벨: 문서 옵션 */
export interface DocumentOptionDomain {
  optionId: number;
  name: string;
  description: string;
  price: number;
  contentDeliveryMethod: "IMMEDIATE_DOWNLOAD" | "FUTURE_UPLOAD";
  documentFileUrl?: string;
  documentLinkUrl?: string;
}

/** API → CoachingOptionDomain */
export function apiToCoachingOption(
  api: ProductOptionType,
): CoachingOptionDomain {
  return {
    optionId: api.optionId,
    name: api.name,
    description: api.description,
    price: api.price,
    coachingPeriod: api.coachingPeriod as
      | "ONE_DAY"
      | "TWO_TO_SIX_DAYS"
      | "MORE_THAN_ONE_WEEK",
    documentProvision: api.documentProvision as "PROVIDED" | "NOT_PROVIDED",
    coachingType: api.coachingType as "ONLINE" | "OFFLINE",
    coachingTypeDescription: api.coachingTypeDescription || "",
  };
}

/** API → DocumentOptionDomain */
export function apiToDocumentOption(
  api: ProductOptionType,
): DocumentOptionDomain {
  return {
    optionId: api.optionId,
    name: api.name,
    description: api.description,
    price: api.price,
    contentDeliveryMethod:
      api.deliveryMethod === "UPLOAD" ? "FUTURE_UPLOAD" : "IMMEDIATE_DOWNLOAD",
    documentFileUrl: api.documentFileUrl || api.fileUrl,
    documentLinkUrl: undefined,
  };
}

/** CoachingOptionDomain → API */
export function coachingOptionToApi(
  dom: CoachingOptionDomain,
): ProductOptionType {
  return {
    optionId: dom.optionId,
    optionType: "COACHING_OPTION",
    name: dom.name,
    description: dom.description,
    price: dom.price,
    coachingPeriod: dom.coachingPeriod,
    documentProvision: dom.documentProvision,
    coachingType: dom.coachingType,
    coachingTypeDescription: dom.coachingTypeDescription,
  };
}

/** DocumentOptionDomain → API */
export function documentOptionToApi(
  dom: DocumentOptionDomain,
): ProductOptionType {
  return {
    optionId: dom.optionId,
    optionType: "DOCUMENT_OPTION",
    name: dom.name,
    description: dom.description,
    price: dom.price,
    deliveryMethod:
      dom.contentDeliveryMethod === "FUTURE_UPLOAD" ? "UPLOAD" : "DOWNLOAD",
    documentFileUrl: dom.documentFileUrl,
  };
}
