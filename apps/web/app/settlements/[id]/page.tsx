import BottomArea from '@/components/bottom-area';
import Header, { Back } from '@/components/header';
import StarRating from '@/shared/ui/StarRating';
import { Button } from '@groble/ui';
import type { Metadata } from 'next';
import Image from 'next/image';
import appleIcon from '../../apple-icon.png';
import Hint from './hint';
import { TaxInvoiceInfo } from './tax-invoice-info';

export const metadata = {
  title: '정산 내역',
} satisfies Metadata;

export default async function SettlementPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background-alternative md:items-center md:justify-start">
      <div className="w-full md:mt-[150px] md:max-w-[480px]">
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
              <span className="font-semibold text-primary-sub-1">결제완료</span>{' '}
              · 2025. 3. 14.
            </div>
            <div className="h-2" />
            <h1 className="text-body-1-normal font-semibold">제목 제목</h1>
            <div className="text-label-1-normal font-medium text-label-neutral">
              김로블
            </div>
            <div className="h-2" />
            <div className="flex items-center gap-1 text-caption-1 font-medium text-label-alternative">
              <StarRating rating={4.5} size={16} />
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
            <div className="flex justify-between">
              <div className="text-body-2-reading font-medium text-label-neutral">
                주문 번호
              </div>
              <div className="text-body-2-reading font-medium">25391</div>
            </div>
            <div className="h-3" />
            <div className="flex justify-between">
              <div className="text-body-2-reading font-medium text-label-neutral">
                주문자
              </div>
              <div className="text-body-2-reading font-medium">강다현</div>
            </div>
            <div className="h-3" />
            <div className="flex justify-between">
              <div className="text-body-2-reading font-medium text-label-neutral">
                구매 상품
              </div>
              <div className="text-body-2-reading font-medium">제목 제목</div>
            </div>
            <div className="h-3" />
            <div className="flex justify-between">
              <div className="text-body-2-reading font-medium text-label-neutral">
                상품 가격
              </div>
              <div className="text-body-2-reading font-medium">1,000,000원</div>
            </div>
            <div className="h-3" />
            <div className="flex justify-between">
              <div className="text-body-2-reading font-medium text-label-neutral">
                플랫폼 수수료
              </div>
              <div className="text-body-2-reading font-medium">200,000원</div>
            </div>
            <div className="h-3" />
            <div className="flex justify-between">
              <div className="text-body-2-reading font-medium text-label-neutral">
                정산 예정 금액
              </div>
              <div className="text-body-2-reading font-semibold">800,000원</div>
            </div>
          </div>

          <TaxInvoiceInfo />
          <Hint />
        </div>
      </div>
      <BottomArea />
    </div>
  );
}
