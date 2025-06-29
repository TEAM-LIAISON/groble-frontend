'use client';

import { Button, TextField } from '@groble/ui';
import { CustomSelect } from '@groble/ui';
import { ButtonLoadingSpinner } from '@groble/ui';
import { Controller } from 'react-hook-form';
import { BANK_OPTIONS } from '@/shared/data/bank-data';
import FileUpload from '@/components/file-upload';
import { uploadBankbookCopy } from '../api/maker-api';
import { useMakerInfo } from '../hooks/useMakerInfo';

export default function MakerInfoForm() {
  const {
    form,
    type,
    errors,
    isValid,
    isSubmitting,
    onSubmit,
    handleFileUrlChange,
    handleSubmit,
    buttonText,
  } = useMakerInfo();

  const { register, control, watch } = form;

  return (
    <>
      <form noValidate className="space-y-5">
        <h1 className="text-heading-1 font-semibold text-label-normal md:text-title-3 md:font-bold">
          {type === 'private' ? '개인 메이커' : '개인 • 법인 사업자'}
        </h1>

        {/* 이름 */}
        <TextField
          label="이름"
          placeholder="실명을 입력해주세요"
          {...register('bankAccountOwner', {
            required: '이름을 입력해주세요',
            minLength: {
              value: 2,
              message: '이름은 2자 이상 입력해주세요',
            },
          })}
          error={!!errors.bankAccountOwner}
        />
        {errors.bankAccountOwner && (
          <p className="text-body-2-normal text-status-error">
            {errors.bankAccountOwner.message}
          </p>
        )}

        {/* 은행 */}
        <Controller
          name="bankName"
          control={control}
          rules={{ required: '은행을 선택해주세요' }}
          render={({ field, fieldState }) => (
            <CustomSelect
              label="정산 받을 은행"
              placeholder="은행을 선택해주세요"
              options={BANK_OPTIONS}
              value={field.value}
              onChange={(e) => field.onChange(e.target.value)}
              error={!!fieldState.error}
              type="grey"
            />
          )}
        />
        {errors.bankName && (
          <p className="text-body-2-normal text-status-error">
            {errors.bankName.message}
          </p>
        )}

        {/* 계좌번호 */}
        <TextField
          label="정산 받을 계좌"
          placeholder="계좌번호를 입력해주세요"
          {...register('bankAccountNumber', {
            required: '계좌번호를 입력해주세요',
            pattern: {
              value: /^[0-9]{4,20}$/,
              message: '계좌번호는 4~20자리 숫자로 입력해주세요',
            },
          })}
          error={!!errors.bankAccountNumber}
        />
        {errors.bankAccountNumber && (
          <p className="text-body-2-normal text-status-error">
            {errors.bankAccountNumber.message}
          </p>
        )}

        <div className="flex flex-col gap-2">
          <p className="text-body-2 font-semibold text-label-normal">
            통장 사본 첨부
          </p>
          <FileUpload
            uploadApi={uploadBankbookCopy}
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
            helpText="* 10MB 이하의 PDF, ZIP, 이미지 파일"
            initialFileUrl={watch('copyOfBankbookUrl') || undefined}
            onFileUrlChange={handleFileUrlChange}
          />

          {/* 숨겨진 input을 등록해서 검증 */}
          <input
            type="hidden"
            {...register('copyOfBankbookUrl', {
              required: '통장 사본을 업로드해주세요',
            })}
          />

          {/* 파일 업로드 에러 메시지 표시 */}
          {errors.copyOfBankbookUrl && (
            <p className="text-body-2-normal text-status-error">
              {errors.copyOfBankbookUrl.message}
            </p>
          )}
        </div>

        {/* 제출 버튼을 form 내부로 이동 */}
        <div className="mt-8 mb-5 w-full">
          <Button
            onClick={handleSubmit}
            disabled={!isValid}
            className="w-full"
            size="large"
            type="primary"
          >
            {isSubmitting ? <ButtonLoadingSpinner /> : buttonText}
          </Button>
        </div>
      </form>
    </>
  );
}
