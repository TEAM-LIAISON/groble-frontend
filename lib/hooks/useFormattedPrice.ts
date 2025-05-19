import { useState, useEffect } from "react";

/**
 * 입력된 가격을 콤마(,)가 포함된 형식으로 변환해주는 훅
 * @param initialPrice 초기 가격
 * @returns [formattedPrice, rawPrice, handlePriceChange] - 형식화된 가격, 원시 가격, 가격 변경 핸들러
 */
export function useFormattedPrice(initialPrice: string = "") {
  // 실제 값 (숫자만)
  const [rawPrice, setRawPrice] = useState(initialPrice.replace(/[^\d]/g, ""));
  // 표시용 값 (쉼표 포함)
  const [formattedPrice, setFormattedPrice] = useState("");

  // 가격 변경 핸들러
  const handlePriceChange = (value: string) => {
    // 숫자만 추출
    const numericValue = value.replace(/[^\d]/g, "");
    setRawPrice(numericValue);
  };

  // rawPrice가 변경될 때마다 formattedPrice 업데이트
  useEffect(() => {
    if (!rawPrice && rawPrice !== "0") {
      setFormattedPrice("");
      return;
    }

    // 콤마 추가된 형식으로 변환
    try {
      const formatted = Number(rawPrice).toLocaleString("ko-KR");
      setFormattedPrice(formatted);
    } catch (error) {
      setFormattedPrice("");
    }
  }, [rawPrice]);

  return [formattedPrice, rawPrice, handlePriceChange] as const;
}
