'use client';

import { Button, ButtonLoadingSpinner, TextField } from '@groble/ui';
import { useForm } from 'react-hook-form';
import { login } from '../model/loginServiceApi';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

type LoginFormData = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>();

  const mutation = useMutation({
    mutationFn: (data: LoginFormData) => login(data.email, data.password),
    onSuccess: () => {
      router.push('/');
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    mutation.mutate(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-5 items-start w-[30rem]"
    >
      <h1 className="text-title-3 text-label-normal font-bold">로그인 하기</h1>

      <TextField
        {...register('email', { required: true })}
        type="box"
        placeholder="이메일"
        className="w-[30rem]"
      />
      <TextField
        {...register('password', { required: true })}
        type="box"
        placeholder="비밀번호"
        className="w-[30rem]"
        inputType="password"
      />

      {/* 로그인 API 호출 에러 메시지 */}
      {mutation.isError && (
        <div className="w-full text-red-500 text-sm">
          {(mutation.error as Error).message}
        </div>
      )}

      <Button
        buttonType="submit"
        type="primary"
        size="medium"
        className="w-[30rem]"
        disabled={isSubmitting}
      >
        {isSubmitting ? <ButtonLoadingSpinner /> : '로그인하기'}
      </Button>
    </form>
  );
}
