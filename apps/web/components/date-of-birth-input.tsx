'use client';

import { CustomSelect } from '@groble/ui';
import { YEAR_OPTIONS, MONTH_OPTIONS, DAY_OPTIONS } from '@/shared/data/date-options';
import { useMobile } from '@/hooks/use-mobile';

interface DateOfBirthInputProps {
  value?: {
    year: string;
    month: string;
    day: string;
  };
  onChange?: (value: { year: string; month: string; day: string }) => void;
  error?: boolean;
  label?: string;
}

export default function DateOfBirthInput({
  value = { year: '', month: '', day: '' },
  onChange,
  error = false,
  label = '생년월일'
}: DateOfBirthInputProps) {
  const isMobile = useMobile();
  const handleYearChange = (year: string) => {
    onChange?.({
      ...value,
      year,
    });
  };

  const handleMonthChange = (month: string) => {
    onChange?.({
      ...value,
      month,
    });
  };

  const handleDayChange = (day: string) => {
    onChange?.({
      ...value,
      day,
    });
  };

  return (
    <div className="space-y-2">
      <p className="text-body-1-normal font-semibold text-label-normal">{label}</p>
      <div className="flex items-center gap-2">
        <div className="flex-1">
          <CustomSelect
            options={YEAR_OPTIONS}
            value={value.year}
            onChange={(e) => handleYearChange(e.target.value)}
            placeholder={isMobile ? "년도" : "출생년도"}
            error={error}
            type="grey"
          />
        </div>
        <span className="text-label-1-normal text-label-normal whitespace-nowrap">년</span>

        <div className="flex-1">
          <CustomSelect
            options={MONTH_OPTIONS}
            value={value.month}
            onChange={(e) => handleMonthChange(e.target.value)}
            placeholder="월"
            error={error}
            type="grey"
          />
        </div>
        <span className="text-label-1-normal text-label-normal whitespace-nowrap">월</span>

        <div className="flex-1">
          <CustomSelect
            options={DAY_OPTIONS}
            value={value.day}
            onChange={(e) => handleDayChange(e.target.value)}
            placeholder="일"
            error={error}
            type="grey"
          />
        </div>
        <span className="text-label-1-normal text-label-normal whitespace-nowrap">일</span>
      </div>
    </div>
  );
}
