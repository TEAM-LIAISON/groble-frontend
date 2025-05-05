import { twJoin } from "tailwind-merge";

export default function Indicator({
  current,
  total = 5,
}: {
  current: number;
  total?: number;
}) {
  return (
    <div className="flex gap-2 px-[20px] py-[8px]">
      {Array.from({ length: total }).map((_, index) => (
        <div
          key={index}
          className={twJoin(
            "h-[3px] flex-1",
            index == current - 1
              ? "bg-primary-normal"
              : "bg-component-fill-strong",
          )}
        />
      ))}
    </div>
  );
}
