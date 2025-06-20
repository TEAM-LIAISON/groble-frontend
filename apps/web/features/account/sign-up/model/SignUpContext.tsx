'use client';
import { createContext, ReactNode, useContext, useReducer } from 'react';
import { FlowType, SignUpState, UserType } from '../types/signUpState';
import { SignUpAction } from '../types/signUpActions';

const Context = createContext<{
  state: SignUpState;
  dispatch: React.Dispatch<SignUpAction>;
} | null>(null);

function reducer(state: SignUpState, action: SignUpAction): SignUpState {
  switch (action.type) {
    case 'SET_USER_TYPE':
      return { ...state, userType: action.payload };
    case 'SET_TERMS':
      return { ...state, termsTypes: action.payload };
    case 'SET_EMAIL':
      return { ...state, email: action.payload };
    case 'SET_PASSWORD':
      return { ...state, password: action.payload };
    default:
      return state;
  }
}

export function SignUpProvider({
  children,
  initialType,
  initialUserType,
}: {
  children: ReactNode;
  initialType: FlowType;
  initialUserType?: UserType;
}) {
  const initialState: SignUpState = {
    signupType: initialType,
    termsTypes: [],
    userType: initialUserType,
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
}

export function useSignUp() {
  const context = useContext(Context);
  if (!context) {
    throw new Error('useSignUp must be used within a SignUpProvider');
  }
  return context;
}
