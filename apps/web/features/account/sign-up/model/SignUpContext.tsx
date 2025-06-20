'use client';
import {
  createContext,
  ReactNode,
  useContext,
  useReducer,
  useEffect,
} from 'react';
import { FlowType, SignUpState, UserType } from '../types/signUpState';
import { SignUpAction } from '../types/signUpActions';

const STORAGE_KEY = 'groble_signup_state';

const Context = createContext<{
  state: SignUpState;
  dispatch: React.Dispatch<SignUpAction>;
  clearStorage: () => void;
} | null>(null);

// sessionStorage에서 상태 불러오기
function loadStateFromStorage(): SignUpState | null {
  if (typeof window === 'undefined') return null;

  try {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch (error) {
    console.error('Failed to load state from sessionStorage:', error);
    return null;
  }
}

// sessionStorage에 상태 저장하기
function saveStateToStorage(state: SignUpState): void {
  if (typeof window === 'undefined') return;

  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
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
      ...savedState,
      signupType: initialState.signupType,
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
  const initialState: SignUpState = {
    signupType: initialType,
    termsTypes: [],
    userType: initialUserType,
  };

  const [state, dispatch] = useReducer(reducer, initialState, initializeState);

  // 상태 변경 시마다 sessionStorage에 저장
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
