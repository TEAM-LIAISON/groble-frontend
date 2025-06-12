"use client";

import BottomArea, { BottomButton } from "@/components/bottom-area";
import { Button } from "@groble/ui";
import Checkbox from "@/components/checkbox";
import Popover, { PopoverClose } from "@/components/popover";
import { twMerge } from "@/lib/tailwind-merge";
import Form from "next/form";
import Link from "next/link";
import {
  ChangeEventHandler,
  ReactNode,
  Ref,
  RefObject,
  useActionState,
  useRef,
} from "react";
import { agreeToTermsAction } from "./actions";

export default function TermsForm({
  userType,
}: {
  userType: "SELLER" | "BUYER";
}) {
  const agreeAllRef = useRef<HTMLInputElement>(null);
  const submitAsIsRef = useRef<boolean>(false);
  const [, formAction, isPending] = useActionState(
    agreeToTermsAction,
    undefined,
  );
  return (
    <Form
      className="group flex flex-col gap-5"
      action={formAction}
      onSubmit={(event) => {
        const marketingCheckbox = event.currentTarget.querySelector(
          'input[name="terms-type"][value="MARKETING_POLICY"]',
        ) as HTMLInputElement | null;
        const submitPopover = document.getElementById("submit");

        if (
          marketingCheckbox &&
          !marketingCheckbox.checked &&
          submitPopover &&
          !submitAsIsRef.current
        ) {
          event.preventDefault();
          submitPopover.showPopover();
        }
      }}
    >
      <h1 className="text-heading-1 font-semibold md:font-bold">
        가입을 위해 아래 항목에 동의해주세요.
      </h1>
      <div className="flex flex-col gap-2">
        <Item
          id="agree-all"
          ref={agreeAllRef}
          className="font-semibold"
          onChange={() => onAgreeAllChange(agreeAllRef)}
        >
          약관 전체 동의
        </Item>
        <div className="border-t border-line-normal" />
        <Item
          name="terms-type"
          value="AGE_POLICY"
          onChange={() => onPolicyChange(agreeAllRef)}
          required
        >
          [필수] 만 14세 이상입니다
        </Item>
        <Item
          name="terms-type"
          value="PRIVACY_POLICY"
          right={
            <Link href="https://paint-crowley-ff2.notion.site/1f2c158365ac808cb22ecd38fe6d3ef7">
              <RightArrow />
            </Link>
          }
          onChange={() => onPolicyChange(agreeAllRef)}
          required
        >
          [필수] 개인정보 수집 및 이용 동의
        </Item>
        <Item
          name="terms-type"
          value="SERVICE_TERMS_POLICY"
          right={
            <Link href="https://paint-crowley-ff2.notion.site/1f2c158365ac80c39fc3ef1b8764f53a">
              <RightArrow />
            </Link>
          }
          onChange={() => onPolicyChange(agreeAllRef)}
          required
        >
          [필수] 서비스 이용약관 동의
        </Item>
        <Item
          name="terms-type"
          value="MARKETING_POLICY"
          onChange={() => onPolicyChange(agreeAllRef)}
          right={
            <>
              <button type="button" popoverTarget="marketing-policy">
                <RightArrow />
              </button>
              <Popover id="marketing-policy">
                <div className="flex flex-col gap-8">
                  <p className="text-label-neutral">
                    회사는 회원님의 서비스 이용 이력(콘텐츠 열람, 구매 등)을
                    바탕으로{" "}
                    <span className="font-bold">
                      맞춤형 콘텐츠 추천, 할인 쿠폰 제공, 혜택 알림 발송
                    </span>{" "}
                    등의 마케팅 목적에 개인정보를 활용하며, 문자(SMS), 이메일,
                    알림 등으로 관련 마케팅 정보를 수신할 수 있습니다.
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <PopoverClose popoverTarget="marketing-policy" />
                    <Button
                      size="small"
                      buttonType="button"
                      popoverTarget="marketing-policy"
                      onClick={() => {
                        const checkbox = document.querySelector(
                          'input[value="MARKETING_POLICY"]',
                        ) as HTMLInputElement;
                        checkbox.checked = true;
                        onPolicyChange(agreeAllRef);
                      }}
                    >
                      동의
                    </Button>
                  </div>
                </div>
              </Popover>
            </>
          }
        >
          [선택] 마케팅 활용 및 수신 동의
        </Item>
      </div>
      <BottomArea narrow>
        <BottomButton>{isPending ? "⏳" : "다음"}</BottomButton>
      </BottomArea>
      <Popover id="submit">
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-bold text-gray-900">
            마케팅 활용 및 수신에 동의하시면,
          </h2>
          <p className="text-sm text-gray-600">
            각종 할인 쿠폰과 유용한 소식을 보내드려요.
          </p>
          <ul className="my-2 space-y-1 text-sm text-gray-700">
            <li className="flex items-center">
              <CheckIcon className="mr-2 h-5 w-5 flex-shrink-0 text-[#00E095]" />
              <span>할인 쿠폰, 각종 혜택, 한정 특가 소식</span>
            </li>
            <li className="flex items-center">
              <CheckIcon className="mr-2 h-5 w-5 flex-shrink-0 text-[#00E095]" />
              <span>맞춤형 콘텐츠 추천, 인기 상품 소식</span>
            </li>
          </ul>
          <div className="mt-2 flex flex-col gap-2">
            <Button
              size="small"
              buttonType="submit"
              popoverTarget="submit"
              onClick={() => {
                const checkbox = document.querySelector(
                  'input[name="terms-type"][value="MARKETING_POLICY"]',
                ) as HTMLInputElement;
                if (checkbox) {
                  checkbox.checked = true;
                }
                onPolicyChange(agreeAllRef);
              }}
            >
              동의하고 가입하기
            </Button>
            <Button
              size="small"
              type="secondary"
              buttonType="submit"
              popoverTarget="submit"
              onClick={(event) => {
                submitAsIsRef.current = true;
                event.currentTarget.form?.requestSubmit();
              }}
            >
              이대로 가입하기
            </Button>
          </div>
        </div>
      </Popover>
    </Form>
  );
}

function onAgreeAllChange(agreeAllRef: RefObject<HTMLInputElement | null>) {
  if (!agreeAllRef.current) return;
  if (!agreeAllRef.current.form) return;

  const checked = agreeAllRef.current.checked;
  agreeAllRef.current.form.querySelectorAll("input").forEach((input) => {
    input.checked = checked;
  });
}

function onPolicyChange(agreeAllRef: RefObject<HTMLInputElement | null>) {
  if (!agreeAllRef.current) return;
  if (!agreeAllRef.current.form) return;

  const everyChecked = Array.from(
    agreeAllRef.current.form.querySelectorAll(
      'input[type="checkbox"]:not(#agree-all)',
    ),
  ).every((input) => (input as HTMLInputElement).checked);
  agreeAllRef.current.checked = everyChecked;
}

function Item({
  id,
  name,
  value,
  className,
  ref,
  right,
  required,
  onChange,
  children,
}: {
  id?: string;
  name?: string;
  value?: string;
  className?: string;
  ref?: Ref<HTMLInputElement>;
  right?: ReactNode;
  required?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  children?: ReactNode;
}) {
  return (
    <span
      className={twMerge(
        "flex items-center gap-2 py-2 text-body-2-normal font-medium",
        className,
      )}
    >
      <label className="flex flex-1 items-center gap-2">
        <Checkbox
          id={id}
          ref={ref}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
        />
        <span>{children}</span>
      </label>
      {right}
    </span>
  );
}

function RightArrow() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.22618 5.0425C8.91832 5.35941 8.92566 5.86589 9.24257 6.17375L15.0685 11.8332L9.2264 17.8423C8.91842 18.1591 8.92555 18.6655 9.24234 18.9735C9.55913 19.2815 10.0656 19.2744 10.3736 18.9576L16.7736 12.3747C16.9215 12.2226 17.003 12.0178 16.9999 11.8056C16.9969 11.5934 16.9097 11.3911 16.7574 11.2432L10.3574 5.0261C10.0405 4.71824 9.53404 4.72558 9.22618 5.0425Z"
        fill="#C2C4C8"
      />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.9809 6.42453C19.2988 6.69015 19.3411 7.16313 19.0755 7.48096L10.3005 17.981C10.1667 18.1411 9.97216 18.2382 9.76374 18.249C9.55532 18.2598 9.35183 18.1832 9.20219 18.0378L4.47719 13.444C4.1802 13.1553 4.17351 12.6804 4.46225 12.3835C4.75099 12.0865 5.22582 12.0798 5.52281 12.3685L9.66804 16.3986L17.9245 6.51907C18.1901 6.20124 18.6631 6.15891 18.9809 6.42453Z"
        fill="#008660"
      />
    </svg>
  );
}
