import { PageInfo } from '@/lib/api';

export interface SettlementMonthlyDetailResponse {
  settlementStartDate: string;
  settlementEndDate: string;
  scheduledSettlementDate: string;
  settlementAmount: number;
  pgFee: number;
  platformFee: number;
  vatAmount: number;
  isTaxInvoiceButtonEnabled: boolean;
  isTaxInvoiceIssuable: boolean;
  taxInvoiceUrl: string;
}

// 판매 내역 페이징 응답
export interface SettlementMonthlySalesHistoryResponse {
  items: SettlementMonthlySalesHistoryItem[];
  pageInfo: PageInfo;
}

// 판매 내역 아이템
export interface SettlementMonthlySalesHistoryItem {
  contentTitle: string;
  settlementAmount: number;
  purchasedAt: string;
}
