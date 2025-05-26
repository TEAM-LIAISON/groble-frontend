// app/sitemap.ts
import type { MetadataRoute } from "next";
import { BASE_SITE_URL } from "@/lib/utils/seo";

// ISR: 24시간마다 재생성
export const revalidate = 86400;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = ["/", "/category/document", "/category/coach"].map(
    (path) => ({
      url: `${BASE_SITE_URL}${path}`,
      lastModified: new Date(),
      changeFrequency: path === "/" ? "daily" : "weekly",
      priority: path === "/" ? 1.0 : 0.8,
    }),
  );

  try {
    const products = await fetchProducts();
    const dynamicRoutes = products.map((p) => ({
      url: `${BASE_SITE_URL}/products/${p.contentId}`,
      lastModified: new Date(p.updatedAt),
      changeFrequency: "daily",
      priority: 0.9,
    }));

    return [...staticRoutes, ...dynamicRoutes] as MetadataRoute.Sitemap;
  } catch (error) {
    console.error("API 호출 실패, 정적 라우트만 반환:", error);
    // API 호출 실패시 정적 라우트만 반환
    return staticRoutes as MetadataRoute.Sitemap;
  }
}

// src/shared/api/products.ts
export interface Product {
  contentId: string;
  updatedAt: string;
}

export async function fetchProducts(): Promise<Product[]> {
  try {
    const apiBase = process.env.NEXT_PUBLIC_API_BASE;
    if (!apiBase) {
      console.warn("NEXT_PUBLIC_API_BASE가 설정되지 않았습니다.");
      return [];
    }

    const res = await fetch(`${apiBase}/api/v1/groble/contents`, {
      next: { revalidate: 86400 },
      // 타임아웃 설정 (10초)
      signal: AbortSignal.timeout(10000),
    });

    if (!res.ok) {
      throw new Error(`API 요청 실패: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    return data.data.dynamicContentResponses;
  } catch (error) {
    console.error("fetchProducts 에러:", error);
    // 에러 발생시 빈 배열 반환
    return [];
  }
}
