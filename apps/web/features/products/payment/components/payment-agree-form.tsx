'use client';
import { ChevronIcon } from '@/components/(improvement)/icons';
import { CheckIcon } from '@/components/(improvement)/icons/CheckIcon';
import { Button } from '@groble/ui';
import { Checkbox } from '@/components/ui';
import ModalRadix from '@/components/ui/ModalRadix';
import { useUserStore } from '@/lib/store/useUserStore';
import Link from 'next/link';
import React, { useState } from 'react';

interface TermItemProps {
  term: {
    id: string;
    label: string;
    href?: string;
    type: 'modal' | 'link' | 'text';
    action?: () => void;
  };
  isAgree: boolean;
  isChecked: boolean;
  onCheckChange: (checked: boolean) => void;
}

function TermItem({ term, isAgree, isChecked, onCheckChange }: TermItemProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Checkbox
          size="small"
          selected={isChecked}
          onChange={onCheckChange}
        />
        <div
          className="flex items-center gap-[0.38rem] hover:brightness-95 cursor-pointer"
          onClick={() => {
            if (term.type === 'modal') {
              term.action?.();
            }
          }}
          onKeyDown={(e) => {
            if (term.type === 'modal' && e.key === 'Enter') {
              term.action?.();
            }
          }}
          aria-label={term.label}
        >
          {term.type === 'link' ? (
            <Link
              href={term.href || ''}
              target="_blank"
              className={`text-label-1-normal ${isAgree
                ? 'text-primary-sub-1 font-semibold'
                : 'text-label-alternative'
                }`}
            >
              {term.label}
            </Link>
          ) : (
            <span
              className={`cursor-pointer text-label-1-normal ${isAgree
                ? 'text-primary-sub-1 font-semibold'
                : 'text-label-alternative'
                }`}
            >
              {term.label}
            </span>
          )}
        </div>
      </div>

      {term.type === 'link' ? (
        <Link href={term.href || ''} target="_blank">
          <ChevronIcon className="h-4 w-4 text-label-alternative" />
        </Link>
      ) : term.type === 'text' ? (
        <></>
      ) : (
        <div
          className="cursor-pointer"
          onClick={() => term.action?.()}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              term.action?.();
            }
          }}
          aria-label={`${term.label} 열기`}
        >
          <ChevronIcon className="h-4 w-4 text-label-alternative" />
        </div>
      )}
    </div>
  );
}

interface PaymentAgreeFormProps {
  isAgree: boolean;
  onAgreeChange: (agreed: boolean) => void;
  sellerName?: string;
}

export default function PaymentAgreeForm({
  isAgree,
  onAgreeChange,
  sellerName,
}: PaymentAgreeFormProps) {
  // 사용자 닉네임 가져오기
  const { user } = useUserStore();

  // 첫 번째(개인정보 수집) 약관 모달 오픈 상태
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);

  // 각 약관 항목의 체크 상태 관리
  const [termChecks, setTermChecks] = useState({
    privacy: false,
    termOfService: false,
    refundPolicy: false,
    responsibility: false,
  });

  // 약관 항목 체크 상태 업데이트 함수
  const handleTermCheckChange = (termId: string, checked: boolean) => {
    const newTermChecks = {
      ...termChecks,
      [termId]: checked,
    };

    setTermChecks(newTermChecks);

    const requiredTerms = ['privacy', 'termOfService', 'refundPolicy', 'responsibility'];
    const allRequiredChecked = requiredTerms.every(termId => newTermChecks[termId as keyof typeof newTermChecks]);

    onAgreeChange(allRequiredChecked);
  };

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
    {
      id: 'responsibility',
      label:
        '그로블은 통신판매중개자이며, 상품·서비스의 제공 및 책임은 판매자에게 있습니다.',
      type: 'text' as const,
    },
  ];

  return (
    <>
      <div className="flex flex-col rounded-xl bg-white px-4 py-5">
        <div className="flex items-center gap-2">
          <Checkbox
            size="small"
            selected={isAgree}
            onChange={(checked) => {
              onAgreeChange(checked);
              if (checked) {
                setTermChecks(prev => ({
                  ...prev,
                  privacy: true,
                  termOfService: true,
                  refundPolicy: true,
                  responsibility: true,
                }));
              } else {
                setTermChecks(prev => ({
                  ...prev,
                  privacy: false,
                  termOfService: false,
                  refundPolicy: false,
                  responsibility: false,
                }));
              }
            }}
          />

          <span className="text-body-1-normal font-semibold text-label-normal">
            전체 동의
          </span>
        </div>

        <div className="mt-3 flex flex-col gap-2">
          {terms.map((term) => (
            <TermItem
              key={term.id}
              term={term}
              isAgree={isAgree}
              isChecked={termChecks[term.id as keyof typeof termChecks]}
              onCheckChange={(checked) => handleTermCheckChange(term.id, checked)}
            />
          ))}
        </div>
      </div>

      {/* 개인정보 수집 약관 모달 (첫 번째 항목) */}
      <ModalRadix
        title="개인정보 수집 약관"
        open={isPrivacyModalOpen}
        onOpenChange={setIsPrivacyModalOpen}
        sizeClass="w-[25rem]"
        type="info"
      >
        <div className="flex flex-col text-body-2-reading text-label-normal">
          <p className="whitespace-break-spaces">
            그로블은 콘텐츠 제공을 위해 아래 정보를 수집·이용하며, 판매자는 그로블을 통해 이를 확인할 수 있습니다.
          </p>
          <br />
          <p>[수집 항목]</p>
          <p>전화번호, 이메일, 자동 생성된 닉네임</p>
          <br />
          <p>[제공받는 자]</p>
          <p>{sellerName || '(판매자)'}</p>
          <br />
          <p>[이용 목적]</p>
          <ul className="list-disc pl-4">
            <li>본인 확인 및 부정 거래 방지</li>
            <li>
              서비스 제공을 위한 일정 조율, 파일 전달 등 필수 연락
              <br />
              <p className="pl-4">
                ※ 단, 쿠폰 발송, 알림 메시지, 맞춤형 콘텐츠 추천 등 마케팅성
                연락은 판매자가 아닌 그로블이 직접 수행합니다.
              </p>
            </li>
          </ul>
          <br />
          <p>[보유 및 이용기간]</p>
          <p>관련 법령에 따라 일정 기간 보관 후 파기합니다.</p>
          <br />
          <p>
            고객님께서는 제3자 제공에 동의하지 않을 수 있으며 동의하지 않을
            경우, 구매가 제한될 수 있습니다.
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
