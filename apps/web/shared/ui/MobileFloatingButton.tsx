'use client';

import { Button, LinkButton } from '@groble/ui';

interface MobileFloatingButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

/**
 * 모바일에서 하단에 플로팅되는 버튼 컴포넌트
 * href가 있으면 라우팅, onClick이 있으면 함수 실행
 */
export default function MobileFloatingButton({
  children,
  href,
  onClick,
  disabled = false,
  className = '',
}: MobileFloatingButtonProps) {
  const commonProps = {
    className: `w-full ${className}`,
    size: 'large' as const,
    group: 'solid' as const,
    type: 'primary' as const,
    disabled,
  };

  return (
    <>
      <div className="h-32 md:hidden"></div>
      <div className="md:hidden fixed bottom-0 z-50 flex items-center gap-2 bg-white pt-5 pb-10 w-full px-5 ">
        {href ? (
          <LinkButton href={href} {...commonProps} className="w-full">
            {children}
          </LinkButton>
        ) : (
          <Button onClick={onClick} {...commonProps}>
            {children}
          </Button>
        )}
      </div>
    </>
  );
}
