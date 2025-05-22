import * as React from "react";

export function TextColorIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M11 3L5.5 17H7.75L8.87 14H15.12L16.24 17H18.49L13 3H11ZM9.62 12L12 5.67L14.38 12H9.62Z"
        fill="currentColor"
      />
      <path
        d="M5 19H19V21H5V19Z"
        fill="#3A16C9"
      />
    </svg>
  );
}

export default TextColorIcon;
