// File: src/features/home/api/home-api.ts
import type { ApiResponse } from "@/shared/types/api-types";
import type { ProductCardProps } from "@/entities/product/model/product-types";
import { fetchServerSide } from "@/shared/api/fetch-ssr";

export interface HomeDataType {
  coachingItems: ProductCardProps[];
  documentItems: ProductCardProps[];
}

/** 홈화면용 콘텐츠 조회 (SSR) */
export async function fetchHomeData(): Promise<ApiResponse<HomeDataType>> {
  return fetchServerSide<ApiResponse<HomeDataType>>("/api/v1/home/contents", {
    cache: "no-store",
  });
}
