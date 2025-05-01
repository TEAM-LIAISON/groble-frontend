import { LinkButton } from "@/components/button";
import { twMerge } from "@/lib/tailwind-merge";
import Image from "next/image";
import Link from "next/link";
import { ComponentPropsWithRef, ReactNode } from "react";
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
        <div className="relative aspect-411/335 rounded-[12px]">
          <Image src={appleIcon} alt="" className="object-cover" fill />
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
          <div className="text-body-1-normal font-medium">
            <span className="font-bold">12,000</span>원
          </div>
          <div />
          <div className="flex items-center gap-0.5 text-caption-1 font-medium text-label-assistive">
            <Star /> 4.5
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

function Star() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.95879 1.63932C8.60425 0.786896 7.3967 0.786893 7.04216 1.63932L5.71482 4.83062C5.66136 4.95916 5.54048 5.04698 5.40172 5.05811L1.95643 5.33431C1.03617 5.40809 0.663014 6.55653 1.36416 7.15714L3.9891 9.40568C4.09483 9.49625 4.141 9.63835 4.1087 9.77376L3.30673 13.1358C3.09252 14.0338 4.06945 14.7436 4.85732 14.2623L7.80696 12.4607C7.92577 12.3881 8.07518 12.3881 8.19398 12.4607L11.1436 14.2623C11.9315 14.7436 12.9084 14.0338 12.6942 13.1358L11.8922 9.77376C11.8599 9.63835 11.9061 9.49625 12.0118 9.40568L14.6368 7.15714C15.3379 6.55654 14.9648 5.40809 14.0445 5.33431L10.5992 5.05811C10.4605 5.04698 10.3396 4.95916 10.2861 4.83062L8.95879 1.63932Z"
        fill="#C2C4C8"
      />
    </svg>
  );
}
