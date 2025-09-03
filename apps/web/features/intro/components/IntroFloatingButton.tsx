'use client';

import { Button } from '@groble/ui';
import Link from 'next/link';

export default function IntroFloatingButton() {
  return (
    <div className="fixed bottom-6 z-50 w-full flex justify-center px-5">
      <Link href="/auth/sign-in" className="max-w-[720px] w-full md:px-5">
        <Button group="solid" type="primary" size="large" className="w-full">
          시작하기
        </Button>
      </Link>
    </div>
  );
}
