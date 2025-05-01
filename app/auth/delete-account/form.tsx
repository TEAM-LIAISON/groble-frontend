"use client";

import { BottomButton } from "@/components/button";
import Checkbox from "@/components/checkbox";
import { TextAreaTextField } from "@/components/text-field";
import { twMerge } from "@/lib/tailwind-merge";
import { ReactNode } from "react";

export default function AgreeToTermsForm() {
  return (
    <div
      className="flex flex-col gap-5"
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <div className="flex flex-col">
        <h1 className="text-heading-1 font-semibold">정말로 탈퇴하시겠어요?</h1>
        <p className="text-body-2-normal font-medium text-label-alternative">
          탈퇴하시면 저장된 정보들이 모두 사라져요
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <Item name="a">서비스를 잘 이용하지 않아요</Item>
        <Item name="b">서비스 이용이 불편해요</Item>
        <Item name="c">필요한 기능이나 콘텐츠가 없어요</Item>
        <Item name="d">불쾌한 경험을 겪었어요</Item>
        <Item name="d">가격 및 비용이 부담돼요</Item>
        <Item name="d">기타</Item>
        <TextAreaTextField name="reason" placeholder="상세 사유를 적어주세요" />
      </div>
      <div className="fixed right-0 bottom-0 left-0 flex flex-col">
        <BottomButton>탈퇴하기</BottomButton>
      </div>
    </div>
  );
}

function Item({
  name,
  className,
  children,
}: {
  name?: string;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <label
      className={twMerge(
        "flex items-center gap-2 py-2 text-body-2-normal font-medium",
        className,
      )}
    >
      <Checkbox name={name} />
      <span className="flex-1">{children}</span>
    </label>
  );
}
