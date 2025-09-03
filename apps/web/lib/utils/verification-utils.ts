import type { VerificationStatus } from "@/features/profile";

/**
 * 인증 상태가 진행 중이거나 실패한 상태인지 확인
 * @param status 인증 상태
 * @returns 진행 중이거나 실패한 상태인 경우 true
 */
export const isVerificationInProgressOrFailed = (
  status?: VerificationStatus
): boolean => {
  return status === "PENDING" || status === "FAILED";
};

/**
 * 인증 상태가 완료된 상태인지 확인
 * @param status 인증 상태
 * @returns 완료된 상태인 경우 true
 */
export const isVerificationCompleted = (
  status?: VerificationStatus
): boolean => {
  return status === "VERIFIED";
};

/**
 * 인증 상태가 진행 중인 상태인지 확인
 * @param status 인증 상태
 * @returns 진행 중인 상태인 경우 true
 */
export const isVerificationInProgress = (
  status?: VerificationStatus
): boolean => {
  return status === "IN_PROGRESS";
};

/**
 * 인증 상태가 실패한 상태인지 확인
 * @param status 인증 상태
 * @returns 실패한 상태인 경우 true
 */
export const isVerificationFailed = (status?: VerificationStatus): boolean => {
  return status === "FAILED";
};
