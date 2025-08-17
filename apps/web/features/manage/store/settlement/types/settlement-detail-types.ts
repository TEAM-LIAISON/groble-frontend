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
