import { ApiResponse } from "../types/apiTypes";
import { ProductItemSummary } from "../types/productType";
import { apiFetch } from "./fetch";

type CoachingList = {
  items: ProductItemSummary[];
};

export async function getCoachingList(): Promise<ApiResponse<CoachingList>> {
  return apiFetch<CoachingList>("/api/v1/contents/coaching/category");
}
