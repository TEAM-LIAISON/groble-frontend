export type VerificationStatus =
  | 'PENDING'
  | 'IN_PROGRESS'
  | 'FAILED'
  | 'VERIFIED';

export interface DashboardOverview {
  verificationStatus: VerificationStatus;
  totalRevenue: number; // 전체 총 수익 (원)
  totalSalesCount: number; // 전체 총 판매 건수
  currentMonthRevenue: number; // 이번 달 총 수익 (원)
  currentMonthSalesCount: number; // 이번 달 총 판매 건수
  totalMarketViews: number; // 마켓 전체 조회수
  totalContentViews: number; // 콘텐츠 전체 조회수
  totalCustomers: number; // 고객 전체수
  recentCustomers: number; // 신규 고객수 (최근 30일 기준)
}
