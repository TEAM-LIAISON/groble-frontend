import { VertifyBadgeIcon } from '@/components/(improvement)/icons/Vertify_badge';

interface MarketNameEditProps {
  value: string;
  onChange: (value: string) => void;
}

export function MarketNameEdit({ value, onChange }: MarketNameEditProps) {
  return (
    <div className="flex flex-col">
      <h2 className="text-body-2-normal font-bold text-label-normal">
        마켓 이름
      </h2>

      <hr className="my-3 border-line-normal" />

      <div className="rounded-lg bg-background-alternative py-4 px-3 max-w-[20.9rem]">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="마켓 이름을 입력해주세요"
          className="w-full bg-transparent text-label-1-normal font-semibold text-label-normal outline-none placeholder:text-label-alternative"
        />
      </div>
    </div>
  );
}
