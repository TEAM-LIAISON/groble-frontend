import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { registerMakerBusiness } from '../api/maker-api';

export type MakerCorporationFormValues = {
  businessType: 'INDIVIDUAL_SIMPLIFIED' | 'INDIVIDUAL_NORMAL' | 'CORPORATE';
  businessCategory: string;
  businessSector: string;
  businessName: string;
  representativeName: string;
  businessAddress: string;
  businessLicenseFileUrl: string;
  taxInvoiceEmail: string;
};

export const useMakerCorporation = () => {
  const router = useRouter();

  const form = useForm<MakerCorporationFormValues>({
    mode: 'onChange',
    defaultValues: {
      businessType: 'INDIVIDUAL_SIMPLIFIED',
      businessCategory: '',
      businessSector: '',
      businessName: '',
      representativeName: '',
      businessAddress: '',
      businessLicenseFileUrl: '',
      taxInvoiceEmail: '',
    },
  });

  const {
    setValue,
    formState: { errors, isValid, isSubmitting },
  } = form;

  const onSubmit = async (data: MakerCorporationFormValues) => {
    try {
      await registerMakerBusiness(data);
      router.push(`/users/maker/complete?type=corporate`);
    } catch (error) {
      console.error('API 요청 실패:', error);
    }
  };

  const handleFileUrlChange = (url: string | null) => {
    setValue('businessLicenseFileUrl', url || '', { shouldValidate: true });
  };

  return {
    form,
    errors,
    isValid,
    isSubmitting,
    onSubmit,
    handleFileUrlChange,
    handleSubmit: form.handleSubmit(onSubmit),
  };
};
