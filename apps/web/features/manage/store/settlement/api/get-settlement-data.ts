import { fetchClient } from "@/shared/api/api-fetch";
import {
  SettlementHistoryResponse,
  SettlementSummaryResponse,
} from "../types/settlement-types";

export async function getSettlementData() {
  return fetchClient<SettlementSummaryResponse>("/api/v1/settlements/overview");
}

// 정산 내역 조회
export async function getSettlementHistory(page: number, size: number) {
  return fetchClient<SettlementHistoryResponse>(
    `/api/v1/settlements?page=${page}&size=${size}`
  );
}
