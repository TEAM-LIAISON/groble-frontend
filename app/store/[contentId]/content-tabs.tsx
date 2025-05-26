"use client";

import { ContentDetailResponse } from "@/lib/api";
import { twMerge } from "@/lib/tailwind-merge";
import { useState } from "react";

export default function ContentTabs({
  contentDetail,
}: {
  contentDetail: ContentDetailResponse;
}) {
  const tabsData = [
    {
      label: "소개",
      content: contentDetail.contentIntroduction,
    },
    {
      label: "서비스",
      content: contentDetail.serviceTarget,
    },
    {
      label: "제공 절차",
      content: contentDetail.serviceProcess,
    },
    {
      label: "메이커",
      content: contentDetail.makerIntro,
    },
  ];
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  return (
    <div>
      <div>
        <nav className="grid grid-cols-[20px_1fr_1fr_1fr_1fr_20px]">
          <div className="border-b-[1.5px] border-line-normal" />
          {tabsData.map((tab, index) => (
            <button
              key={tab.label}
              onClick={() => setActiveTabIndex(index)}
              className={twMerge(
                "border-b-[1.5px] border-line-normal p-2 text-center text-body-1-normal font-semibold text-line-normal",
                activeTabIndex === index
                  ? "border-label-strong font-bold text-label-strong"
                  : "text-label-alternative hover:text-label-neutral",
              )}
              aria-current={activeTabIndex === index ? "page" : undefined}
            >
              {tab.label}
            </button>
          ))}
          <div className="border-b-[1.5px] border-line-normal" />
        </nav>
      </div>
      <div className="p-5 whitespace-pre-wrap">
        {tabsData[activeTabIndex] && tabsData[activeTabIndex].content}
      </div>
    </div>
  );
}
