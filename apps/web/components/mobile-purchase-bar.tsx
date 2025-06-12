'use client';

import { Button } from '@groble/ui';

interface MobilePurchaseBarProps {
  onOpenSheet: () => void;
}

export default function MobilePurchaseBar({
  onOpenSheet,
}: MobilePurchaseBarProps) {
  return (
    <div className="fixed bottom-0 left-0 z-50 w-full border-t border-line-normal bg-white p-4 shadow-lg lg:hidden">
      <Button
        group="solid"
        type="primary"
        size="small"
        buttonType="button"
        className="w-full"
        onClick={onOpenSheet}
      >
        구매하기
      </Button>
    </div>
  );
}
