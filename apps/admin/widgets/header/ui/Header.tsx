'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button, LinkButton } from '@groble/ui';
import { useAuth } from '@/features/auth/hooks/useAuth';
import LoadingSpinner from '@/shared/ui/LoadingSpinner';

export default function Header() {
  const { isLoading, error, isLoggedIn, logout, nickname } = useAuth();

  return (
    <header className="sticky top-0 z-10 border-b border-line-alternative bg-white">
      <div className="mx-auto flex h-16 items-center justify-between px-5 py-4">
        <Link href="/">
          <Image
            src="/logo.svg"
            alt="Logo"
            className="h-8"
            width={127}
            height={40}
          />
        </Link>

        <div className="flex items-center gap-3">
          {isLoading ? (
            <div className="flex items-center">
              <LoadingSpinner />
            </div>
          ) : !isLoggedIn || error ? (
            <LinkButton
              href="/login"
              group="solid"
              type="primary"
              size="x-small"
            >
              로그인
            </LinkButton>
          ) : (
            <div className="flex items-center gap-3">
              <span className="text-label-1-normal">{nickname} 님</span>
              <Button
                onClick={logout}
                group="solid"
                type="primary"
                size="x-small"
              >
                로그아웃
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
