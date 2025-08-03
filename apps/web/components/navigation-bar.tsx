'use client';

import { twMerge } from '@/lib/tailwind-merge';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavigationBar() {
  const pathname = usePathname();

  return (
    <>
      <div className="h-[64px] md:hidden" />
      <nav className="fixed right-0 bottom-0 left-0 grid grid-cols-3 border-line-alternative bg-background-normal text-[0.625rem] font-semibold text-label-assistive md:hidden">
        <Link
          href="/manage/purchase"
          className={twMerge(
            'flex flex-col items-center justify-center p-1.5',
            pathname.startsWith('/manage/purchase') && 'text-label-normal'
          )}
        >
          <Contents />
          Contents
        </Link>
        {/* <Link
          href="/scrap"
          className={twMerge(
            "flex flex-col items-center justify-center p-1.5",
            pathname.startsWith("/scrap") && "text-label-normal",
          )}
        >
          <Scrap />
          Scrap
        </Link> */}
        <Link
          href="/"
          className={twMerge(
            'flex flex-col items-center justify-center p-1.5',
            (pathname === '/' || pathname.startsWith('/category')) &&
              'text-label-normal'
          )}
        >
          <Home />
          Home
        </Link>
        {/* <Link
          href="/chat"
          className={twMerge(
            "flex flex-col items-center justify-center p-1.5",
            pathname.startsWith("/chat") && "text-label-normal",
          )}
        >
          <Chat />
          Chat
        </Link> */}
        <Link
          href="/users/profile"
          className={twMerge(
            'flex flex-col items-center justify-center p-1.5',
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

function Contents() {
  return (
    <svg
      width="29"
      height="28"
      viewBox="0 0 29 28"
      xmlns="http://www.w3.org/2000/svg"
      className="fill-current"
    >
      <path d="M4.00001 23.3332C3.35568 23.3332 2.83334 22.8108 2.83334 22.1665V5.83317C2.83334 5.18884 3.35568 4.6665 4.00001 4.6665H11.5423C11.9324 4.6665 12.2966 4.86146 12.513 5.18602L14.1537 7.64699C14.37 7.97155 14.7343 8.1665 15.1244 8.1665H25C25.6443 8.1665 26.1667 8.68884 26.1667 9.33317V22.1665C26.1667 22.8108 25.6443 23.3332 25 23.3332H4.00001Z" />
    </svg>
  );
}

function Scrap() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      xmlns="http://www.w3.org/2000/svg"
      className="fill-current"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.66669 5.37453C4.66669 3.69501 6.10741 2.3335 7.88464 2.3335H20.1154C21.8926 2.3335 23.3334 3.69501 23.3334 5.37453V24.5739C23.3334 25.4501 22.4036 26.0136 21.6269 25.6082L15.0984 22.2007C14.6143 21.948 14.0268 21.948 13.5426 22.2007L6.37319 25.9428C5.59645 26.3482 4.66669 25.7847 4.66669 24.9085V5.37453Z"
      />
    </svg>
  );
}

function Home() {
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
        d="M5.16621 14.4829V22.1666C5.16621 23.0948 5.53496 23.9851 6.19134 24.6415C6.84772 25.2978 7.73795 25.6666 8.66621 25.6666H20.3329C21.2611 25.6666 22.1514 25.2978 22.8078 24.6415C23.4641 23.9851 23.8329 23.0948 23.8329 22.1666V14.4829L24.1747 14.8247C24.3948 15.0373 24.6895 15.1549 24.9953 15.1522C25.3012 15.1495 25.5939 15.0268 25.8102 14.8105C26.0265 14.5942 26.1492 14.3016 26.1518 13.9957C26.1545 13.6898 26.0369 13.3951 25.8244 13.1751L23.5054 10.8561C23.5007 10.8512 23.496 10.8464 23.4912 10.8416C23.4864 10.8368 23.4816 10.8321 23.4767 10.8274L15.3244 2.67508C15.1056 2.45636 14.8089 2.3335 14.4995 2.3335C14.1902 2.3335 13.8935 2.45636 13.6747 2.67508L5.52239 10.8274C5.51753 10.8321 5.51271 10.8368 5.50792 10.8416C5.50314 10.8464 5.4984 10.8512 5.4937 10.8561L3.17471 13.1751C3.06328 13.2827 2.9744 13.4114 2.91326 13.5538C2.85212 13.6961 2.81993 13.8492 2.81859 14.0041C2.81724 14.159 2.84676 14.3126 2.90542 14.456C2.96408 14.5994 3.05071 14.7297 3.16025 14.8392C3.26979 14.9488 3.40005 15.0354 3.54343 15.094C3.68681 15.1527 3.84044 15.1822 3.99535 15.1809C4.15026 15.1795 4.30335 15.1473 4.44568 15.0862C4.58802 15.0251 4.71676 14.9362 4.82438 14.8247L5.16621 14.4829Z"
      />
    </svg>
  );
}

function Chat() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      xmlns="http://www.w3.org/2000/svg"
      className="fill-current"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M24.2903 18.9178C25.1687 17.2776 25.6666 15.4029 25.6666 13.4167C25.6666 6.97334 20.4433 1.75 14 1.75C7.55666 1.75 2.33331 6.97334 2.33331 13.4167C2.33331 19.86 7.55666 25.0833 14 25.0833C15.9413 25.0833 17.776 24.6077 19.3895 23.766L22.3661 24.6784C23.0922 24.901 23.882 24.7183 24.4367 24.1995C24.9914 23.6807 25.2264 22.9049 25.0528 22.1655L24.2903 18.9178Z"
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
