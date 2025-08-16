import { VerificationStatus } from '@/features/profile';

export type SettlementStatus =
  | 'PENDING'
  | 'IN_PROGRESS'
  | 'VERIFIED'
  | 'FAILED';

export interface SettlementSummaryResponse {
  verificationStatus: VerificationStatus;
  totalSettlementAmount: number;
  currentMonthSettlementAmount: number;
}
