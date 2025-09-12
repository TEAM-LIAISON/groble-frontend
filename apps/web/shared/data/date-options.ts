// 생년월일 옵션 데이터
export const YEAR_OPTIONS = Array.from({ length: 80 }, (_, i) => {
  const year = new Date().getFullYear() - 79 + i; // 80세까지 (현재년도 - 79 ~ 현재년도)
  return {
    value: year.toString(),
    label: year.toString(),
  };
}).reverse();

export const MONTH_OPTIONS = Array.from({ length: 12 }, (_, i) => {
  const month = i + 1;
  return {
    value: month.toString().padStart(2, "0"),
    label: month.toString().padStart(2, "0"),
  };
});

export const DAY_OPTIONS = Array.from({ length: 31 }, (_, i) => {
  const day = i + 1;
  return {
    value: day.toString().padStart(2, "0"),
    label: day.toString().padStart(2, "0"),
  };
});
