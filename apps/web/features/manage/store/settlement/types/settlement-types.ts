import { VerificationStatus } from "@/features/profile";
import { PageInfo } from "@/lib/api";

/**
 * 정산 overview
 */
export type SettlementStatus =
  | "PENDING"
  | "IN_PROGRESS"
  | "VERIFIED"
  | "FAILED";

export interface SettlementSummaryResponse {
  verificationStatus: VerificationStatus;
  totalSettlementAmount: number;
  pendingSettlementAmount: number;
}

/**
 * 정산 내역
 */
export type SettlementHistoryStatus =
  | "PENDING" // 정산 예정
  | "PROCESSING" // 정산 진행중
  | "COMPLETED" // 정산 완료
  | "ON_HOLD" // 정산 보류
  | "CANCELLED"; // 정산 취소

export interface SettlementHistory {
  settlementId: string;
  settlementStartDate: string;
  settlementEndDate: string;
  settlementAmount: number;
  contentType: "DOCUMENT" | "COACHING";
  scheduledSettlementDate: string;
  settlementStatus: SettlementHistoryStatus;
}

// 정산 내역 페이징 응답
export interface SettlementHistoryResponse {
  items: SettlementHistory[];
  pageInfo: PageInfo;
}
