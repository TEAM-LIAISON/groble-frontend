import { ApiResponse } from "../types/apiTypes";
import { ProductItemSummary } from "../types/productType";
import { apiFetch } from "./fetch";

type HomeData = {
  coachingItems: ProductItemSummary[];
  documentItems: ProductItemSummary[];
};

export async function getHomeData(): Promise<ApiResponse<HomeData>> {
  return apiFetch<HomeData>("/api/v1/home/contents");
}
