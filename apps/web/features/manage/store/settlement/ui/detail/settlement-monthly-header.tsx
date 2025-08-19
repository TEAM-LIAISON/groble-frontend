import { Button, CustomModal, LinkButton, Modal } from '@groble/ui';
import { SettlementMonthlyDetailResponse } from '../../types/settlement-detail-types';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getSettlementInvoice } from '../../api/get-settlement-detail-data';

export default function SettlementMonthlyHeader({
  data,
}: {
  data: SettlementMonthlyDetailResponse;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    settlementStartDate,
    settlementEndDate,
    isTaxInvoiceButtonEnabled,
    isTaxInvoiceIssuable,
  } = data;

  // 세금 계산서 API 호출
  const { data: invoice, isLoading } = useQuery({
    queryKey: ['settlement-monthly-invoice', settlementStartDate],
    queryFn: () => getSettlementInvoice(settlementStartDate.slice(0, 7)),
    enabled: isModalOpen && isTaxInvoiceIssuable,
  });
  const invoiceData = invoice?.data;

  // YYYY-MM-DD -> YY.MM.DD
  const formattedStartDate = settlementStartDate
    .split('-')
    .slice(0, 4)
    .join('.');
  const formattedEndDate = settlementEndDate.split('-').slice(0, 4).join('.');

  return (
    <>
      <div className="flex justify-between items-center">
        {/* 헤더 */}
        <div className="flex flex-col gap-[0.12rem]">
          <h1 className="text-body-2-normal md:text-heading-1 text-label-normal">
            정산 상세 내역
          </h1>
          <p className="text-body-2-normal md:text-heading-1 font-bold text-label-normal">
            {formattedStartDate} ~ {formattedEndDate}
          </p>
        </div>

        {/* 버튼 */}
        <div>
          <Button
            group="solid"
            type="primary"
            size="x-small"
            disabled={!isTaxInvoiceButtonEnabled}
            onClick={() => {
              if (isTaxInvoiceButtonEnabled) {
                setIsModalOpen(true);
              }
            }}
          >
            세금계산서 정보
          </Button>
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
