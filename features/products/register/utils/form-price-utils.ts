// 폼 레벨: react-hook-form ↔ zustand 스토어 간 옵션 생성·변환 유틸

import { CoachingOptionForm, DocumentOptionForm } from "../types/form-types";

/** 빈 코칭 옵션 하나 생성 */
export function createEmptyCoachingOption(): CoachingOptionForm {
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
export function createEmptyDocumentOption(): DocumentOptionForm {
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
  forms: CoachingOptionForm[],
): CoachingOptionForm[] {
  return [...forms]; // 동일 구조라 바로 넘김
}
export function formToStoreDocumentOptions(
  forms: DocumentOptionForm[],
): DocumentOptionForm[] {
  return [...forms];
}

/**
 * zustand 스토어 → 폼 초기값 변환
 */
export function storeToFormCoachingOptions(
  storeOpts: CoachingOptionForm[],
): CoachingOptionForm[] {
  return [...storeOpts];
}
export function storeToFormDocumentOptions(
  storeOpts: DocumentOptionForm[],
): DocumentOptionForm[] {
  return [...storeOpts];
}
