"use client";
import BottomArea, { BottomButton } from "@/components/bottom-area";
import TextField from "@/components/text-field";
import CustomSelect from "@/components/custom-select";
import ButtonLoadingSpinner from "@/components/button-loading-spinner";
import { Controller, useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";

type FormValues = {
  name: string;
  bank: string;
  accountNumber: string;
};

export default function MakerInfoForm() {
  // url 쿼리 파라미터 가져오기
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const router = useRouter();

  // 쿼리에서 복원할 값들
  const prevName = searchParams.get("name") ?? "";
  const prevBank = searchParams.get("bank") ?? "";
  const prevAccount = searchParams.get("accountNumber") ?? "";

  // 1) useForm 생성. defaultValues도 필요에 따라 지정 가능
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<FormValues>({
    mode: "onChange", // 유효성 검사 타이밍 : onChange 시점마다 검사
    defaultValues: {
      name: prevName,
      bank: prevBank,
      accountNumber: prevAccount,
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      console.log(data);
      // API 호출 시뮬레이션 (실제로는 API 요청을 여기에 작성)
      await new Promise((resolve) => setTimeout(resolve, 2000)); // 2초 대기

      // 실제 API 호출 예시:
      // const response = await fetch('/api/private-info', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data)
      // });
      router.push(
        `/users/maker/cert?type=${searchParams.get("type")}` +
          `&name=${encodeURIComponent(data.name)}` +
          `&bank=${encodeURIComponent(data.bank)}` +
          `&accountNumber=${encodeURIComponent(data.accountNumber)}`,
      );
      console.log("API 요청 완료");
    } catch (error) {
      console.error("API 요청 실패:", error);
    }
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
        {...register("name", {
          required: "이름을 입력해주세요",
          minLength: {
            value: 2,
            message: "이름은 2자 이상 입력해주세요",
          },
        })}
        error={!!errors.name}
      />

      {/* 은행 */}
      <Controller
        name="bank"
        control={control}
        rules={{ required: "은행을 선택해주세요" }}
        render={({ field, fieldState }) => (
          <CustomSelect
            label="정산 받을 은행"
            placeholder="은행을 선택해주세요"
            options={[
              { value: "국민", label: "국민" },
              { value: "신한", label: "신한" },
              { value: "하나", label: "하나" },
            ]}
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
        {...register("accountNumber", {
          required: "계좌번호를 입력해주세요",
          pattern: {
            value: /^[0-9]{4,20}$/, // 예: 숫자 4~20자리
            message: "계좌번호는 4~20자리 숫자로 입력해주세요",
          },
        })}
        error={!!errors.accountNumber}
      />

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
