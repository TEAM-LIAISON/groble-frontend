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
      // 개인사업자(간이)인 경우 taxInvoiceEmail 필드를 제외한 payload 생성
      let payload: any;

      if (data.businessType === 'INDIVIDUAL_SIMPLIFIED') {
        // taxInvoiceEmail 필드를 제외한 새로운 객체 생성
        const { taxInvoiceEmail, ...rest } = data;
        payload = rest;
      } else {
        payload = data;
      }

      await registerMakerBusiness(payload);
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
