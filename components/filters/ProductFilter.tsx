"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { sortOptions, categoryOptions } from "@/lib/data/filterData";
import { CheckIcon } from "@/components/icons/CheckIcon";

export default function ProductFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const filterContainerRef = useRef<HTMLDivElement>(null);
  const dropdownButtonRef = useRef<HTMLButtonElement>(null);

  // URL에서 현재 선택된 필터 값 가져오기
  const [selectedSort, setSelectedSort] = useState(
    searchParams.get("sort") || sortOptions[0].value,
  );
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  // 선택된 카테고리 (다중 선택 가능)
  const [selectedCategories, setSelectedCategories] = useState<string[]>(() => {
    const categoryParam = searchParams.get("categoryId");
    return categoryParam ? categoryParam.split(",") : [];
  });

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        showSortDropdown &&
        filterContainerRef.current &&
        !filterContainerRef.current.contains(event.target as Node)
      ) {
        setShowSortDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSortDropdown]);

  // URL 업데이트 함수
  const updateUrlWithFilters = (sort: string, categories: string[]) => {
    const params = new URLSearchParams(searchParams.toString());

    // 정렬 값 설정
    params.set("sort", sort);

    // 카테고리 값 설정 (선택된 경우에만)
    if (categories.length > 0) {
      params.set("categoryId", categories.join(","));
    } else {
      params.delete("categoryId");
    }

    // 페이지 초기화
    params.set("page", "1");

    // URL 업데이트
    router.push(`?${params.toString()}`);
  };

  // 정렬 옵션 변경 핸들러
  const handleSortChange = (sortValue: string) => {
    setSelectedSort(sortValue);
    updateUrlWithFilters(sortValue, selectedCategories);
    setShowSortDropdown(false);
  };

  // 카테고리 토글 핸들러
  const toggleCategory = (categoryValue: string) => {
    setSelectedCategories((prev) => {
      const newCategories = prev.includes(categoryValue)
        ? prev.filter((c) => c !== categoryValue)
        : [...prev, categoryValue];

      updateUrlWithFilters(selectedSort, newCategories);
      return newCategories;
    });
  };

  // 카테고리 버튼 렌더링
  const renderCategoryButtons = () => {
    return categoryOptions.map((category) => {
      const isSelected = selectedCategories.includes(category.value);
      return (
        <button
          key={category.value}
          onClick={() => toggleCategory(category.value)}
          className={`flex-shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
            isSelected
              ? "border border-primary-sub-1 text-primary-sub-1"
              : "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
          }`}
        >
          {category.label}
        </button>
      );
    });
  };

  // 드롭다운 메뉴 위치 계산
  const getDropdownPosition = () => {
    if (!dropdownButtonRef.current) return { top: 0, left: 0 };
    const rect = dropdownButtonRef.current.getBoundingClientRect();
    return {
      top: rect.bottom + window.scrollY,
      left: rect.left + window.scrollX,
    };
  };

  return (
    <div className="mb-6" ref={filterContainerRef}>
      {/* 필터 컨테이너 - 한 줄에 스크롤 가능하도록 설정 */}
      <div className="scrollbar-hide flex items-center overflow-x-auto pb-2">
        {/* 정렬 드롭다운 */}
        <div className="relative mr-2 flex-shrink-0">
          <button
            ref={dropdownButtonRef}
            onClick={() => setShowSortDropdown(!showSortDropdown)}
            className="flex min-w-[90px] items-center justify-between rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium whitespace-nowrap text-gray-700"
          >
            <span>
              {sortOptions.find((option) => option.value === selectedSort)
                ?.label || "최신순"}
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="ml-1 h-4 w-4 transition-transform duration-200"
              style={{
                transform: showSortDropdown ? "rotate(180deg)" : "rotate(0deg)",
              }}
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>

          {showSortDropdown && (
            <div
              className="fixed mt-1 w-36 rounded-lg border border-gray-200 bg-white py-1 shadow-lg"
              style={{
                zIndex: 9999,
                top: `${getDropdownPosition().top}px`,
                left: `${getDropdownPosition().left}px`,
              }}
            >
              {sortOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleSortChange(option.value)}
                  className="flex w-full items-center justify-between px-4 py-2 text-left text-sm hover:bg-gray-50"
                >
                  <span
                    className={
                      selectedSort === option.value ? "font-medium" : ""
                    }
                  >
                    {option.label}
                  </span>
                  {selectedSort === option.value && (
                    <CheckIcon className="h-4 w-4 text-primary-sub-1" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 카테고리 필터 버튼들 - 간격 0.38rem */}
        <div className="flex gap-[0.38rem]">{renderCategoryButtons()}</div>
      </div>
    </div>
  );
}
