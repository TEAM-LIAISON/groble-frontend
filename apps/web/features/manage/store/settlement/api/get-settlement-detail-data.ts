import { fetchClient } from '@/shared/api/api-fetch';
import {
  SettlementInvoiceResponse,
  SettlementMonthlyDetailResponse,
  SettlementMonthlySalesHistoryResponse,
} from '../types/settlement-detail-types';

export async function getSettlementMonthlyDetail(yearMonth: string) {
  return fetchClient<SettlementMonthlyDetailResponse>(
    `/api/v1/settlements/${yearMonth}`
  );
}

// 판매 내역 조회
export async function getSettlementMonthlySalesHistory(
  yearMonth: string,
  page: number,
  size: number
) {
  return fetchClient<SettlementMonthlySalesHistoryResponse>(
    `/api/v1/settlements/sales/${yearMonth}?page=${page}&size=${size}`
  );
}

// 세금 계산서 조회
export async function getSettlementInvoice(year: string) {
  return fetchClient<SettlementInvoiceResponse>(
    `/api/v1/settlements/tax-invoice/${year}`
  );
}
