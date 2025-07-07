'use client';

import { useState } from 'react';
import { TextField, CustomSelect, Button } from '@groble/ui';
import type { ContactInfoRequest } from '../../types/storeTypes';

interface ContactInfoEditProps {
  value: ContactInfoRequest;
  onChange: (value: ContactInfoRequest) => void;
}

interface ContactItem {
  id: string;
  type: string;
  url: string;
  label: string;
}

const contactTypeOptions = [
  { value: 'instagram', label: '인스타그램' },
  { value: 'email', label: '이메일' },
  { value: 'openChat', label: '오픈채팅' },
  { value: 'etc', label: '기타' },
];

export function ContactInfoEdit({ value, onChange }: ContactInfoEditProps) {
  const [selectedType, setSelectedType] = useState('');
  const [inputUrl, setInputUrl] = useState('');

  // ContactInfoRequest를 ContactItem 배열로 변환
  const contactItems: ContactItem[] = Object.entries(value)
    .filter(([_, url]) => url && url.trim() !== '')
    .map(([type, url]) => ({
      id: `${type}-${Date.now()}`,
      type,
      url: url as string,
      label:
        contactTypeOptions.find((opt) => opt.value === type)?.label || type,
    }));

  // 사용 가능한 옵션들 (이미 추가된 것들은 제외)
  const availableOptions = contactTypeOptions.filter(
    (option) => !value[option.value as keyof ContactInfoRequest]
  );

  const handleAdd = () => {
    if (!selectedType || !inputUrl.trim()) return;

    const newContactInfo = {
      ...value,
      [selectedType]: inputUrl.trim(),
    };

    onChange(newContactInfo);
    setSelectedType('');
    setInputUrl('');
  };

  const handleRemove = (type: string) => {
    const newContactInfo = { ...value };
    delete newContactInfo[type as keyof ContactInfoRequest];
    onChange(newContactInfo);
  };

  const getPlaceholder = () => {
    switch (selectedType) {
      case 'instagram':
        return 'https://www.instagram.com/username';
      case 'email':
        return 'contact@example.com';
      case 'openChat':
        return 'https://open.kakao.com/o/example';
      case 'etc':
        return '연락처를 입력해주세요';
      default:
        return 'URL을 입력해주세요';
    }
  };

  const isAddDisabled =
    !selectedType ||
    !inputUrl.trim() ||
    !!value[selectedType as keyof ContactInfoRequest];

  return (
    <div className="flex flex-col mt-10">
      <h2 className="text-body-2-normal font-bold text-label-normal flex">
        문의 수단 <span className="text-primary-sub-1 ml-1">*</span>
      </h2>
      <hr className="my-3 border-line-normal" />

      {/* 추가 폼 */}
      <div className="space-y-3">
        <div className="flex gap-2 ">
          <CustomSelect
            options={availableOptions}
            placeholder="유형 선택"
            value={selectedType}
            onChange={(e: { target: { value: string } }) =>
              setSelectedType(e.target.value)
            }
            className="w-[7rem]"
          />

          <TextField
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            placeholder={getPlaceholder()}
            className="flex-1 w-[20rem]"
          />

          <Button
            type="tertiary"
            group="outlined"
            size="x-small"
            onClick={handleAdd}
            disabled={isAddDisabled}
            className="h-10"
          >
            추가하기
          </Button>
        </div>

        {/* 추가된 연락처 목록 */}
        {contactItems.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {contactItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-1 p-[0.62rem] bg-background-alternative  text-label-1-normal font-medium border border-line-normal "
              >
                <span className="text-label-normal">{item.label}</span>
                <span className="text-label-normal">|</span>
                <span className="text-label-normal">{item.url}</span>
                <button
                  type="button"
                  onClick={() => handleRemove(item.type)}
                  className="ml-[0.62rem] text-label-alternative  hover:text-label-normal transition-colors cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M3.52166 3.52131C3.71691 3.32606 4.0335 3.32605 4.22876 3.52131L8 7.29255L11.7712 3.52131C11.9665 3.32606 12.2831 3.32605 12.4783 3.52131C12.6736 3.71657 12.6736 4.03317 12.4783 4.22842L8.70711 7.99965L12.4783 11.7709C12.6736 11.9662 12.6736 12.2827 12.4783 12.478C12.2831 12.6732 11.9665 12.6733 11.7712 12.478L8 8.70676L4.22876 12.478C4.03352 12.6732 3.71692 12.6733 3.52166 12.478C3.3264 12.2827 3.32641 11.9661 3.52166 11.7709L7.29289 7.99965L3.52166 4.22842C3.32639 4.03316 3.32641 3.71656 3.52166 3.52131Z"
                      fill="#171717"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
