"use client";

import { LinkButton } from "@/components/button";
import { getMySellingContentsResponse } from "@/lib/api";
import { twMerge } from "@/lib/tailwind-merge";
import Image from "next/image";
import Link from "next/link";
import { ComponentPropsWithRef, ReactNode } from "react";
import appleIcon from "../apple-icon.png";

export default function Contents({
  response,
}: {
  response: getMySellingContentsResponse;
}) {
  if (response.status != 200) throw new Error(JSON.stringify(response));

  return (
    <div className="flex flex-col gap-8">
      {response.data.data?.items?.map((item) => (
        <Content key={item.contentId} />
      ))}
    </div>
  );
}

function Content({ className, ...props }: ComponentPropsWithRef<"section">) {
  return (
    <section
      className={twMerge("flex flex-col gap-4 px-5", className)}
      {...props}
    >
      <Link className="flex flex-col gap-3" href="/contents/1">
        <div className="relative aspect-411/335 rounded-[12px]">
          <Image src={appleIcon} alt="" className="object-cover" fill />
        </div>
        <div className="text-caption-1 text-label-neutral">
          <Tag>판매중</Tag> · 2025-03-14
        </div>
        <div className="flex flex-col gap-1">
          <h1 className="line-clamp-2 text-body-1-normal font-semibold text-label-normal">
            제목 테스트 제목 테스트 제목 테스트 제목 테스트 제목 테스트 제목
            테스트 제목 테스트 제목 테스트 제목 테스트 제목 테스트 제목 테스트
          </h1>
          <div className="text-label-1-normal font-semibold text-label-alternative">
            김로블
          </div>
          <div className="text-body-1-normal font-medium">
            <span className="font-bold">12,000</span>원
          </div>
          <div />
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
  return <span className="font-semibold text-primary-sub-1">{children}</span>;
}
