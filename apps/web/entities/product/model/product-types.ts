// entities/product/model/product-types.ts

import { PaginationInfo } from '@/shared/types/page-types';

/** 드롭다운 메뉴 아이템 타입 */
export interface DropdownMenuItem {
  label: string;
  onClick: () => void;
  icon?: React.ReactNode;
  destructive?: boolean;
}

/** 기본 상품 카드 Props (기존 호환성 유지) */
export type BasicProductCardProps = {
  contentId: string | number;
  thumbnailUrl: string;
  title: string;
  sellerName: string;
  lowestPrice?: number;
  priceOptionLength?: number;
};

/** 확장된 상품 카드 Props */
export type ProductCardProps = BasicProductCardProps & {
  // 기존 속성들 (선택적으로 변경)
  lowestPrice?: number;
  priceOptionLength?: number;

  // 새로운 속성들
  state?: boolean; // 제목 위에 결제 상태 + 구매 시간 표시 (기본값 false)
  star?: boolean; // 가격 아래 별점 표시 유무 (기본값 false)
  dot?: boolean; // 제목 오른편에 더보기 dot 표시 (기본값 false)
  isRow?: boolean; // 가로/세로 레이아웃 모드 (기본값 false - 세로)

  // 상태 관련 데이터 (state가 true일 때만 사용)
  orderStatus?: 'PAID' | 'EXPIRED' | 'CANCELLED';
  purchasedAt?: string;
  merchantUid?: string; // 주문 고유 ID (구매 관리용 라우팅에 사용)

  // 별점 관련 데이터 (star가 true일 때만 사용)
  rating?: number;

  // 옵션 관련 데이터 (optionName이 있으면 자동 표시)
  optionName?: string;

  // 드롭다운 메뉴 관련 (dot이 true일 때만 사용)
  dropdownItems?: DropdownMenuItem[];

  // 가격 표시용 (값이 있으면 자동 표시)
  finalPrice?: number;
  originalPrice?: number;
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

export type ProductContentType = 'COACHING' | 'DOCUMENT';

/** 상품 옵션 상세 타입 (기존 ProductOption → ProductOptionType) */
export interface ProductOptionType {
  optionId: number;
  optionType: 'COACHING_OPTION' | 'DOCUMENT_OPTION';
  name: string;
  description: string;
  price: number;
  coachingPeriod?: string;
  documentProvision?: string;
  coachingType?: string;
  coachingTypeDescription?: string;
  contentDeliveryMethod?: string;
  deliveryMethod?: string;
  fileUrl?: string;
  documentFileUrl?: string;
}

/** 상품 상세 API 응답 타입 (기존 ProductDetail → ProductDetailType) */
export interface ProductDetailType {
  contentId: number;
  status: 'ACTIVE' | 'DRAFT' | 'PENDING' | 'VALIDATED' | 'REJECTED';
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
