'use client';

import { Button } from '@groble/ui';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function IntroFloatingButton() {
  const [bottomPosition, setBottomPosition] = useState(24);

  useEffect(() => {
    const handleScroll = () => {
      const footer = document.querySelector('footer');
      if (!footer) return;

      const footerRect = footer.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (footerRect.top <= windowHeight) {
        const newBottom = windowHeight - footerRect.top + 24;
        setBottomPosition(newBottom);
      } else {
        setBottomPosition(24);
      }
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <div
      className="fixed z-50 w-full flex justify-center px-5"
      style={{ bottom: `${bottomPosition}px` }}
    >
      <Link href="/auth/sign-in" className="max-w-[720px] w-full md:px-5">
        <Button group="solid" type="primary" size="large" className="w-full">
          시작하기
        </Button>
      </Link>
    </div>
  );
}
