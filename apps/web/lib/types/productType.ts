// 상품 상세 정보 타입
export interface ProductDetail {
  categoryId: number;
  contentId: number;
  thumbnailUrl: string;
  contentIntroduction: string;
  contentType: string;
  lowestPrice: number;
  makerIntro: string;
  options: ProductOption[];
  sellerName: string;
  sellerProfileImageUrl: string;
  serviceProcess: string;
  serviceTarget: string;
  status: 'ACTIVE' | 'DRAFT' | 'PENDING' | 'VALIDATED' | 'REJECTED';
  title: string;
}

export interface ProductOption {
  optionType: 'COACHING_OPTION' | 'DOCUMENT_OPTION';
  description: string;
  lowestPrice: number;
  name: string;
  optionId: number;
  price: number;
}
