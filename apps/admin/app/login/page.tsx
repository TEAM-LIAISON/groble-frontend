// File: /apps/admin/app/login/page.tsx

import LoginForm from '@/features/auth/ui/LoginForm';

export default function LoginPage() {
  return (
    <div className={'h-[calc(100vh-64px)] flex justify-center items-center'}>
      <LoginForm />
    </div>
  );
}
