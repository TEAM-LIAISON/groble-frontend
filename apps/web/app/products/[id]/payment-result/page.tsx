"use client";

import BottomArea, { BottomLinkButton } from "@/components/bottom-area";
import { Button } from "@groble/ui";
import { fetchPaymentResult } from "@/features/products/payment/api/payment-api";
import PaymentPriceInformation from "@/features/products/payment/components/payment-price-Information";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useParams, useSearchParams } from "next/navigation";
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

  const { data } = useQuery({
    queryKey: ["paymentResult", PCD_PAY_OID],
    queryFn: () => fetchPaymentResult(PCD_PAY_OID!),
    enabled: !!PCD_PAY_OID,
    staleTime: 0,
  });
  const orderData = data?.data;
  console.log(orderData);

  return (
    <div
      className={`flex h-[calc(100vh-70px)] w-full flex-col items-center bg-background-alternative`}
    >
      <div className="flex w-full max-w-[1250px] flex-col gap-3 px-5 pt-9 sm:px-8 lg:px-12">
        {PCD_PAY_RST === "success" ? (
          <>
            <div className="flex w-full justify-center">
              <h1 className="text-title-2 font-bold">
                <span className="text-primary-sub-1">결제완료</span> 됐어요
              </h1>
            </div>
            <div className="mt-6 flex w-full flex-col rounded-xl bg-white p-5">
              <p className="py-1 text-headline-1 font-semibold">
                No.{orderData?.merchantUid}
              </p>
              <hr className="border-line-normal" />

              <div className="my-4 flex gap-4">
                <div className="relative h-[118px] w-[157px]">
                  {orderData?.contentThumbnailUrl ? (
                    <Image
                      src={orderData.contentThumbnailUrl}
                      alt="thumbnail"
                      fill
                      className="rounded-lg object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center rounded-lg bg-gray-200">
                      <div className="text-center text-gray-500">
                        <div className="text-2xl">📷</div>
                        <div className="text-xs">이미지 없음</div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex flex-col justify-center gap-[0.13rem]">
                  <p className="text-label-1-normal text-label-alternative">
                    {orderData?.orderNumber}
                  </p>
                  <p className="line-clamp-2 text-body-1-normal font-semibold text-label-normal">
                    {orderData?.contentTitle}
                  </p>
                  <p className="text-label-1-normal text-label-alternative">
                    옵션 이름
                  </p>
                  <p>
                    <span className="text-body-1-normal font-bold text-label-normal">
                      {orderData?.finalPrice}
                    </span>
                    <span className="text-body-1-normal text-label-normal">
                      원
                    </span>
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  group="solid"
                  type="secondary"
                  size="small"
                  className="w-full"
                >
                  문의하기{" "}
                </Button>
                <Button
                  group="solid"
                  type="tertiary"
                  size="small"
                  className="w-full"
                >
                  다운로드{" "}
                </Button>
              </div>
            </div>

            <PaymentPriceInformation
              orderAmount={orderData?.originalPrice ?? 0}
              discountAmount={orderData?.discountPrice ?? 0}
              totalAmount={orderData?.finalPrice ?? 0}
            />

            <BottomArea>
              <BottomLinkButton href="/contents">
                내 콘텐츠 보기
              </BottomLinkButton>
            </BottomArea>
          </>
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
    </div>
  );
}
