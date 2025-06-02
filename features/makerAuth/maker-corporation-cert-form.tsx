"use client";
import BottomArea, { BottomButton } from "@/components/bottom-area";
import CustomSelect from "@/components/custom-select";
import FileUpload from "@/components/file-upload";
import TextField from "@/components/text-field";
import { uploadDocumentFile } from "@/lib/api/content";
import { Controller, useForm } from "react-hook-form";

type FormValues = {
  businessType: "individual-simple" | "individual-general" | "corporation";
  industry: string;
  businessStatus: string;
  companyName: string;
  representativeName: string;
  address: string;
  documentFileUrl: string;
  email: string;
};

export default function MakerCorporationCertForm() {
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
      businessType: "individual-simple",
      industry: "",
      businessStatus: "",
      companyName: "",
      representativeName: "",
      address: "",
      documentFileUrl: "",
      email: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log("폼 데이터:", data);
    // 여기에 API 호출이나 상태 업데이트 로직 추가
  };

  // 파일 URL 변경 핸들러
  const handleFileUrlChange = (url: string | null) => {
    setValue("documentFileUrl", url || "", { shouldValidate: true });
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
              { label: "개인사업자 (간이)", value: "individual-simple" },
              { label: "개인사업자 (일반)", value: "individual-general" },
              { label: "법인사업자", value: "corporation" },
            ]}
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />

      <TextField
        label="업종"
        placeholder="Ex. 전자상거래"
        {...register("industry", { required: true })}
      />

      <TextField
        label="업태"
        placeholder="Ex. 도매 및 소매업"
        {...register("businessStatus", { required: true })}
      />

      <TextField
        label="상호"
        placeholder="Ex. 리에종"
        {...register("companyName", { required: true })}
      />

      <TextField
        label="대표자명"
        placeholder="메이커 이름과 동일해야 해요"
        {...register("representativeName", { required: true })}
      />

      <TextField
        label="사업장 소재지"
        placeholder="주소를 입력해주세요"
        {...register("address", { required: true })}
      />

      <FileUpload
        uploadApi={uploadDocumentFile}
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
        dragDropText="파일을 끌어서 놓거나 버튼을 클릭하세요"
        initialFileUrl={watch("documentFileUrl") || undefined}
        onFileUrlChange={handleFileUrlChange}
      />

      <TextField
        hoverHelper="간이과세자의 경우, 부가가치세법상 세금계산서 발급이 불가하므로 정산 내역은 계산서 또는 현금영수증으로 처리됩니다. 세금계산서가 필요한 경우, 일반과세자로 등록해주시기 바랍니다."
        label="세금계산서 수취 이메일"
        placeholder="이메일을 입력해주세요"
        {...register("email", { required: true, pattern: /^\S+@\S+$/ })}
      />

      <BottomArea narrow>
        <BottomButton disabled={!isValid} className="">
          인증 요청
        </BottomButton>
      </BottomArea>
    </form>
  );
}
