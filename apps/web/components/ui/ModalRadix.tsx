// components/ModalRadix.tsx
"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { ReactNode } from "react";

interface ModalRadixProps {
  /** 모달을 열지 닫을지 */
  open: boolean;
  /** 모달 상태 변경 콜백 (닫기를 처리할 때 사용) */
  onOpenChange: (open: boolean) => void;
  /** 원하는 크기 Tailwind 클래스 (예: "max-w-md", "w-96", "max-w-lg" 등) */
  sizeClass?: string;
  /** 안내용("info") 또는 경고용("alert") 분기 */
  type?: "info" | "alert";
  /** 모달 내부에 렌더링할 JSX */
  children: ReactNode;
}

export default function ModalRadix({
  open,
  onOpenChange,
  sizeClass = "max-w-lg",
  type = "info",
  children,
}: ModalRadixProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        {/* 검은 반투명 배경 (Radix가 자동으로 overlay 클릭 시 onOpenChange(false) 처리) */}
        <Dialog.Overlay className="data-[state=open]:animate-in data-[state=closed]:fade-out-0 fixed inset-0 z-50 bg-black/50" />

        {/* 모달 콘텐츠 박스 */}
        <Dialog.Content
          className={`fixed top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white ${sizeClass} data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom`}
        >
          {/* 모달 내부 컨텐츠 */}
          <div className="p-8">{children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
