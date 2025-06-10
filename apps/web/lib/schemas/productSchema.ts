// File: src/lib/schemas/productSchema.ts
import { z } from "zod";

/** 공통 필드 */
const base = z.object({
  title: z
    .string()
    .min(1, "콘텐츠 이름을 입력해주세요")
    .max(30, "30자 이내로 입력해주세요"),
  categoryId: z.string().min(1, "카테고리를 선택해주세요"),
  thumbnailUrl: z.string().min(1, "대표 이미지를 업로드해주세요"),
  serviceTarget: z.string().min(1, "타겟을 입력해주세요"),
  serviceProcess: z.string().min(1, "절차를 입력해주세요"),
  makerIntro: z.string().min(1, "메이커 소개를 입력해주세요"),
});

/** 코칭 전용 옵션 */
export const coachingOptionSchema = z.object({
  optionId: z.number(),
  name: z.string().min(1, "옵션명을 입력해주세요"),
  description: z.string().min(1, "설명을 입력해주세요"),
  price: z.number().min(0, "가격을 입력해주세요"),
  coachingPeriod: z.enum(["ONE_DAY", "TWO_TO_SIX_DAYS", "MORE_THAN_ONE_WEEK"]),
  documentProvision: z.enum(["PROVIDED", "NOT_PROVIDED"]),
  coachingType: z.enum(["ONLINE", "OFFLINE"]),
  coachingTypeDescription: z.string().min(1, "코칭 방식 설명을 입력해주세요"),
});

/** 문서 전용 옵션 */
export const documentOptionSchema = z
  .object({
    optionId: z.number(),
    name: z.string().min(1, "옵션명을 입력해주세요"),
    description: z.string().min(1, "설명을 입력해주세요"),
    price: z.number().min(0, "가격을 입력해주세요"),
    contentDeliveryMethod: z.enum(["IMMEDIATE_DOWNLOAD", "FUTURE_UPLOAD"], {
      required_error: "콘텐츠 제공 방식을 선택해주세요",
      invalid_type_error: "콘텐츠 제공 방식을 선택해주세요",
    }),
    documentFileUrl: z.string().nullable().optional(),
    documentLinkUrl: z.string().nullable().optional(),
  })
  .refine(
    (data) => {
      if (data.contentDeliveryMethod === "IMMEDIATE_DOWNLOAD") {
        // 즉시 다운로드인 경우 파일 또는 링크 중 하나는 있어야 함
        return !!(data.documentFileUrl || data.documentLinkUrl);
      } else if (data.contentDeliveryMethod === "FUTURE_UPLOAD") {
        // 작업 후 업로드인 경우 파일과 링크가 모두 null이어야 함
        return !data.documentFileUrl && !data.documentLinkUrl;
      }
      return true;
    },
    {
      message:
        "즉시 다운로드의 경우 파일 또는 링크를 제공해주세요. 작업 후 업로드의 경우 파일과 링크를 비워두세요.",
      path: ["documentFileUrl"],
    },
  );

/** COACHING 분기 스키마 */
const coachingSchema = base.extend({
  contentType: z.literal("COACHING"),
  coachingOptions: z
    .array(coachingOptionSchema)
    .min(1, "최소 하나 이상의 코칭 옵션이 필요합니다"),
  documentOptions: z.never(),
});

/** DOCUMENT 분기 스키마 */
const documentSchema = base.extend({
  contentType: z.literal("DOCUMENT"),
  documentOptions: z
    .array(documentOptionSchema)
    .min(1, "최소 하나 이상의 문서 옵션이 필요합니다"),
  coachingOptions: z.never(),
});

/** 최종 `contentType` 분기 유니언 */
export const productSchema = z
  .object({
    title: z
      .string()
      .min(1, "콘텐츠 이름을 입력해주세요")
      .max(30, "콘텐츠 이름은 30자 이내로 입력해주세요"),
    contentType: z.enum(["COACHING", "DOCUMENT"]),
    categoryId: z.string().min(1, "카테고리를 선택해주세요"),
    thumbnailUrl: z.string().min(1, "대표 이미지를 업로드해주세요"),
    serviceTarget: z.string().min(1, "콘텐츠 타겟을 입력해주세요"),
    serviceProcess: z.string().min(1, "제공 절차를 입력해주세요"),
    makerIntro: z.string().min(1, "메이커 소개를 입력해주세요"),
    // 둘중 하나만 있어야 함(coachingOptions, documentOptions)
    coachingOptions: z.array(coachingOptionSchema).optional(),
    documentOptions: z.array(documentOptionSchema).optional(),
  })
  .refine(
    (data) => {
      // 코칭 타입일 때만 코칭 옵션 검사
      if (data.contentType === "COACHING") {
        return data.coachingOptions && data.coachingOptions.length > 0;
      }
      return true;
    },
    {
      message: "최소 1개 이상의 코칭 옵션을 추가해주세요",
      path: ["coachingOptions"],
    },
  )
  .refine(
    (data) => {
      // 문서 타입일 때만 문서 옵션 검사
      if (data.contentType === "DOCUMENT") {
        return data.documentOptions && data.documentOptions.length > 0;
      }
      return true;
    },
    {
      message: "최소 1개 이상의 문서 옵션을 추가해주세요",
      path: ["documentOptions"],
    },
  );

export type ProductFormData = z.infer<typeof productSchema>;
export type CoachingOption = z.infer<typeof coachingOptionSchema>;
export type DocumentOption = z.infer<typeof documentOptionSchema>;
