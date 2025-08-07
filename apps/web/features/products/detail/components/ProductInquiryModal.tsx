'use client';
import { useMemo } from 'react';
import { CustomModal } from '@groble/ui';
import { Button } from '@groble/ui';
import { showToast } from '@/shared/ui/Toast';
import type { ContactInfo } from '@/entities/product/model/product-types';

interface InquiryMethod {
  type: 'openChat' | 'instagram' | 'email' | 'other';
  label: string;
  value: string; // URL 또는 이메일 주소
}

interface ProductInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  contactInfo: ContactInfo | undefined;
}

export default function ProductInquiryModal({
  isOpen,
  onClose,
  contactInfo,
}: ProductInquiryModalProps) {
  // contactInfo를 InquiryMethod 배열로 변환
  const inquiryMethods = useMemo((): InquiryMethod[] => {
    if (!contactInfo) return [];

    const methods: InquiryMethod[] = [];

    if (contactInfo.email) {
      methods.push({
        type: 'email',
        label: '이메일',
        value: contactInfo.email,
      });
    }

    if (contactInfo.openChat) {
      methods.push({
        type: 'openChat',
        label: '오픈채팅',
        value: contactInfo.openChat,
      });
    }

    if (contactInfo.instagram) {
      methods.push({
        type: 'instagram',
        label: '인스타그램',
        value: contactInfo.instagram,
      });
    }

    return methods;
  }, [contactInfo]);

  const handleMethodClick = async (method: InquiryMethod) => {
    if (method.type === 'email') {
      // 이메일인 경우 클립보드에 복사
      try {
        await navigator.clipboard.writeText(method.value);
        showToast.success('클립보드에 복사되었습니다');
      } catch (err) {
        console.error('클립보드 복사 실패:', err);
        showToast.error('클립보드 복사에 실패했습니다');
      }
    } else {
      // 다른 링크인 경우 새 탭으로 열기
      window.open(method.value, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <CustomModal isOpen={isOpen} onRequestClose={onClose}>
      <div className="px-8 pt-8 pb-6 ">
        <h2 className="text-title-3 font-bold text-label-normal mb-6">
          문의 수단을 선택해주세요
        </h2>

        {inquiryMethods.length > 0 && (
          <div className="space-y-3">
            {inquiryMethods.map((method, index) => (
              <Button
                key={index}
                onClick={() => handleMethodClick(method)}
                className="w-full"
                group="solid"
                size="medium"
                type="secondary"
              >
                {method.label}
              </Button>
            ))}
          </div>
        )}

        {inquiryMethods.length === 0 && (
          <div className="text-center py-8">
            <div className="text-body-2-normal text-label-alternative mb-4">
              등록된 문의 수단이 없습니다.
            </div>
            <Button
              type="secondary"
              size="small"
              group="solid"
              onClick={onClose}
              className="w-full"
            >
              닫기
            </Button>
          </div>
        )}
      </div>
    </CustomModal>
  );
}
