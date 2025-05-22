"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GrobleLogo } from "../icons/GrobleLogo";
import NavigationBar from "../navigation-bar";

export default function Footer() {
  const pathname = usePathname();

  return (
    (pathname == "/" || pathname.startsWith("/category")) && (
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
              <div className="flex gap-1">
                <p>상호명:리에종 |</p>
                <p>대표자: 주서영 |</p>
                <p>사업자등록번호 : 515-36-92976</p>
              </div>
              <p>주소: 서울 광진구 광나루로19길 23, 103호</p>
            </div>

            <div className="mt-3 mb-8 flex flex-wrap gap-[1.12rem] text-sm">
              <Link
                href="https://paint-crowley-ff2.notion.site/1f2c158365ac809bb1cbc7723ac4b346?pvs=4"
                className="text-caption-1 text-label-neutral hover:text-label-normal"
              >
                개인정보 처리방침
              </Link>
              <Link
                href="https://paint-crowley-ff2.notion.site/1f2c158365ac80c39fc3ef1b8764f53a?pvs=4"
                className="text-caption-1 text-label-neutral hover:text-label-normal"
              >
                서비스 이용약관
              </Link>
              <Link
                href="https://paint-crowley-ff2.notion.site/1f2c158365ac80afafe6c9d7c1011d39?pvs=4"
                className="text-caption-1 text-label-neutral hover:text-label-normal"
              >
                메이커 이용약관
              </Link>
              <Link
                href="https://paint-crowley-ff2.notion.site/1f2c158365ac80328c6fde9ceaf77ec6?pvs=4"
                className="text-caption-1 text-label-neutral hover:text-label-normal"
              >
                환불 규정
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
