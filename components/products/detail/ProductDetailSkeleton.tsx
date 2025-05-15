import React from "react";

export default function ProductDetailSkeleton() {
  return (
    <div className="animate-pulse pb-24">
      {/* 상품 헤더 스켈레톤 */}
      <div className="h-64 w-full bg-gray-200"></div>

      {/* 상품 정보 스켈레톤 */}
      <div className="px-4 py-4">
        <div className="mb-2 h-7 w-3/4 rounded-md bg-gray-200"></div>
        <div className="mb-4 h-5 w-1/4 rounded-md bg-gray-200"></div>
        <div className="mb-1 h-6 w-1/2 rounded-md bg-gray-200"></div>
        <div className="mb-4 h-4 w-1/3 rounded-md bg-gray-200"></div>
        <div className="mb-4 flex items-center gap-2">
          <div className="h-4 w-20 rounded-full bg-gray-200"></div>
          <div className="h-4 w-20 rounded-full bg-gray-200"></div>
        </div>
      </div>

      {/* 탭 스켈레톤 */}
      <div className="mt-6 border-b border-gray-200">
        <div className="flex px-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="mx-1 h-10 w-20 rounded-md bg-gray-200"
            ></div>
          ))}
        </div>
      </div>

      {/* 컨텐츠 섹션 스켈레톤 */}
      {[1, 2, 3, 4].map((section) => (
        <div key={section} className="mt-8 px-4">
          <div className="mb-4 h-6 w-1/3 rounded-md bg-gray-200"></div>
          <div className="space-y-2">
            {[1, 2, 3].map((item) => (
              <div key={item} className="h-16 rounded-md bg-gray-200"></div>
            ))}
          </div>
        </div>
      ))}

      {/* 플로팅 버튼 스켈레톤 */}
      <div className="fixed right-0 bottom-0 left-0 border-t border-gray-200 bg-white p-4">
        <div className="h-12 rounded-md bg-gray-200"></div>
      </div>
    </div>
  );
}
