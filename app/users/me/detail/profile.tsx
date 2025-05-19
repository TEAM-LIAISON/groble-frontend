"use client";

import {
  uploadProfileImageResponse,
  UserMyPageDetailResponse,
} from "@/lib/api";
import { useToastErrorMessage } from "@/lib/error";
import Image from "next/image";
import { useRef, useState, useTransition } from "react";
import { uploadProfileImageAction } from "./actions";

export default function Profile({
  detailResponse,
}: {
  detailResponse?: UserMyPageDetailResponse;
}) {
  const [, startTransition] = useTransition();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const urlInputRef = useRef<HTMLInputElement>(null);
  const [response, setResponse] = useState<uploadProfileImageResponse>();
  useToastErrorMessage(response);

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        name="profile-image"
        className="hidden"
        onChange={(event) => {
          const profileImage = event.currentTarget.files?.[0];
          if (!profileImage) return;

          startTransition(async () => {
            const response = await uploadProfileImageAction(profileImage);
            setResponse(response);
            if (response.status == 201)
              if (urlInputRef.current)
                urlInputRef.current.value = response.data.data?.fileUrl!;
          });
        }}
      />
      <button
        type="button"
        className="flex flex-col items-center gap-3 p-4 md:items-start"
        onClick={() => fileInputRef.current?.click()}
      >
        {detailResponse?.profileImageUrl ? (
          <div className="relative h-[124px] w-[124px] rounded-full md:h-[64px] md:w-[64px]">
            <Image
              src={detailResponse.profileImageUrl}
              alt=""
              fill
              objectFit="cover"
            />
          </div>
        ) : (
          <DefaultProfileImage />
        )}
        <h1 className="text-center text-heading-1 font-semibold text-label-normal md:hidden">
          {detailResponse?.nickname ?? "닉네임 없음"}
        </h1>
      </button>
      <input
        ref={urlInputRef}
        type="hidden"
        name="profile-image-url"
        className="hidden"
      />
    </>
  );
}

function DefaultProfileImage() {
  return (
    <svg
      width="124"
      height="124"
      viewBox="0 0 124 124"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="md:h-[64px] md:w-[64px]"
    >
      <g clipPath="url(#clip0_244_3813)">
        <circle cx="60.5" cy="60.5" r="60" fill="#EAEBEC" />
        <g clipPath="url(#clip1_244_3813)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M60.5009 32.6851C50.1188 32.6851 41.7024 41.1014 41.7024 51.4835C41.7024 61.8656 50.1188 70.2819 60.5009 70.2819C70.8829 70.2819 79.2993 61.8656 79.2993 51.4835C79.2993 41.1014 70.8829 32.6851 60.5009 32.6851ZM56.3234 74.4594C35.5593 74.4594 18.7266 91.292 18.7266 112.056V112.474C18.7266 114.781 20.5969 122.022 22.904 122.022H98.0977C100.405 122.022 102.275 114.781 102.275 112.474V112.056C102.275 91.292 85.4425 74.4594 64.6783 74.4594H56.3234Z"
            fill="#C2C4C8"
          />
        </g>
      </g>
      <path
        d="M102.275 83C113.045 83 121.775 91.7304 121.775 102.5C121.775 113.27 113.045 122 102.275 122C91.5058 122 82.7754 113.27 82.7754 102.5C82.7754 91.7304 91.5058 83 102.275 83Z"
        fill="#EAEBEC"
      />
      <path
        d="M102.275 83C113.045 83 121.775 91.7304 121.775 102.5C121.775 113.27 113.045 122 102.275 122C91.5058 122 82.7754 113.27 82.7754 102.5C82.7754 91.7304 91.5058 83 102.275 83Z"
        stroke="#F7F7F8"
        strokeWidth="3"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M103.025 95.25C103.025 94.8358 102.69 94.5 102.275 94.5C101.861 94.5 101.525 94.8358 101.525 95.25V101.75H95.0254C94.6112 101.75 94.2754 102.086 94.2754 102.5C94.2754 102.914 94.6112 103.25 95.0254 103.25H101.525V109.75C101.525 110.164 101.861 110.5 102.275 110.5C102.69 110.5 103.025 110.164 103.025 109.75V103.25H109.525C109.94 103.25 110.275 102.914 110.275 102.5C110.275 102.086 109.94 101.75 109.525 101.75H103.025V95.25Z"
        fill="#171717"
      />
      <defs>
        <clipPath id="clip0_244_3813">
          <rect x="0.5" y="0.5" width="120" height="120" rx="60" fill="white" />
        </clipPath>
        <clipPath id="clip1_244_3813">
          <rect
            width="100.258"
            height="100.258"
            fill="white"
            transform="translate(10.3711 22.2417)"
          />
        </clipPath>
      </defs>
    </svg>
  );
}
