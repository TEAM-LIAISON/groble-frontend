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
        <ChevronIcon className="h-4 w-4 text-label-alternative" />
      )}
    </div>
  );
}

interface PaymentAgreeFormProps {
  isAgree: boolean;
  onAgreeChange: (agreed: boolean) => void;
  sellerName?: string;
  onBuyerInfoStorageChange?: (agreed: boolean) => void;
}

export default function PaymentAgreeForm({
  isAgree,
  onAgreeChange,
  sellerName,
  onBuyerInfoStorageChange,
}: PaymentAgreeFormProps) {
  // 사용자 닉네임 가져오기
  const { user } = useUserStore();

  // 첫 번째(개인정보 수집) 약관 모달 오픈 상태
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [isGuestInfoModalOpen, setIsGuestInfoModalOpen] = useState(false);

  // 각 약관 항목의 체크 상태 관리
  const [termChecks, setTermChecks] = useState({
    privacy: false,
    termOfService: false,
    refundPolicy: false,
    guestInfo: false,
    responsibility: false,
  });

  // 약관 항목 체크 상태 업데이트 함수
  const handleTermCheckChange = (termId: string, checked: boolean) => {
    const newTermChecks = {
      ...termChecks,
      [termId]: checked,
    };

    setTermChecks(newTermChecks);

    if (termId === 'guestInfo') {
      onBuyerInfoStorageChange?.(checked);
      return;
    }

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
      id: 'guestInfo',
      label: '구매자 정보 저장 (선택)',
      action: () => setIsGuestInfoModalOpen(true),
      type: 'modal' as const,
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
                  guestInfo: true,
                }));
              } else {
                setTermChecks(prev => ({
                  ...prev,
                  privacy: false,
                  termOfService: false,
                  refundPolicy: false,
                  responsibility: false,
                  guestInfo: false,
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
            그로블은 고객님께서 구매하신 콘텐츠를 원활하게 제공하기 위해
            최소한의 범위 내에서 아래와 같이 개인정보를 제공합니다.
          </p>
          <br />
          <p>[제공받는 자]</p>
          <p>{sellerName || '(판매자 닉네임)'}</p>
          <br />
          <p>[제공 정보]</p>
          <p>전화번호, 이름(닉네임), 이메일</p>
          <br />
          <p>[제공 목적]</p>
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
          <p>서비스의 제공 목적 달성 후 파기</p>
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

      {/* 구매자 정보 저장 약관 모달 */}
      <ModalRadix
        title="구매자 정보 저장 약관"
        open={isGuestInfoModalOpen}
        onOpenChange={setIsGuestInfoModalOpen}
        sizeClass="w-[25rem]"
        type="info"
      >
        <div className="flex flex-col text-body-2-reading text-label-normal">
          <p className="whitespace-break-spaces">
            그로블은 고객님의 편리한 구매를 지원하기 위해, 최소한의 범위 내에서
            아래와 같이 구매자 정보를 저장합니다.
          </p>
          <br />
          <p>[저장하는 정보]</p>
          <p>전화번호, 이름(닉네임), 이메일</p>
          <br />
          <p>[이용 목적]</p>
          <ul className="list-disc pl-4">
            <li>다음 주문 시 구매자 정보 자동 입력을 통한 결제 편의 제공</li>
            <li>주문 관련 상담 및 고객 문의 응대</li>
          </ul>
          <br />
          <p>[보관 및 삭제]</p>
          <ul className="list-disc pl-4">
            <li>
              저장된 정보는 고객님의 동의일로부터 최대 3년간 보관 후 자동
              삭제됩니다.
            </li>
            <li>
              법령에 따라 일부 거래·결제 기록은 별도로 보관될 수 있습니다.
            </li>
          </ul>
          <br />
          <p>[동의 철회]</p>
          <ul className="list-disc pl-4">
            <li>
              고객은 언제든지 저장된 정보 삭제(동의 철회)를 요청할 수 있습니다.
            </li>
            <li>
              철회를 원하실 경우, groble@groble.im로 문의해 주시면 즉시 처리해
              드립니다.
            </li>
          </ul>
        </div>
        <Button
          className="mt-6 w-full"
          size="small"
          group="solid"
          type="primary"
          onClick={() => setIsGuestInfoModalOpen(false)}
        >
          확인
        </Button>
      </ModalRadix>
    </>
  );
}
