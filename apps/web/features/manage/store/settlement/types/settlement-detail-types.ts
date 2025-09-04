import { PageInfo } from "@/lib/api";

export interface SettlementMonthlyDetailResponse {
  settlementId: number;
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
  orderStatus: "PAID" | "CANCEL_REQUEST" | "CANCELLED";
  purchasedAt: string;
}

// 세금 계산서 조회 응답
export interface SettlementInvoiceResponse {
  supplierName: string;
  recipientName: string;
  supplyAmount: number;
  vatAmount: number;
  totalAmount: number;
  invoiceNumber: string;
  issuedDate: string;
  taxInvoiceUrl: string;
}
