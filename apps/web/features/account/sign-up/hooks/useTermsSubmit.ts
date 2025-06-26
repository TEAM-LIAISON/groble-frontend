import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSignUp } from '../model/SignUpContext';
import { useSignUpSocial } from './useSignUpSocial';

export const useTermsSubmit = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userType = searchParams.get('userType') as 'maker' | 'buyer';
  const { state, dispatch } = useSignUp();
  const signUpSocialMutation = useSignUpSocial();
  const [showMarketingModal, setShowMarketingModal] = useState(false);

  // userType을 Context에 설정
  useEffect(() => {
    if (userType && userType !== state.userType) {
      dispatch({ type: 'SET_USER_TYPE', payload: userType });
    }
  }, [userType, state.userType, dispatch]);

  // 마케팅 약관 동의 여부 확인
  const isMarketingAgreed = state.termsTypes.includes('MARKETING_POLICY');

  // 계속하기 버튼 클릭 핸들러
  const handleContinue = async () => {
    // 마케팅 약관에 동의하지 않았으면 모달 표시
    if (!isMarketingAgreed) {
      setShowMarketingModal(true);
      return;
    }

    // 실제 회원가입 진행
    proceedSignUp();
  };

  // 실제 회원가입 진행 함수
  const proceedSignUp = () => {
    console.log(state);
    if (state.signupType === 'social') {
      const currentUserType = state.userType || userType;
      // userType 매핑: maker -> SELLER, buyer -> BUYER
      const mappedUserType = currentUserType === 'maker' ? 'SELLER' : 'BUYER';

      // BUYER인 경우 SELLER_TERMS_POLICY 제거하여 4개 항목만 유지
      let filteredTermsTypes = state.termsTypes;
      if (currentUserType === 'buyer') {
        filteredTermsTypes = state.termsTypes.filter(
          (term) => term !== 'SELLER_TERMS_POLICY'
        );

        // 혹시 5개가 포함되어 있으면 4개만 유지 (SELLER_TERMS_POLICY 제거)
        if (filteredTermsTypes.length > 4) {
          filteredTermsTypes = filteredTermsTypes.slice(0, 4);
        }
      }

      // 소셜 회원가입: API 호출 후 complete 페이지로 이동
      signUpSocialMutation.mutate({
        userType: mappedUserType,
        termsTypes: filteredTermsTypes,
      });
    } else {
      // 이메일 회원가입: email 페이지로 이동
      router.push('/auth/sign-up/email');
    }
  };

  // 마케팅 약관 동의하고 진행
  const handleAgreeMarketing = () => {
    // 마케팅 약관 추가
    dispatch({
      type: 'SET_TERMS',
      payload: [...state.termsTypes, 'MARKETING_POLICY'],
    });
    setShowMarketingModal(false);
    // 약간의 딜레이 후 진행 (상태 업데이트 완료 후)
    setTimeout(proceedSignUp, 100);
  };

  // 마케팅 약관 동의 없이 진행
  const handleProceedWithoutMarketing = () => {
    setShowMarketingModal(false);
    proceedSignUp();
  };

  return {
    userType,
    handleContinue,
    isLoading: signUpSocialMutation.isPending,
    showMarketingModal,
    setShowMarketingModal,
    handleAgreeMarketing,
    handleProceedWithoutMarketing,
  };
};
