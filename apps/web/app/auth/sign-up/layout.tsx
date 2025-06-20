import { SignUpProvider } from '@/features/account/sign-up/model/SignUpContext';
import React, { ReactNode } from 'react';

export default function Layout({
  children,
  params,
}: {
  children: ReactNode;
  params: { type?: string; userType?: string };
}) {
  const signupType = params.type === 'social' ? 'social' : 'email';
  const initialUserType = params.userType as 'maker' | 'buyer' | undefined;

  return (
    <SignUpProvider initialType={signupType} initialUserType={initialUserType}>
      {children}
    </SignUpProvider>
  );
}
