import { memo } from 'react';
import Link from 'next/link';
import { GrobleLogo } from '../../icons';
import KBAuthMark from '@/components/kb-auth-mark';

const COMPANY_INFO = {
  name: '리에종',
  ceo: '주서영',
  address: '서울 광진구 광나루로19길 23, 103호',
  businessNumber: '515-36-92976',
  telecomNumber: '2025-서울광진-0931',
  email: 'groble@groble.im',
} as const;

const FOOTER_LINKS = [
  {
    href: 'https://paint-crowley-ff2.notion.site/1f2c158365ac809bb1cbc7723ac4b346?pvs=4',
    label: '개인정보 처리방침',
  },
  {
    href: 'https://paint-crowley-ff2.notion.site/1f2c158365ac80c39fc3ef1b8764f53a?pvs=4',
    label: '서비스 이용약관',
  },
  {
    href: 'https://paint-crowley-ff2.notion.site/1f2c158365ac80afafe6c9d7c1011d39?pvs=4',
    label: '메이커 이용약관',
  },
  {
    href: 'https://paint-crowley-ff2.notion.site/1f2c158365ac80328c6fde9ceaf77ec6?pvs=4',
    label: '환불 규정',
  },
] as const;


export default function Footer() {
  return (
    <footer className="mt-12 bg-background-alternative px-5 py-8 md:px-12 md:py-10">
      <div className="mx-auto max-w-[1250px] xl:px-12">
        <div className="flex flex-col items-start">
          <div className="flex items-center">
            <GrobleLogo variant="row" width={127} height={40} />
          </div>
          <div className="mt-6 mb-3 text-caption-2 md:text-caption-1 text-label-normal">
            <p>
              그로블은 통신판매중개자이며, 상품·서비스의 제공 및 책임은
              판매자에게 있습니다.
            </p>
          </div>
          <div className="flex flex-col gap-1 text-caption-2 md:text-caption-1 text-label-alternative">
            <div className="flex flex-col sm:flex-row sm:gap-1">
              <div className="flex flex-wrap gap-1">
                <span>상호명 :{COMPANY_INFO.name} |</span>
                <span>대표자 : {COMPANY_INFO.ceo} |</span>
              </div>
              <span>주소 : {COMPANY_INFO.address}</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
              <span>사업자등록번호 : {COMPANY_INFO.businessNumber}</span>
              <a
                href={`https://www.ftc.go.kr/bizCommPop.do?wrkr_no=${COMPANY_INFO.businessNumber.replace(/-/g, '')}`}
                className="text-caption-1 underline font-semibold"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="사업자 정보 확인 (새 창에서 열림)"
              >
                사업자 정보 확인하기
              </a>
            </div>
            <span>통신판매업 신고번호 : {COMPANY_INFO.telecomNumber}</span>
            <span>이메일 : {COMPANY_INFO.email}</span>
          </div>
          <nav className="mt-3 mb-5 flex flex-wrap gap-[1.12rem] text-caption-2 md:text-caption-1" aria-label="정책 및 약관">
            {FOOTER_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-caption-1 text-label-neutral hover:text-label-normal"
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="text-caption-2 text-label-alternative mb-5">
            © 2025. liaison. All rights reserved.
          </div>
        </div>
        <hr className="mb-6 border-line-neutral" />
        <div className="flex items-center gap-2.5">
          <KBAuthMark />
          <div className="flex flex-col">
            <p className="text-caption-2 text-label-alternative font-semibold">
              KB에스크로 서비스를 이용하고 있어요
            </p>
            <p className="text-caption-2 text-label-alternative font-medium">
              안전한 전자상거래를 위해 KB국민은행의 에스크로에 가입하여 서비스를 제공하고 있어요
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
