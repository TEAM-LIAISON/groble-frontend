// shared/api/types.ts

/**
 * 공통 API 응답 래퍼
 */
export interface ApiResponse<T> {
  status: string;
  code: number;
  message: string;
  data: T;
  timestamp: string;
}
