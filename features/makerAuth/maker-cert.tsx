"use client";
import BottomArea, { BottomButton } from "@/components/bottom-area";

import ButtonLoadingSpinner from "@/components/button-loading-spinner";
import CountdownTimer from "@/components/countdown-timer";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { OTPInput, SlotProps } from "input-otp";
import { twJoin } from "tailwind-merge";
import Link from "next/link";
import { useState } from "react";

type FormValues = {
  name: string;
  bank: string;
  accountNumber: string;
};

export default function MakerCertForm() {
  // url 쿼리 파라미터 가져오기
  const searchParams = useSearchParams();
  const router = useRouter();

  const name = searchParams.get("name");
  const type = searchParams.get("type");
  const accountNumber = searchParams.get("accountNumber");
  const bank = searchParams.get("bank");

  // OTP와 타이머 상태 관리
  const [otpValue, setOtpValue] = useState("");
  const [isTimerExpired, setIsTimerExpired] = useState(false);

  // 1) useForm 생성. defaultValues도 필요에 따라 지정 가능
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<FormValues>({
    mode: "onChange", // 유효성 검사 타이밍 : onChange 시점마다 검사
    defaultValues: {
      name: "",
      bank: "",
      accountNumber: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      console.log({ ...data, otpValue });
      // API 호출 시뮬레이션 (실제로는 API 요청을 여기에 작성)
      await new Promise((resolve) => setTimeout(resolve, 2000)); // 2초 대기

      // 실제 API 호출 예시:
      // const response = await fetch('/api/maker-cert', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ ...data, otpValue })
      // });

      console.log("API 요청 완료");
      if (type === "corporation") {
        router.push("/users/maker/corporation-cert");
      } else {
        router.push("/users/maker/complete");
      }
    } catch (error) {
      console.error("API 요청 실패:", error);
    }
  };

  // 타이머 완료 시 호출되는 함수
  const handleTimerComplete = () => {
    console.log("타이머 완료 - 인증 시간이 만료되었습니다.");
    setIsTimerExpired(true);
    // 여기에 타이머 완료 시 처리 로직 추가 (예: 알림, 페이지 이동 등)
  };

  // OTP 값 변경 처리
  const handleOtpChange = (value: string) => {
    setOtpValue(value);
  };

  // 버튼 활성화 조건: OTP 3자리 완성 && 타이머 미만료 && 로딩 중 아님
  const isButtonEnabled =
    otpValue.length === 3 && !isTimerExpired && !isSubmitting;

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-5">
      <h1 className="text-center text-title-3 leading-8 font-bold text-label-normal">
        @원을 입금했어요. <br />
        '그로블' 앞 <span className="text-primary-sub-1">숫자 3자리</span>를
        입력해주세요
      </h1>

      <div className="mt-[2rem] flex justify-center">
        <OTPInput
          name="verification-code"
          containerClassName={"group has-disabled:opacity-30"}
          autoFocus
          required
          maxLength={3}
          minLength={3}
          value={otpValue}
          onChange={handleOtpChange}
          disabled={isTimerExpired}
          render={({ slots }) => (
            <>
              <div className="grid grid-cols-3 gap-3">
                {slots.map((slot, idx) => (
                  <Slot key={idx} {...slot} />
                ))}
              </div>
            </>
          )}
        />
      </div>
      {/* 타이머 추가 */}
      <div className="mt-4 flex justify-center">
        <CountdownTimer
          initialSeconds={300} // 5분 = 300초
          onComplete={handleTimerComplete}
        />
      </div>

      {/* 타이머 만료 메시지 */}
      {isTimerExpired && (
        <div className="mt-4 flex justify-center">
          <p className="text-body-2-normal text-status-error">
            인증 시간이 만료되었습니다. 다시 시도해주세요.
          </p>
        </div>
      )}

      {/* 계좌번호 표시 */}
      <div className="mt-8 flex justify-between rounded-lg bg-background-alternative px-4 py-4">
        <div className="flex items-center gap-3">
          <span className="text-body-2-normal font-semibold text-label-normal">
            {bank}
          </span>
          <span className="text-body-2-normal text-label-alternative">
            {accountNumber}
          </span>
        </div>
        <Link
          href={
            `/users/maker/info?type=${type}` +
            `&name=${encodeURIComponent(name ?? "")}` +
            `&bank=${encodeURIComponent(bank ?? "")}` +
            `&accountNumber=${encodeURIComponent(accountNumber ?? "")}`
          }
          className="cursor-pointer text-body-2-normal text-primary-sub-1 hover:underline"
        >
          변경하기
        </Link>
      </div>

      <BottomArea narrow>
        <ul className="list-disc space-y-0.5 px-10 pb-5 text-label-1-normal text-label-alternative">
          <li>신청이 많은 경우, 1원 입금이 5분 이상 소요될 수 있어요.</li>
          <li>입금 내역이 없다면 계좌 정보를 다시 한번 확인해주세요.</li>
        </ul>
        <BottomButton disabled={!isButtonEnabled}>
          <span className="flex min-h-[1.5rem] items-center justify-center">
            {isSubmitting ? <ButtonLoadingSpinner /> : "1원 인증"}
          </span>
        </BottomButton>
      </BottomArea>
    </form>
  );
}

function Slot(props: SlotProps) {
  return (
    <div
      className={twJoin(
        "relative flex aspect-square h-[7rem] w-[7rem] items-center justify-center rounded-8 bg-background-alternative text-heading-1 font-bold",
        props.isActive && "outline-[1.5px] -outline-offset-[1.5px]",
      )}
    >
      <div className="group-has-[input[data-input-otp-placeholder-shown]]:opacity-20">
        {props.char ?? props.placeholderChar}
      </div>
      {/* {props.hasFakeCaret && <FakeCaret />} */}
    </div>
  );
}
