import { twMerge } from '@/lib/tailwind-merge';
import Link from 'next/link';

export default function FAB({
  className,
  ...props
}: Parameters<typeof Link>[0]) {
  return (
    <Link
      className={twMerge(
        'absolute right-5 bottom-20 appearance-none rounded-full bg-primary-sub-1 p-3',
        className
      )}
      {...props}
    >
      <Plus />
    </Link>
  );
}

function Plus() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.9722 4.22222C12.9722 3.68529 12.537 3.25 12 3.25C11.463 3.25 11.0278 3.68529 11.0278 4.22222V11.0278H4.22222C3.68526 11.0278 3.25 11.4631 3.25 12C3.25 12.5369 3.68526 12.9722 4.22222 12.9722H11.0278V19.7778C11.0278 20.3147 11.463 20.75 12 20.75C12.537 20.75 12.9722 20.3147 12.9722 19.7778V12.9722H19.7778C20.3147 12.9722 20.75 12.5369 20.75 12C20.75 11.4631 20.3147 11.0278 19.7778 11.0278H12.9722V4.22222Z"
        fill="white"
      />
    </svg>
  );
}
