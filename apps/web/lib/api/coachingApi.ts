import { ProductCardProps } from "@/entities/product/model";
import { ApiResponse } from "./content";
import { fetchClient } from "@/shared/api/api-fetch";

type CoachingList = {
  items: ProductCardProps[];
};

export async function getCoachingList(): Promise<ApiResponse<CoachingList>> {
  return fetchClient<CoachingList>("/api/v1/contents/coaching/category");
}
