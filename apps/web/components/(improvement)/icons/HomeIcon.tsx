import { SVGProps } from 'react';

export function HomeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.3368 1.86479C11.7266 1.60734 12.2734 1.60734 12.6632 1.86479L21.6632 8.36479C21.8731 8.50341 22 8.74308 22 9V20C22 20.5523 21.5523 21 21 21H15C14.4477 21 14 20.5523 14 20V14C14 13.4477 13.5523 13 13 13H11C10.4477 13 10 13.4477 10 14V20C10 20.5523 9.55228 21 9 21H3C2.44772 21 2 20.5523 2 20V9C2 8.74308 2.12687 8.50341 2.33684 8.36479L11.3368 1.86479ZM4 9.78885V19H8V14C8 12.3432 9.34315 11 11 11H13C14.6569 11 16 12.3432 16 14V19H20V9.78885L12 4.28885L4 9.78885Z"
        fill="currentColor"
      />
    </svg>
  );
}
