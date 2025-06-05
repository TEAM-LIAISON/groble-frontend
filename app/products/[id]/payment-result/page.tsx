"use client";

import { useParams, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function PaymentResultPage() {
  const params = useParams();
  const id = params?.id;
  const searchParams = useSearchParams();

  // 페이플이 결제 완료 후 전송하는 파라미터들 (공식 문서 기준)
  const PCD_PAY_RST = searchParams.get("PCD_PAY_RST"); // 결과 (success/error)
  const PCD_PAY_CODE = searchParams.get("PCD_PAY_CODE"); // 응답 코드
  const PCD_PAY_MSG = searchParams.get("PCD_PAY_MSG"); // 응답 메시지
  const PCD_PAY_OID = searchParams.get("PCD_PAY_OID"); // 주문번호
  const PCD_PAY_TYPE = searchParams.get("PCD_PAY_TYPE"); // 결제수단
  const PCD_PAY_WORK = searchParams.get("PCD_PAY_WORK"); // 결제요청 방식
  const PCD_PAYER_NAME = searchParams.get("PCD_PAYER_NAME"); // 결제자 이름
  const PCD_PAY_GOODS = searchParams.get("PCD_PAY_GOODS"); // 상품명
  const PCD_PAY_TOTAL = searchParams.get("PCD_PAY_TOTAL"); // 결제금액
  const PCD_PAY_TIME = searchParams.get("PCD_PAY_TIME"); // 결제완료 시간

  useEffect(() => {
    // 결제 성공인 경우: 서버 측에 최종 검증 API 호출
    if (PCD_PAY_RST === "success") {
      console.log("✅ 결제 성공!", {
        주문번호: PCD_PAY_OID,
        결제자: PCD_PAYER_NAME,
        상품명: PCD_PAY_GOODS,
        결제금액: PCD_PAY_TOTAL,
        결제시간: PCD_PAY_TIME,
      });
      // TODO: 서버에 추가 검증 API 호출 후 페이지 이동 또는 완료 안내
    } else {
      console.warn("❌ 결제 실패:", PCD_PAY_MSG);
      // TODO: 실패 안내(UI) 또는 재시도 로직
    }
  }, [PCD_PAY_RST, PCD_PAY_MSG, PCD_PAY_OID]);

  return (
    <div className="flex w-full flex-col items-center pt-20">
      {PCD_PAY_RST === "success" ? (
        <div className="flex flex-col items-center gap-4 rounded-lg bg-green-50 p-8">
          <div className="text-6xl">✅</div>
          <h1 className="text-2xl font-bold text-green-600">결제 성공!</h1>

          <div className="mt-4 space-y-2 text-center">
            <p className="text-gray-600">
              <span className="font-medium">주문번호:</span> {PCD_PAY_OID}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">결제자:</span> {PCD_PAYER_NAME}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">상품명:</span> {PCD_PAY_GOODS}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">결제금액:</span>{" "}
              {PCD_PAY_TOTAL?.toLocaleString()}원
            </p>
            <p className="text-sm text-gray-500">결제일시: {PCD_PAY_TIME}</p>
          </div>

          <p className="mt-4 text-sm text-gray-500">
            결제가 성공적으로 완료되었습니다.
          </p>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4 rounded-lg bg-red-50 p-8">
          <div className="text-6xl">❌</div>
          <h1 className="text-2xl font-bold text-red-600">결제 실패</h1>

          <div className="mt-4 text-center">
            <p className="text-gray-600">
              <span className="font-medium">오류 코드:</span> {PCD_PAY_CODE}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">오류 메시지:</span> {PCD_PAY_MSG}
            </p>
          </div>

          <p className="mt-4 text-sm text-gray-500">
            결제 중 문제가 발생했습니다. 다시 시도해주세요.
          </p>

          <button
            onClick={() => window.history.back()}
            className="mt-4 rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
          >
            다시 시도
          </button>
        </div>
      )}
    </div>
  );
}
