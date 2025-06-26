// File: features/account/sign-up/types/signUpActions.ts

import { SignUpState, TermsType, UserType } from './signUpState';

export type SignUpAction =
  | { type: 'SET_USER_TYPE'; payload: UserType }
  | { type: 'SET_TERMS'; payload: TermsType[] }
  | { type: 'SET_EMAIL'; payload: string }
  | { type: 'SET_PASSWORD'; payload: string };
