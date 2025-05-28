// entities/product/model/product-types.ts

import { PaginationInfo } from "@/shared/types/page-types";

/** 상품 카드 Props */
export type ProductCardProps = {
  contentId: string;
  thumbnailUrl: string;
  title: string;
  sellerName: string;
  lowestPrice: number;
  priceOptionLength: number;
};

/** 상품 리스트 Props */
export type ProductListProps = {
  title: string;
  products: ProductCardProps[];
  viewAllHref?: string;
  showViewAll?: boolean;
};

/** 상품 목록 API 응답 타입 */
export interface ProductListResponse {
  items: ProductCardProps[];
  pageInfo: PaginationInfo;
}

export type ProductContentType = "COACHING" | "DOCUMENT";

/** 상품 옵션 상세 타입 (기존 ProductOption → ProductOptionType) */
export interface ProductOptionType {
  optionId: number;
  optionType: "COACHING_OPTION" | "DOCUMENT_OPTION";
  name: string;
  description: string;
  price: number;
  coachingPeriod?: string;
  documentProvision?: string;
  coachingType?: string;
  coachingTypeDescription?: string;
  deliveryMethod?: string;
  fileUrl?: string;
  documentFileUrl?: string;
}

/** 상품 상세 API 응답 타입 (기존 ProductDetail → ProductDetailType) */
export interface ProductDetailType {
  contentId: number;
  status: "ACTIVE" | "DRAFT" | "PENDING" | "VALIDATED" | "REJECTED";
  thumbnailUrl: string;
  contentType: ProductContentType;
  categoryId: number;
  title: string;
  sellerProfileImageUrl: string;
  sellerName: string;
  lowestPrice: number;
  options: ProductOptionType[];
  contentIntroduction?: string;
  serviceTarget?: string;
  serviceProcess?: string;
  makerIntro?: string;
}
