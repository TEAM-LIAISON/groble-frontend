'use client';

import { Button } from '@groble/ui';
import Link from 'next/link';

export default function IntroFloatingButton() {
  return (
    <div className="fixed bottom-6  z-50 w-full flex justify-center px-5">
      <Link href="/auth/sign-in" className="max-w-[1080px] w-full">
        <Button group="solid" type="primary" size="large" className="w-full">
          가입하기
        </Button>
      </Link>
    </div>
  );
}
