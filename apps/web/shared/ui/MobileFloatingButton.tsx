'use client';

import { LinkButton } from '@groble/ui';

interface MobileFloatingButtonProps {
  href: string;
  children: React.ReactNode;
}

/**
 * 모바일에서 하단에 플로팅되는 버튼 컴포넌트
 */
export default function MobileFloatingButton({
  href,
  children,
}: MobileFloatingButtonProps) {
  return (
    <div className="md:hidden fixed bottom-0 z-50 flex items-center gap-2 bg-white pt-5 pb-10 w-full px-5">
      <LinkButton
        href={href}
        className="w-full"
        size="large"
        group="solid"
        type="primary"
      >
        {children}
      </LinkButton>
    </div>
  );
}
