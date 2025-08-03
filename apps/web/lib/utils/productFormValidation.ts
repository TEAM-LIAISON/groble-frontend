import type { NewProductState } from '@/features/products/register/store/useNewProductStore';

/**
 * 상품 등록 폼의 유효성을 검사하는 함수
 * @param state 현재 NewProductStore 상태
 * @param step 검사할 스텝 (기본값: 1)
 * @returns 유효성 검사 결과 (true: 유효, false: 유효하지 않음)
 */
export const validateProductForm = (
  state: NewProductState,
  step = 1
): boolean => {
  // 스텝 1 유효성 검사 (기본 정보)
  if (step === 1) {
    // 제목, 카테고리, 썸네일, 콘텐츠 타입 필수
    if (
      !state.title ||
      !state.categoryId ||
      !state.thumbnailUrl ||
      !state.contentType
    ) {
      return false;
    }

    // 콘텐츠 타입에 따른 가격 옵션 검사
    if (
      state.contentType === 'COACHING' &&
      state.coachingOptions.length === 0
    ) {
      return false;
    }

    if (
      state.contentType === 'DOCUMENT' &&
      state.documentOptions.length === 0
    ) {
      return false;
    }

    // 가격 옵션 유효성 검사
    if (state.contentType === 'COACHING') {
      for (const option of state.coachingOptions) {
        if (
          !option.name ||
          !option.description ||
          // 가격이 0보다 작거나 같으면 유효하지 않음
          option.price < 0
        ) {
          return false;
        }
      }
    } else if (state.contentType === 'DOCUMENT') {
      for (const option of state.documentOptions) {
        if (
          !option.name ||
          !option.description ||
          option.price < 0 ||
          // 파일 또는 링크 중 하나는 있어야 함
          (!option.documentFileUrl && !option.documentLinkUrl)
        ) {
          return false;
        }
      }
    }

    return true;
  }

  // 스텝 2 유효성 검사 (콘텐츠 소개)
  if (step === 2) {
    return (
      !!state.contentIntroduction &&
      !!state.serviceTarget &&
      !!state.serviceProcess &&
      !!state.makerIntro &&
      state.contentDetailImageUrls.length > 0
    );
  }

  // 스텝 3 유효성 검사 (최종 확인)
  if (step === 3) {
    // 스텝 1과 스텝 2의 모든 유효성 검사를 통과해야 함
    return validateProductForm(state, 1) && validateProductForm(state, 2);
  }

  return false;
};
