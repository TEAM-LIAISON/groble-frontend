import { ReactNode } from "react";

export default function Guidelines({ children }: { children?: ReactNode }) {
  return (
    <div className="rounded-8 bg-background-alternative p-6 text-label-1-normal font-medium">
      <ul className="list-disc space-y-3 pl-2">{children}</ul>
    </div>
  );
}
