"use client";
import BottomArea from "@/components/bottom-area";
import Button from "@/components/button";
import { InformationIcon } from "@/components/icons/InformationIcon";
import { activateProduct } from "@/lib/api/productApi";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ProductStatusBar({
  status,
  id,
}: {
  status: "ACTIVE" | "DRAFT" | "PENDING" | "VALIDATED" | "REJECTED";
  id: string;
}) {
  const router = useRouter();
  // useMutation 훅을 이용해서 POST 요청
  const mutation = useMutation({
    mutationFn: () => activateProduct(id),
    onSuccess: () => {
      alert("콘텐츠가 승인되었어요");
      router.refresh();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return (
    <>
      {/* ACTIVE, DRAFT, PENDING 일 경우 hidden // VALIDATED 일경우 배경 초록,
      REJECTED 일경우 배경 빨강 */}
      <div
        className={`flex w-full items-center justify-between rounded-sm px-4 py-3 ${status === "ACTIVE" || status === "DRAFT" || status === "PENDING" ? "hidden" : status === "VALIDATED" ? "bg-[#D9FFE6]" : "bg-[#FEECEC]"}`}
      >
        <div className="flex items-center gap-[0.38rem]">
          <InformationIcon />

          <p className="text-label-1-normal text-label-normal">
            {status === "VALIDATED"
              ? "심사가 완료됐어요"
              : "심사가 반려 되었어요"}
          </p>
        </div>
        {status === "REJECTED" && (
          <Link
            href={`/products/${id}/reject-reason`}
            className="text-label-1-normal text-status-error underline"
          >
            사유보기
          </Link>
        )}
      </div>
      <BottomArea>
        <Button
          size="small"
          type="primary"
          group="solid"
          className="mb-3 hover:brightness-95"
          onClick={() => mutation.mutate()}
        >
          판매하기
        </Button>
      </BottomArea>
    </>
  );
}
