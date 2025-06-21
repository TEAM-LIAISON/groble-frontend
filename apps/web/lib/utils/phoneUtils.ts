/**
 * 전화번호를 010-xxxx-xxxx 형식으로 포맷팅합니다
 * @param phoneNumber - 포맷팅할 전화번호 (숫자만 포함)
 * @returns 포맷팅된 전화번호 (010-xxxx-xxxx)
 */
export function formatPhoneNumber(phoneNumber: string): string {
  // 숫자만 추출
  const numbers = phoneNumber.replace(/\D/g, '');

  // 11자리가 아니면 그대로 반환
  if (numbers.length !== 11) {
    return numbers;
  }

  // 010-xxxx-xxxx 형식으로 포맷팅
  return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(
    7,
    11
  )}`;
}

/**
 * 입력값을 실시간으로 전화번호 형식으로 변환합니다
 * @param input - 사용자 입력값
 * @returns 포맷팅된 전화번호
 */
export function handlePhoneNumberInput(input: string): string {
  // 숫자만 추출
  const numbers = input.replace(/\D/g, '');

  // 11자리 초과 시 자르기
  const truncated = numbers.slice(0, 11);

  // 길이에 따라 포맷팅
  if (truncated.length <= 3) {
    return truncated;
  } else if (truncated.length <= 7) {
    return `${truncated.slice(0, 3)}-${truncated.slice(3)}`;
  } else {
    return `${truncated.slice(0, 3)}-${truncated.slice(3, 7)}-${truncated.slice(
      7
    )}`;
  }
}

/**
 * 전화번호가 유효한지 확인합니다 (010으로 시작하는 11자리)
 * @param phoneNumber - 확인할 전화번호
 * @returns 유효성 여부
 */
export function isValidPhoneNumber(phoneNumber: string): boolean {
  const numbers = phoneNumber.replace(/\D/g, '');
  return numbers.length === 11 && numbers.startsWith('010');
}
