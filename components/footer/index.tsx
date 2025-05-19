"use client";

import Link from "next/link";
import { useSelectedLayoutSegments } from "next/navigation";
import { GrobleLogo } from "../icons/GrobleLogo";
import NavigationBar from "../navigation-bar";

export default function Footer() {
  const segments = useSelectedLayoutSegments();

  return (
    (segments.length == 0 || segments[0] == "category") && (
      <footer className="mt-12 border-t border-line-normal bg-background-alternative px-5 py-8 md:px-12 md:py-10">
        <div className="mx-auto max-w-[1250px] xl:px-12">
          <div className="flex flex-col items-start">
            <div className="flex items-center">
              <GrobleLogo variant="row" width={127} height={40} />
            </div>
            <div className="mt-6 mb-3 text-caption-1 text-label-normal">
              <p>그로블은 통신판매 중개자이며, 통신판매의 당사자가 아닙니다</p>
            </div>

            <div className="flex flex-col gap-1 text-caption-1 text-label-alternative">
              <p>대표자: 주서영</p>
              <p>개인정보관리책임자: 권동민</p>
              <p>주소: 서울특별시 마포구 와우산로 94</p>
            </div>

            <div className="mt-3 mb-8 flex flex-wrap gap-[1.12rem] text-sm">
              <Link
                href="/privacy"
                className="text-caption-1 text-label-neutral hover:text-label-normal"
              >
                개인정보 처리방침
              </Link>
              <Link
                href="/terms"
                className="text-caption-1 text-label-neutral hover:text-label-normal"
              >
                서비스 이용약관
              </Link>
              <Link
                href="/marketing"
                className="text-caption-1 text-label-neutral hover:text-label-normal"
              >
                메이커 이용 약관
              </Link>
              <Link
                href="/refund"
                className="text-caption-1 text-label-neutral hover:text-label-normal"
              >
                취소 및 환불 규정
              </Link>
            </div>
          </div>
          <hr className="mb-6 border-line-neutral" />

          <div className="text-caption-2 text-label-alternative">
            © 2025. liaison. All rights reserved.
          </div>
        </div>
        <NavigationBar />
      </footer>
    )
  );
}
