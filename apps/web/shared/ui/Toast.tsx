'use client';

import toast, { Toaster, ToastOptions } from 'react-hot-toast';

// 토스트 스타일 옵션
const defaultToastOptions: ToastOptions = {
  duration: 4000,
  position: 'bottom-center',
  style: {
    background: '#333',
    color: '#fff',
    padding: '12px 16px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '500',
    maxWidth: '400px',
    textAlign: 'center',
  },
};

// 토스트 타입별 스타일
const toastStyles = {
  success: {
    background: '#10B981',
    color: '#fff',
  },
  error: {
    background: '#EF4444',
    color: '#fff',
  },
  warning: {
    background: '#F59E0B',
    color: '#fff',
  },
  info: {
    background: '#3B82F6',
    color: '#fff',
  },
};

// 토스트 유틸리티 함수들
export const showToast = {
  success: (message: string, options?: ToastOptions) =>
    toast.success(message, {
      ...defaultToastOptions,
      style: { ...defaultToastOptions.style, ...toastStyles.success },
      ...options,
    }),

  error: (message: string, options?: ToastOptions) =>
    toast.error(message, {
      ...defaultToastOptions,
      style: { ...defaultToastOptions.style, ...toastStyles.error },
      ...options,
    }),

  warning: (message: string, options?: ToastOptions) =>
    toast(message, {
      ...defaultToastOptions,
      style: { ...defaultToastOptions.style, ...toastStyles.warning },
      icon: '⚠️',
      ...options,
    }),

  info: (message: string, options?: ToastOptions) =>
    toast(message, {
      ...defaultToastOptions,
      style: { ...defaultToastOptions.style, ...toastStyles.info },
      icon: 'ℹ️',
      ...options,
    }),

  // 기본 토스트
  default: (message: string, options?: ToastOptions) =>
    toast(message, {
      ...defaultToastOptions,
      ...options,
    }),
};

// 토스트 Provider 컴포넌트
export function ToastProvider() {
  return (
    <Toaster
      position="bottom-center"
      reverseOrder={false}
      gutter={8}
      containerClassName=""
      containerStyle={{}}
      toastOptions={defaultToastOptions}
    />
  );
}

// 토스트 훅 (편의성을 위한)
export function useToast() {
  return showToast;
}
