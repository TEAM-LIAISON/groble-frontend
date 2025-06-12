"use client";
import { InformationIcon } from "@/components/(improvement)/icons/InformationIcon";
import BottomArea from "@/components/bottom-area";
import { Button } from "@groble/ui";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { activateProductClient } from "../../api/product-client-api";

const STATUS_MAP: Record<
  Exclude<ProductStatusBarProps["status"], "ACTIVE" | "DRAFT" | "PENDING">,
  { bgClass: string; message: string }
> = {
  VALIDATED: { bgClass: "bg-[#D9FFE6]", message: "심사가 완료됐어요" },
  REJECTED: { bgClass: "bg-[#FEECEC]", message: "심사가 반려되었어요" },
};

export interface ProductStatusBarProps {
  id: string;
  status: "ACTIVE" | "DRAFT" | "PENDING" | "VALIDATED" | "REJECTED";
}

export default function ProductStatusBar({
  status,
  id,
}: ProductStatusBarProps) {
  const router = useRouter();

  // ACTIVE, DRAFT, PENDING 은 렌더하지 않음
  if (status === "ACTIVE" || status === "DRAFT" || status === "PENDING") {
    return null;
  }

  const { bgClass, message } = STATUS_MAP[status];

  const handleActivate = useCallback(async () => {
    const res = await activateProductClient({ productId: id });
    if (res.status === "SUCCESS") {
      alert("상품이 판매 등록되었어요.");
      router.refresh();
    }
  }, [id, router]);

  return (
    <>
      {/* ACTIVE, DRAFT, PENDING 일 경우 hidden // VALIDATED 일경우 배경 초록,
      REJECTED 일경우 배경 빨강 */}
      <div
        className={`flex w-full items-center justify-between rounded-sm px-4 py-3 ${bgClass}`}
      >
        <div className="flex items-center gap-[0.38rem]">
          <InformationIcon />

          <p className="text-sm text-gray-700">{message}</p>
        </div>
        {status === "REJECTED" && (
          <Link
            href={`/products/${id}/reject-reason`}
            className="text-sm text-red-600 underline"
          >
            사유보기
          </Link>
        )}
      </div>
      {status === "VALIDATED" && (
        <BottomArea>
          <Button
            size="small"
            type="primary"
            group="solid"
            className="mb-3 hover:brightness-95"
            onClick={handleActivate}
          >
            판매하기
          </Button>
        </BottomArea>
      )}
    </>
  );
}
