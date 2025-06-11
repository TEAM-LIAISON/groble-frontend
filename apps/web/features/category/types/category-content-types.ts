import { ProductCardProps } from "@/entities/product/model";
import type { PaginationInfo } from "@/shared/types/page-types";

/** 카테고리 콘텐츠 목록 메타 정보 */
export interface CategoryListMeta {
  id: number; // categoryId 대신 간결히 'id' 사용
  name: string; // categoryName 대신 'name'
  sortBy: string;
  sortDirection: string;
}

/** 카테고리별 콘텐츠 목록 응답 */
export interface CategoryContentList {
  items: ProductCardProps[];
  pageInfo: PaginationInfo;
  meta: CategoryListMeta;
}

/** 리스트 상태 관리 타입 */
export type CategoryContentListState = {
  data: CategoryContentList;
  isLoading: boolean;
  error: string | null;
};

/** 카테고리 콘텐츠 옵션 정보 */
export interface CategoryContentOption {
  optionId: number;
  optionType: "COACHING_OPTION" | "DOCUMENT_OPTION";
  name: string;
  description: string;
  price: number;
  coachingPeriod?: string;
  documentProvision?: string;
  coachingType?: string;
  coachingTypeDescription?: string;
  deliveryMethod?: string; // contentDeliveryMethod 축약
  fileUrl?: string;
  documentFileUrl?: string;
}

/** 카테고리 콘텐츠 상세 응답 */
export interface CategoryContentDetail {
  contentId: number;
  status: string;
  thumbnailUrl: string;
  contentType: "COACHING" | "DOCUMENT";
  categoryId: number;
  title: string;
  sellerProfileImageUrl: string;
  sellerName: string;
  lowestPrice: number;
  options: CategoryContentOption[];
  contentIntroduction?: string;
  serviceTarget?: string;
  serviceProcess?: string;
  makerIntro?: string;
}
