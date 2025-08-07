'use client';
import { ChevronIcon } from '@/components/(improvement)/icons';
import { CheckIcon } from '@/components/(improvement)/icons/CheckIcon';
import { Button } from '@groble/ui';
import { Checkbox } from '@/components/ui';
import ModalRadix from '@/components/ui/ModalRadix';
import { useUserStore } from '@/lib/store/useUserStore';
import Link from 'next/link';
import React, { useState } from 'react';

interface PaymentAgreeFormProps {
  isAgree: boolean;
  onAgreeChange: (agreed: boolean) => void;
}

export default function PaymentAgreeForm({
  isAgree,
  onAgreeChange,
}: PaymentAgreeFormProps) {
  // 사용자 닉네임 가져오기
  const { user } = useUserStore();

  // 첫 번째(개인정보 수집) 약관 모달 오픈 상태
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);

  // 약관 항목 배열
  const terms = [
    {
      id: 'privacy',
      label: '개인정보 수집 및 제3자 제공 (필수)',
      action: () => setIsPrivacyModalOpen(true),
      type: 'modal' as const,
    },
    {
      id: 'termOfService',
      label: '서비스 이용약관 (필수)',
      href: 'https://paint-crowley-ff2.notion.site/1f2c158365ac80c39fc3ef1b8764f53a?pvs=4',
      type: 'link' as const,
    },
    {
      id: 'refundPolicy',
      label: '환불 규정 (필수)',
      href: 'https://paint-crowley-ff2.notion.site/1f2c158365ac80328c6fde9ceaf77ec6?pvs=4',
      type: 'link' as const,
    },
  ];

  return (
    <>
      <div className="flex flex-col rounded-xl bg-white px-4 py-5">
        <label className="flex items-center gap-2">
          <Checkbox
            size="small"
            selected={isAgree}
            onChange={() => onAgreeChange(!isAgree)}
          />

          <span className="text-body-1-normal font-semibold text-label-normal">
            결제 진행 필수 동의
          </span>
        </label>

        <div className="mt-3 flex flex-col gap-2">
          {terms.map((term) => (
            <label
              key={term.id}
              className="flex items-center justify-between"
              onClick={() => {
                if (term.type === 'modal') {
                  term.action();
                }
              }}
            >
              <div className="flex items-center gap-[0.38rem] hover:brightness-95">
                <CheckIcon
                  className={`h-4 w-4 ${
                    isAgree ? 'text-primary-sub-1' : 'text-label-alternative'
                  }`}
                />
                {term.type === 'link' ? (
                  <Link
                    href={term.href}
                    target="_blank"
                    className={`text-label-1-normal ${
                      isAgree
                        ? 'text-primary-sub-1 font-semibold'
                        : 'text-label-alternative'
                    }`}
                  >
                    {term.label}
                  </Link>
                ) : (
                  <span
                    className={`cursor-pointer text-label-1-normal ${
                      isAgree
                        ? 'text-primary-sub-1 font-semibold'
                        : 'text-label-alternative'
                    }`}
                  >
                    {term.label}
                  </span>
                )}
              </div>

              {term.type === 'link' ? (
                <Link href={term.href || ''} target="_blank">
                  <ChevronIcon className="h-4 w-4 text-label-alternative" />
                </Link>
              ) : (
                <ChevronIcon className="h-4 w-4 text-label-alternative" />
              )}
            </label>
          ))}
        </div>
      </div>

      {/* 개인정보 수집 약관 모달 (첫 번째 항목) */}
      <ModalRadix
        open={isPrivacyModalOpen}
        onOpenChange={setIsPrivacyModalOpen}
        sizeClass="w-[25rem]"
        type="info"
      >
        <div className="flex flex-col text-body-2-reading text-label-normal">
          {/* 글자 안짤리게 줄바꿈 */}
          <p className="whitespace-break-spaces">
            그로블은 고객님께서 구매하신 콘텐츠를 원활하게 제공하기 위해
            최소한의 범위 내에서 아래와 같이 개인정보를 제공합니다.
          </p>
          <br />
          <p>[제공받는 자]</p>
          <p>{user?.nickname}</p>
          <br />
          <p>[제공 정보]</p>
          <p>닉네임, 전화번호, 이메일 주소</p>
          <br />
          <p>[제공 목적]</p>
          <li>본인 확인 및 부정 거래 방지</li>
          <li>
            서비스 제공을 위한 일정 조율, 파일 전달 등 필수 연락
            <br />
            <p className=" pl-4">
              ※ 단, 쿠폰 발송, 알림 메시지, 맞춤형 콘텐츠 추천 등 마케팅성
              연락은 판매자가 아닌 그로블이 직접 수행합니다.
            </p>
          </li>
          <br />
          <p>[보유 및 이용 기간]</p>
          <p>서비스의 제공 목적 달성 후 파기</p>
          <br />
          <p>
            고객님께서는 제3자 제공에 동의하지 않을 수 있으며 동의하지 않을
            경우, 구매가 제한될 수 있습니다.{' '}
          </p>
        </div>

        <Button
          className="mt-6 w-full"
          size="small"
          group="solid"
          type="primary"
          onClick={() => setIsPrivacyModalOpen(false)}
        >
          확인
        </Button>
      </ModalRadix>
    </>
  );
}
