import { useForm } from 'react-hook-form';
import { useRouter, useSearchParams } from 'next/navigation';
import { registerMakerBankAccount } from '../api/maker-api';

export type MakerInfoFormValues = {
  bankAccountOwner: string;
  bankName: string;
  bankAccountNumber: string;
  copyOfBankbookUrl: string;
};

export const useMakerInfo = () => {
  const searchParams = useSearchParams();
  const type = searchParams.get('type');
  const router = useRouter();

  const form = useForm<MakerInfoFormValues>({
    mode: 'onChange',
    defaultValues: {
      bankAccountOwner: '',
      bankName: '',
      bankAccountNumber: '',
      copyOfBankbookUrl: '',
    },
  });

  const {
    setValue,
    formState: { errors, isValid, isSubmitting },
  } = form;

  const onSubmit = async (data: MakerInfoFormValues) => {
    try {
      await registerMakerBankAccount(data, type as 'private' | 'corporate');

      if (type === 'private') {
        router.push(`/users/maker/complete?type=${type}`);
      } else {
        router.push(`/users/maker/corporation-cert?type=${type}`);
      }
    } catch (error) {
      console.error('API 요청 실패:', error);
    }
  };

  const handleFileUrlChange = (url: string | null) => {
    setValue('copyOfBankbookUrl', url || '', { shouldValidate: true });
  };

  return {
    form,
    type,
    errors,
    isValid,
    isSubmitting,
    onSubmit,
    handleFileUrlChange,
    handleSubmit: form.handleSubmit(onSubmit),
  };
};
