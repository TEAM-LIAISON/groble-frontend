import Button from "@/components/button";
import Header, { Back } from "@/components/header";
import { Metadata } from "next";
import Image from "next/image";
import appleIcon from "../../apple-icon.png";
import { TaxInvoiceInfo } from "./tax-invoice-info";

export const metadata = {
  title: "정산 내역",
} satisfies Metadata;

export default async function SettlementPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background-alternative">
      <Header left={<Back />} title={metadata.title} />
      <div className="flex flex-col gap-3 px-5">
        <div className="flex flex-col rounded-[12px] bg-background-normal p-5">
          <h1 className="text-headline-1 font-semibold">판매한 상품</h1>
          <div className="my-3 border-t border-line-normal" />
          <div className="text-caption-1 font-semibold text-label-alternative">
            No. 25391
          </div>
          <div className="relative aspect-411/335 w-full rounded-[12px]">
            <Image src={appleIcon} alt="" className="object-cover" fill />
          </div>
          <div className="text-caption-1 font-medium">
            <span className="font-semibold text-primary-sub-1">결제완료</span> ·
            2025. 3. 14.
          </div>
          <div className="h-2" />
          <h1 className="text-body-1-normal font-semibold">제목 제목</h1>
          <div className="text-label-1-normal font-medium text-label-neutral">
            김로블
          </div>
          <div className="h-2" />
          <div className="flex items-center text-caption-1 font-medium text-label-alternative">
            <Star />
            4.5
          </div>
          <div className="h-3" />
          <Button group="outlined" type="tertiary" size="x-small">
            문의하기
          </Button>
        </div>

        <div className="flex flex-col rounded-[12px] bg-background-normal p-5">
          <h1 className="text-headline-1 font-semibold">정산 정보</h1>
          <div className="my-3 border-t border-line-normal" />
          <dl className="grid grid-cols-2 gap-2">
            <dt className="flex items-center gap-1 justify-self-start text-label-1-normal font-medium">
              정산 현황 <Info />
            </dt>
            <dd className="justify-self-end text-label-1-normal font-semibold">
              <span className="text-primary-sub-1">정산 완료</span>
            </dd>
            <dt className="flex items-center gap-1 justify-self-start text-label-1-normal font-medium">
              정산 예정일
            </dt>
            <dd className="justify-self-end text-label-1-normal font-semibold">
              2025. 4. 12.
            </dd>
          </dl>
        </div>

        <div className="flex flex-col rounded-[12px] bg-background-normal p-5">
          <h1 className="text-headline-1 font-semibold">정산 내역</h1>
          <div className="my-3 border-t border-line-normal" />
          <dl className="grid grid-cols-2 gap-2">
            <dt className="flex items-center gap-1 justify-self-start text-label-1-normal font-medium">
              주문금액
            </dt>
            <dd className="justify-self-end text-label-1-normal font-semibold">
              <span className="text-primary-sub-1">정산 완료</span>
            </dd>
            <dt className="flex items-center gap-1 justify-self-start text-label-1-normal font-medium">
              수수료 <Info />
            </dt>
            <dd className="justify-self-end text-label-1-normal font-semibold">
              2025. 4. 12.
            </dd>
          </dl>
          <div className="my-3 border-t border-line-alternative" />
        </div>
      </div>
      <div className="fixed right-0 bottom-0 left-0 flex flex-col">
        <TaxInvoiceInfo />
      </div>
    </div>
  );
}

function Star() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.95879 1.63932C8.60425 0.786896 7.3967 0.786893 7.04216 1.63932L5.71482 4.83062C5.66136 4.95916 5.54048 5.04698 5.40172 5.05811L1.95643 5.33431C1.03617 5.40809 0.663014 6.55653 1.36416 7.15714L3.9891 9.40568C4.09483 9.49625 4.141 9.63835 4.1087 9.77376L3.30673 13.1358C3.09252 14.0338 4.06945 14.7436 4.85732 14.2623L7.80696 12.4607C7.92577 12.3881 8.07518 12.3881 8.19398 12.4607L11.1436 14.2623C11.9315 14.7436 12.9084 14.0338 12.6942 13.1358L11.8922 9.77376C11.8599 9.63835 11.9061 9.49625 12.0118 9.40568L14.6368 7.15714C15.3379 6.55654 14.9648 5.40809 14.0445 5.33431L10.5992 5.05811C10.4605 5.04698 10.3396 4.95916 10.2861 4.83062L8.95879 1.63932Z"
        fill="#FFC06E"
      />
    </svg>
  );
}

function Info() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.6673 7.99967C13.6673 11.1293 11.1303 13.6663 8.00065 13.6663C4.87104 13.6663 2.33398 11.1293 2.33398 7.99967C2.33398 4.87006 4.87104 2.33301 8.00065 2.33301C11.1303 2.33301 13.6673 4.87006 13.6673 7.99967ZM14.6673 7.99967C14.6673 11.6816 11.6825 14.6663 8.00065 14.6663C4.31875 14.6663 1.33398 11.6816 1.33398 7.99967C1.33398 4.31778 4.31875 1.33301 8.00065 1.33301C11.6825 1.33301 14.6673 4.31778 14.6673 7.99967ZM7.50065 5.66634V4.66634H8.50065V5.66634H7.50065ZM7.50065 11.333V7.33301H8.50065V11.333H7.50065Z"
        fill="#C2C4C8"
      />
    </svg>
  );
}
