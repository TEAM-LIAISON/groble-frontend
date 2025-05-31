"use client";

import { useState, useCallback } from "react";
import BottomArea, { BottomLinkButton } from "@/components/bottom-area";
import Header, { Back } from "@/components/header";
import { twMerge } from "tailwind-merge";

type MakerType = "private" | "corporation";

const OPTIONS: {
  key: MakerType;
  label: string;
  sub: string;
}[] = [
  {
    key: "private",
    sub: "사업자를 보유하고 있지 않은 메이커",
    label: "개인 메이커",
  },
  {
    key: "corporation",
    sub: "개인 또는 법인 사업자를 보유한 메이커",
    label: "개인 • 법인 사업자",
  },
];

export default function MakerSelectTypePage() {
  const [selectedType, setSelectedType] = useState<MakerType>("private");

  const handleSelect = useCallback((type: MakerType) => {
    setSelectedType(type);
  }, []);

  return (
    <div className="flex flex-col bg-background-normal md:items-center md:justify-center">
      <div className="w-full md:mt-[150px] md:max-w-[480px]">
        <Header left={<Back />} />

        <main className="p-5 md:p-0">
          <h1 className="text-title-3 font-bold text-label-normal">
            메이커 인증을 진행할게요
          </h1>
          <p className="mt-[0.12rem] text-body-1-normal font-medium text-label-alternative">
            사업자 보유 여부에 따라 선택해주세요
          </p>

          <div className="mt-8 flex flex-col gap-3">
            {OPTIONS.map(({ key, sub, label }) => {
              const isSelected = key === selectedType;
              return (
                <button
                  key={key}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => handleSelect(key)}
                  className={twMerge(
                    "flex cursor-pointer flex-col items-center gap-[0.12rem] rounded-md border-[1.5px] border-transparent bg-background-alternative py-[3.5rem] transition-colors",
                    isSelected && "border-primary-sub-1 bg-[#EEFFFA]",
                  )}
                >
                  <p className="text-body-2-normal text-label-alternative">
                    {sub}
                  </p>
                  <p className="text-headline-1 font-semibold text-label-normal">
                    {label}
                  </p>
                </button>
              );
            })}
          </div>
        </main>

        <BottomArea narrow>
          <BottomLinkButton
            href={`/users/maker/maker-info?type=${selectedType}`}
          >
            다음
          </BottomLinkButton>
        </BottomArea>
      </div>
    </div>
  );
}
