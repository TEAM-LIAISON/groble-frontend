// 도메인 레벨: API ↔ 내부 도메인 간 옵션 변환 유틸

import { ProductOptionType } from '../model/product-types';

/** 도메인 레벨: 코칭 옵션 */
export interface CoachingOptionDomain {
  optionId: number;
  name: string;
  description: string;
  price: number;
}

/** 도메인 레벨: 문서 옵션 */
export interface DocumentOptionDomain {
  optionId: number;
  name: string;
  description: string;
  price: number;
  documentFileUrl?: string;
  documentLinkUrl?: string;
}

/** API → CoachingOptionDomain */
export function apiToCoachingOption(
  api: ProductOptionType
): CoachingOptionDomain {
  return {
    optionId: api.optionId,
    name: api.name,
    description: api.description,
    price: api.price,
  };
}

/** API → DocumentOptionDomain */
export function apiToDocumentOption(
  api: ProductOptionType
): DocumentOptionDomain {
  return {
    optionId: api.optionId,
    name: api.name,
    description: api.description,
    price: api.price,
    documentFileUrl: api.documentFileUrl || api.fileUrl,
    documentLinkUrl: undefined,
  };
}

/** CoachingOptionDomain → API */
export function coachingOptionToApi(
  dom: CoachingOptionDomain
): ProductOptionType {
  return {
    optionId: dom.optionId,
    optionType: 'COACHING_OPTION',
    name: dom.name,
    description: dom.description,
    price: dom.price,
  };
}

/** DocumentOptionDomain → API */
export function documentOptionToApi(
  dom: DocumentOptionDomain
): ProductOptionType {
  return {
    optionId: dom.optionId,
    optionType: 'DOCUMENT_OPTION',
    name: dom.name,
    description: dom.description,
    price: dom.price,
    documentFileUrl: dom.documentFileUrl,
  };
}
