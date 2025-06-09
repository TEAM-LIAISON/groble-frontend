export interface CursorRequest {
  cursor?: string;
  size?: number;
}

export interface PurchaseContentsParams {
  type: string; // DOCUMENT | COACHING
  state?: string; // PAID | EXPIRED | CANCELLED
  cursorRequest: CursorRequest;
}

export interface PurchaseContentItem {
  contentId: number;
  originalPrice: number | null;
  priceOptionLength: number;
  purchasedAt: string;
  sellerName: string;
  status: string;
  thumbnailUrl: string;
  title: string;
  orderStatus: string;
  contentType: string;
  finalPrice: number;
}

export interface PurchaseContentsResponse {
  items: PurchaseContentItem[];
  nextCursor?: string;
  hasNext: boolean;
  totalCount?: number;
}
