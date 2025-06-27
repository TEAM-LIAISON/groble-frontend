'use client';

import { twMerge } from 'tailwind-merge';
import {
  ComponentPropsWithRef,
  HTMLInputTypeAttribute,
  ReactNode,
  useRef,
  useState,
} from 'react';
import { twJoin } from 'tailwind-merge';

function textFieldInputClassName({
  type,
  error,
  value,
}: {
  type: 'box' | 'line';
  error?: boolean;
  value?: string;
}) {
  // 값이 있으면 에러 스타일을 적용하지 않음
  const shouldShowError = error && (!value || value.trim() === '');

  return twJoin(
    'appearance-none text-body-2-normal font-medium text-label-normal disabled:text-label-disable disabled:placeholder:text-label-disable',
    type == 'box' &&
      'rounded-lg bg-background-alternative px-[0.88rem] py-[15px] outline-[1.5px] -outline-offset-[1.5px] outline-background-alternative placeholder:text-label-alternative user-invalid:outline-status-error focus:outline-primary-normal focus:invalid:outline-status-error disabled:bg-interaction-disable',
    type == 'line' &&
      'border-b-[1.5px] border-line-neutral py-2 outline-0 user-valid:border-status-success user-invalid:border-status-error focus:border-label-normal',
    shouldShowError &&
      type == 'box' &&
      'outline-status-error placeholder:text-status-error',
    shouldShowError &&
      type == 'line' &&
      'border-status-error placeholder:text-status-error'
  );
}

export default function TextField({
  label,
  labelHelper,
  helperText,
  errorText,
  hoverHelper,
  type = 'box',
  maxLength,
  className,
  disabled,
  onChange,
  inputType,
  error,
  ...props
}: {
  label?: string;
  labelHelper?: string;
  helperText?: ReactNode;
  errorText?: ReactNode;
  hoverHelper?: string;
  type?: 'box' | 'line';
  inputType?: HTMLInputTypeAttribute;
  error?: boolean;
} & Omit<ComponentPropsWithRef<'input'>, 'type'>) {
  const [length, setLength] = useState(0);
  const [isHoverHelperVisible, setIsHoverHelperVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isPasswordField = inputType === 'password';
  const actualInputType = isPasswordField && showPassword ? 'text' : inputType;

  return (
    <label className="group flex flex-col gap-1">
      {(label || labelHelper) && (
        <div className="flex flex-col p-0.5">
          {label && (
            <div className="flex items-center gap-1">
              <div className="text-body-1-normal font-semibold text-label-normal group-has-disabled:text-label-disable">
                {label}
              </div>
              {hoverHelper && (
                <div className="relative">
                  <div
                    className="flex h-4 w-4 cursor-help items-center justify-center rounded-full text-label-alternative hover:text-label-normal"
                    onMouseEnter={() => setIsHoverHelperVisible(true)}
                    onMouseLeave={() => setIsHoverHelperVisible(false)}
                  >
                    <InfoIcon />
                  </div>
                  {isHoverHelperVisible && (
                    <div className="absolute top-full left-1/2 z-50 mt-2 w-[18rem] -translate-x-1/2 transform">
                      <div className="max-w-xs rounded-lg bg-component-fill-neutral p-[0.62rem] text-caption-1 text-label-inverse">
                        {hoverHelper}
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 transform">
                          <div className="h-0 w-0 border-r-4 border-b-4 border-l-4 border-r-transparent border-b-label-normal border-l-transparent"></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
          {labelHelper && (
            <div className="text-caption-1 font-medium text-label-alternative group-has-disabled:text-label-disable">
              {labelHelper}
            </div>
          )}
        </div>
      )}
      <div className="relative w-full">
        <input
          type={actualInputType}
          className={twMerge(
            'w-full',
            textFieldInputClassName({
              type,
              error,
              value: props.value as string,
            }),
            isPasswordField && 'pr-12',
            className
          )}
          maxLength={maxLength}
          disabled={disabled}
          onChange={(event) => {
            setLength(event.currentTarget.value.length);
            onChange?.(event);
          }}
          {...props}
        />
        {isPasswordField && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute cursor-pointer right-4 top-1/2 -translate-y-1/2 text-label-alternative hover:text-label-normal disabled:text-label-disable transition-colors"
            disabled={disabled}
            tabIndex={-1}
          >
            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        )}
      </div>
      <BottomText
        helperText={helperText}
        errorText={errorText}
        length={length}
        maxLength={maxLength}
      />
    </label>
  );
}

export function BottomText({
  helperText,
  errorText,
  length,
  maxLength,
}: {
  helperText?: ReactNode;
  errorText?: ReactNode;
  length?: number;
  maxLength?: number;
}) {
  return (
    <>
      <div
        hidden={!(helperText || maxLength)}
        className="flex items-center justify-stretch p-0.5 text-caption-1 text-label-alternative group-has-disabled:text-label-disable"
      >
        {helperText && (
          <span
            className={twMerge(
              'flex items-center gap-1 group-has-user-valid:text-status-success group-has-user-invalid:text-status-error'
            )}
          >
            <Exclamation />
            {helperText}
          </span>
        )}
        {maxLength && (
          <span className="ml-auto">
            {(length || 0).toLocaleString()}/{maxLength.toLocaleString()}
          </span>
        )}
      </div>
      {errorText && (
        <div className="flex items-center justify-stretch p-0.5 text-caption-1 text-label-alternative group-has-disabled:text-label-disable">
          <span
            className={twMerge('flex items-center gap-1 text-status-error')}
          >
            <Exclamation />
            {errorText}
          </span>
        </div>
      )}
    </>
  );
}

function Exclamation() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
      className="fill-current"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.00016 13.6667C11.1298 13.6667 13.6668 11.1297 13.6668 8.00004C13.6668 4.87043 11.1298 2.33337 8.00016 2.33337C4.87055 2.33337 2.3335 4.87043 2.3335 8.00004C2.3335 11.1297 4.87055 13.6667 8.00016 13.6667ZM8.00016 14.6667C11.6821 14.6667 14.6668 11.6819 14.6668 8.00004C14.6668 4.31814 11.6821 1.33337 8.00016 1.33337C4.31826 1.33337 1.3335 4.31814 1.3335 8.00004C1.3335 11.6819 4.31826 14.6667 8.00016 14.6667ZM8.50016 8.66671L8.50016 4.66671H7.50016L7.50016 8.66671H8.50016ZM8.50016 11.3334V10.3334H7.50016V11.3334H8.50016Z"
      />
    </svg>
  );
}

export function PasswordTextField({ name }: { name?: string }) {
  const [noNumber, setNoNumber] = useState<boolean | null>(null);
  const [noSpecial, setNoSpecial] = useState<boolean | null>(null);
  const [tooShort, setTooShort] = useState<boolean | null>(null);

  return (
    <div className="flex flex-col gap-3">
      <TextField
        name={name ?? 'password'}
        label="비밀번호"
        autoFocus
        inputType="password"
        required
        minLength={8}
        pattern="^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*]).{8,}$"
        onInput={(event) => {
          setNoNumber(
            event.currentTarget.value
              ? event.currentTarget.value.search(/[0-9]/) == -1
              : true
          );
          setNoSpecial(
            event.currentTarget.value
              ? event.currentTarget.value.search(/[!@#$%^&*()]/) == -1
              : true
          );
          setTooShort(
            event.currentTarget.validity.valueMissing ||
              event.currentTarget.validity.tooShort
          );
        }}
      />
      <ul className="flex flex-col gap-1">
        <li
          className={twMerge(
            'flex items-center gap-0.5 text-caption-1 text-label-alternative',
            noNumber === true && 'text-accent-red-orange',
            noNumber === false && 'text-status-success'
          )}
        >
          <Check /> 숫자 포함
        </li>
        <li
          className={twMerge(
            'flex items-center gap-0.5 text-caption-1 text-label-alternative',
            noSpecial === true && 'text-accent-red-orange',
            noSpecial === false && 'text-status-success'
          )}
        >
          <Check /> 특수문자 포함
        </li>
        <li
          className={twMerge(
            'flex items-center gap-0.5 text-caption-1 text-label-alternative',
            tooShort === true && 'text-accent-red-orange',
            tooShort === false && 'text-status-success'
          )}
        >
          <Check /> 최소 8자 이상
        </li>
      </ul>
    </div>
  );
}

function Check() {
  return (
    <svg
      width="21"
      height="21"
      viewBox="0 0 21 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.33594 10.9375L9.48594 14L15.3359 7"
        className="stroke-[currentcolor]"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function TextAreaTextField({
  label,
  labelHelper,
  helperText,
  errorText,
  hoverHelper,
  className,
  type = 'box',
  onChange,
  value,
  error,
  maxLength,
  disabled,
  ...props
}: {
  label?: string;
  labelHelper?: string;
  helperText?: ReactNode;
  errorText?: ReactNode;
  hoverHelper?: string;
  className?: string;
  type?: 'box' | 'line';
  error?: boolean;
  maxLength?: number;
  disabled?: boolean;
} & ComponentPropsWithRef<'textarea'>) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [length, setLength] = useState(0);
  const [isHoverHelperVisible, setIsHoverHelperVisible] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setLength(e.currentTarget.value.length);
    onChange?.(e);
  };

  return (
    <label className="group flex flex-col gap-1">
      {(label || labelHelper) && (
        <div className="flex flex-col p-0.5">
          {label && (
            <div className="flex items-center gap-1">
              <div className="text-body-1-normal font-semibold text-label-normal group-has-disabled:text-label-disable">
                {label}
              </div>
              {hoverHelper && (
                <div className="relative">
                  <div
                    className="flex h-4 w-4 cursor-help items-center justify-center rounded-full text-label-alternative hover:text-label-normal"
                    onMouseEnter={() => setIsHoverHelperVisible(true)}
                    onMouseLeave={() => setIsHoverHelperVisible(false)}
                  >
                    <InfoIcon />
                  </div>
                  {isHoverHelperVisible && (
                    <div className="absolute top-full left-1/2 z-50 mt-2 w-[18rem] -translate-x-1/2 transform">
                      <div className="max-w-xs rounded-lg bg-label-normal px-3 py-2 text-sm text-white shadow-lg">
                        {hoverHelper}
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 transform">
                          <div className="h-0 w-0 border-r-4 border-b-4 border-l-4 border-r-transparent border-b-label-normal border-l-transparent"></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
          {labelHelper && (
            <div className="text-caption-1 font-medium text-label-alternative group-has-disabled:text-label-disable">
              {labelHelper}
            </div>
          )}
        </div>
      )}
      <textarea
        ref={textareaRef}
        rows={1}
        className={twMerge(
          textFieldInputClassName({ type, error, value: String(value) }),
          'resize-none overflow-hidden',
          className
        )}
        value={value}
        maxLength={maxLength}
        disabled={disabled}
        onChange={handleChange}
        {...props}
      />
      <BottomText
        helperText={helperText}
        errorText={errorText}
        length={length}
        maxLength={maxLength}
      />
    </label>
  );
}

function InfoIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="fill-current"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14ZM8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15ZM8.5 7V11H7.5V7H8.5ZM8.5 5.5V4.5H7.5V5.5H8.5Z"
      />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="21"
      height="21"
      viewBox="0 0 21 21"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.209 10.7501C18.209 10.5245 18.1348 10.316 18.0157 10.1646C17.3587 9.36245 16.2939 8.19506 14.9717 7.23206C13.6421 6.26364 12.1074 5.54175 10.5006 5.54175C8.89391 5.54175 7.35913 6.26364 6.02955 7.23206C4.70741 8.19507 3.64252 9.36247 2.98559 10.1646C2.86646 10.3161 2.79232 10.5245 2.79232 10.7501C2.79232 10.9767 2.86631 11.1839 2.98558 11.3356C3.64251 12.1377 4.7074 13.3051 6.02955 14.2681C7.35913 15.2365 8.89391 15.9584 10.5006 15.9584C12.1074 15.9584 13.6421 15.2365 14.9717 14.2681C16.2924 13.3062 17.3564 12.1403 18.0135 11.3383C18.1411 11.1718 18.2103 10.9662 18.209 10.7541L18.209 10.7501ZM10.5006 4.29175C12.4774 4.29175 14.2693 5.17403 15.7077 6.22167C17.1513 7.27313 18.2942 8.53143 18.9862 9.37679L18.9919 9.38386C19.2974 9.76829 19.4585 10.2551 19.459 10.7481C19.4617 11.2415 19.2988 11.7221 18.9958 12.1114L18.9862 12.1234C18.2942 12.9687 17.1513 14.227 15.7077 15.2785C14.2693 16.3261 12.4774 17.2084 10.5006 17.2084C8.52383 17.2084 6.73195 16.3261 5.29361 15.2785C3.85002 14.227 2.70704 12.9687 2.01506 12.1234L2.00937 12.1163C1.70365 11.7316 1.54232 11.2453 1.54232 10.7501C1.54232 10.2564 1.70349 9.76881 2.00937 9.38386L2.01506 9.37679C2.70704 8.53143 3.85002 7.27313 5.29361 6.22167C6.73195 5.17403 8.52382 4.29175 10.5006 4.29175ZM10.5007 7.62508C11.3295 7.62508 12.1243 7.95432 12.7104 8.54037C13.2964 9.12642 13.6257 9.92128 13.6257 10.7501C13.6257 11.5789 13.2964 12.3737 12.7104 12.9598C12.1243 13.5458 11.3295 13.8751 10.5007 13.8751C9.67185 13.8751 8.87699 13.5458 8.29094 12.9598C7.70489 12.3737 7.37565 11.5789 7.37565 10.7501C7.37565 9.92128 7.70489 9.12642 8.29094 8.54037C8.87699 7.95432 9.67185 7.62508 10.5007 7.62508ZM11.8265 9.42426C11.4748 9.07263 10.9979 8.87508 10.5007 8.87508C10.0034 8.87508 9.52646 9.07263 9.17483 9.42426C8.8232 9.77589 8.62565 10.2528 8.62565 10.7501C8.62565 11.2474 8.8232 11.7243 9.17483 12.0759C9.52646 12.4275 10.0034 12.6251 10.5007 12.6251C10.9979 12.6251 11.4748 12.4275 11.8265 12.0759C12.1781 11.7243 12.3757 11.2474 12.3757 10.7501C12.3757 10.2528 12.1781 9.77589 11.8265 9.42426Z"
        fill="#1D212C"
      />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="21"
      height="21"
      viewBox="0 0 21 21"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.60796 1.97456C2.36388 1.73048 1.96815 1.73048 1.72407 1.97456C1.48 2.21864 1.48 2.61437 1.72407 2.85845L8.24381 9.37818L8.24603 9.3804L11.8691 13.0035L11.8716 13.0059L18.3912 19.5256C18.6353 19.7697 19.031 19.7697 19.2751 19.5256C19.5192 19.2815 19.5192 18.8858 19.2751 18.6417L15.7962 15.1628C17.1909 14.1369 18.2952 12.9294 18.9687 12.1151L18.9688 12.1152L18.9747 12.1078C19.2808 11.726 19.4429 11.2428 19.4429 10.7501C19.4429 10.2589 19.281 9.77434 18.9747 9.39238L18.9747 9.39234L18.9689 9.38533C18.278 8.54897 17.1369 7.30424 15.6957 6.26416C14.2596 5.22775 12.4715 4.35569 10.4997 4.35569C8.9437 4.35569 7.50436 4.89864 6.26574 5.63234L2.60796 1.97456ZM7.18179 6.54839L8.73669 8.10329C9.25675 7.7671 9.86764 7.58707 10.4958 7.59252C11.332 7.59979 12.1319 7.93519 12.7232 8.52649C13.3145 9.11779 13.6499 9.91767 13.6571 10.7539C13.6626 11.382 13.4825 11.9929 13.1464 12.513L14.9011 14.2677C16.2477 13.3081 17.3342 12.1296 18.0021 11.3226C18.1201 11.1738 18.1929 10.9712 18.1929 10.7501C18.1929 10.5299 18.1199 10.326 18.002 10.1775C17.3464 9.38442 16.2837 8.23007 14.9642 7.27777C13.6374 6.32022 12.1049 5.60569 10.4997 5.60569C9.33904 5.60569 8.21684 5.97888 7.18179 6.54839ZM12.2284 11.595L9.65465 9.02125C9.91244 8.90214 10.1957 8.83996 10.4849 8.84248C10.9934 8.8469 11.4797 9.05084 11.8393 9.41038C12.1988 9.76991 12.4028 10.2563 12.4072 10.7647C12.4097 11.054 12.3475 11.3372 12.2284 11.595ZM4.69524 8.37849C4.94888 8.14436 4.96469 7.74895 4.73056 7.49531C4.49644 7.24167 4.10103 7.22586 3.84739 7.45998C3.08811 8.16085 2.4702 8.85446 2.03098 9.38469L2.03091 9.38464L2.02471 9.39238C1.71882 9.77382 1.55695 10.2576 1.55651 10.7481C1.5538 11.2391 1.71743 11.7166 2.02079 12.1028L2.03045 12.1148C2.72138 12.9512 3.86251 14.1959 5.30367 15.236C6.73976 16.2724 8.52784 17.1445 10.4997 17.1445C11.2296 17.1445 11.9344 17.0256 12.604 16.8228C12.9344 16.7227 13.1211 16.3738 13.021 16.0434C12.9209 15.7131 12.572 15.5264 12.2416 15.6264C11.6754 15.798 11.0929 15.8945 10.4997 15.8945C8.89452 15.8945 7.362 15.18 6.03518 14.2224C4.71714 13.2712 3.65533 12.1183 2.99963 11.3254C2.8732 11.162 2.80516 10.9608 2.8065 10.7541L2.80651 10.7541L2.80651 10.7501C2.80651 10.5301 2.87943 10.3263 2.99721 10.1777C3.41161 9.67776 3.98985 9.02961 4.69524 8.37849Z"
        fill="#1D212C"
      />
    </svg>
  );
}
