"use client";
import BottomArea, { BottomButton } from "@/components/bottom-area";
import { TextField } from "@groble/ui";
import { CustomSelect } from "@groble/ui";
import { ButtonLoadingSpinner } from "@groble/ui";
import { Controller, useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { BANK_OPTIONS } from "../../shared/data/bank-data";
import FileUpload from "@/components/file-upload";
import { registerMakerBankAccount, uploadBankbookCopy } from "./api/maker-api";

type FormValues = {
  bankAccountOwner: string;
  bankName: string;
  bankAccountNumber: string;
  copyOfBankbookUrl: string;
};

export default function MakerInfoForm() {
  // url 쿼리 파라미터 가져오기
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const router = useRouter();

  // 1) useForm 생성. defaultValues도 필요에 따라 지정 가능
  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid, isSubmitting },
  } = useForm<FormValues>({
    mode: "onChange", // 유효성 검사 타이밍 : onChange 시점마다 검사
    defaultValues: {
      bankAccountOwner: "",
      bankName: "",
      bankAccountNumber: "",
      copyOfBankbookUrl: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      await registerMakerBankAccount(data, type as "private" | "corporate");

      if (type === "private") {
        router.push(`/users/maker/complete?type=${searchParams.get("type")}`);
      } else {
        router.push(
          `/users/maker/corporation-cert?type=${searchParams.get("type")}`,
        );
      }
    } catch (error) {
      console.error("API 요청 실패:", error);
    }
  };

  const handleFileUrlChange = (url: string | null) => {
    setValue("copyOfBankbookUrl", url || "", { shouldValidate: true });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="mt-5 space-y-5"
    >
      <h1 className="text-heading-1 font-semibold text-label-normal md:text-title-3 md:font-bold">
        {type === "private" ? "개인 메이커" : "개인 • 법인 사업자"}
      </h1>
      {/* 이름 */}
      <TextField
        label="이름"
        placeholder="실명을 입력해주세요"
        {...register("bankAccountOwner", {
          required: "이름을 입력해주세요",
          minLength: {
            value: 2,
            message: "이름은 2자 이상 입력해주세요",
          },
        })}
        error={!!errors.bankAccountOwner}
      />

      {/* 은행 */}
      <Controller
        name="bankName"
        control={control}
        rules={{ required: "은행을 선택해주세요" }}
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

      {/* 계좌번호 */}
      <TextField
        label="정산 받을 계좌"
        placeholder="계좌번호를 입력해주세요"
        {...register("bankAccountNumber", {
          required: "계좌번호를 입력해주세요",
          pattern: {
            value: /^[0-9]{4,20}$/, // 예: 숫자 4~20자리
            message: "계좌번호는 4~20자리 숫자로 입력해주세요",
          },
        })}
        error={!!errors.bankAccountNumber}
      />

      <div className="flex flex-col gap-2">
        <p className="text-body-2 font-semibold text-label-normal">
          통장 사본 첨부
        </p>
        <FileUpload
          uploadApi={uploadBankbookCopy}
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
          // 필수 필드 체크
          initialFileUrl={watch("copyOfBankbookUrl") || undefined}
          onFileUrlChange={handleFileUrlChange}
        />

        {/* 숨겨진 input을 등록해서 검증 */}
        <input
          type="hidden"
          {...register("copyOfBankbookUrl", {
            required: true,
          })}
        />
      </div>

      <BottomArea narrow>
        <BottomButton disabled={!isValid}>
          <span className="flex min-h-[1.5rem] items-center justify-center">
            {isSubmitting ? <ButtonLoadingSpinner /> : "인증 요청"}
          </span>
        </BottomButton>
      </BottomArea>
    </form>
  );
}
