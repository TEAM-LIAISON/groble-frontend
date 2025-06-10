"use client";
import BottomArea, { BottomButton } from "@/components/bottom-area";
import CustomSelect from "@/components/custom-select";
import FileUpload from "@/components/file-upload";
import TextField from "@/components/text-field";
import { Controller, useForm } from "react-hook-form";
import {
  registerMakerBusiness,
  uploadBusinessCertificate,
} from "./api/maker-api";
import { useRouter } from "next/navigation";

type FormValues = {
  businessType: "INDIVIDUAL_SIMPLIFIED" | "INDIVIDUAL_NORMAL" | "CORPORATE";
  businessCategory: string;
  businessSector: string;
  businessName: string;
  representativeName: string;
  businessAddress: string;
  businessLicenseFileUrl: string;
  taxInvoiceEmail: string;
};

export default function MakerCorporationCertForm() {
  const router = useRouter();
  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid, isSubmitting },
  } = useForm<FormValues>({
    mode: "onChange",
    defaultValues: {
      businessType: "INDIVIDUAL_SIMPLIFIED",
      businessCategory: "",
      businessSector: "",
      businessName: "",
      representativeName: "",
      businessAddress: "",
      businessLicenseFileUrl: "",
      taxInvoiceEmail: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      await registerMakerBusiness(data);
      router.push(`/users/maker/complete?type=corporate`);
    } catch (error) {
      console.error("API 요청 실패:", error);
    }
  };

  // 파일 URL 변경 핸들러
  const handleFileUrlChange = (url: string | null) => {
    setValue("businessLicenseFileUrl", url || "", { shouldValidate: true });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-5 flex flex-col gap-5"
    >
      <Controller
        control={control}
        name="businessType"
        render={({ field }) => (
          <CustomSelect
            label="사업자 유형"
            options={[
              { label: "개인사업자 (간이)", value: "INDIVIDUAL_SIMPLIFIED" },
              { label: "개인사업자 (일반)", value: "INDIVIDUAL_NORMAL" },
              { label: "법인사업자", value: "CORPORATE" },
            ]}
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />

      <TextField
        label="업종"
        placeholder="Ex. 전자상거래"
        {...register("businessCategory", { required: true })}
      />

      <TextField
        label="업태"
        placeholder="Ex. 도매 및 소매업"
        {...register("businessSector", { required: true })}
      />

      <TextField
        label="상호"
        placeholder="Ex. 리에종"
        {...register("businessName", { required: true })}
      />

      <TextField
        label="대표자명"
        placeholder="메이커 이름과 동일해야 해요"
        {...register("representativeName", { required: true })}
      />

      <TextField
        label="사업장 소재지"
        placeholder="주소를 입력해주세요"
        {...register("businessAddress", { required: true })}
      />

      <div className="flex flex-col gap-2">
        <p className="text-body-2 font-semibold text-label-normal">
          사업자등록증 사본
        </p>
        <FileUpload
          uploadApi={uploadBusinessCertificate}
          acceptedTypes={[".pdf", ".zip", ".jpeg", ".jpg", ".png"]}
          acceptedMimeTypes={[
            "application/pdf",
            "application/zip",
            "application/x-zip-compressed",
            "image/jpeg",
            "image/png",
          ]}
          maxSizeInMB={10}
          uploadButtonText="파일 업로드"
          helpText="* 10MB 이하의 PDF, ZIP, 이미지 파일"
          initialFileUrl={watch("businessLicenseFileUrl") || undefined}
          onFileUrlChange={handleFileUrlChange}
        />
        <input
          type="hidden"
          {...register("businessLicenseFileUrl", {
            required: true,
          })}
        />
      </div>

      <TextField
        hoverHelper="간이과세자의 경우, 부가가치세법상 세금계산서 발급이 불가하므로 정산 내역은 계산서 또는 현금영수증으로 처리됩니다. 세금계산서가 필요한 경우, 일반과세자로 등록해주시기 바랍니다."
        label="세금계산서 수취 이메일"
        placeholder="이메일을 입력해주세요"
        {...register("taxInvoiceEmail", {
          required: true,
          pattern: /^\S+@\S+$/,
        })}
      />

      <BottomArea narrow>
        <BottomButton disabled={!isValid} className="">
          인증 요청
        </BottomButton>
      </BottomArea>
    </form>
  );
}
