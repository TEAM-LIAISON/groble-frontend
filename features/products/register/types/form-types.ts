// File: src/features/products/register/types/form-types.ts

import { z } from "zod";
import {
  coachingOptionSchema,
  documentOptionSchema,
  productSchema,
} from "@/lib/schemas/productSchema";

/**
 * react-hook-form 에 사용될, productSchema 로부터 유추된 전체 폼 데이터 타입
 */

/** 메인 폼 전체 데이터 타입 */
export type ProductFormData = z.infer<typeof productSchema>;

/** 코칭 옵션 폼 단위 타입 */
export type CoachingOptionForm = z.infer<typeof coachingOptionSchema>;

/** 문서 옵션 폼 단위 타입 */
export type DocumentOptionForm = z.infer<typeof documentOptionSchema>;
