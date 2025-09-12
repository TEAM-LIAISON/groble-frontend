'use client';

import { Button, TextField } from '@groble/ui';
import { CustomSelect } from '@groble/ui';
import { ButtonLoadingSpinner } from '@groble/ui';
import { Controller } from 'react-hook-form';
import { BANK_OPTIONS } from '@/shared/data/bank-data';
import FileUpload from '@/components/file-upload';
import DateOfBirthInput from '@/components/date-of-birth-input';
import { uploadBankbookCopy } from '../api/maker-api';
import { useMakerInfo, type MakerInfoFormValues } from '../hooks/useMakerInfo';
import { CaretDownIcon, InfoCircledIcon } from '@radix-ui/react-icons';
import { useState } from 'react';

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
  const [isDropdownOpen, setIsDropdownOpen] = useState(true);

  return (
    <>
      <form noValidate className="space-y-5">
        <h1 className="text-heading-1 font-semibold text-label-normal md:text-title-3 md:font-bold">
          {type === 'private' ? '개인 메이커' : '개인 • 법인 사업자'}
        </h1>
        {type === 'corporation' && <div className='flex flex-col px-4 py-5 rounded-12 bg-[#E5F6FE]'>
          <button
            type="button"
            className='flex items-center justify-between w-full'
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <div className='flex items-center gap-0.5'>
              <InfoCircledIcon width={16} height={16} color='#0066FF' />
              <p className='text-label-1-normal text-[#0066FF] font-semibold'>
                확인해주세요
              </p>
            </div>
            <CaretDownIcon
              width={24}
              height={24}
              color='#0066FF'
              className={`transition-transform duration-200 ${isDropdownOpen ? 'rotate-0' : 'rotate-180'}`}
            />
          </button>

          {isDropdownOpen && (
            <div className='mt-3 text-caption-1 text-label-normal leading-relaxed'>
              <div className='mb-3'>
                <p className='font-semibold mb-2'>개인 사업자</p>
                <p>사업자등록증 상 대표자 본인 명의 계좌만 등록 가능합니다. 일반 개인 계좌 또는 개인사업자 통장 모두 허용됩니다.</p>
              </div>

              <div>
                <p className='font-semibold mb-2'>법인 사업자</p>
                <p className='font-medium'>반드시 법인 명의 계좌를 등록해야 합니다. 대표자 개인 명의 계좌는 원칙적으로 허용되지 않습니다. 단, 법인 계좌 개설 전 임시로 대표자 개인 계좌를 등록할 수 있으며, 이 경우 발생하는 세무·법적 문제는 전적으로 메이커에게 책임이 있습니다. 임시 계좌 사용 시, 개설 후 반드시 법인 계좌로 변경해 주셔야 합니다.</p>
              </div>
            </div>
          )}
        </div>}
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
        <Controller<MakerInfoFormValues, 'birthDate'>
          control={control}
          name="birthDate"
          rules={{
            required: '생년월일을 선택해주세요',
            validate: (value) => {
              if (!value || !value.year || !value.month || !value.day) {
                return '생년월일을 모두 선택해주세요';
              }
              return true;
            }
          }}
          render={({ field }) => (
            <DateOfBirthInput
              value={field.value}
              onChange={field.onChange}
              error={!!errors.birthDate}
            />
          )}
        />
        {errors.birthDate && (
          <p className="text-body-2-normal text-status-error">
            {errors.birthDate.message}
          </p>
        )}
        <div className="space-y-2">
          <div className="space-y-0.5">
            <p className="text-body-1-normal font-semibold text-label-normal">정산 받을 은행</p>
            <p className="text-caption-1 font-medium text-label-alternative">반드시 본인 명의 계좌를 등록해야 합니다. 타인 명의 계좌는 허용되지 않습니다.</p>
          </div>
          <Controller
            name="bankName"
            control={control}
            rules={{ required: '은행을 선택해주세요' }}
            render={({ field, fieldState }) => (

              <CustomSelect
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
          <TextField
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
        </div>
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
            helpText={"* 10MB 이하의 PDF, JPEG, PNG 파일을 \n 업로드 해주세요"}
            initialFileUrl={watch('copyOfBankbookUrl') || undefined}
            onFileUrlChange={handleFileUrlChange}
          />
          <input
            type="hidden"
            {...register('copyOfBankbookUrl', {
              required: '통장 사본을 업로드해주세요',
            })}
          />
          {errors.copyOfBankbookUrl && (
            <p className="text-body-2-normal text-status-error">
              {errors.copyOfBankbookUrl.message}
            </p>
          )}
        </div>
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
      </form >
    </>
  );
}
