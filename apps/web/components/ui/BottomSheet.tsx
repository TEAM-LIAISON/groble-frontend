'use client';

import * as Dialog from '@radix-ui/react-dialog';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

export default function BottomSheet({
  isOpen,
  onClose,
  children,
  title,
}: BottomSheetProps) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        {/* 반투명 오버레이 */}
        <Dialog.Overlay className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-40 bg-black/40" />
        {/* 바텀 콘텐츠 */}
        <Dialog.Content className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom fixed bottom-0 left-0 z-50 max-h-[80vh] w-full overflow-auto rounded-t-2xl bg-white px-5 pt-6 pb-8">
          {/* DialogTitle - 접근성을 위해 필수 */}
          {title ? (
            <Dialog.Title className="sr-only">{title}</Dialog.Title>
          ) : (
            <VisuallyHidden.Root>
              <Dialog.Title>모달</Dialog.Title>
            </VisuallyHidden.Root>
          )}

          {/* 상단 Drag Handle */}
          <div className="mx-auto mb-4 h-1 w-16 rounded-full bg-gray-300" />
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
