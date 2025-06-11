"use client";
import { ContentDetailResponse } from "@/lib/api";
import { useState } from "react";

export default function PricingInformation({
  contentDetail,
}: {
  contentDetail: ContentDetailResponse;
}) {
  const [isPlansOpen, setIsPlansOpen] = useState(false);

  const togglePlans = () => {
    setIsPlansOpen(!isPlansOpen);
  };

  return (
    <div className="mt-6 rounded-lg bg-background-alternative p-4">
      <div
        className="flex cursor-pointer items-center justify-between"
        onClick={togglePlans}
      >
        <span className="text-xl font-bold text-emerald-600">
          ₩{new Intl.NumberFormat().format(contentDetail.lowestPrice!)}~
        </span>
        <Down isOpen={isPlansOpen} />
      </div>

      {isPlansOpen && (
        <>
          <hr className="my-3 border-gray-200" />
          <ul className="space-y-3">
            {contentDetail.options?.map((option) => (
              <li
                key={option.name}
                className="flex items-start justify-between"
              >
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {option.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    ㄴ{option.description}
                  </p>
                </div>
                <span className="text-sm font-semibold text-gray-900">
                  ₩{new Intl.NumberFormat().format(option.price!)}
                </span>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

function Down({ isOpen }: { isOpen: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`h-4 w-4 transform text-gray-500 transition-transform duration-200 ${
        isOpen ? "rotate-180" : ""
      }`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
}
