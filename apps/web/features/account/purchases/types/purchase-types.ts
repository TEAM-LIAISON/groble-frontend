import { CursorRequest } from '@/lib/api';

export interface PurchaseContentsParams {
  cursorRequest: CursorRequest;
  state?: string;
}

export interface PurchaseContentTypes {
  content: Array<{
    contentId: number;
    title: string;
    thumbnailUrl: string;
    price: number;
    purchaseId: number;
    purchaseState: 'PENDING' | 'PAID' | 'EXPIRED' | 'CANCELLED';
    purchaseDate: string;
    optionName: string;
    sellerName: string;
    contentType: 'COACHING' | 'DOCUMENT';
  }>;
  hasNext: boolean;
  nextCursor: string | null;
}
