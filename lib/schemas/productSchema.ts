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
  name: z.string().min(1),
  description: z.string().min(1),
  price: z.number().min(0),
  coachingPeriod: z.enum(["ONE_DAY", "TWO_TO_SIX_DAYS", "MORE_THAN_ONE_WEEK"]),
  documentProvision: z.enum(["PROVIDED", "NOT_PROVIDED"]),
  coachingType: z.enum(["ONLINE", "OFFLINE"]),
  coachingTypeDescription: z.string().min(1),
});

/** 문서 전용 옵션 */
export const documentOptionSchema = z
  .object({
    optionId: z.number(),
    name: z.string().min(1),
    description: z.string().min(1),
    price: z.number().min(0),
    contentDeliveryMethod: z.enum(["IMMEDIATE_DOWNLOAD", "FUTURE_UPLOAD"], {
      required_error: "제공 방식을 선택해주세요",
    }),
    documentFileUrl: z.string().nullable().optional(),
    documentLinkUrl: z.string().nullable().optional(),
  })
  .refine(
    (d) =>
      d.contentDeliveryMethod !== "IMMEDIATE_DOWNLOAD" ||
      Boolean(d.documentFileUrl || d.documentLinkUrl),
    {
      message: "즉시 다운로드시 파일 또는 링크 중 하나를 제공해야 합니다",
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
export const productSchema = z.discriminatedUnion("contentType", [
  coachingSchema,
  documentSchema,
]);

export type ProductFormData = z.infer<typeof productSchema>;
export type CoachingOption = z.infer<typeof coachingOptionSchema>;
export type DocumentOption = z.infer<typeof documentOptionSchema>;
