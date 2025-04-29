import { LinkButton } from "@/components/button";
import Image from "next/image";
import Link from "next/link";
import { ComponentPropsWithRef, ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import appleIcon from "../../apple-icon.png";

export default function Content({
  className,
  ...props
}: ComponentPropsWithRef<"section">) {
  return (
    <section
      className={twMerge("flex flex-col gap-4 px-5", className)}
      {...props}
    >
      <Link className="flex flex-col gap-3" href="/contents/1">
        <div className="relative aspect-video">
          <Image
            src={appleIcon}
            alt=""
            className="rounded-[12px] object-cover"
            fill
          />
        </div>
        <div>
          <Tag>결제완료</Tag>
        </div>
        <div className="flex flex-col gap-1">
          <h1 className="line-clamp-2 text-body-1-normal font-semibold text-label-normal">
            제목 테스트 제목 테스트 제목 테스트 제목 테스트 제목 테스트 제목
            테스트 제목 테스트 제목 테스트 제목 테스트 제목 테스트 제목 테스트
          </h1>
          <div className="text-label-1-normal font-semibold text-label-alternative">
            김로블
          </div>
        </div>
      </Link>
      <div className="grid grid-flow-col gap-2">
        <LinkButton type="secondary" size="x-small" href="#">
          문의하기
        </LinkButton>
        <LinkButton
          type="tertiary"
          size="x-small"
          href="#"
          className="bg-[#D8FFF4] text-primary-sub-1"
        >
          다운로드
        </LinkButton>
      </div>
    </section>
  );
}

function Tag({ children }: { children?: ReactNode }) {
  return (
    <span className="rounded-4 bg-primary-sub-1 px-1.5 py-1 text-caption-2 font-semibold text-label-inverse">
      {children}
    </span>
  );
}
