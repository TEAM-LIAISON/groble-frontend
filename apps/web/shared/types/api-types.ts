/**
 * API 응답 기본 타입
 */
export interface ApiResponse<T> {
  status: string;
  code: number;
  message: string;
  data: T;
  timestamp: string;
}

/**
 * API 에러 타입
 */
export interface ApiError {
  status: string;
  code: number;
  message: string;
  timestamp: string;
}

/**
 * API 필터 옵션 타입
 */
export interface ApiFilterOptions {
  categoryId?: string | null;
  page?: number;
  size?: number;
  sort?: string;
}
