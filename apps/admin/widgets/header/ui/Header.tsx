'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button, LinkButton, ButtonLoadingSpinner, Modal } from '@groble/ui';
import { useAuth } from '@/features/auth/hooks/useAuth';
import LoadingSpinner from '@/shared/ui/LoadingSpinner';

export default function Header() {
  const { isLoading, error, isLoggedIn, isGuest, logout, nickname, user, isLoggingOut } =
    useAuth();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  // 로그아웃 버튼 클릭 핸들러
  const handleLogoutClick = () => {
    setIsLogoutModalOpen(true);
  };

  // 로그아웃 확인 핸들러
  const handleLogoutConfirm = () => {
    setIsLogoutModalOpen(false);
    logout();
  };

  // 로그아웃 모달 닫기 핸들러
  const handleLogoutModalClose = () => {
    setIsLogoutModalOpen(false);
  };

  // 사용자 섹션 렌더링 함수
  const renderUserSection = () => {
    if (isLoading && !user?.isLogin) {
      // 초기 로딩 중이면서 아직 로그인 상태가 아닐 때
      return (
        <div className="h-10 w-24 animate-pulse rounded-md bg-gray-100" />
      );
    }

    if (!isLoggedIn || error) {
      return (
        <LinkButton href="/login" group="solid" type="primary" size="x-small">
          로그인
        </LinkButton>
      );
    }

    // 로그인된 사용자 UI
    return (
      <div className="flex items-center gap-3">
        <span className="text-label-1-normal">{nickname} 님</span>
        <Button
          onClick={handleLogoutClick}
          group="solid"
          type="primary"
          size="x-small"
          disabled={isLoggingOut}
        >
          {isLoggingOut ? <ButtonLoadingSpinner /> : '로그아웃'}
        </Button>
      </div>
    );
  };

  return (
    <>
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

          <div className="flex items-center gap-3">{renderUserSection()}</div>
        </div>
      </header>

      {/* 로그아웃 확인 모달 */}
      <Modal
        isOpen={isLogoutModalOpen}
        onRequestClose={handleLogoutModalClose}
        title="로그아웃 확인"
        subText={`${nickname} 님, 정말 로그아웃하시겠습니까?`}
        actionButton={isLoggingOut ? '로그아웃 중...' : '로그아웃'}
        secondaryButton="취소"
        onActionClick={handleLogoutConfirm}
        onSecondaryClick={handleLogoutModalClose}
        actionButtonColor="danger"
      />
    </>
  );
}
