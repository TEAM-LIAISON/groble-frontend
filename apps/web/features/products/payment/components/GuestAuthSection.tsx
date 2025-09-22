'use client';

import { useState, useEffect, useCallback } from 'react';
import { useGuestAuth } from '../hooks/useGuestAuth';
import GuestAuthPhoneStep from './GuestAuthPhoneStep';
import GuestAuthVerifyStep from './GuestAuthVerifyStep';
import GuestAuthInfoStep from './GuestAuthInfoStep';
import GuestAuthCompletedStep from './GuestAuthCompletedStep';

interface GuestAuthSectionProps {
  onAuthComplete: (isAuthenticated: boolean) => void;
  onValidateAuth?: () => boolean;
  onSavePaymentInfo?: () => void;
  onGuestInfoChange?: (info: { email: string; username: string; phoneNumber: string }) => void;
}

export default function GuestAuthSection({ onAuthComplete, onValidateAuth, onSavePaymentInfo, onGuestInfoChange }: GuestAuthSectionProps) {
  const {
    authState,
    setAuthState,
    setPhoneNumber,
    setEmail,
    requestAuthCode,
    verifyAuthCode,
    updateGuestUserInfo,
    setUsername,
    isLoading,
    error,
  } = useGuestAuth();

  const [authCode, setAuthCode] = useState('');

  // onAuthComplete를 useCallback으로 메모이제이션
  const handleAuthComplete = useCallback((isAuthenticated: boolean) => {
    onAuthComplete(isAuthenticated);
  }, [onAuthComplete]);

  useEffect(() => {
    console.log('🔍 GuestAuth 상태:', {
      authenticated: authState.authenticated,
      hasCompleteUserInfo: authState.hasCompleteUserInfo,
      authStep: authState.authStep,
      email: authState.email,
    });

    if (authState.authenticated && authState.hasCompleteUserInfo) {
      console.log('✅ 비회원 인증 완료 - onAuthComplete 호출');
      handleAuthComplete(true);
    }
  }, [authState.authenticated, authState.hasCompleteUserInfo, authState.authStep, authState.email, handleAuthComplete]);

  // info 단계에서는 자동 완료 없이 사용자가 모든 정보를 입력할 수 있도록 함
  // 완료는 결제 시점에 처리

  // onGuestInfoChange를 useCallback으로 메모이제이션
  const handleGuestInfoChange = useCallback((info: { email: string; username: string; phoneNumber: string }) => {
    if (onGuestInfoChange) {
      onGuestInfoChange(info);
    }
  }, [onGuestInfoChange]);

  // 비회원 정보가 변경될 때마다 외부로 전달
  useEffect(() => {
    if (authState.phoneNumber && authState.email) {
      handleGuestInfoChange({
        email: authState.email,
        phoneNumber: authState.phoneNumber,
        username: authState.username,
      });
    }
  }, [authState.phoneNumber, authState.email, authState.username, handleGuestInfoChange]);

  // updateGuestUserInfo를 useCallback으로 메모이제이션
  const handleUpdateGuestUserInfo = useCallback((data: { email: string; username: string }) => {
    updateGuestUserInfo(data);
  }, [updateGuestUserInfo]);

  const handleEmailBlur = useCallback(() => {
    // 이메일 형식 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = authState.email?.trim() && emailRegex.test(authState.email.trim());

    if (authState.authenticated && isEmailValid) {
      console.log('🔄 이메일 blur - 즉시 비회원 정보 저장...');
      handleUpdateGuestUserInfo({
        email: authState.email,
        username: authState.username,
      });
    }
  }, [authState.authenticated, authState.email, authState.username, handleUpdateGuestUserInfo]);

  // 이메일이 입력되었을 때 2초 후 자동으로 저장 (info 단계에서만)
  useEffect(() => {
    // 이메일 형식 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = authState.email?.trim() && emailRegex.test(authState.email.trim());

    if (
      authState.authenticated &&
      isEmailValid &&
      authState.authStep === 'info'
    ) {
      console.log('🔄 2초 후 자동으로 비회원 정보 저장...');

      const timer = setTimeout(() => {
        console.log('🔄 자동으로 비회원 정보 저장 중...');
        handleUpdateGuestUserInfo({
          email: authState.email,
          username: authState.username,
        });
      }, 2000);

      // 컴포넌트 언마운트나 의존성 변경 시 타이머 정리
      return () => clearTimeout(timer);
    }
  }, [authState.authenticated, authState.email, authState.authStep, authState.username, handleUpdateGuestUserInfo]);

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    const formattedValue = value.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
    setPhoneNumber(formattedValue);
  };

  const handleRequestCode = () => {
    if (!authState.phoneNumber) {
      alert('전화번호를 입력해주세요.');
      return;
    }

    requestAuthCode({ phoneNumber: authState.phoneNumber });
  };

  const handleVerifyCode = () => {
    if (!authCode) {
      alert('인증번호를 입력해주세요.');
      return;
    }

    verifyAuthCode({
      phoneNumber: authState.phoneNumber,
      authCode,
    });
  };

  const handleUpdateInfo = () => {
    if (!authState.email) {
      alert('이메일을 입력해주세요.');
      return;
    }

    updateGuestUserInfo({
      email: authState.email,
      username: authState.username,
    });
  };

  // 결제 시점에 호출되는 함수 - 비회원 인증 검증
  const validateGuestAuth = () => {
    // 휴대폰 인증이 완료되었는지 확인
    if (!authState.authenticated) {
      alert('휴대폰 인증을 완료해주세요.');
      return false;
    }

    // 이메일이 입력되었는지 확인
    if (!authState.email?.trim()) {
      alert('이메일을 입력해주세요.');
      return false;
    }

    // 이메일 형식 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(authState.email)) {
      alert('올바른 이메일 형식을 입력해주세요.');
      return false;
    }

    return true;
  };

  // 외부에서 호출할 수 있도록 함수 노출
  if (onValidateAuth) {
    onValidateAuth = validateGuestAuth;
  }

  if (onSavePaymentInfo) {
    onSavePaymentInfo = () => {
      if (!validateGuestAuth()) {
        return;
      }

      // 결제 정보와 함께 저장
      updateGuestUserInfo({
        email: authState.email,
        username: authState.username,
      });
    };
  }

  switch (authState.authStep) {
    case 'phone':
      return (
        <GuestAuthPhoneStep
          phoneNumber={authState.phoneNumber}
          onPhoneNumberChange={handlePhoneNumberChange}
          onRequestCode={handleRequestCode}
          isLoading={isLoading}
          error={error}
        />
      );

    case 'verify':
      return (
        <GuestAuthVerifyStep
          phoneNumber={authState.phoneNumber}
          authCode={authCode}
          onAuthCodeChange={(e) => setAuthCode(e.target.value.replace(/[^0-9]/g, ''))}
          onVerifyCode={handleVerifyCode}
          isLoading={isLoading}
          error={error}
        />
      );

    case 'info':
      return (
        <GuestAuthInfoStep
          phoneNumber={authState.phoneNumber}
          email={authState.email}
          username={authState.username}
          onEmailChange={(e) => setEmail(e.target.value)}
          onUsernameChange={(e) => setUsername(e.target.value)}
          onUpdateInfo={handleUpdateInfo}
          isLoading={isLoading}
          error={error}
        />
      );

    case 'completed':
      return (
        <GuestAuthCompletedStep
          phoneNumber={authState.phoneNumber}
          email={authState.email}
          onEmailChange={(e) => setEmail(e.target.value)}
          onEmailBlur={handleEmailBlur}
        />
      );

    default:
      return null;
  }
}
