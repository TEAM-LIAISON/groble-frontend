import { fetchClient } from "@/shared/api/api-fetch";
import { ApiResponse } from "./content";
import { ProductCardProps } from "@/entities/product/model";

type HomeData = {
  coachingItems: ProductCardProps[];
  documentItems: ProductCardProps[];
};

export async function getHomeData(): Promise<ApiResponse<HomeData>> {
  // 캐시 안되게
  return fetchClient<HomeData>("/api/v1/home/contents", {
    cache: "no-store",
  });
}
