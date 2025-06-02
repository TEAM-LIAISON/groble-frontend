"use client";

import {
  uploadProfileImageResponse,
  UserMyPageDetailResponse,
} from "@/lib/api";
import { useToastErrorMessage } from "@/lib/error";
import Image from "next/image";
import { useRef, useState, useTransition } from "react";
import profileImage from "../profile-image.png";
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
        <div className="relative">
          {detailResponse?.profileImageUrl ? (
            <div className="relative h-[124px] w-[124px] md:h-[64px] md:w-[64px]">
              <Image
                src={detailResponse.profileImageUrl}
                alt=""
                fill
                objectFit="cover"
                className="rounded-full border border-line-neutral"
              />
            </div>
          ) : (
            <Image
              src={profileImage}
              alt=""
              className="h-[120px] w-[120px] md:h-[64px] md:w-[64px]"
            />
          )}
          <Plus className="absolute right-0 bottom-0 md:h-[24px] md:w-[24px]" />
        </div>
        <h1 className="text-center text-heading-1 font-semibold text-label-normal md:hidden md:font-bold">
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

function Plus({ className }: { className?: string }) {
  return (
    <svg
      width="43"
      height="43"
      viewBox="0 0 43 43"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M21.2754 2C32.0449 2 40.7754 10.7304 40.7754 21.5C40.7754 32.2696 32.0449 41 21.2754 41C10.5058 41 1.77539 32.2696 1.77539 21.5C1.77539 10.7304 10.5058 2 21.2754 2Z"
        fill="#EAEBEC"
      />
      <path
        d="M21.2754 2C32.0449 2 40.7754 10.7304 40.7754 21.5C40.7754 32.2696 32.0449 41 21.2754 41C10.5058 41 1.77539 32.2696 1.77539 21.5C1.77539 10.7304 10.5058 2 21.2754 2Z"
        stroke="#F7F7F8"
        strokeWidth="3"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M22.0254 14.25C22.0254 13.8358 21.6896 13.5 21.2754 13.5C20.8612 13.5 20.5254 13.8358 20.5254 14.25V20.75H14.0254C13.6112 20.75 13.2754 21.0858 13.2754 21.5C13.2754 21.9142 13.6112 22.25 14.0254 22.25H20.5254V28.75C20.5254 29.1642 20.8612 29.5 21.2754 29.5C21.6896 29.5 22.0254 29.1642 22.0254 28.75V22.25H28.5254C28.9396 22.25 29.2754 21.9142 29.2754 21.5C29.2754 21.0858 28.9396 20.75 28.5254 20.75H22.0254V14.25Z"
        fill="#171717"
      />
    </svg>
  );
}
