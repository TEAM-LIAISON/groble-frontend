import { ApiResponse } from "../types/apiTypes";
import { ProductItemSummary } from "../types/productType";
import { apiFetch } from "./fetch";

type HomeData = {
  coachingItems: ProductItemSummary[];
  documentItems: ProductItemSummary[];
};

export async function getHomeData(): Promise<ApiResponse<HomeData>> {
  // 캐시 안되게
  return apiFetch<HomeData>("/api/v1/home/contents", {
    cache: "no-store",
  });
}
