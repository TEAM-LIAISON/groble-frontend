"use client";

import Button from "@/components/button";
import { uploadContentThumbnailResponse } from "@/lib/api";
import { useToastErrorMessage } from "@/lib/error";
import Image from "next/image";
import { useRef, useState, useTransition } from "react";
import { twJoin } from "tailwind-merge";
import { uploadContentThumbnailAction } from "./actions";

export default function ImageFileField({
  fileInputName,
  urlInputName,
}: {
  fileInputName?: string;
  urlInputName?: string;
}) {
  const [, startTransition] = useTransition();
  const [response, setResponse] = useState<uploadContentThumbnailResponse>();
  useToastErrorMessage(response);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const urlInputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        name={fileInputName}
        className="hidden"
        onChange={(event) => {
          const file = event.currentTarget.files?.[0];
          if (!file) return;

          startTransition(async () => {
            const response = await uploadContentThumbnailAction(file);
            setResponse(response);
            if (response.status == 201)
              if (urlInputRef.current)
                urlInputRef.current.value = response.data.data?.fileUrl!;
          });
        }}
      />
      <div className="relative flex aspect-[670_/_376] flex-col items-center justify-center rounded-8 border border-dashed border-line-normal">
        {response?.status == 201 && (
          <Image
            src={response?.data.data?.fileUrl!}
            alt=""
            fill
            className="object-cover"
          />
        )}
        <Button
          buttonType="button"
          group="solid"
          type="tertiary"
          size="x-small"
          onClick={() => fileInputRef.current?.click()}
          className={twJoin(response?.status == 201 && "opacity-50")}
        >
          <ImageIcon /> 사진 업로드
        </Button>
      </div>
      <input
        ref={urlInputRef}
        type="hidden"
        name={urlInputName}
        className="hidden"
      />
    </>
  );
}

function ImageIcon() {
  return (
    <svg
      width="17"
      height="16"
      viewBox="0 0 17 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.16634 1.5C3.15382 1.5 2.33301 2.32081 2.33301 3.33333V12C2.33301 13.0125 3.15382 13.8333 4.16634 13.8333H12.833C13.8455 13.8333 14.6663 13.0125 14.6663 12V3.33333C14.6663 2.32081 13.8455 1.5 12.833 1.5H4.16634ZM3.33301 3.33333C3.33301 2.8731 3.7061 2.5 4.16634 2.5H12.833C13.2932 2.5 13.6663 2.8731 13.6663 3.33333V9.68365L12.2292 7.96039C11.7628 7.40112 10.9037 7.40111 10.4373 7.96039L9.53891 9.03761L7.69537 6.82701C7.22896 6.26773 6.36981 6.26773 5.9034 6.82701L3.33301 9.9092V3.33333ZM3.33301 11.4706V12C3.33301 12.4602 3.7061 12.8333 4.16634 12.8333H11.4022L6.92738 7.46747C6.86075 7.38758 6.73802 7.38758 6.67139 7.46747L3.33301 11.4706ZM12.7009 12.8333H12.833C13.2932 12.8333 13.6663 12.4602 13.6663 12V11.245L11.4612 8.60086C11.3946 8.52096 11.2719 8.52096 11.2052 8.60086L10.19 9.8183L12.6511 12.7694C12.6686 12.7904 12.6852 12.8118 12.7009 12.8333ZM10.1331 5.40002C10.1331 5.05024 10.4167 4.76668 10.7665 4.76668C11.1163 4.76668 11.3998 5.05024 11.3998 5.40002C11.3998 5.7498 11.1163 6.03335 10.7665 6.03335C10.4167 6.03335 10.1331 5.7498 10.1331 5.40002ZM10.7665 3.76668C9.86441 3.76668 9.13314 4.49795 9.13314 5.40002C9.13314 6.30208 9.86441 7.03335 10.7665 7.03335C11.6685 7.03335 12.3998 6.30208 12.3998 5.40002C12.3998 4.49795 11.6685 3.76668 10.7665 3.76668Z"
        fill="#008660"
      />
    </svg>
  );
}
