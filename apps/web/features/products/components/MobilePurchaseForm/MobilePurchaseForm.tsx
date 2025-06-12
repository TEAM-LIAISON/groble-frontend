"use client";

import { useState } from "react";
import { Cross2Icon } from "@radix-ui/react-icons";
import * as Dialog from "@radix-ui/react-dialog";
import BottomSheet from "@/components/ui/BottomSheet";
import AccordionSelect from "@/components/ui/AccordionSelect";
import { Button } from "@groble/ui";
import type { ProductOptionType } from "@/entities/product/model/product-types";

interface MobilePurchaseFormProps {
  options: ProductOptionType[];
  isOpen: boolean;
  onClose: () => void;
  onPurchase: (optionId: string) => void;
}

export default function MobilePurchaseForm({
  options,
  isOpen,
  onClose,
  onPurchase,
}: MobilePurchaseFormProps) {
  const [selectedOptionId, setSelectedOptionId] = useState<string>("");

  // 선택된 옵션의 가격을 구하는 헬퍼
  const selectedPrice = selectedOptionId
    ? options.find((opt) => opt.optionId.toString() === selectedOptionId)?.price
    : 0;

  const handlePurchase = () => {
    if (selectedOptionId) {
      onPurchase(selectedOptionId);
      setSelectedOptionId(""); // 폼 초기화
    }
  };

  // 바텀시트가 닫힐 때 폼 초기화
  const handleClose = () => {
    setSelectedOptionId("");
    onClose();
  };

  return (
    <BottomSheet isOpen={isOpen} onClose={handleClose}>
      {/* 옵션 선택 (AccordionSelect 사용) */}
      <div className="mb-4">
        <AccordionSelect
          options={options}
          selectedOptionId={selectedOptionId}
          onChange={setSelectedOptionId}
          placeholder="옵션을 선택해주세요."
          label="옵션 선택"
        />
      </div>

      {/* 최종 금액 */}
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-body-1-normal-1 font-semibold text-label-normal">
          최종 금액
        </h3>
        <span className="flex gap-[0.12rem] text-headline-1 font-semibold text-primary-sub-1">
          <p>₩</p>
          <span>{selectedPrice?.toLocaleString() ?? "0"}</span>
        </span>
      </div>

      {/* 구매하기 버튼 */}
      <Button
        group="solid"
        type="primary"
        size="small"
        buttonType="button"
        className="w-full"
        disabled={selectedOptionId === ""}
        onClick={handlePurchase}
      >
        구매하기
      </Button>
    </BottomSheet>
  );
}
