'use client';
import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from 'react';
import type { SignUpAction } from '../types/signUpActions';
import type {
  FlowType,
  SignUpState,
  StorageSignUpState,
  UserType,
} from '../types/signUpState';

const STORAGE_KEY = 'groble_signup_state';

const Context = createContext<{
  state: SignUpState;
  dispatch: React.Dispatch<SignUpAction>;
  clearStorage: () => void;
} | null>(null);

// URL에서 type 파라미터 확인
function getSignupTypeFromUrl(): FlowType | null {
  if (typeof window === 'undefined') return null;

  const urlParams = new URLSearchParams(window.location.search);
  const type = urlParams.get('type');

  if (type === 'email' || type === 'social') {
    return type;
  }

  return null;
}

// sessionStorage에서 상태 불러오기 (email 타입일 때만)
function loadStateFromStorage(): StorageSignUpState | null {
  if (typeof window === 'undefined') return null;

  const signupType = getSignupTypeFromUrl();

  // email 타입이 아니면 세션 스토리지 사용하지 않음
  if (signupType !== 'email') return null;

  try {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsedState = JSON.parse(saved);
      // signupType은 제외하고 반환 (URL에서 관리)
      const { signupType: _, ...stateWithoutSignupType } = parsedState;
      return stateWithoutSignupType;
    }
    return null;
  } catch (error) {
    console.error('Failed to load state from sessionStorage:', error);
    return null;
  }
}

// sessionStorage에 상태 저장하기 (email 타입일 때만)
function saveStateToStorage(state: SignUpState): void {
  if (typeof window === 'undefined') return;

  const signupType = getSignupTypeFromUrl();

  // email 타입이 아니면 세션 스토리지 사용하지 않음
  if (signupType !== 'email') return;

  try {
    // signupType은 제외하고 저장 (URL에서 관리)
    const { signupType: _, ...stateWithoutSignupType } = state;
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(stateWithoutSignupType));
  } catch (error) {
    console.error('Failed to save state to sessionStorage:', error);
  }
}

// sessionStorage 정리하기
function clearStorage(): void {
  if (typeof window === 'undefined') return;

  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear sessionStorage:', error);
  }
}

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

// lazy init 함수
function initializeState(initialState: SignUpState): SignUpState {
  const savedState = loadStateFromStorage();

  if (savedState) {
    // 저장된 상태가 있으면 복원하되, signupType은 현재 props를 우선
    return {
      ...initialState,
      ...savedState,
    };
  }

  return initialState;
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
  // URL에서 type 파라미터 가져오기 (있으면 우선 사용)
  const urlSignupType = getSignupTypeFromUrl();
  const actualSignupType = urlSignupType || initialType;

  const initialState: SignUpState = {
    signupType: actualSignupType,
    termsTypes: [],
    userType: initialUserType,
  };

  const [state, dispatch] = useReducer(reducer, initialState, initializeState);

  // 상태 변경 시마다 sessionStorage에 저장 (email 타입일 때만)
  useEffect(() => {
    saveStateToStorage(state);
  }, [state]);

  return (
    <Context.Provider value={{ state, dispatch, clearStorage }}>
      {children}
    </Context.Provider>
  );
}

export function useSignUp() {
  const context = useContext(Context);
  if (!context) {
    throw new Error('useSignUp must be used within a SignUpProvider');
  }
  return context;
}

// 외부에서 sessionStorage를 정리할 수 있는 유틸리티 함수
export { clearStorage as clearSignUpStorage };
