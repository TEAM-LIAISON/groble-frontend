'use client';

import { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';
import type { ProductOptionType } from '@/entities/product/model/product-types';

interface AccordionSelectProps {
  options: ProductOptionType[];
  selectedOptionId: string;
  onChange: (id: string) => void;
  placeholder?: string;
  label?: string;
}

export default function AccordionSelect({
  options,
  selectedOptionId,
  onChange,
  placeholder = '옵션을 선택하세요.',
  label,
}: AccordionSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  // 현재 선택된 옵션 라벨 찾기
  const selectedOption = options.find(
    (opt) => opt.optionId.toString() === selectedOptionId
  );

  return (
    <div className="w-full">
      {label && (
        <p className="text-body-1-normal-1 mb-2 font-semibold text-label-normal">
          {label}
        </p>
      )}
      <button
        type="button"
        className="flex w-full items-center justify-between rounded-8 border border-line-strong bg-background-normal p-[0.88rem] text-body-2-normal font-medium text-label-normal transition-colors hover:bg-gray-50"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className={`text-label-normal`}>
          {selectedOption ? selectedOption.name : placeholder}
        </span>
        {isOpen ? (
          <ChevronUpIcon className="h-4 w-4" />
        ) : (
          <ChevronDownIcon className="h-4 w-4" />
        )}
      </button>

      {isOpen && (
        <ul className="mt-2 max-h-48 overflow-auto rounded-8 border border-line-strong bg-white">
          {options.map((opt) => {
            const idStr = opt.optionId.toString();
            const isSelected = idStr === selectedOptionId;
            return (
              <li
                key={idStr}
                className={`cursor-pointer p-[0.88rem] text-body-2-normal font-medium text-label-normal transition-colors ${
                  isSelected
                    ? 'bg-component-fill-alternative'
                    : 'hover:bg-gray-50'
                } ${
                  opt === options[options.length - 1]
                    ? ''
                    : 'border-b border-gray-100'
                } `}
                onClick={() => {
                  onChange(idStr);
                  setIsOpen(false);
                }}
              >
                <div className="flex items-center justify-between">
                  <span>{opt.name}</span>
                  <span className="text-body-2-normal font-semibold text-primary-sub-1">
                    {opt.price.toLocaleString()}원
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
