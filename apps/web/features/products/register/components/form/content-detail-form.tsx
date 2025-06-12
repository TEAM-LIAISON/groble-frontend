"use client";

import { useFormContext } from "react-hook-form";
import { useNewProductStore } from "@/features/products/register/store/useNewProductStore";
import { ProductFormData } from "@/lib/schemas/productSchema";
import { TextAreaTextField } from "@groble/ui";

export default function ContentDetailForm() {
  const {
    register,
    formState: { errors },
  } = useFormContext<ProductFormData>();

  const {
    serviceTarget,
    serviceProcess,
    makerIntro,
    setServiceTarget,
    setServiceProcess,
    setMakerIntro,
  } = useNewProductStore();

  return (
    <div className="mt-5 flex w-full flex-col gap-6">
      {/* 콘텐츠 타겟 */}
      <div>
        <h2 className="mb-2 text-body-1-normal font-semibold text-label-normal">
          콘텐츠 타겟
        </h2>
        <TextAreaTextField
          {...register("serviceTarget", {
            required: "콘텐츠 타겟을 입력해주세요.",
          })}
          value={serviceTarget || ""}
          onChange={(e) => setServiceTarget(e.target.value)}
          error={!!errors.serviceTarget}
          maxLength={1000}
          placeholder="Ex. 예비 및 초기 창업가"
          className="min-h-[3.375rem] w-full"
        />
      </div>

      {/* 제공 절차 */}
      <div>
        <h2 className="mb-2 text-body-1-normal font-semibold text-label-normal">
          제공 절차
        </h2>
        <TextAreaTextField
          {...register("serviceProcess", {
            required: "제공 절차를 입력해주세요.",
          })}
          value={serviceProcess || ""}
          onChange={(e) => setServiceProcess(e.target.value)}
          error={!!errors.serviceProcess}
          maxLength={1000}
          placeholder="Ex. 즉시 다운로드 가능해요"
          className="min-h-[3.375rem] w-full"
        />
      </div>

      {/* 메이커 소개 */}
      <div>
        <h2 className="mb-2 text-body-1-normal font-semibold text-label-normal">
          메이커 소개
        </h2>
        <TextAreaTextField
          {...register("makerIntro", {
            required: "메이커 소개를 입력해주세요.",
          })}
          value={makerIntro || ""}
          maxLength={1000}
          onChange={(e) => setMakerIntro(e.target.value)}
          error={!!errors.makerIntro}
          placeholder="Ex. 관련 경험이나 이력, 경험 등을 적어주세요"
          className="min-h-[3.375rem] w-full"
        />
      </div>
    </div>
  );
}
