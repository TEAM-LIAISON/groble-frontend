// 콘텐츠 개별 정보
export interface Content {
  contentId: string;
  createdAt: string;
  contentType: 'DOCUMENT' | 'COACHING' | string;
  sellerName: string;
  contentTitle: string;
  priceOptionLength: number;
  minPrice: number;
  contentStatus: 'DRAFT' | 'ACTIVE' | 'DELETED' | 'DISCONTINUED' | string;
  adminContentCheckingStatus: 'PENDING' | 'VALIDATED' | 'REJECTED' | string;
}
