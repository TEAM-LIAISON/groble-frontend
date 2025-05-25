import { z } from "zod";

// 코칭 옵션 스키마
const coachingOptionSchema = z.object({
  optionId: z.number(),
  name: z.string().min(1, "옵션명을 입력해주세요"),
  description: z.string().min(1, "설명을 입력해주세요"),
  price: z.number().min(1, "가격을 입력해주세요"),
  coachingPeriod: z.enum(["ONE_DAY", "TWO_TO_SIX_DAYS", "MORE_THAN_ONE_WEEK"]),
  documentProvision: z.enum(["PROVIDED", "NOT_PROVIDED"]),
  coachingType: z.enum(["ONLINE", "OFFLINE"]),
  coachingTypeDescription: z.string().min(1, "코칭 방식 설명을 입력해주세요"),
});

// 문서 옵션 스키마
const documentOptionSchema = z
  .object({
    optionId: z.number(),
    name: z.string().min(1, "옵션명을 입력해주세요"),
    description: z.string().min(1, "설명을 입력해주세요"),
    price: z.number().min(1, "가격을 입력해주세요"),
    contentDeliveryMethod: z
      .enum(["IMMEDIATE_DOWNLOAD", "FUTURE_UPLOAD"])
      .nullable(),
    documentFileUrl: z.string().nullable().optional(),
    documentLinkUrl: z.string().nullable().optional(),
  })
  .refine(
    (data) => {
      // 즉시 다운로드인 경우 파일 또는 링크 중 하나는 있어야 함
      if (data.contentDeliveryMethod === "IMMEDIATE_DOWNLOAD") {
        return data.documentFileUrl || data.documentLinkUrl;
      }
      return true;
    },
    {
      message: "즉시 다운로드의 경우 파일 또는 링크를 제공해주세요",
      path: ["documentFileUrl"],
    },
  );

// 메인 폼 스키마
export const productFormSchema = z
  .object({
    title: z
      .string()
      .min(1, "콘텐츠 이름을 입력해주세요")
      .max(30, "콘텐츠 이름은 30자 이내로 입력해주세요"),
    contentType: z.enum(["COACHING", "DOCUMENT"]),
    categoryId: z.string().min(1, "카테고리를 선택해주세요"),
    thumbnailUrl: z.string().min(1, "대표 이미지를 업로드해주세요"),
    coachingOptions: z.array(coachingOptionSchema).optional(),
    documentOptions: z.array(documentOptionSchema).optional(),
  })
  .refine(
    (data) => {
      // 콘텐츠 타입에 따른 옵션 검증
      if (data.contentType === "COACHING") {
        return data.coachingOptions && data.coachingOptions.length > 0;
      } else if (data.contentType === "DOCUMENT") {
        return data.documentOptions && data.documentOptions.length > 0;
      }
      return false;
    },
    {
      message: "최소 하나의 옵션을 추가해주세요",
      path: ["coachingOptions"],
    },
  );

export type ProductFormData = z.infer<typeof productFormSchema>;
export type CoachingOption = z.infer<typeof coachingOptionSchema>;
export type DocumentOption = z.infer<typeof documentOptionSchema>;
