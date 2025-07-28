'use client';

import { useCallback } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { useNewProductStore } from '@/features/products/register/store/useNewProductStore';
import { ProductFormData } from '@/lib/schemas/productSchema';
import { TextAreaTextField } from '@groble/ui';

export default function ContentDetailForm() {
  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext<ProductFormData>();

  // zustand는 임시저장용으로만 사용
  const { setServiceTarget, setServiceProcess, setMakerIntro } =
    useNewProductStore();

  // 콘텐츠 타겟 변경 핸들러
  const handleServiceTargetChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = e.target.value;
      setValue('serviceTarget', newValue);
      setServiceTarget(newValue); // 임시저장용
    },
    [setValue, setServiceTarget]
  );

  // 제공 절차 변경 핸들러
  const handleServiceProcessChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = e.target.value;
      setValue('serviceProcess', newValue);
      setServiceProcess(newValue); // 임시저장용
    },
    [setValue, setServiceProcess]
  );

  // 메이커 소개 변경 핸들러
  const handleMakerIntroChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = e.target.value;
      setValue('makerIntro', newValue);
      setMakerIntro(newValue); // 임시저장용
    },
    [setValue, setMakerIntro]
  );

  return (
    <div className="mt-5 flex w-full flex-col gap-4">
      {/* 콘텐츠 타겟 */}
      <div>
        <h2 className="mb-2 text-body-1-normal font-semibold text-label-normal">
          콘텐츠 타겟
        </h2>
        <Controller
          control={control}
          name="serviceTarget"
          render={({ field }) => (
            <TextAreaTextField
              {...field}
              onChange={handleServiceTargetChange}
              error={!!errors.serviceTarget}
              helperText={errors.serviceTarget?.message}
              maxLength={1000}
              placeholder="Ex. 예비 및 초기 창업가"
              className="min-h-[3.375rem] w-full"
            />
          )}
        />
      </div>

      {/* 제공 절차 */}
      <div>
        <h2 className="mb-2 text-body-1-normal font-semibold text-label-normal">
          제공 절차
        </h2>
        <Controller
          control={control}
          name="serviceProcess"
          render={({ field }) => (
            <TextAreaTextField
              {...field}
              onChange={handleServiceProcessChange}
              error={!!errors.serviceProcess}
              helperText={errors.serviceProcess?.message}
              maxLength={1000}
              placeholder="Ex. 즉시 다운로드 가능해요"
              className="min-h-[3.375rem] w-full"
            />
          )}
        />
      </div>

      {/* 메이커 소개 */}
      <div>
        <h2 className="mb-2 text-body-1-normal font-semibold text-label-normal">
          메이커 소개
        </h2>
        <Controller
          control={control}
          name="makerIntro"
          render={({ field }) => (
            <TextAreaTextField
              {...field}
              onChange={handleMakerIntroChange}
              error={!!errors.makerIntro}
              helperText={errors.makerIntro?.message}
              maxLength={1000}
              placeholder="Ex. 관련 경험이나 이력, 경험 등을 적어주세요"
              className="min-h-[3.375rem] w-full"
            />
          )}
        />
      </div>
    </div>
  );
}
