import { useSignUp } from '../model/SignUpContext';
import type { TermsType } from '../types/signUpState';

export const useTermsAgreement = (userType: 'maker' | 'buyer') => {
  const { state, dispatch } = useSignUp();

  // 필수 약관 정의
  const requiredTerms = [
    'AGE_POLICY',
    'PRIVACY_POLICY',
    'SERVICE_TERMS_POLICY',
  ] as TermsType[];

  if (userType === 'maker') {
    requiredTerms.push('SELLER_TERMS_POLICY');
  }

  // 필수 약관이 모두 체크되었는지 확인
  const requiredTermsChecked = requiredTerms.every((term) =>
    state.termsTypes.includes(term)
  );

  // 화면 매핑
  const agreements = {
    privacy: state.termsTypes.includes('PRIVACY_POLICY'),
    service: state.termsTypes.includes('SERVICE_TERMS_POLICY'),
    marketing: state.termsTypes.includes('MARKETING_POLICY'),
    age: state.termsTypes.includes('AGE_POLICY'),
    maker: state.termsTypes.includes('SELLER_TERMS_POLICY'),
    all: requiredTermsChecked && state.termsTypes.includes('MARKETING_POLICY'),
  };

  // 전체 동의 핸들러
  const handleAllAgree = (checked: boolean) => {
    if (checked) {
      // 모든 약관 동의 (필수 + 마케팅)
      const allTerms = [...requiredTerms, 'MARKETING_POLICY'] as TermsType[];
      dispatch({ type: 'SET_TERMS', payload: allTerms });
    } else {
      // 모든 약관 해제
      dispatch({ type: 'SET_TERMS', payload: [] });
    }
  };

  // 개별 약관 동의 핸들러
  const handleIndividualAgree =
    (key: keyof typeof agreements) => (checked: boolean) => {
      if (key === 'all') {
        return handleAllAgree(checked);
      }

      const typeMap: Record<
        Exclude<keyof typeof agreements, 'all'>,
        TermsType
      > = {
        privacy: 'PRIVACY_POLICY',
        service: 'SERVICE_TERMS_POLICY',
        marketing: 'MARKETING_POLICY',
        age: 'AGE_POLICY',
        maker: 'SELLER_TERMS_POLICY',
      };

      const type = typeMap[key];
      const next = checked
        ? [...state.termsTypes, type]
        : state.termsTypes.filter((t) => t !== type);
      dispatch({ type: 'SET_TERMS', payload: next });
    };

  return {
    agreements,
    requiredTermsChecked,
    handleAllAgree,
    handleIndividualAgree,
    signupType: state.signupType,
    userType: state.userType,
  };
};
