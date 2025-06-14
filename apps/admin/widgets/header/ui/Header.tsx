import Image from 'next/image';
import Link from 'next/link';
import { Button, LinkButton } from '@groble/ui';

export default function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-line-alternative">
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

        <LinkButton href="/login" group="solid" type="primary" size="x-small">
          로그인
        </LinkButton>
      </div>
    </header>
  );
}
