// 폼 레벨: react-hook-form ↔ zustand 스토어 간 옵션 생성·변환 유틸

import { CoachingOption, DocumentOption } from "@/lib/schemas/productSchema";

/** 빈 코칭 옵션 하나 생성 */
export function createEmptyCoachingOption(): CoachingOption {
  return {
    optionId: Date.now(),
    name: "",
    description: "",
    price: 0,
    coachingPeriod: "ONE_DAY",
    documentProvision: "NOT_PROVIDED",
    coachingType: "ONLINE",
    coachingTypeDescription: "",
  };
}

/** 빈 문서 옵션 하나 생성 */
export function createEmptyDocumentOption(): DocumentOption {
  return {
    optionId: Date.now(),
    name: "",
    description: "",
    price: 0,
    contentDeliveryMethod: "IMMEDIATE_DOWNLOAD",
    documentFileUrl: null,
    documentLinkUrl: null,
  };
}

/**
 * 폼 → zustand 스토어 저장용 배열
 * (store-actions.setCoachingOptions 등에 바로 넘기시면 됩니다)
 */
export function formToStoreCoachingOptions(
  forms: CoachingOption[],
): CoachingOption[] {
  return [...forms]; // 동일 구조라 바로 넘김
}
export function formToStoreDocumentOptions(
  forms: DocumentOption[],
): DocumentOption[] {
  return [...forms];
}

/**
 * zustand 스토어 → 폼 초기값 변환
 */
export function storeToFormCoachingOptions(
  storeOpts: CoachingOption[],
): CoachingOption[] {
  return [...storeOpts];
}
export function storeToFormDocumentOptions(
  storeOpts: DocumentOption[],
): DocumentOption[] {
  return [...storeOpts];
}
