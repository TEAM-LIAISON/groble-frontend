"use client";

import Button, { BottomButton } from "@/components/button";
import Popover from "@/components/popover";
import { useId } from "react";

export function TaxInvoiceInfo() {
  const popoverId = useId();

  return (
    <>
      <BottomButton popoverTarget={popoverId}>세금계산서 정보</BottomButton>
      <Popover id={popoverId}>
        <div className="flex flex-col">
          <div className="text-label-1-normal font-medium text-status-success">
            발행완료
          </div>
          <div className="text-headline-1 font-bold">세금계산서</div>
          <div className="my-3 border-t border-line-normal" />
          <dl className="grid grid-cols-2 gap-2">
            <dt className="justify-self-start text-label-1-normal font-medium">
              수수료 공급가액
            </dt>
            <dd className="justify-self-end text-label-1-normal font-semibold">
              100,000<span className="font-medium">원</span>
            </dd>
            <dt className="justify-self-start text-label-1-normal font-medium">
              부가세
            </dt>
            <dd className="justify-self-end text-label-1-normal font-semibold">
              3,500<span className="font-medium">원</span>
            </dd>
            <dt className="justify-self-start text-label-1-normal font-medium">
              합계
            </dt>
            <dd className="justify-self-end text-label-1-normal font-semibold">
              103,500<span className="font-medium">원</span>
            </dd>
            <dt className="justify-self-start text-label-1-normal font-medium">
              발행번호
            </dt>
            <dd className="justify-self-end text-label-1-normal font-semibold">
              102-349419-12
            </dd>
            <dt className="justify-self-start text-label-1-normal font-medium">
              발행일
            </dt>
            <dd className="justify-self-end text-label-1-normal font-semibold">
              2025. 4. 12.
            </dd>
          </dl>
          <div className="h-5" />
          <Button size="small">다운로드</Button>
        </div>
      </Popover>
    </>
  );
}
