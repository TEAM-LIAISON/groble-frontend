import { Button, CustomModal, LinkButton } from '@groble/ui';
import { SettlementMonthlyDetailResponse } from '../../types/settlement-detail-types';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getSettlementInvoice } from '../../api/get-settlement-detail-data';

export default function SettlementMonthlyOverview({
  data,
}: {
  data: SettlementMonthlyDetailResponse;
}) {
  const {
    scheduledSettlementDate,
    settlementAmount,
    pgFee,
    platformFee,
    vatAmount,
    isTaxInvoiceButtonEnabled,
    settlementStartDate,
    isTaxInvoiceIssuable,
  } = data;

  const [isModalOpen, setIsModalOpen] = useState(false);

  // 세금 계산서 API 호출
  const { data: invoice, isLoading } = useQuery({
    queryKey: ['settlement-monthly-invoice', settlementStartDate],
    queryFn: () => getSettlementInvoice(settlementStartDate.slice(0, 7)),
    enabled: isModalOpen && isTaxInvoiceIssuable,
  });
  const invoiceData = invoice?.data;

  // YYYY-MM-DD -> YY.MM.DD
  const formattedScheduledSettlementDate = scheduledSettlementDate
    .split('-')
    .slice(0, 4)
    .join('.');

  return (
    <>
      <div>
        <div className="w-full bg-background-alternative rounded-xl px-5 py-6 space-y-4">
          <div className="flex justify-between ">
            <span className="text-body-1-normal text-label-alternative">
              정산일
            </span>
            <span className="text-body-1-normal font-bold text-label-normal">
              {formattedScheduledSettlementDate}
            </span>
          </div>
          {/*  */}
          <div className="flex justify-between ">
            <span className="text-body-1-normal text-label-alternative">
              정산 금액
            </span>
            <span className="text-body-1-normal font-bold text-label-normal">
              {Math.floor(settlementAmount).toLocaleString()}원
            </span>
          </div>
          {/*  */}
          <div className="flex justify-between ">
            <span className="text-body-1-normal text-label-alternative">
              PG 결제 수수료 (1.7%)
            </span>
            <span className="text-body-1-normal font-bold text-label-normal">
              {pgFee.toLocaleString()}원
            </span>
          </div>
          {/*  */}
          <div className="flex justify-between ">
            <span className="text-body-1-normal text-label-alternative">
              그로블 수수료 (1.5%)
            </span>
            <span className="text-body-1-normal font-bold text-label-normal">
              {platformFee.toLocaleString()}원
            </span>
          </div>
          {/*  */}
          <div className="flex justify-between ">
            <span className="text-body-1-normal text-label-alternative">
              VAT{' '}
            </span>
            <span className="text-body-1-normal font-bold text-label-normal">
              {vatAmount?.toLocaleString() ?? 0}원
            </span>
          </div>
        </div>
      </div>

      {/* 세금계산서 모달 */}
      <CustomModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        className="px-8 pt-8 pb-6"
      >
        {isTaxInvoiceIssuable ? (
          <>
            <p className="text-status-success text-body-2-normal">발행완료</p>
            <h2 className="text-heading-1 font-bold text-label-normal">
              세금 계산서
            </h2>

            <hr className="my-3 border-line-normal" />
            <div className="space-y-3">
              <div className="flex justify-between w-full text-label-1-normal text-label-normal">
                <span className="">공급자</span>
                <span className=" font-semibold">
                  {invoiceData?.supplierName}
                </span>
              </div>
              <div className="flex justify-between w-full text-label-1-normal text-label-normal">
                <span className="">공급받는 자</span>
                <span className=" font-semibold">
                  {invoiceData?.recipientName}
                </span>
              </div>
              <div className="flex justify-between w-full text-label-1-normal text-label-normal">
                <span className="">수수료 공급가액</span>
                <span className=" font-semibold">
                  {invoiceData?.supplyAmount.toLocaleString()}원
                </span>
              </div>
              <div className="flex justify-between w-full text-label-1-normal text-label-normal">
                <span className="">VAT</span>
                <span className=" font-semibold">
                  {invoiceData?.vatAmount.toLocaleString()}원
                </span>
              </div>
              <div className="flex justify-between w-full text-label-1-normal text-label-normal">
                <span className="">합계 (공급가액+VAT)</span>
                <span className=" font-semibold">
                  {invoiceData?.totalAmount.toLocaleString()}원
                </span>
              </div>
              <div className="flex justify-between w-full text-label-1-normal text-label-normal">
                <span className="">발행번호</span>
                <span className=" font-semibold">
                  {invoiceData?.invoiceNumber}
                </span>
              </div>
              <div className="flex justify-between w-full text-label-1-normal text-label-normal">
                <span className="">발행일</span>
                <span className=" font-semibold">
                  {invoiceData?.issuedDate}
                </span>
              </div>
            </div>

            <LinkButton
              href={invoiceData?.taxInvoiceUrl ?? ''}
              className="mt-6 w-full"
              group="solid"
              type="primary"
              size="small"
            >
              다운로드
            </LinkButton>
          </>
        ) : (
          <>
            <p className="text-status-error text-body-2-normal">발행 불가</p>
            <h2 className="text-heading-1 font-bold text-label-normal">
              세금 계산서
            </h2>

            <hr className="my-3 border-line-normal" />
            <p className="text-body-2-normal text-label-normal">
              귀하는 간이과세자 또는 비사업자로 분류되어 세금계산서 발행이
              불가능합니다. <br />
              정산 내역서 또는 현금영수증이 필요한 경우 고객센터로 문의해 주세요
            </p>

            <LinkButton
              href="https://4q124.channel.io"
              className="mt-6 w-full"
              group="solid"
              type="secondary"
              size="small"
            >
              문의하기
            </LinkButton>
          </>
        )}
      </CustomModal>
    </>
  );
}
