// File: features/account/sign-up/types/signUpState.ts

export type FlowType = 'social' | 'email';
export type UserType = 'maker' | 'buyer';
export type TermsType =
  | 'AGE_POLICY'
  | 'PRIVACY_POLICY'
  | 'SERVICE_TERMS_POLICY'
  | 'SELLER_TERMS_POLICY'
  | 'MARKETING_POLICY';

export interface SignUpState {
  signupType: FlowType;
  userType?: UserType;
  termsTypes: TermsType[];
  email?: string;
  password?: string;
}
