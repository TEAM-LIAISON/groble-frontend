import Popover, { PopoverClose } from "@/components/popover";
import { getUserMyPageDetail } from "@/lib/api";
import { twMerge } from "@/lib/tailwind-merge";
import Link from "next/link";
import { ReactNode } from "react";
import Profile from "./profile";
import SwitchRoleButton from "./switch-role-button";

export default async function Detail({ className }: { className?: string }) {
  const response = await getUserMyPageDetail(
    // @ts-expect-error
    {},
  );

  if (response.status == 401) throw new Error(JSON.stringify(response));

  return (
    <div className={twMerge("flex flex-col", className)}>
      <Profile detailResponse={response.data.data} />
      <ItemList>
        <ItemGroup>
          <Link href="/users/me/nickname">
            <Item
              icon={<ProfileCheer />}
              label="닉네임"
              text={response.data.data?.nickname}
            />
          </Link>
        </ItemGroup>
        <ItemGroup>
          <Link href="/users/me/email">
            <Item
              icon={<Envelope />}
              label="이메일 로그인"
              text={response.data.data?.email}
            />
          </Link>
        </ItemGroup>
        <ItemGroup>
          <Link href="/auth/password/reset-request">
            <Item icon={<Lock />} label="비밀번호" text="•••••••••••" />
          </Link>
        </ItemGroup>
        <ItemGroup>
          <Link href="/users/me/verify-phone-request">
            <Item
              icon={<Phone />}
              label="휴대폰 번호"
              text={response.data.data?.phoneNumber ?? "인증이 필요해요"}
            />
          </Link>
        </ItemGroup>
        <ItemGroup>
          {response.data.data?.sellerAccountNotCreated ? (
            <>
              <button
                className="text-left"
                popoverTarget="phone-number-required"
              >
                <Item
                  icon={<Refresh />}
                  label="유형"
                  text={
                    <>
                      {response.data.data?.userType == "SELLER" && "구매자"}
                      {response.data.data?.userType == "BUYER" && "판매자"}로
                      전환하기
                    </>
                  }
                />
              </button>
              <Popover id="phone-number-required">
                <div className="flex flex-col gap-5">
                  <div className="flex flex-col gap-1">
                    <div className="text-headline-1 font-bold text-label-normal">
                      휴대폰 번호 인증이 필요해요
                    </div>
                    <div className="text-body-2-normal font-medium text-label-neutral">
                      휴대폰 번호 인증 후 전환할 수 있어요.
                    </div>
                  </div>
                  <PopoverClose popoverTarget="phone-number-required" />
                </div>
              </Popover>
            </>
          ) : (
            <SwitchRoleButton userType={response.data.data?.userType}>
              <Item
                icon={<Refresh />}
                label="유형"
                text={
                  <>
                    {response.data.data?.userType == "SELLER" && "구매자"}
                    {response.data.data?.userType == "BUYER" && "판매자"}로
                    전환하기
                  </>
                }
              />
            </SwitchRoleButton>
          )}
        </ItemGroup>
      </ItemList>
    </div>
  );
}

function ItemList({ children }: { children?: ReactNode }) {
  return (
    <div className="flex flex-col gap-3 p-5 text-body-1-normal font-semibold">
      {children}
    </div>
  );
}

function ItemGroup({ children }: { children?: ReactNode }) {
  return (
    <div className="flex flex-col gap-7 rounded-[12px] bg-background-normal">
      {children}
    </div>
  );
}

function Item({
  icon,
  label,
  text,
}: {
  icon?: ReactNode;
  label?: ReactNode;
  text?: ReactNode;
}) {
  return (
    <div className="flex items-center gap-3 px-4 py-5 md:px-0 md:py-3">
      <span className="rounded-full bg-background-alternative p-3">{icon}</span>
      <div className="flex flex-1 flex-col">
        <div className="text-label-1-normal font-medium text-label-alternative">
          {label}
        </div>
        <div className="text-body-1-normal font-semibold text-label-normal">
          {text}
        </div>
      </div>
      <svg
        width="24"
        height="25"
        viewBox="0 0 24 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9.22618 5.54238C8.91832 5.85929 8.92566 6.36577 9.24257 6.67363L15.0685 12.3331L9.2264 18.3421C8.91842 18.6589 8.92555 19.1654 9.24234 19.4734C9.55913 19.7814 10.0656 19.7743 10.3736 19.4575L16.7736 12.8746C16.9215 12.7224 17.003 12.5177 16.9999 12.3055C16.9969 12.0933 16.9097 11.891 16.7574 11.7431L10.3574 5.52598C10.0405 5.21812 9.53404 5.22546 9.22618 5.54238Z"
          fill="#878A93"
        />
      </svg>
    </div>
  );
}

function ProfileCheer() {
  return (
    <svg
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2.5C6.47715 2.5 2 6.97715 2 12.5C2 18.0228 6.47715 22.5 12 22.5C17.5228 22.5 22 18.0228 22 12.5C22 6.97715 17.5228 2.5 12 2.5ZM14.9951 11.5C14.4428 11.5 13.9951 11.0523 13.9951 10.5C13.9951 9.94772 14.4428 9.5 14.9951 9.5H14.9954H15.0051H15.0054C15.5576 9.5 16.0054 9.94772 16.0054 10.5C16.0054 11.0523 15.5576 11.5 15.0054 11.5H15.0051H14.9954H14.9951ZM8.99512 11.5C8.44283 11.5 7.99512 11.0523 7.99512 10.5C7.99512 9.94772 8.44283 9.5 8.99512 9.5H8.99535H9.00512H9.00535C9.55764 9.5 10.0054 9.94772 10.0054 10.5C10.0054 11.0523 9.55764 11.5 9.00535 11.5H9.00512H8.99535H8.99512ZM13.7906 14.8004C14.177 14.4058 14.8101 14.3991 15.2047 14.7855C15.5994 15.1719 15.606 15.805 15.2196 16.1996C14.3482 17.0896 13.1755 17.5 12.0051 17.5L12.0002 17.5L11.9953 17.5C10.8249 17.5 9.65224 17.0896 8.78084 16.1996C8.39445 15.805 8.40111 15.1719 8.79572 14.7855C9.19034 14.3991 9.82347 14.4058 10.2099 14.8004C10.6545 15.2544 11.2858 15.5 11.9953 15.5L12.0002 15.5L12.0051 15.5C12.7147 15.5 13.346 15.2544 13.7906 14.8004Z"
        fill="#C2C4C8"
      />
    </svg>
  );
}

function Envelope() {
  return (
    <svg
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.63447 18.8072L8.69509 12.0427L2.64241 5.68281C2.24083 6.17489 2 6.80332 2 7.488V17.0118C2 17.692 2.23766 18.3166 2.63447 18.8072ZM4.31611 19.8178C4.49129 19.8514 4.67217 19.869 4.85714 19.869H19.1429C19.404 19.869 19.6571 19.8339 19.8974 19.7683L16.5695 16.2372L13.9273 13.4897C12.8178 14.5061 11.0962 14.4867 10.0102 13.4313L4.31611 19.8178ZM21.4753 18.6624C21.8057 18.1963 22 17.6267 22 17.0118V7.488C22 6.80325 21.7591 6.17475 21.3575 5.68264L15.2419 12.1088L17.9604 14.9355L21.4753 18.6624ZM19.6934 4.68385C19.5153 4.64908 19.3312 4.63086 19.1429 4.63086H4.85714C4.67526 4.63086 4.49734 4.64786 4.3249 4.68035L11.3073 12.0345C11.6831 12.4324 12.3162 12.4324 12.6921 12.0345L19.6934 4.68385Z"
        fill="#C2C4C8"
      />
    </svg>
  );
}

function Lock() {
  return (
    <svg
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 22.6138C5.45 22.6138 4.97933 22.4181 4.588 22.0268C4.19667 21.6354 4.00067 21.1644 4 20.6138V10.6138C4 10.0638 4.196 9.5931 4.588 9.20177C4.98 8.81044 5.45067 8.61444 6 8.61377H7V6.61377C7 5.23044 7.48767 4.05144 8.463 3.07677C9.43833 2.1021 10.6173 1.61444 12 1.61377C13.3827 1.6131 14.562 2.10077 15.538 3.07677C16.514 4.05277 17.0013 5.23177 17 6.61377V8.61377H18C18.55 8.61377 19.021 8.80977 19.413 9.20177C19.805 9.59377 20.0007 10.0644 20 10.6138V20.6138C20 21.1638 19.8043 21.6348 19.413 22.0268C19.0217 22.4188 18.5507 22.6144 18 22.6138H6ZM12 17.6138C12.55 17.6138 13.021 17.4181 13.413 17.0268C13.805 16.6354 14.0007 16.1644 14 15.6138C13.9993 15.0631 13.8037 14.5924 13.413 14.2018C13.0223 13.8111 12.5513 13.6151 12 13.6138C11.4487 13.6124 10.978 13.8084 10.588 14.2018C10.198 14.5951 10.002 15.0658 10 15.6138C9.998 16.1618 10.194 16.6328 10.588 17.0268C10.982 17.4208 11.4527 17.6164 12 17.6138ZM9 8.61377H15V6.61377C15 5.78044 14.7083 5.0721 14.125 4.48877C13.5417 3.90544 12.8333 3.61377 12 3.61377C11.1667 3.61377 10.4583 3.90544 9.875 4.48877C9.29167 5.0721 9 5.78044 9 6.61377V8.61377Z"
        fill="#C2C4C8"
      />
    </svg>
  );
}

function Phone() {
  return (
    <svg
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.5532 21.9992C15.1828 21.9488 11.2993 21.4121 7.23215 17.3459C3.16592 13.2787 2.63017 9.39613 2.57878 8.02487C2.50265 5.93513 4.10326 3.90535 5.95223 3.11266C6.17489 3.01652 6.41871 2.97991 6.65978 3.00644C6.90085 3.03297 7.13089 3.12171 7.32731 3.26397C8.84988 4.37354 9.90046 6.05218 10.8026 7.37206C11.0011 7.66205 11.0859 8.01492 11.041 8.36344C10.9961 8.71197 10.8245 9.03179 10.559 9.26196L8.70238 10.6408C8.61269 10.7056 8.54955 10.8007 8.52469 10.9085C8.49984 11.0164 8.51496 11.1295 8.56725 11.227C8.98786 11.9912 9.73583 13.1293 10.5923 13.9857C11.4487 14.8422 12.6411 15.6396 13.4585 16.1078C13.561 16.1654 13.6817 16.1814 13.7956 16.1528C13.9096 16.1241 14.0083 16.0528 14.0714 15.9537L15.2799 14.1142C15.5021 13.8191 15.8299 13.6213 16.1946 13.5624C16.5593 13.5036 16.9326 13.5881 17.2364 13.7983C18.5753 14.7251 20.1379 15.7576 21.2817 17.2222C21.4355 17.42 21.5333 17.6555 21.565 17.9041C21.5966 18.1527 21.5609 18.4052 21.4615 18.6353C20.6651 20.4938 18.6495 22.0763 16.5532 21.9992Z"
        fill="#C2C4C8"
      />
    </svg>
  );
}

function Refresh() {
  return (
    <svg
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 9.49992C4.24493 9.49995 4.48134 9.58987 4.66437 9.75263C4.84741 9.91539 4.96434 10.1397 4.993 10.3829L5 10.4999V11.4999C4.99994 13.0523 5.60157 14.5443 6.67847 15.6624C7.75536 16.7805 9.22371 17.4377 10.775 17.4959L11 17.4999H14.586L13.793 16.7069C13.6137 16.527 13.5095 16.2855 13.5018 16.0315C13.494 15.7776 13.5832 15.5302 13.7512 15.3396C13.9193 15.1491 14.1536 15.0296 14.4065 15.0055C14.6594 14.9814 14.912 15.0545 15.113 15.2099L15.207 15.2929L17.707 17.7929C17.8573 17.9433 17.9557 18.1377 17.988 18.3479L18 18.5099C17.9979 18.7297 17.9234 18.9427 17.788 19.1159L17.703 19.2109L15.207 21.7069C15.027 21.8863 14.7856 21.9904 14.5316 21.9981C14.2777 22.0059 14.0303 21.9167 13.8397 21.7487C13.6492 21.5806 13.5297 21.3464 13.5056 21.0934C13.4815 20.8405 13.5546 20.5879 13.71 20.3869L13.793 20.2929L14.586 19.4999H11C8.92157 19.4999 6.92474 18.691 5.4323 17.2444C3.93985 15.7979 3.06895 13.8273 3.004 11.7499L3 11.4999V10.4999C3 10.2347 3.10536 9.98034 3.29289 9.79281C3.48043 9.60527 3.73478 9.49992 4 9.49992ZM8.793 3.29292C8.97296 3.11357 9.21443 3.00944 9.46838 3.00169C9.72233 2.99393 9.96971 3.08313 10.1603 3.25116C10.3508 3.4192 10.4703 3.65347 10.4944 3.90639C10.5185 4.15931 10.4454 4.41192 10.29 4.61292L10.207 4.70691L9.414 5.49992H13C15.0784 5.49994 17.0753 6.30885 18.5677 7.75538C20.0602 9.20192 20.931 11.1725 20.996 13.2499L21 13.4999V14.4999C20.9997 14.7548 20.9021 14.9999 20.7272 15.1853C20.5522 15.3706 20.313 15.4822 20.0586 15.4971C19.8042 15.512 19.5536 15.4292 19.3582 15.2657C19.1627 15.1021 19.0371 14.87 19.007 14.6169L19 14.4999V13.4999C19.0001 11.9475 18.3984 10.4556 17.3215 9.33744C16.2446 8.21933 14.7763 7.56213 13.225 7.50392L13 7.49992H9.414L10.207 8.29292C10.3863 8.47287 10.4905 8.71435 10.4982 8.9683C10.506 9.22225 10.4168 9.46963 10.2488 9.66019C10.0807 9.85076 9.84645 9.97022 9.59353 9.99431C9.3406 10.0184 9.08799 9.94533 8.887 9.78992L8.793 9.70691L6.293 7.20691C6.12082 7.03472 6.01739 6.80562 6.00211 6.5626C5.98683 6.31957 6.06075 6.07932 6.21 5.88692L6.293 5.79292L8.793 3.29292Z"
        fill="#C2C4C8"
      />
    </svg>
  );
}
