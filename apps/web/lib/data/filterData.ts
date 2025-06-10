import { ContentType } from "../api/contentApi";

// 정렬 옵션
export const sortOptions = [
  { label: "최신순", value: "createdAt" },
  { label: "인기순", value: "popular" },
];

// 카테고리 옵션 - 컨텐츠 타입별로 구분
export const categoryOptionsByType: Record<
  ContentType,
  { label: string; value: string }[]
> = {
  COACHING: [
    { label: "컨설팅·강의", value: "C001" },
    { label: "제작·대행", value: "C002" },
  ],
  DOCUMENT: [
    { label: "전자책", value: "D001" },
    { label: "문서·템플릿", value: "D002" },
  ],
};

// 이전 버전과의 호환성을 위해 기본 카테고리 옵션 유지
export const categoryOptions = categoryOptionsByType.COACHING;
