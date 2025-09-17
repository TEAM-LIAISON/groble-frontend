'use client';
import { CustomSelect } from '@groble/ui';
import FileUpload from '@/components/file-upload';
import { TextField } from '@groble/ui';
import { Controller } from 'react-hook-form';
import { uploadBusinessCertificate } from '../api/maker-api';
import type {
  useMakerCorporation,
  MakerCorporationFormValues,
} from '../hooks/useMakerCorporation';

interface MakerCorporationFormProps {
  form: ReturnType<typeof useMakerCorporation>['form'];
  handleFileUrlChange: (url: string | null) => void;
}

export default function MakerCorporationForm({
  form,
  handleFileUrlChange,
}: MakerCorporationFormProps) {
  const { control, register, watch } = form;

  // businessType 값을 실시간으로 감시
  const businessType = watch('businessType');
  const isSimplifiedBusiness = businessType === 'INDIVIDUAL_SIMPLIFIED';

  return (
    <form noValidate className=" space-y-5">
      <h1 className="text-heading-1 font-semibold text-label-normal md:text-title-3 md:font-bold">
        개인 • 법인 사업자
      </h1>
      <p className="mt-[0.12rem] text-body-2-normal font-medium text-label-alternative md:text-body-1-normal">
        사업자등록증과 동일하게 작성해 주세요
      </p>

      <Controller
        control={control}
        name="businessType"
        render={({ field }) => (
          <CustomSelect
            label="사업자 유형"
            placeholder='유형을 선택해주세요'
            options={[
              { label: '개인사업자 (간이)', value: 'INDIVIDUAL_SIMPLIFIED' },
              { label: '개인사업자 (일반)', value: 'INDIVIDUAL_NORMAL' },
              { label: '법인사업자', value: 'CORPORATE' },
            ]}
            value={field.value}
            onChange={field.onChange}
            type="grey"
          />
        )}
      />

      <TextField
        label="사업자 등록번호"
        placeholder="- 없이 번호만 입력해주세요"
        {...register('businessNumber', { required: true })}
      />

      <TextField
        label="상호명"
        placeholder="상호명을 입력해주세요"
        {...register('businessName', { required: true })}
      />

      <TextField
        label="사업장 소재지"
        placeholder="사업장 소재지를 입력해주세요"
        {...register('businessAddress', { required: true })}
      />

      <div className="flex flex-col gap-2">
        <p className="text-body-2 font-semibold text-label-normal">
          사업자등록증 사본
        </p>
        <FileUpload
          uploadApi={uploadBusinessCertificate}
          acceptedTypes={['.pdf', '.zip', '.jpeg', '.jpg', '.png']}
          acceptedMimeTypes={[
            'application/pdf',
            'application/zip',
            'application/x-zip-compressed',
            'image/jpeg',
            'image/png',
          ]}
          maxSizeInMB={10}
          uploadButtonText="파일 업로드"
          helpText={"* 10MB 이하의 PDF, JPEG, PNG 파일을\n업로드 해주세요"}
          initialFileUrl={watch('businessLicenseFileUrl') || undefined}
          onFileUrlChange={handleFileUrlChange}
        />
        <input
          type="hidden"
          {...register('businessLicenseFileUrl', {
            required: true,
          })}
        />
      </div>

      {/* 개인사업자(간이)가 아닐 때만 세금계산서 이메일 필드 표시 */}
      {!isSimplifiedBusiness && (
        <TextField
          label="세금계산서 수취 이메일"
          placeholder="이메일을 입력해주세요"
          {...register('taxInvoiceEmail', {
            required: !isSimplifiedBusiness,
            pattern: !isSimplifiedBusiness ? /^\S+@\S+$/ : undefined,
          })}
        />
      )}
    </form>
  );
}