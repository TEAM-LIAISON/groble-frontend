'use client';

import { useEmailLogin } from '@/features/account/sign-in/model/useEmailLogin';
import LoadingSpinner from '@/shared/ui/LoadingSpinner';
import { Button, TextField } from '@groble/ui';
import { useForm } from 'react-hook-form';

type LoginFormValues = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const { login, loading, error } = useEmailLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = (data: LoginFormValues) => {
    login(data.email, data.password);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-3 w-full"
    >
      <TextField
        className="w-full"
        placeholder="이메일"
        {...register('email', {
          required: true,
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: '유효한 이메일 형식이 아닙니다.',
          },
        })}
      />

      <TextField
        className="w-full"
        inputType="password"
        placeholder="비밀번호"
        {...register('password', {
          required: true,
        })}
      />

      {error && <p className="text-status-error text-sm text-left">{error}</p>}

      <Button
        buttonType="submit"
        className="w-full"
        group="solid"
        type="primary"
        size="medium"
        disabled={loading}
      >
        {loading ? <LoadingSpinner /> : '로그인'}
      </Button>
    </form>
  );
}
