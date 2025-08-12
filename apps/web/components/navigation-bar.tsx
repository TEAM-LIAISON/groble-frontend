'use client';

import { twMerge } from '@/lib/tailwind-merge';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useUserStore } from '@/lib/store/useUserStore';
import { useNotificationDropdown } from '@/features/notifications/hooks/useNotificationDropdown';
import NotificationDropdown from '@/features/notifications/ui/NotificationDropdown';

export default function NavigationBar() {
  const pathname = usePathname();
  const { user } = useUserStore();
  const unreadCount = user?.unreadNotificationCount ?? 0;

  const { isOpen, buttonRef, toggleDropdown, closeDropdown } =
    useNotificationDropdown();

  // 사용자 타입에 따라 Store/Contents 결정
  const isSellerMode = user?.lastUserType === 'SELLER';

  const secondNavItem = isSellerMode
    ? { href: '/manage/store/dashboard', label: 'Store', component: Store }
    : { href: '/manage/purchase', label: 'Contents', component: Contents };

  return (
    <>
      <div className="h-[64px] md:hidden" />
      <nav className="fixed right-0 bottom-0 left-0 z-[60] grid py-2 grid-cols-4 border-t-[0.5px] border-[#181A20]/10 bg-background-normal text-[0.625rem] font-semibold text-label-assistive md:hidden">
        <Link
          href="/"
          className={twMerge(
            'flex flex-col items-center justify-center ',
            pathname == '/intro' && 'text-label-normal'
          )}
        >
          <Home />
          Home
        </Link>
        {/* Store/Contents */}
        <Link
          href={secondNavItem.href}
          className={twMerge(
            'flex flex-col items-center justify-center',
            pathname.startsWith(
              isSellerMode ? '/manage/store' : '/manage/purchase'
            ) && 'text-label-normal'
          )}
        >
          <secondNavItem.component />
          {secondNavItem.label}
        </Link>

        {/* Notification */}
        <div className="">
          <button
            ref={buttonRef}
            onClick={toggleDropdown}
            className={twMerge(
              'flex flex-col items-center justify-center w-full',
              isOpen && 'text-label-normal'
            )}
          >
            <div className="relative">
              <Notification />
              {unreadCount > 0 && (
                <span className="absolute top-0 right-0.5 h-1 w-1 rounded-full bg-status-error"></span>
              )}
            </div>
            Notification
          </button>
          <NotificationDropdown isOpen={isOpen} onClose={closeDropdown} />
        </div>

        {/* My */}
        <Link
          href="/users/profile"
          className={twMerge(
            'flex flex-col items-center justify-center ',
            pathname.startsWith('/users/profile') && 'text-label-normal'
          )}
        >
          <My />
          My
        </Link>
      </nav>
    </>
  );
}

function Store() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="29"
      height="28"
      viewBox="0 0 29 28"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.83325 4.69072C2.83325 4.02987 3.36898 3.49414 4.02983 3.49414H10.0127H11.8076H17.1922H18.9871H24.97C25.6309 3.49414 26.1666 4.02987 26.1666 4.69072V9.17791C26.1666 10.4634 25.626 11.6227 24.7598 12.4408C24.4264 12.7003 23.9642 12.8259 23.5299 12.9439L23.5295 12.944C23.4842 12.9563 23.4393 12.9685 23.3948 12.9808C23.0548 13.0746 22.6958 13.125 22.3237 13.125C21.011 13.125 19.8455 12.4959 19.1116 11.519C18.9463 11.2991 18.6871 11.1696 18.412 11.1696C18.1368 11.1696 17.8777 11.2991 17.7124 11.519C16.9785 12.4959 15.813 13.125 14.5003 13.125C13.1876 13.125 12.0221 12.4959 11.2882 11.519C11.1229 11.2991 10.8638 11.1696 10.5886 11.1696C10.3135 11.1696 10.0543 11.2991 9.88905 11.519C9.14462 12.5099 7.93353 13.1899 6.63727 13.1899C6.2459 13.1899 5.77766 13.1352 5.45435 13.046C5.07911 12.9424 4.66983 12.8049 4.26364 12.4629C3.38365 11.6436 2.83325 10.4751 2.83325 9.17791V4.69072ZM4.32898 14.5148V22.1127C4.32898 23.4344 5.40043 24.5058 6.72214 24.5058H9.71362V21.2495C9.71362 20.0061 10.7851 18.9981 12.1068 18.9981H16.8931C18.2148 18.9981 19.2863 20.0061 19.2863 21.2495V24.5058H22.2777C23.5994 24.5058 24.6709 23.4344 24.6709 22.1127V14.4301C24.3923 14.529 24.1456 14.5931 23.9784 14.6365C23.9328 14.6483 23.8932 14.6586 23.8604 14.6677C23.3702 14.803 22.8546 14.875 22.3237 14.875C20.8136 14.875 19.4391 14.2937 18.412 13.3446C17.3849 14.2937 16.0104 14.875 14.5003 14.875C12.9909 14.875 11.617 14.2943 10.5901 13.346C9.55929 14.3081 8.16054 14.9399 6.63727 14.9399C6.12555 14.9399 5.49566 14.8728 4.98876 14.7329C4.7945 14.6793 4.57064 14.612 4.32898 14.5148Z"
        fill="currentColor"
      />
    </svg>
  );
}

function Contents() {
  return (
    <svg
      width="29"
      height="28"
      viewBox="0 0 29 28"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      <path
        d="M4.00001 23.3332C3.35568 23.3332 2.83334 22.8108 2.83334 22.1665V5.83317C2.83334 5.18884 3.35568 4.6665 4.00001 4.6665H11.5423C11.9324 4.6665 12.2966 4.86146 12.513 5.18602L14.1537 7.64699C14.37 7.97155 14.7343 8.1665 15.1244 8.1665H25C25.6443 8.1665 26.1667 8.68884 26.1667 9.33317V22.1665C26.1667 22.8108 25.6443 23.3332 25 23.3332H4.00001Z"
        fill="currentColor"
      />
    </svg>
  );
}

function Notification() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="29"
      height="28"
      viewBox="0 0 29 28"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.51647 11.2261C5.51647 6.31487 9.49784 2.3335 14.4091 2.3335C19.3204 2.3335 23.3018 6.31487 23.3018 11.2261V15.8075L25.127 18.5801C26.0207 19.9377 25.0469 21.7444 23.4217 21.7444H18V21.8752C18 23.8082 16.433 25.3752 14.5 25.3752C12.567 25.3752 11 23.8082 11 21.8752V21.7444H5.52198C3.91939 21.7444 2.94158 19.9825 3.78945 18.6226L5.51647 15.8525V11.2261Z"
        fill="currentColor"
      />
    </svg>
  );
}

function Home() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="29"
      height="28"
      viewBox="0 0 29 28"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.16627 14.4829V22.1666C5.16627 23.0948 5.53502 23.9851 6.1914 24.6415C6.84778 25.2978 7.73802 25.6666 8.66627 25.6666H20.3329C21.2612 25.6666 22.1514 25.2978 22.8078 24.6415C23.4642 23.9851 23.8329 23.0948 23.8329 22.1666V14.4829L24.1748 14.8247C24.3948 15.0373 24.6895 15.1549 24.9954 15.1522C25.3013 15.1495 25.5939 15.0268 25.8102 14.8105C26.0265 14.5942 26.1492 14.3016 26.1519 13.9957C26.1546 13.6898 26.037 13.3951 25.8244 13.1751L23.5055 10.8561C23.5008 10.8512 23.496 10.8464 23.4912 10.8416C23.4864 10.8368 23.4816 10.8321 23.4767 10.8274L15.3244 2.67508C15.1057 2.45636 14.809 2.3335 14.4996 2.3335C14.1902 2.3335 13.8936 2.45636 13.6748 2.67508L5.52245 10.8274C5.51759 10.8321 5.51277 10.8368 5.50798 10.8416C5.5032 10.8464 5.49846 10.8512 5.49377 10.8561L3.17477 13.1751C3.06334 13.2827 2.97447 13.4114 2.91332 13.5538C2.85218 13.6961 2.81999 13.8492 2.81865 14.0041C2.8173 14.159 2.84682 14.3126 2.90548 14.456C2.96414 14.5994 3.05077 14.7297 3.16031 14.8392C3.26985 14.9488 3.40011 15.0354 3.54349 15.094C3.68687 15.1527 3.8405 15.1822 3.99541 15.1809C4.15032 15.1795 4.30341 15.1473 4.44575 15.0862C4.58808 15.0251 4.71682 14.9362 4.82444 14.8247L5.16627 14.4829Z"
        fill="currentColor"
      />
    </svg>
  );
}

function My() {
  return (
    <svg
      width="29"
      height="28"
      viewBox="0 0 29 28"
      xmlns="http://www.w3.org/2000/svg"
      className="fill-current"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.5 2.9165C11.6005 2.9165 9.24998 5.26701 9.24998 8.1665C9.24998 11.066 11.6005 13.4165 14.5 13.4165C17.3995 13.4165 19.75 11.066 19.75 8.1665C19.75 5.26701 17.3995 2.9165 14.5 2.9165ZM13.3333 14.5832C7.53432 14.5832 2.83331 19.2842 2.83331 25.0832V25.1998C2.83331 25.8442 3.35565 26.3665 3.99998 26.3665H25C25.6443 26.3665 26.1666 25.8442 26.1666 25.1998V25.0832C26.1666 19.2842 21.4656 14.5832 15.6666 14.5832H13.3333Z"
      />
    </svg>
  );
}
